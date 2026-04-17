function toSecId(code) {
  const c = code.trim();
  // Shanghai: starts with 6
  if (c.startsWith("6")) return `1.${c}`;
  // Shenzhen: starts with 0 or 3
  return `0.${c}`;
}

function marketLabel(market) {
  return market === 1 ? "SH" : "SZ";
}

module.exports = async (api) => {
  const codes = api.config.get("STOCK_CODES") ?? [];

  async function fetchData() {
    if (codes.length === 0) {
      api.emit([]);
      return;
    }

    const secIds = codes.map(toSecId).join(",");
    const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?secids=${secIds}&fields=f1,f2,f3,f4,f12,f13,f14`;

    const response = await api.fetch(url);

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
