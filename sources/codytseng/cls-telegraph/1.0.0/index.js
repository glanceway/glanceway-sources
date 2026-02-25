module.exports = async (api) => {
  async function fetchData() {
    const res = await api.fetch(
      "https://www.cls.cn/nodeapi/telegraphList?app=CailianpressWeb&os=web&refresh_type=1&rn=200&sv=8.4.6",
      {
        headers: { Referer: "https://www.cls.cn/" },
      },
    );
    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch CLS telegraph (HTTP ${res.status})`);
    }

    const items = res.json.data.roll_data
      .filter((item) => item.title)
      .map((item) => ({
        id: String(item.id),
        title: item.title,
        subtitle: item.brief,
        url: item.shareurl,
        timestamp: item.ctime,
      }));

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
