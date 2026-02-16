import type { GlancewayAPI, SourceMethods } from "./types";

interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number | null;
  last_updated: string;
}

type Config = {
  CURRENCY: string;
  ORDER: string;
};

function currencySymbol(currency: string): string {
  switch (currency) {
    case "usd":
      return "$";
    case "eur":
      return "\u20AC";
    case "gbp":
      return "\u00A3";
    case "jpy":
      return "\u00A5";
    case "cny":
      return "\u00A5";
    default:
      return "";
  }
}

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const currency = api.config.get("CURRENCY") || "usd";
  const order = api.config.get("ORDER") || "market_cap_desc";

  async function fetchData() {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=250&sparkline=false`;

    const response = await api.fetch<CoinMarket[]>(url);

    if (!response.ok || !response.json) {
      throw new Error(`Failed to fetch CoinGecko market data (HTTP ${response.status})`);
    }

    const now = Date.now();
    const items = response.json.map((item, i) => {
      const change = item.price_change_percentage_24h;
      const changeStr =
        change != null
          ? ` ${change > 0 ? "+" : ""}${change.toFixed(2)}%`
          : "";

      return {
        id: item.id,
        title: `${item.name} (${item.symbol.toUpperCase()})`,
        subtitle: `${currencySymbol(currency)}${item.current_price.toLocaleString("en-US")}${changeStr}`,
        url: `https://www.coingecko.com/en/coins/${item.id}`,
        timestamp: now - i,
      };
    });

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
