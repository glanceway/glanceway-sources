import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
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
