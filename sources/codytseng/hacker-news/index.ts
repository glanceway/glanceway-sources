import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  STORY_TYPE: string;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const storyType = api.config.get("STORY_TYPE") || "top";

  async function fetchData() {
    const endpoint = `https://hacker-news.firebaseio.com/v0/${storyType}stories.json`;
    const idsResponse = await api.fetch<number[]>(endpoint);

    if (!idsResponse.ok || !idsResponse.json) {
      throw new Error(`Failed to fetch Hacker News story list (HTTP ${idsResponse.status})`);
    }

    const topIds = idsResponse.json.slice(0, 100);

    type Story = {
      id: number;
      title: string;
      url?: string;
      time: number;
      score: number;
      descendants?: number;
      by: string;
    };

    const items: Story[] = [];

    await Promise.allSettled(
      topIds.map(async (id) => {
        const res = await api.fetch<Story>(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        );
        if (res.json) {
          items.push(res.json);
          api.emit(
            items.map((item) => ({
              id: item.id.toString(),
              title: item.title,
              subtitle: `${item.score} points · ${item.descendants ?? 0} comments · by ${item.by}`,
              url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
              timestamp: item.time,
            })),
          );
        }
      }),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
