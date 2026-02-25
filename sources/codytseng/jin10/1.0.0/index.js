function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}

module.exports = async (api) => {
  async function fetchData() {
    const response = await api.fetch(
      "https://flash-api.jin10.com/get_flash_list?channel=-8200&vip=1",
      {
        headers: {
          "x-app-id": "bVBF4FyRTn5NJF5n",
          "x-version": "1.0.0",
        },
      },
    );

    if (!response.ok || !response.json) {
      throw new Error(`Failed to fetch Jin10 flash news (HTTP ${response.status})`);
    }

    const items = [];

    for (const item of response.json.data) {
      if (item.type === 1) {
        continue;
      }

      let title;
      let url;

      if (item.type === 2) {
        title = item.data.title ?? "";
        url = item.data.link;
      } else {
        const content = stripHtml(item.data.content ?? "");
        const match = content.match(/【(.+?)】/);
        title = match ? match[1] : content;
        url = "https://www.jin10.com/flash";
      }

      if (!title) {
        continue;
      }

      items.push({
        id: item.id,
        title,
        subtitle: stripHtml(item.data.content ?? ""),
        url,
        timestamp: item.time,
      });
    }

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
