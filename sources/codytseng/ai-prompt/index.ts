import type { GlancewayAPI, SourceMethods } from "./types";

type Config = {
  API_URL: string;
  API_KEY: string;
  MODEL: string;
  PROMPT: string;
};

type ChatCompletionResponse = {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
};

type RawItem = {
  id?: string;
  title?: string;
  subtitle?: string;
  url?: string;
};

function uuid(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

const SYSTEM_PROMPT = `You are a data source that returns structured information items. You MUST respond with ONLY a JSON array (no markdown, no code fences, no explanation). Each element in the array is an object with these fields:
- "id": (string, optional) a fixed identifier for the item. Only provide this if the item represents something that should be updated/overwritten on the next refresh. Omit it if each refresh should create new items.
- "title": (string, required) a short headline, MAX 50 characters. Keep it concise — this is only for a brief label or heading.
- "subtitle": (string, optional) the main content and details go here. This field has no length limit and should contain the bulk of the information.
- "url": (string, optional) a relevant link

Example response:
[{"title":"Fun Fact","subtitle":"Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible."}]`;

export default async (api: GlancewayAPI<Config>): Promise<SourceMethods> => {
  const apiUrl = api.config.get("API_URL");
  const apiKey = api.config.get("API_KEY");
  const model = api.config.get("MODEL");
  const prompt = api.config.get("PROMPT");

  async function fetchData() {
    const response = await api.fetch<ChatCompletionResponse>(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok || !response.json) {
      throw new Error(
        `Failed to fetch AI response (HTTP ${response.status}) ${response.error}`,
      );
    }

    const content = response.json.choices[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("No content in AI response");
    }

    let rawItems: RawItem[];
    try {
      rawItems = JSON.parse(content);
    } catch {
      // If the AI didn't return valid JSON, emit the raw text as a single item
      api.emit([
        {
          id: uuid(),
          title: content,
          subtitle: model,
          timestamp: new Date(),
        },
      ]);
      return;
    }

    if (!Array.isArray(rawItems) || rawItems.length === 0) {
      throw new Error("AI response is not a non-empty JSON array");
    }

    api.emit(
      rawItems
        .filter((item) => item.title)
        .map((item) => ({
          id: item.id || uuid(),
          title: item.title ?? item.subtitle ?? "Untitled",
          subtitle: item.title ? item.subtitle : "",
          url: item.url,
        })),
    );
  }

  await fetchData();

  return {
    refresh: fetchData,
  };
};
