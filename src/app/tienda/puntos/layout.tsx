import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda de canje",
  description:
    "Canjea tus puntos por recompensas para personajes en BLACKOUT WOW.",
  alternates: {
    canonical: "/tienda/puntos",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RewardShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
