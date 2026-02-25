module.exports = async (api) => {
  const minMagnitude = api.config.get("MIN_MAGNITUDE") || "4.5";
  const timeRange = api.config.get("TIME_RANGE") || "day";

  async function fetchData() {
    const res = await api.fetch(
      `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${minMagnitude}_${timeRange}.geojson`,
    );
    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch earthquake data (HTTP ${res.status})`);
    }

    const items = res.json.features.map((feature) => ({
      id: feature.id,
      title: feature.properties.title,
      subtitle: feature.properties.place,
      url: feature.properties.url,
      timestamp: feature.properties.time,
    }));

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
