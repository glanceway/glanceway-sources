module.exports = async (api) => {
  const tags = api.config.get("TAG") ?? [];

  async function fetchData() {
    const toItems = (articles) =>
      articles.map((article) => ({
        id: article.id,
        title: article.title,
        subtitle:
          article.body?.slice(0, 120)?.replace(/\n/g, " ") ||
          `${article.likes_count} いいね · @${article.user.id}`,
        url: article.url,
        timestamp: article.created_at,
      }));

    if (tags.length > 0) {
      const perPage = Math.min(100, Math.floor(500 / tags.length));
      await Promise.allSettled(
        tags.map(async (tag) => {
          const res = await api.fetch(
            `https://qiita.com/api/v2/tags/${encodeURIComponent(tag)}/items?per_page=${perPage}&page=1`,
          );
          if (res.ok && res.json) {
            api.emit(toItems(res.json));
          }
        }),
      );
    } else {
      const res = await api.fetch(
        "https://qiita.com/api/v2/items?per_page=100&page=1",
      );
      if (!res.ok || !res.json) {
        throw new Error(`Failed to fetch Qiita articles (HTTP ${res.status})`);
      }
      api.emit(toItems(res.json));
    }
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
