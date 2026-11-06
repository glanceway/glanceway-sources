import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../website/dist/", import.meta.url));
const origin = "https://glanceway.app";
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
}
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const groups = await Promise.allSettled(entries.map((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  }));
  return groups.flatMap((result) => {
    if (result.status === "rejected") throw result.reason;
    return result.value;
  });
}
const files = await filesIn(root);
const pages = new Map();
for (const file of files.filter((file) => file.endsWith(".html"))) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  const route = relative === "index.html" ? "/" : relative === "404.html" ? "/404/" : `/${relative.replace(/index\.html$/, "")}`;
  const html = await readFile(file, "utf8");
  const links = [...html.matchAll(/<link\s[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = [...html.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => attributes(tag));
  const canonical = links.filter((link) => link.rel === "canonical");
  assert.equal(canonical.length, 1, `${route}: expected one canonical`);
  assert.ok(html.match(/<title>[^<]+<\/title>/), `${route}: missing title`);
  assert.ok(meta.find((tag) => tag.name === "description" && tag.content), `${route}: missing description`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${route}: expected one H1`);
  assert.ok(!html.includes("window.location.replace"), `${route}: automatic language redirect`);
  assert.ok(!html.includes("奴才"), `${route}: conversation persona leaked into site copy`);
  for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(json);
  pages.set(route, {
    canonical: canonical[0].href,
    noindex: meta.some((tag) => tag.name === "robots" && tag.content.includes("noindex")),
    alternates: Object.fromEntries(links.filter((link) => link.hreflang).map((link) => [link.hreflang, link.href])),
    anchors: [...html.matchAll(/<a\s[^>]*>/g)].map(([tag]) => attributes(tag).href).filter(Boolean),
  });
}
assert.ok(pages.get("/404/")?.noindex, "Pages requires a top-level noindex 404.html");
const incoming = new Set();
for (const [route, page] of pages) {
  const canonical = new URL(page.canonical);
  assert.equal(canonical.origin, origin, `${route}: unexpected canonical origin`);
  assert.equal(pages.get(canonical.pathname)?.canonical, page.canonical, `${route}: missing target or canonical chain`);
  for (const href of Object.values(page.alternates)) {
    const target = pages.get(new URL(href).pathname);
    assert.ok(target, `${route}: broken hreflang ${href}`);
    assert.deepEqual(target.alternates, page.alternates, `${route}: nonreciprocal hreflang`);
  }
  for (const href of page.anchors) {
    if (/^(?:glanceway|mailto|tel|javascript):/.test(href)) continue;
    const target = new URL(href, `${origin}${route}`);
    if (target.origin !== origin) continue;
    if (pages.has(target.pathname)) {
      if (target.pathname !== route && !page.noindex) incoming.add(target.pathname);
    } else {
      const exists = await stat(path.join(root, decodeURIComponent(target.pathname))).then((value) => value.isFile(), () => false);
      assert.ok(exists, `${route}: broken internal link ${href}`);
    }
  }
}
const sitemap = [];
for (const file of files.filter((file) => /sitemap-\d+\.xml$/.test(file))) {
  const xml = await readFile(file, "utf8");
  sitemap.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, href]) => decode(href)));
}
const canonicalPages = new Set([...pages.entries()].filter(([route, page]) => !page.noindex && page.canonical === `${origin}${route}`).map(([, page]) => page.canonical));
assert.equal(sitemap.length, new Set(sitemap).size, "Duplicate sitemap entries");
assert.deepEqual(new Set(sitemap), canonicalPages, "Sitemap must list exactly the indexable canonical pages");
for (const [route, page] of pages) {
  if (!page.noindex) assert.ok(incoming.has(route), `${route}: no incoming internal links`);
}
console.log(`SEO checks passed: ${pages.size} pages, ${sitemap.length} canonical sitemap URLs, valid JSON-LD and reciprocal hreflang, no broken internal links or orphan pages.`);
