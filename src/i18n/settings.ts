export const supportedLngs = ["es", "en", "pt"] as const;

export type AppLanguage = (typeof supportedLngs)[number];

export const defaultLng: AppLanguage = "es";
export const languageCookieName = "lang";

export function isSupportedLanguage(value: string | null | undefined): value is AppLanguage {
  return Boolean(value && supportedLngs.includes(value as AppLanguage));
}
