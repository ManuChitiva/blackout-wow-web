import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Confirmación de pago",
  description:
    "Página de retorno tras el pago en la tienda BLACKOUT WOW. Confirma el estado de tu compra de puntos (PayPal u otros métodos habilitados).",
  pathname: "/tienda/return",
  noIndex: true,
}); }

export default function ShopReturnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
