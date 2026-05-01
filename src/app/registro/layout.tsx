import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro",
  description:
    "Crea tu cuenta en BLACKOUT WOW y comienza tu aventura en el reino WotLK custom.",
  alternates: {
    canonical: "/registro",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
