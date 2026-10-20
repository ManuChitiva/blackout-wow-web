import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Mi cuenta",
  description:
    "Panel de cuenta BLACKOUT WOW: personajes, estado en juego, historial de compras, canjes y seguridad. Solo accesible con tu sesión iniciada.",
  pathname: "/cuenta",
  noIndex: true,
}); }

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
