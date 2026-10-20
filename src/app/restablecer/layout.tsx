import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Nueva contraseña",
  description:
    "Define una nueva contraseña para tu cuenta BLACKOUT WOW usando el código OTP que recibiste por correo. Válido para el portal y el acceso al servidor.",
  pathname: "/restablecer",
  noIndex: true,
}); }

export default function ResetLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
