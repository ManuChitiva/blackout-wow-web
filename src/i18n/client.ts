"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/i18n/resources";
import { defaultLng } from "@/i18n/settings";

let initialized = false;

export function ensureI18nInitialized() {
  if (initialized) return i18n;

  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLng,
    fallbackLng: defaultLng,
    interpolation: {
      escapeValue: false,
    },
  });

  initialized = true;
  return i18n;
}
