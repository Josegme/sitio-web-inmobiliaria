import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";

/**
 * Reglas para crawlers. Bloquea explícitamente el portal de clientes
 * y expone el sitemap para descubrimiento automático.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/clientes/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
