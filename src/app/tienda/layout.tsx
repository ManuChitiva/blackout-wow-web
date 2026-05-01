import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda de donacion",
  description:
    "Compra paquetes de puntos para BLACKOUT WOW con entrega automatica y pago seguro.",
  alternates: {
    canonical: "/tienda",
  },
  openGraph: {
    title: "Tienda de donacion BLACKOUT WOW",
    description:
      "Paquetes de puntos para usar en el reino con entrega rapida y segura.",
    url: "/tienda",
  },
};

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
