const DEFAULT_API_URL = "https://api.blackout-wow.com";
const DEFAULT_RECAPTCHA_SITE_KEY = "6Le0U00tAAAAALrpUbDcjijuYa6AApKemDXnbYTh";
function clean(value: string | undefined): string {
  return value?.trim() ?? "";
}

export const publicEnv = {
  apiUrl: clean(process.env.NEXT_PUBLIC_API_URL) || DEFAULT_API_URL,
  recaptchaSiteKey:
    clean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) ||
    DEFAULT_RECAPTCHA_SITE_KEY,
} as const;
