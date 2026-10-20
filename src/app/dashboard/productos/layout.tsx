import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Productos y pedidos",
  description:
    "Gestión de productos de la tienda, trazabilidad de pedidos, canjes y analítica interna para el equipo BLACKOUT WOW.",
  absoluteTitle: true,
  pathname: "/dashboard/productos",
  noIndex: true,
}); }

export default function DashboardProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
