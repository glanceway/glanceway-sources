module.exports = async (api) => {
  const token = api.config.get("FINNHUB_TOKEN");
  const category = api.config.get("CATEGORY") || "general";

  async function fetchData() {
    const res = await api.fetch(
      `https://finnhub.io/api/v1/news?category=${category}&token=${token}`,
    );
    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch Finnhub news (HTTP ${res.status})`);
    }

    const items = res.json.map((article) => ({
      id: String(article.id),
      title: article.headline,
      subtitle: article.summary,
      url: article.url,
      timestamp: article.datetime,
    }));

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
