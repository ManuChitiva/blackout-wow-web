import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mi cuenta",
  description:
    "Panel privado para revisar tus personajes, historial de compras y seguridad de cuenta.",
  alternates: {
    canonical: "/cuenta",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
