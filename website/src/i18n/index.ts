import en, { type TranslationKey } from "./translations/en";
import { defaultLocale, locales, type Locale } from "./locales";

const translationModules: Record<string, Record<string, string>> = {
  en,
};

const modules = import.meta.glob<{ default: Record<string, string> }>(
  "./translations/*.ts",
  { eager: true },
);

for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/\.\/translations\/(.+)\.ts$/);
  if (match && match[1] !== "en") {
    translationModules[match[1]] = mod.default;
  }
}

export function t(
  locale: string,
  key: TranslationKey,
  params?: Record<string, string>,
): string {
  const translations = translationModules[locale] ?? en;
  let value = (translations[key] as string) ?? (en[key] as string) ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replace(`{${k}}`, v);
    }
  }
  return value;
}

export function useTranslations(locale: string) {
  return (key: TranslationKey, params?: Record<string, string>) =>
    t(locale, key, params);
}

export function getLocaleFromUrl(url: URL): string {
  const [, segment] = url.pathname.split("/");
  if (segment && segment in locales) {
    return segment;
  }
  return defaultLocale;
}

export function getLocalePath(locale: string, path: string): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}

export { defaultLocale, locales, type Locale, type TranslationKey };
export { localeKeys, nonDefaultLocales } from "./locales";
