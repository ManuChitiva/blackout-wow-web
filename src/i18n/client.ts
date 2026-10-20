"use client";

import i18n, { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "@/i18n/resources";
import { defaultLng, type AppLanguage } from "@/i18n/settings";

let initialized = false;

/**
 * Inicializa i18n una vez y mantiene `lng` alineado con el servidor (cookie en layout).
 * Evita hydration mismatch entre HTML SSR y el primer render del cliente.
 */
export function ensureI18nInitialized(lng: AppLanguage = defaultLng) {
  // SSR requests must not share a mutable language across visitors.
  if (typeof window === "undefined") {
    const instance = createInstance();
    void instance.use(initReactI18next).init({
      resources,
      lng,
      fallbackLng: defaultLng,
      interpolation: { escapeValue: false },
    });
    return instance;
  }
  if (!initialized && !i18n.isInitialized) {
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

  // Existing client instances change language in the provider effect, never during render.
  return i18n;
}
