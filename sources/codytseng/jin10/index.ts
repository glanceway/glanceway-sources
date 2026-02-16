import type { GlancewayAPI, InfoItem, SourceMethods } from "./types";

interface Jin10FlashItem {
  id: string;
  time: string;
  type: number;
  data: {
    content?: string;
    title?: string;
    link?: string;
  };
}

interface Jin10Response {
  data: Jin10FlashItem[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async (api: GlancewayAPI): Promise<SourceMethods> => {
  async function fetchData() {
    const response = await api.fetch<Jin10Response>(
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

    const items: InfoItem[] = [];

    for (const item of response.json.data) {
      if (item.type === 1) {
        continue;
      }

      let title: string;
      let url: string | undefined;

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
