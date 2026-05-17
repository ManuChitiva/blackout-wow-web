export const supportedLngs = ["es", "en", "pt"] as const;

export type AppLanguage = (typeof supportedLngs)[number];

export const defaultLng: AppLanguage = "es";
export const languageCookieName = "lang";

export function isSupportedLanguage(value: string | null | undefined): value is AppLanguage {
  return Boolean(value && supportedLngs.includes(value as AppLanguage));
}

/** Idioma desde cookie `lang` o valor por defecto (servidor y cliente). */
export function resolveAppLanguage(value: string | null | undefined): AppLanguage {
  return isSupportedLanguage(value) ? value : defaultLng;
}
