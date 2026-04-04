const PROFILE_RELAYS = [
  "wss://relay.damus.io/",
  "wss://nos.lol/",
  "wss://relay.primal.net/",
];
const PROFILE_CACHE_TTL = 24 * 60 * 60 * 1000;
const PROFILE_CACHE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const POOL_IDLE_TIMEOUT = 60 * 1000;
const QUERY_TIMEOUT = 15 * 1000;
const BECH32_CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
const LIMIT = 100;

// --- Bech32 ---

function bech32Polymod(values) {
  const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  for (const v of values) {
    const b = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    for (let i = 0; i < 5; i++) {
      if ((b >> i) & 1) chk ^= GEN[i];
    }
  }
  return chk;
}

function bech32HrpExpand(hrp) {
  const ret = [];
  for (let i = 0; i < hrp.length; i++) ret.push(hrp.charCodeAt(i) >> 5);
  ret.push(0);
  for (let i = 0; i < hrp.length; i++) ret.push(hrp.charCodeAt(i) & 31);
  return ret;
}

function bech32CreateChecksum(hrp, data) {
  const values = bech32HrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const polymod = bech32Polymod(values) ^ 1;
  const ret = [];
  for (let i = 0; i < 6; i++) ret.push((polymod >> (5 * (5 - i))) & 31);
  return ret;
}

function bech32Encode(hrp, data5bit) {
  const checksum = bech32CreateChecksum(hrp, data5bit);
  return (
    hrp +
    "1" +
    data5bit
      .concat(checksum)
      .map((d) => BECH32_CHARSET[d])
      .join("")
  );
}

function bech32Decode(str) {
  str = str.toLowerCase();
  const pos = str.lastIndexOf("1");
  if (pos < 1) return null;
  const hrp = str.slice(0, pos);
  const dataChars = str.slice(pos + 1);
  const data = [];
  for (const c of dataChars) {
    const idx = BECH32_CHARSET.indexOf(c);
    if (idx === -1) return null;
    data.push(idx);
  }
  if (bech32Polymod(bech32HrpExpand(hrp).concat(data)) !== 1) return null;
  return { hrp, data: data.slice(0, data.length - 6) };
}

function convertBits(data, fromBits, toBits, pad) {
  let acc = 0;
  let bits = 0;
  const maxv = (1 << toBits) - 1;
  const ret = [];
  for (const d of data) {
    acc = (acc << fromBits) | d;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      ret.push((acc >> bits) & maxv);
    }
  }
  if (pad && bits > 0) {
    ret.push((acc << (toBits - bits)) & maxv);
  }
  return ret;
}

function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return bytes;
}

function bytesToHex(bytes) {
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// --- NIP-19 ---

function encodeNevent(eventId, relayUrl, pubkey) {
  const tlv = [];
  // Type 0: event id (32 bytes)
  const idBytes = hexToBytes(eventId);
  tlv.push(0, idBytes.length, ...idBytes);
  // Type 1: relay URL
  const relayBytes = [];
  for (let i = 0; i < relayUrl.length; i++)
    relayBytes.push(relayUrl.charCodeAt(i));
  tlv.push(1, relayBytes.length, ...relayBytes);
  // Type 2: author pubkey (32 bytes)
  const pkBytes = hexToBytes(pubkey);
  tlv.push(2, pkBytes.length, ...pkBytes);

  return bech32Encode("nevent", convertBits(tlv, 8, 5, true));
}

function decodeBech32Pubkey(bech32str) {
  try {
    const decoded = bech32Decode(bech32str);
    if (!decoded) return null;
    const bytes = convertBits(decoded.data, 5, 8, false);
    if (decoded.hrp === "npub") {
      return bytesToHex(bytes.slice(0, 32));
    }
    if (decoded.hrp === "nprofile") {
      // TLV: type 0 = pubkey
      let i = 0;
      while (i + 1 < bytes.length) {
        const type = bytes[i];
        const len = bytes[i + 1];
        if (type === 0 && len === 32) {
          return bytesToHex(bytes.slice(i + 2, i + 2 + 32));
        }
        i += 2 + len;
      }
    }
  } catch (e) {
    // ignore
  }
  return null;
}

// --- Content processing ---

const MEDIA_PATTERN =
  /https?:\/\/\S+\.(?:jpg|jpeg|png|gif|webp|svg|mp4|webm|mov|mp3|ogg|wav|flac)(?:\?\S*)?/gi;
const IMAGE_EXT = /\.(?:jpg|jpeg|png|gif|webp|svg)(?:\?|$)/i;
const VIDEO_EXT = /\.(?:mp4|webm|mov)(?:\?|$)/i;

function processContent(content, profileCache) {
  // Replace nostr: mentions
  let processed = content.replace(
    /nostr:(nprofile1[a-z0-9]+|npub1[a-z0-9]+)/g,
    (_, bech32) => {
      const pubkey = decodeBech32Pubkey(bech32);
      if (pubkey && profileCache[pubkey]) {
        return "@" + profileCache[pubkey].name;
      }
      if (pubkey) {
        return "@" + shortenPubkey(pubkey);
      }
      return "@unknown";
    },
  );

  // Replace nostr: note/event references
  processed = processed.replace(
    /nostr:(?:nevent1|naddr1|note1)[a-z0-9]+/g,
    "[Note]",
  );

  // Replace media URLs
  processed = processed.replace(MEDIA_PATTERN, (url) => {
    if (IMAGE_EXT.test(url)) return "[Image]";
    if (VIDEO_EXT.test(url)) return "[Video]";
    return "[Audio]";
  });

  // Collapse newlines into single space
  processed = processed.replace(/\n+/g, " ").trim();

  return processed;
}

function extractMentionedPubkeys(content) {
  const pubkeys = [];
  const re = /nostr:(nprofile1[a-z0-9]+|npub1[a-z0-9]+)/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const pk = decodeBech32Pubkey(m[1]);
    if (pk) pubkeys.push(pk);
  }
  return pubkeys;
}

function shortenPubkey(pubkey) {
  return pubkey.slice(0, 8) + "..." + pubkey.slice(-8);
}

function generateSubId() {
  return "glw_" + Math.random().toString(36).slice(2, 10);
}

function normalizeRelayUrl(url) {
  url = url.trim().toLowerCase();
  if (!url.includes("://")) url = "wss://" + url;
  url = url.replace(/^http:\/\//, "ws://").replace(/^https:\/\//, "wss://");
  if (!url.endsWith("/")) url += "/";
  return url;
}

// --- Module export ---

module.exports = async (api) => {
  const relayUrls = (api.config.get("RELAY_URLS") || []).map(normalizeRelayUrl);
  const noteUrlTemplate =
    api.config.get("NOTE_URL_TEMPLATE") || "https://jumble.social/notes/{code}";

  // Unified connection pool: url -> { connection, subs: Map<subId, handler>, idleTimer }
  const connPool = new Map();
  const feedSubIds = []; // track feed subscription IDs for cleanup
  let items = new Map();
  let profileCache = {};
  let pendingEvents = [];
  let stopped = false;

  // --- Connection pool ---

  function getConn(url) {
    return new Promise((resolve, reject) => {
      const entry = connPool.get(url);
      if (entry && entry.connection) {
        clearIdleTimer(url);
        resolve(entry);
        return;
      }

      api.websocket.connect(url, {
        onConnect(conn) {
          const entry = { connection: conn, subs: new Map(), idleTimer: null };
          connPool.set(url, entry);
          resolve(entry);
        },
        onMessage(data) {
          const entry = connPool.get(url);
          if (!entry) return;
          try {
            const msg = JSON.parse(data);
            const subId = msg[1];
            if (subId && entry.subs.has(subId)) {
              entry.subs.get(subId)(msg);
            }
          } catch (e) {
            // ignore
          }
        },
        onError(error) {
          connPool.delete(url);
          reject(error);
        },
        onClose() {
          const entry = connPool.get(url);
          if (entry) {
            clearIdleTimer(url);
            connPool.delete(url);
          }
        },
      });
    });
  }

  function closeConn(url) {
    const entry = connPool.get(url);
    if (entry) {
      clearIdleTimer(url);
      try {
        entry.connection.close();
      } catch (e) {
        // ignore
      }
      connPool.delete(url);
    }
  }

  function clearIdleTimer(url) {
    const entry = connPool.get(url);
    if (entry && entry.idleTimer) {
      clearTimeout(entry.idleTimer);
      entry.idleTimer = null;
    }
  }

  function startIdleTimer(url) {
    const entry = connPool.get(url);
    if (entry) {
      clearIdleTimer(url);
      entry.idleTimer = setTimeout(() => {
        // Only close if no active subscriptions
        if (entry.subs.size === 0) closeConn(url);
      }, POOL_IDLE_TIMEOUT);
    }
  }

  // --- Profile cache ---

  function loadProfileCache() {
    try {
      const raw = api.storage.get("profileCache");
      if (raw) profileCache = JSON.parse(raw);
    } catch (e) {
      profileCache = {};
    }
  }

  function saveProfileCache() {
    const now = Date.now();
    const pruned = {};
    for (const [pk, entry] of Object.entries(profileCache)) {
      if (now - entry.cachedAt < PROFILE_CACHE_MAX_AGE) {
        pruned[pk] = entry;
      }
    }
    profileCache = pruned;
    api.storage.set("profileCache", JSON.stringify(profileCache));
  }

  // --- Query via pool ---

  function queryRelay(url, filter, timeoutMs) {
    timeoutMs = timeoutMs || QUERY_TIMEOUT;
    return new Promise((resolve) => {
      const subId = generateSubId();
      const results = [];
      let settled = false;

      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          cleanup();
          resolve(results);
        }
      }, timeoutMs);

      function cleanup() {
        const entry = connPool.get(url);
        if (entry) {
          entry.subs.delete(subId);
          try {
            entry.connection.send(JSON.stringify(["CLOSE", subId]));
          } catch (e) {
            // ignore
          }
          startIdleTimer(url);
        }
      }

      getConn(url)
        .then((entry) => {
          if (settled) return;
          entry.subs.set(subId, (msg) => {
            if (msg[0] === "EVENT" && msg[1] === subId) {
              results.push(msg[2]);
            } else if (msg[0] === "EOSE" && msg[1] === subId) {
              if (!settled) {
                settled = true;
                clearTimeout(timer);
                cleanup();
                resolve(results);
              }
            }
          });
          entry.connection.send(JSON.stringify(["REQ", subId, filter]));
        })
        .catch(() => {
          if (!settled) {
            settled = true;
            clearTimeout(timer);
            resolve(results);
          }
        });
    });
  }

  // --- Profile resolution ---

  async function resolveProfiles(pubkeys) {
    const now = Date.now();
    const uncached = pubkeys.filter((pk) => {
      const entry = profileCache[pk];
      return !entry || now - entry.cachedAt > PROFILE_CACHE_TTL;
    });

    if (uncached.length === 0) return;

    const results = await Promise.allSettled(
      PROFILE_RELAYS.map((url) => queryRelay(url, { kinds: [0], authors: uncached })),
    );

    for (const result of results) {
      if (result.status !== "fulfilled") continue;
      for (const event of result.value) {
        if (
          profileCache[event.pubkey] &&
          now - profileCache[event.pubkey].cachedAt <= PROFILE_CACHE_TTL
        ) {
          continue;
        }
        try {
          const meta = JSON.parse(event.content);
          const name = meta.display_name || meta.name;
          if (name) {
            profileCache[event.pubkey] = { name, cachedAt: now };
          }
        } catch (e) {
          // ignore
        }
      }
    }

    saveProfileCache();
  }

  // --- Item building ---

  function buildItem(event, relayUrl) {
    const authorName =
      profileCache[event.pubkey]?.name || shortenPubkey(event.pubkey);
    const content = processContent(event.content, profileCache);

    return {
      id: event.id,
      title: content,
      subtitle: "by " + authorName,
      url: noteUrlTemplate.replace(
        "{code}",
        encodeNevent(event.id, relayUrl, event.pubkey),
      ),
      timestamp: event.created_at,
    };
  }

  function getUncachedPubkeys(event) {
    const pubkeys = [event.pubkey, ...extractMentionedPubkeys(event.content)];
    return [...new Set(pubkeys.filter((pk) => !profileCache[pk]))];
  }

  function emitItem(event, relayUrl) {
    if (items.has(event.id)) return;
    const item = buildItem(event, relayUrl);
    items.set(event.id, item);
    api.emit([item]);
  }

  // --- Feed subscription ---

  function closeFeedSubs() {
    for (const { url, subId } of feedSubIds) {
      const entry = connPool.get(url);
      if (entry) {
        entry.subs.delete(subId);
        try {
          entry.connection.send(JSON.stringify(["CLOSE", subId]));
        } catch (e) {
          // ignore
        }
        startIdleTimer(url);
      }
    }
    feedSubIds.length = 0;
  }

  function subscribeFeedRelay(url, onEose) {
    const subId = generateSubId();

    getConn(url)
      .then((entry) => {
        feedSubIds.push({ url, subId });
        entry.subs.set(subId, (msg) => {
          if (msg[0] === "EVENT" && msg[1] === subId) {
            const event = msg[2];
            if (items.has(event.id)) return;

            const neededPubkeys = getUncachedPubkeys(event);
            if (neededPubkeys.length === 0) {
              emitItem(event, url);
            } else {
              pendingEvents.push({ event, relayUrl: url });
            }
          } else if (msg[0] === "EOSE" && msg[1] === subId) {
            onEose();
          }
        });
        entry.connection.send(
          JSON.stringify(["REQ", subId, { kinds: [1], limit: LIMIT }]),
        );
      })
      .catch(() => {
        api.log("error", "Failed to connect to feed relay: " + url);
        onEose();
      });
  }

  // --- Main fetch ---

  async function fetchData() {
    if (stopped) return;

    closeFeedSubs();
    items = new Map();
    pendingEvents = [];
    loadProfileCache();

    if (relayUrls.length === 0) return;

    // Subscribe to all feed relays and wait for all EOSE
    let eoseCount = 0;
    await new Promise((resolve) => {
      const onEose = () => {
        eoseCount++;
        if (eoseCount >= relayUrls.length) resolve();
      };

      const timer = setTimeout(resolve, QUERY_TIMEOUT);

      for (const url of relayUrls) {
        subscribeFeedRelay(url, () => {
          onEose();
          if (eoseCount >= relayUrls.length) clearTimeout(timer);
        });
      }
    });

    // Batch resolve profiles for pending events
    if (pendingEvents.length > 0) {
      const uncachedPubkeys = [
        ...new Set(pendingEvents.flatMap((pe) => getUncachedPubkeys(pe.event))),
      ];
      await resolveProfiles(uncachedPubkeys);

      for (const { event, relayUrl } of pendingEvents) {
        emitItem(event, relayUrl);
      }
      pendingEvents = [];
    }
  }

  // Start phase
  await fetchData();

  return {
    refresh: fetchData,
    stop() {
      stopped = true;
      closeFeedSubs();
      for (const url of [...connPool.keys()]) {
        closeConn(url);
      }
    },
  };
};
