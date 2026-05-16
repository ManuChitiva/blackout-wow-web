import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Crear cuenta",
  description:
    "Regístrate en BLACKOUT WOW: un mismo usuario para el portal y el juego. Servidor WotLK custom 3.3.5a, progresión activa y comunidad en español.",
  pathname: "/registro",
  keywords: [
    "registro WoW privado",
    "crear cuenta Blackout WoW",
    "servidor WoW registro",
  ],
});

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
