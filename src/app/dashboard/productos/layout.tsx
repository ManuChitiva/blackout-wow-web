import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos y pedidos",
  description:
    "Gestión de productos de la tienda, trazabilidad de pedidos, canjes y analítica interna para el equipo BLACKOUT WOW.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
