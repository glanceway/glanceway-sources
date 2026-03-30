module.exports = async (api) => {
  const tags = api.config.get("TAG");

  async function fetchData() {
    const url =
      tags && tags.length > 0
        ? `https://lobste.rs/t/${tags.join(",")}.json`
        : "https://lobste.rs/hottest.json";

    const response = await api.fetch(url);

    if (!response.ok || !response.json) {
      throw new Error(
        `Failed to fetch Lobsters stories (HTTP ${response.status})`,
      );
    }

    api.emit(
      response.json.map((story) => ({
        id: story.short_id,
        title: story.title,
        subtitle:
          story.description_plain ||
          `${story.score} points · ${story.comment_count} comments · ${story.tags.join(", ")}`,
        url: story.url || story.comments_url,
        timestamp: story.created_at,
      })),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
