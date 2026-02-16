export const defaultLocale = "en";

export interface LocaleConfig {
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const locales: Record<string, LocaleConfig> = {
  en: { nativeName: "English", dir: "ltr" },
  zh: { nativeName: "简体中文", dir: "ltr" },
  "zh-tw": { nativeName: "繁體中文", dir: "ltr" },
  ja: { nativeName: "日本語", dir: "ltr" },
  ko: { nativeName: "한국어", dir: "ltr" },
  es: { nativeName: "Español", dir: "ltr" },
  fr: { nativeName: "Français", dir: "ltr" },
  de: { nativeName: "Deutsch", dir: "ltr" },
  pt: { nativeName: "Português", dir: "ltr" },
  ru: { nativeName: "Русский", dir: "ltr" },
  ar: { nativeName: "العربية", dir: "rtl" },
  hi: { nativeName: "हिन्दी", dir: "ltr" },
  tr: { nativeName: "Türkçe", dir: "ltr" },
};

export type Locale = keyof typeof locales;

export const localeKeys = Object.keys(locales) as Locale[];

export const nonDefaultLocales = localeKeys.filter((l) => l !== defaultLocale);
