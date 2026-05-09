"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { ensureI18nInitialized } from "@/i18n/client";
import { defaultLng, isSupportedLanguage, languageCookieName } from "@/i18n/settings";

const i18n = ensureI18nInitialized();

function getLanguageFromCookie() {
  if (typeof document === "undefined") return defaultLng;
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${languageCookieName}=`))
    ?.split("=")[1];
  return isSupportedLanguage(match) ? match : defaultLng;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cookieLanguage = getLanguageFromCookie();
    if (i18n.language !== cookieLanguage) {
      void i18n.changeLanguage(cookieLanguage);
    }
    document.documentElement.lang = cookieLanguage;
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
