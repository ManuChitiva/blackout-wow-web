"use client";

import { useTranslation } from "react-i18next";
import { supportedLngs, type AppLanguage, languageCookieName } from "@/i18n/settings";

const labels: Record<AppLanguage, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = supportedLngs.includes(i18n.language as AppLanguage)
    ? (i18n.language as AppLanguage)
    : "es";

  function onChangeLanguage(nextLanguage: AppLanguage) {
    document.cookie = `${languageCookieName}=${nextLanguage}; path=/; max-age=31536000; samesite=lax`;
    void i18n.changeLanguage(nextLanguage);
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-white/10 bg-zinc-950/50 px-1 py-1">
      <span className="px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
        {t("lang.label")}
      </span>
      {supportedLngs.map((language) => (
        <button
          key={language}
          type="button"
          onClick={() => onChangeLanguage(language)}
          className={`rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${
            current === language
              ? "bg-amber-500/25 text-amber-200"
              : "text-zinc-300 hover:bg-white/10"
          }`}
          aria-pressed={current === language}
        >
          {labels[language]}
        </button>
      ))}
    </div>
  );
}
