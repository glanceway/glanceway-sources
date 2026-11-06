import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { getCanonicalPath } from "./src/lib/seo";

export default defineConfig({
  site: "https://glanceway.app",
  trailingSlash: "always",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return !/^\/404\/?$/.test(path) && getCanonicalPath(path) === path;
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
