import ConnectContent from '@/components/ConnectContent';
import { localizedPageMetadata } from "@/lib/page-metadata";
export function generateMetadata() { return localizedPageMetadata({
  title: "Cómo conectarme al servidor",
  description:
    "Guía oficial BLACKOUT WOW 3.3.5a: crear cuenta, descargar cliente, configurar realmlist (logon.blackout-wow.com) e iniciar sesión en el reino WotLK custom.",
  pathname: "/como-conectarme",
  keywords: [
    "realmlist Blackout WoW",
    "conectar WoW 3.3.5a",
    "cliente WotLK private server",
  ],
}); }
export default function Page(){return <ConnectContent/>;}
