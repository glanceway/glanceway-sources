import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  NODE_NAME: string[] | undefined;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const nodes = api.config.get("NODE_NAME") ?? [];

  async function fetchData() {
    type Topic = {
      id: number;
      title: string;
      content: string;
      url: string;
      replies: number;
      node: { title: string };
      member: { username: string };
      created: number;
    };

    const toItems = (topics: Topic[]) =>
      topics.map((topic) => ({
        id: topic.id.toString(),
        title: topic.title,
        subtitle: `${topic.node.title} · ${topic.replies} 回复 · ${topic.member.username}`,
        url: topic.url,
        timestamp: topic.created,
      }));

    if (nodes.length > 0) {
      await Promise.allSettled(
        nodes.map(async (node) => {
          const res = await api.fetch<Topic[]>(
            `https://www.v2ex.com/api/topics/show.json?node_name=${encodeURIComponent(node)}`,
          );
          if (res.ok && res.json) {
            api.emit(toItems(res.json));
          }
        }),
      );
    } else {
      const res = await api.fetch<Topic[]>(
        "https://www.v2ex.com/api/topics/hot.json",
      );
      if (!res.ok || !res.json) {
        throw new Error(`Failed to fetch V2EX hot topics (HTTP ${res.status})`);
      }
      api.emit(toItems(res.json));
    }
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
