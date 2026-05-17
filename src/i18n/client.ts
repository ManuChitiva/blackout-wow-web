"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/i18n/resources";
import { defaultLng, type AppLanguage } from "@/i18n/settings";

let initialized = false;

/**
 * Inicializa i18n una vez y mantiene `lng` alineado con el servidor (cookie en layout).
 * Evita hydration mismatch entre HTML SSR y el primer render del cliente.
 */
export function ensureI18nInitialized(lng: AppLanguage = defaultLng) {
  if (!initialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: defaultLng,
      interpolation: {
        escapeValue: false,
      },
    });
    initialized = true;
    return i18n;
  }

  if (i18n.language !== lng) {
    i18n.changeLanguage(lng);
  }

  return i18n;
}
