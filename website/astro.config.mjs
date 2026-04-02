import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sources.glanceway.app",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  i18n: {
    defaultLocale: "en",
    locales: [
      "en",
      "zh",
      "zh-tw",
      "ja",
      "ko",
      "es",
      "fr",
      "de",
      "pt",
      "ru",
      "ar",
      "hi",
      "tr",
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
