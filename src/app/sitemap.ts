import type { MetadataRoute } from "next";
import { withBaseUrl } from "@/lib/seo";

const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: withBaseUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: withBaseUrl("/registro"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: withBaseUrl("/como-conectarme"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: withBaseUrl("/tienda"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: withBaseUrl("/terminos-y-condiciones"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    },
  ];
}
