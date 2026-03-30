module.exports = async (api) => {
  const country = api.config.get("COUNTRY") || "US";

  async function fetchData() {
    const res = await api.fetch(
      `https://api.tvmaze.com/schedule?country=${country}`,
    );
    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch TV schedule (HTTP ${res.status})`);
    }

    const items = res.json.map((episode) => ({
      id: String(episode.id),
      title: episode.show.name,
      subtitle: episode.name,
      url: episode.show.url,
      timestamp: episode.airstamp,
    }));

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
