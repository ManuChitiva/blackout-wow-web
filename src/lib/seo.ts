export const SITE_NAME = "BLACKOUT WOW";
export const SITE_TITLE = "BLACKOUT WOW - Wrath of the Lich King";
export const SITE_DESCRIPTION =
  "Servidor privado WotLK con contenido custom, tienda, panel de cuenta y progresion activa.";
export const SITE_LOCALE = "es_CL";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export function withBaseUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
