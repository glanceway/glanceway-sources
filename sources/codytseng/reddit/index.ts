import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  SUBREDDIT: string[] | undefined;
  SORT: string;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const subreddits = api.config.get("SUBREDDIT") ?? ["programming"];
  const subreddit = subreddits.join("+");
  const sort = api.config.get("SORT") || "hot";

  async function fetchData() {
    const response = await api.fetch<{
      data: {
        children: Array<{
          data: {
            id: string;
            title: string;
            url: string;
            permalink: string;
            selftext: string;
            score: number;
            num_comments: number;
            subreddit_name_prefixed: string;
            author: string;
            created_utc: number;
          };
        }>;
      };
    }>(`https://www.reddit.com/r/${subreddit}/${sort}.json?limit=100&raw_json=1`, {
      headers: { "User-Agent": "Glanceway/1.0" },
    });

    if (!response.ok || !response.json) {
      throw new Error(`Failed to fetch Reddit posts from r/${subreddit} (HTTP ${response.status})`);
    }

    api.emit(
      response.json.data.children.map((child) => {
        const post = child.data;
        return {
          id: post.id,
          title: post.title,
          subtitle: post.selftext || `↑ ${post.score} · ${post.num_comments} comments · u/${post.author}`,
          url: post.url.startsWith("/")
            ? `https://www.reddit.com${post.url}`
            : post.url,
          timestamp: post.created_utc,
        };
      }),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
