import type { GlancewayAPI, InfoItem, SourceMethods } from "./types";

interface FinnhubQuote {
  c: number; // current price
  d: number; // change
  dp: number; // change percent
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
}

interface FinnhubProfile {
  name: string;
  currency: string;
  ticker: string;
}

type Config = {
  FINNHUB_TOKEN: string;
  SYMBOLS: string[] | undefined;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const token = api.config.get("FINNHUB_TOKEN");
  const symbolsRaw = api.config.get("SYMBOLS") ?? [];

  async function fetchData() {
    const symbols = symbolsRaw.map((s) => s.toUpperCase());

    if (symbols.length === 0) {
      api.emit([]);
      return;
    }

    const items: InfoItem[] = [];

    for (const symbol of symbols) {
      const quoteRes = await api.fetch<FinnhubQuote>(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`,
      );

      if (!quoteRes.ok || !quoteRes.json || quoteRes.json.c === 0) {
        api.log("warn", `Failed to fetch quote for ${symbol}`);
        continue;
      }

      const q = quoteRes.json;

      // fetch and cache company name
      let name = api.storage.get(`name:${symbol}`);
      if (!name) {
        const profileRes = await api.fetch<FinnhubProfile>(
          `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${token}`,
        );
        if (profileRes.ok && profileRes.json?.name) {
          name = profileRes.json.name;
          api.storage.set(`name:${symbol}`, name);
        }
      }

      const price = q.c.toFixed(2);
      const change = q.d.toFixed(2);
      const changePct = q.dp.toFixed(2);
      const arrow = q.d > 0 ? "↑" : q.d < 0 ? "↓" : "";
      const sign = q.d > 0 ? "+" : "";

      items.push({
        id: symbol,
        title: name ? `${name} (${symbol})` : symbol,
        subtitle: `${price} ${arrow} ${sign}${change} (${sign}${changePct}%)`,
        url: `https://finnhub.io/stock/${symbol}`,
      });
    }

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
