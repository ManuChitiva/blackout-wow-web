import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer contrasena",
  description:
    "Cambia tu clave con codigo OTP para recuperar el acceso al portal y juego en BLACKOUT WOW.",
  alternates: {
    canonical: "/restablecer",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
