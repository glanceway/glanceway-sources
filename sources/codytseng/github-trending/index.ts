import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  LANGUAGE: string | undefined;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const language = api.config.get("LANGUAGE");

  async function fetchData() {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const sinceStr = since.toISOString().split("T")[0];

    let query = `created:>${sinceStr} stars:>5`;
    if (language) {
      query += ` language:${language}`;
    }

    const response = await api.fetch<{
      items: Array<{
        id: number;
        full_name: string;
        description: string | null;
        html_url: string;
        stargazers_count: number;
        language: string | null;
      }>;
    }>(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=100`,
    );

    if (!response.ok || !response.json) {
      throw new Error(`Failed to fetch GitHub trending repositories (HTTP ${response.status})`);
    }

    api.emit(
      response.json.items.map((repo) => {
        return {
          id: repo.id.toString(),
          title: repo.full_name,
          subtitle: repo.description || `${repo.language ?? "Unknown"} · ${repo.stargazers_count} stars`,
          url: repo.html_url,
        };
      }),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
