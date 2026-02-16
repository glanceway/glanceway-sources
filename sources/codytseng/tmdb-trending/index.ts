import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  TMDB_API_KEY: string;
  MEDIA_TYPE: string;
  TIME_WINDOW: string;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const apiKey = api.config.get("TMDB_API_KEY");
  const mediaType = api.config.get("MEDIA_TYPE") || "all";
  const timeWindow = api.config.get("TIME_WINDOW") || "week";

  async function fetchData() {
    const url = `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?api_key=${apiKey}`;

    const response = await api.fetch<{
      results: {
        id: number;
        title?: string;
        name?: string;
        overview: string;
        media_type: string;
        release_date?: string;
        first_air_date?: string;
      }[];
    }>(url);

    if (!response.ok || !response.json) {
      throw new Error(`Failed to fetch TMDB trending (HTTP ${response.status})`);
    }

    const items = response.json.results.map((item) => ({
      id: String(item.id),
      title: item.title ?? item.name ?? "Unknown",
      subtitle: item.overview,
      url: `https://www.themoviedb.org/${item.media_type}/${item.id}`,
      timestamp: item.release_date ?? item.first_air_date,
    }));
    api.emit(items);
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
