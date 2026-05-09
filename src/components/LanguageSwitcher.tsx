"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { supportedLngs, type AppLanguage, languageCookieName } from "@/i18n/settings";

/**
 * ISO 3166-1 alpha-2 for https://flagcdn.com (PNG renders on all systems; emoji flags break on Windows).
 */
const FLAG_REGION: Record<AppLanguage, string> = {
  es: "es",
  en: "us",
  pt: "br",
};

const FALLBACK: Record<AppLanguage, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

const LOCALE_LABEL_KEY: Record<AppLanguage, "lang.localeEs" | "lang.localeEn" | "lang.localePt"> =
  {
    es: "lang.localeEs",
    en: "lang.localeEn",
    pt: "lang.localePt",
  };

function FlagCircle({ language }: { language: AppLanguage }) {
  const [broken, setBroken] = useState(false);
  const region = FLAG_REGION[language];
  const src = `https://flagcdn.com/w80/${region}.png`;

  if (broken) {
    return (
      <span className="flex h-[1.65rem] w-[1.65rem] items-center justify-center rounded-full bg-zinc-800 text-[9px] font-bold uppercase tracking-wide text-amber-100/95 ring-1 ring-white/15">
        {FALLBACK[language]}
      </span>
    );
  }

  return (
    <span className="relative block h-[1.65rem] w-[1.65rem] overflow-hidden rounded-full ring-1 ring-black/35">
      <Image
        src={src}
        alt=""
        width={80}
        height={80}
        className="h-full w-full scale-[1.12] object-cover object-center"
        draggable={false}
        onError={() => setBroken(true)}
        unoptimized
      />
    </span>
  );
}

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
    <div
      role="group"
      aria-label={t("lang.label")}
      className="flex items-center gap-1 rounded-full border border-white/12 bg-zinc-950/70 px-1 py-1 shadow-inner shadow-black/40"
    >
      {supportedLngs.map((language) => {
        const active = current === language;
        return (
          <button
            key={language}
            type="button"
            onClick={() => onChangeLanguage(language)}
            title={`${t("lang.label")}: ${t(LOCALE_LABEL_KEY[language])}`}
            aria-label={t(LOCALE_LABEL_KEY[language])}
            aria-pressed={active}
            className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-all duration-200 ${
              active
                ? "bg-amber-500/30 shadow-[0_0_0_1px_rgba(251,191,36,0.55),0_4px_14px_rgba(251,146,60,0.25)] ring-2 ring-amber-400/45"
                : "opacity-80 hover:bg-white/10 hover:opacity-100"
            }`}
          >
            <FlagCircle language={language} />
          </button>
        );
      })}
    </div>
  );
}
