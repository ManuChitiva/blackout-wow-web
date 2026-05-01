import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmacion de pago",
  description:
    "Pantalla de retorno para confirmar pagos de PayPal en la tienda de BLACKOUT WOW.",
  alternates: {
    canonical: "/tienda/return",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ShopReturnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
