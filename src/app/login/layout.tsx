import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Iniciar sesión",
  description:
    "Accede al portal de BLACKOUT WOW para gestionar tu cuenta, puntos, pedidos y enlace con tu personaje en el servidor WotLK 3.3.5a.",
  pathname: "/login",
  noIndex: true,
});

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
