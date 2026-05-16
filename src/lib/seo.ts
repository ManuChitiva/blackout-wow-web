import type { Metadata } from "next";

export const SITE_NAME = "BLACKOUT WOW";
export const SITE_TITLE = "BLACKOUT WOW - Wrath of the Lich King";
export const SITE_DESCRIPTION =
  "Servidor privado WoW WotLK 3.3.5a con contenido custom, progresión 1-100, raids, PvP, tienda de puntos y panel de cuenta.";
export const SITE_LOCALE = "es_CL";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

/** Keywords base reutilizables en páginas indexables. */
export const SITE_KEYWORDS = [
  "Blackout WoW",
  "servidor WoW privado",
  "WotLK",
  "Wrath of the Lich King",
  "WoW 3.3.5a",
  "servidor custom",
  "WoW Latinoamérica",
  "private WoW server",
] as const;

const OG_IMAGE_PATH = "/logo-transparent.png";

export function withBaseUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

type BuildPageMetadataOptions = {
  /** Segmento de título; el layout raíz añade ` | BLACKOUT WOW` salvo rutas con otro template. */
  title: string;
  description: string;
  /** Ruta canónica, ej. `/login` */
  pathname: string;
  keywords?: string[];
  /** Login, cuenta, dashboard, etc. */
  noIndex?: boolean;
};

/**
 * Metadata coherente: canonical, Open Graph, Twitter y robots.
 * Usar en layouts y páginas con `metadata` estático.
 */
export function buildPageMetadata({
  title,
  description,
  pathname,
  keywords,
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const ogTitle = `${title} | ${SITE_NAME}`;
  const mergedKeywords = keywords?.length
    ? [...new Set([...SITE_KEYWORDS, ...keywords])]
    : [...SITE_KEYWORDS];

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      siteName: SITE_NAME,
      title: ogTitle,
      description,
      url: path,
      images: [
        {
          url: withBaseUrl(OG_IMAGE_PATH),
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [withBaseUrl(OG_IMAGE_PATH)],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "none",
            "max-snippet": -1,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
  };
}
