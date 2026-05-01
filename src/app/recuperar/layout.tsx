import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar contrasena",
  description:
    "Solicita el codigo OTP para recuperar el acceso a tu cuenta de BLACKOUT WOW.",
  alternates: {
    canonical: "/recuperar",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecoverLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
