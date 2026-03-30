module.exports = async (api) => {
  async function fetchData() {
    const res = await api.fetch(
      "https://api.spaceflightnewsapi.net/v4/articles/?limit=100",
    );
    if (!res.ok || !res.json) {
      throw new Error(
        `Failed to fetch spaceflight news (HTTP ${res.status})`,
      );
    }

    const items = res.json.results.map((article) => ({
      id: String(article.id),
      title: article.title,
      subtitle: article.summary,
      url: article.url,
      timestamp: article.published_at,
    }));

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
