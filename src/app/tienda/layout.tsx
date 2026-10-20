import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Tienda de donación y puntos",
  description:
    "Compra paquetes de puntos para BLACKOUT WOW con pago seguro y entrega automática en el juego. Apoya el servidor y canjea recompensas.",
  pathname: "/tienda",
  noIndex: true,
  keywords: [
    "tienda WoW privado",
    "puntos Blackout WoW",
    "donación servidor WoW",
  ],
}); }

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
