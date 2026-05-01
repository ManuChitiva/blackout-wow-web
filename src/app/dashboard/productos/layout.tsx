import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Panel interno para gestionar productos, canjes, trazabilidad y analitica.",
  alternates: {
    canonical: "/dashboard/productos",
  },
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
