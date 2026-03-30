module.exports = async (api) => {
  const channel = api.config.get("CHANNEL") || "global-channel";

  async function fetchData() {
    const res = await api.fetch(
      `https://api-one.wallstcn.com/apiv1/content/lives?channel=${channel}&limit=200`,
    );
    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch wallstreetcn news (HTTP ${res.status})`);
    }

    const items = res.json.data.items.map((item) => ({
      id: String(item.id),
      title: item.title,
      subtitle: item.content_text,
      url: item.uri,
      timestamp: item.display_time,
    }));

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
