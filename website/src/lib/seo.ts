import { nonDefaultLocales } from "../i18n/locales";

/** Source bodies and the privacy policy are shared across locales. */
export function getCanonicalPath(path: string): string {
  const normalized = path.endsWith("/") ? path : `${path}/`;
  const [, locale, ...segments] = normalized.split("/");
  if (!nonDefaultLocales.includes(locale)) return normalized;
  const basePath = `/${segments.join("/")}`;
  return basePath.startsWith("/source/") || basePath === "/privacy/"
    ? basePath
    : normalized;
}
