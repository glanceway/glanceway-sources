import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  KEYWORD: string;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const keyword = api.config.get("KEYWORD") || "typescript";

  async function fetchData() {
    type NpmSearchResult = {
      objects: Array<{
        package: {
          name: string;
          version: string;
          description?: string;
          date: string;
          links: {
            npm: string;
          };
          publisher?: {
            username: string;
          };
        };
      }>;
    };

    const res = await api.fetch<NpmSearchResult>(
      `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(keyword)}&popularity=1.0&quality=0.5&maintenance=0.0&size=250`,
    );

    if (!res.ok || !res.json) {
      throw new Error(`Failed to fetch npm search results (HTTP ${res.status})`);
    }

    api.emit(
      res.json.objects.map((obj) => {
        const pkg = obj.package;
        const author = pkg.publisher?.username
          ? ` · by ${pkg.publisher.username}`
          : "";

        return {
          id: pkg.name,
          title: `${pkg.name}@${pkg.version}`,
          subtitle: `${pkg.description || ""}${author}`,
          url: pkg.links.npm,
          timestamp: pkg.date,
        };
      }),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
