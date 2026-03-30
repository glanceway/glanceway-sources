module.exports = async (api) => {
  const tags = api.config.get("TAG") ?? [];

  async function fetchData() {
    const toItems = (articles) =>
      articles.map((article) => ({
        id: article.id.toString(),
        title: article.title,
        subtitle: article.description || `${article.positive_reactions_count} reactions · ${article.comments_count} comments`,
        url: article.url,
        timestamp: article.published_at,
      }));

    if (tags.length > 0) {
      const perPage = Math.min(500, Math.floor(500 / tags.length));
      await Promise.allSettled(
        tags.map(async (tag) => {
          const res = await api.fetch(
            `https://dev.to/api/articles?per_page=${perPage}&top=7&tag=${encodeURIComponent(tag)}`,
          );
          if (res.ok && res.json) {
            api.emit(toItems(res.json));
          }
        }),
      );
    } else {
      const res = await api.fetch(
        "https://dev.to/api/articles?per_page=500&top=7",
      );
      if (!res.ok || !res.json) {
        throw new Error(`Failed to fetch DEV articles (HTTP ${res.status})`);
      }
      api.emit(toItems(res.json));
    }
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
