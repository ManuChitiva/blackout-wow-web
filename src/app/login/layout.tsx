import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesion",
  description:
    "Accede a tu cuenta de BLACKOUT WOW para gestionar personaje, compras y puntos.",
  alternates: {
    canonical: "/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
