const DEFAULT_API_URL = "http://localhost:8080";
const DEFAULT_RECAPTCHA_SITE_KEY = "6Lcd3iArAAAAAAUJI-22bSPgBrh6lmT2BEXu66Hb";
function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export const publicEnv = {
  apiUrl: clean(process.env.NEXT_PUBLIC_API_URL) || DEFAULT_API_URL,
  recaptchaSiteKey:
    clean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) ||
    DEFAULT_RECAPTCHA_SITE_KEY,
} as const;
