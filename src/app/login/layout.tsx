import { localizedPageMetadata } from "@/lib/page-metadata";

export function generateMetadata() { return localizedPageMetadata({
  title: "Iniciar sesión",
  description:
    "Accede al portal de BLACKOUT WOW para gestionar tu cuenta, puntos, pedidos y enlace con tu personaje en el servidor WotLK 3.3.5a.",
  pathname: "/login",
  noIndex: true,
}); }

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
