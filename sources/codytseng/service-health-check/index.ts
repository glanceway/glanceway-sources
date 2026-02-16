import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  URLS: string[] | undefined;
};

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const urls = api.config.get("URLS");

  async function fetchData() {
    if (!urls || urls.length === 0) return;

    const previousDownUrls = new Set<string>(
      JSON.parse(api.storage.get("downUrls") ?? `[]`),
    );
    const currentDownUrls = new Set<string>();

    await Promise.allSettled(
      urls.map(async (url) => {
        const res = await api.fetch(url);
        if (!res.ok) {
          currentDownUrls.add(url);
          if (!previousDownUrls.has(url)) {
            api.emit([
              {
                id: `${url}-${Date.now()}`,
                title: `Failed to fetch ${url}`,
                subtitle: `HTTP ${res.status}, error: ${res.error || "unknown"}`,
                url,
                timestamp: Date.now(),
              },
            ]);
          }
        }
      }),
    );

    // Store the current down URLs for the next refresh
    api.storage.set("downUrls", JSON.stringify(Array.from(currentDownUrls)));
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
