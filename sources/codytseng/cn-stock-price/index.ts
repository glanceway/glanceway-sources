import type { GlancewayAPI, SourceMethods } from "./types";

interface StockItem {
  f1: number; // decimal precision
  f2: number; // current price (raw, needs dividing by 10^f1)
  f3: number; // change percent (raw, needs dividing by 10^f1)
  f4: number; // change amount (raw, needs dividing by 10^f1)
  f12: string; // stock code
  f13: number; // market (1=SH, 0=SZ)
  f14: string; // stock name
}

interface StockResponse {
  data: {
    diff: StockItem[];
  };
}

function toSecId(code: string): string {
  const c = code.trim();
  // Shanghai: starts with 6
  if (c.startsWith("6")) return `1.${c}`;
  // Shenzhen: starts with 0 or 3
  return `0.${c}`;
}

function marketLabel(market: number): string {
  return market === 1 ? "SH" : "SZ";
}

type Config = {
  STOCK_CODES: string[] | undefined;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const codes = api.config.get("STOCK_CODES") ?? [];

  async function fetchData() {
    if (codes.length === 0) {
      api.emit([]);
      return;
    }

    const secIds = codes.map(toSecId).join(",");
    const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?secids=${secIds}&fields=f1,f2,f3,f4,f12,f13,f14`;

    const response = await api.fetch<StockResponse>(url);

    if (!response.ok || !response.json?.data?.diff) {
      throw new Error(
        `Failed to fetch stock data (HTTP ${response.status})`,
      );
    }

    const items = response.json.data.diff.map((stock) => {
      const precision = stock.f1;
      const divisor = Math.pow(10, precision);
      const priceVal = stock.f2 / divisor;
      const changeVal = stock.f4 / divisor;
      const changePctVal = stock.f3 / divisor;

      const arrow = changePctVal > 0 ? "↑" : changePctVal < 0 ? "↓" : "";
      const sign = changePctVal > 0 ? "+" : "";
      const ml = marketLabel(stock.f13);

      const price = priceVal.toFixed(precision);
      const change = changeVal.toFixed(precision);
      const changePct = changePctVal.toFixed(2);

      return {
        id: `${ml}${stock.f12}`,
        title: `${stock.f14} (${ml}${stock.f12})`,
        subtitle: `${price} ${arrow} ${sign}${change} (${sign}${changePct}%)`,
        url: `https://quote.eastmoney.com/${ml.toLowerCase()}${stock.f12}.html`,
      };
    });

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
