import type { GlancewayAPI, SourceMethods } from "./types";

interface OnThisDayEvent {
  text: string;
  year: number;
  pages?: {
    title: string;
    extract?: string;
    content_urls?: {
      desktop?: { page?: string };
    };
  }[];
}

interface OnThisDayResponse {
  selected: OnThisDayEvent[];
  events: OnThisDayEvent[];
}

type Config = {
  LANGUAGE: string;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const language = api.config.get("LANGUAGE") || "en";

  async function fetchData() {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const url = `https://api.wikimedia.org/feed/v1/wikipedia/${language}/onthisday/all/${mm}/${dd}`;

    const response = await api.fetch<OnThisDayResponse>(url);

    if (!response.ok || !response.json) {
      throw new Error(
        `Failed to fetch Wikipedia On This Day (HTTP ${response.status})`,
      );
    }

    const events = [
      ...(response.json.selected || []),
      ...(response.json.events || []),
    ];

    const seen = new Set<string>();
    const items = [];

    for (const item of events) {
      const page = item.pages?.[0];
      const id = `${item.year}-${page?.title || item.text.slice(0, 50)}`;

      if (seen.has(id)) continue;
      seen.add(id);

      items.push({
        id,
        title: `${item.year} \u2014 ${item.text}`,
        subtitle: page?.extract,
        url: page?.content_urls?.desktop?.page,
      });

      if (items.length >= 200) break;
    }

    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
