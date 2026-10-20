import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Canjear puntos en el juego",
  description:
    "Canjea tus puntos BLACKOUT WOW por recompensas para tus personajes. Requiere sesión iniciada y saldo disponible en el reino.",
  pathname: "/tienda/puntos",
  noIndex: true,
}); }

export default function RewardShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
