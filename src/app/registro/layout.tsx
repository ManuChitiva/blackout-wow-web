import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Crear cuenta",
  description:
    "Regístrate en BLACKOUT WOW: un mismo usuario para el portal y el juego. Servidor WotLK custom 3.3.5a nivel 255, progresión Tier 1–35 y comunidad internacional activa.",
  pathname: "/registro",
  keywords: [
    "registro WoW privado",
    "crear cuenta Blackout WoW",
    "servidor WoW registro",
  ],
}); }

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
