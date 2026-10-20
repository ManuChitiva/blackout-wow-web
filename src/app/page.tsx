import WarcraftHome from "@/components/WarcraftHome";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import { localizedPageMetadata } from "@/lib/page-metadata";
export function generateMetadata() { return localizedPageMetadata({
  title: SITE_TITLE,
  absoluteTitle: true,
  description: SITE_DESCRIPTION,
  pathname: "/",
}); }
export default function HomePage() { return <WarcraftHome/>; }
