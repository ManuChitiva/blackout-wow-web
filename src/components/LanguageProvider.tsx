"use client";

import { useEffect, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { ensureI18nInitialized } from "@/i18n/client";
import type { AppLanguage } from "@/i18n/settings";

type LanguageProviderProps = {
  children: React.ReactNode;
  /** Idioma leído en el servidor desde la cookie `lang`. */
  initialLanguage: AppLanguage;
};

export function LanguageProvider({
  children,
  initialLanguage,
}: LanguageProviderProps) {
  const i18n = useMemo(
    () => ensureI18nInitialized(initialLanguage),
    [initialLanguage],
  );

  useEffect(() => {
    document.documentElement.lang = initialLanguage;
  }, [initialLanguage]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
