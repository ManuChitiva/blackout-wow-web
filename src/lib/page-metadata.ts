import { cookies } from "next/headers";
import { languageCookieName, resolveAppLanguage } from "@/i18n/settings";
import { buildPageMetadata } from "@/lib/seo";
import { metadataTranslations } from "@/lib/metadata-copy";

export async function localizedPageMetadata(options: Parameters<typeof buildPageMetadata>[0]) {
  const language = resolveAppLanguage((await cookies()).get(languageCookieName)?.value);
  const copy = metadataTranslations[options.pathname as keyof typeof metadataTranslations];
  const translated = language === "es" ? undefined : copy?.[language];
  return buildPageMetadata({
    ...options,
    ...translated,
    locale: { es: "es_ES", en: "en_US", pt: "pt_BR" }[language],
  });
}
