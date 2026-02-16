import type { GlancewayAPI, SourceMethods } from "./types";

export default async (api: GlancewayAPI): Promise<SourceMethods> => {
  async function fetchData() {
    type Comic = {
      num: number;
      title: string;
      alt: string;
      img: string;
      year: string;
      month: string;
      day: string;
    };

    const latestRes = await api.fetch<Comic>(
      "https://xkcd.com/info.0.json",
    );

    if (!latestRes.ok || !latestRes.json) {
      throw new Error(`Failed to fetch latest xkcd comic (HTTP ${latestRes.status})`);
    }

    const latest = latestRes.json;
    const count = 50;
    const comics: Comic[] = [latest];

    await Promise.allSettled(
      Array.from({ length: count - 1 }, (_, i) => latest.num - i - 1)
        .filter((num) => num > 0 && num !== 404)
        .map(async (num) => {
          const res = await api.fetch<Comic>(
            `https://xkcd.com/${num}/info.0.json`,
          );
          if (res.ok && res.json) {
            comics.push(res.json);
            api.emit(
              comics.map((c) => ({
                id: c.num.toString(),
                title: `#${c.num}: ${c.title}`,
                subtitle: c.alt,
                url: `https://xkcd.com/${c.num}/`,
                timestamp: `${c.year}-${c.month.padStart(2, "0")}-${c.day.padStart(2, "0")}`,
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
