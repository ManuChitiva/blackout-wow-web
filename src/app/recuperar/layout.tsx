import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Recuperar contraseña",
  description:
    "Recupera el acceso a tu cuenta BLACKOUT WOW: solicita un código OTP por correo y restablece tu contraseña del portal y del juego.",
  pathname: "/recuperar",
  noIndex: true,
});

export default function RecoverLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
