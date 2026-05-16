import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Administración",
    template: `%s · Panel · ${SITE_NAME}`,
  },
  description:
    "Panel interno para administración del proyecto BLACKOUT WOW. Acceso restringido al equipo autorizado.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
    },
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
