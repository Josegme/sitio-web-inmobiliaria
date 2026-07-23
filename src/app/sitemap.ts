import type { MetadataRoute } from "next";

import { ROUTES, SITE_URL } from "@/lib/constants";

/**
 * Sitemap del sitio público. NO incluye rutas del portal de clientes
 * porque están marcadas `robots: noindex` en su layout.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const publicRoutes: Array<{
    path: (typeof ROUTES)[keyof typeof ROUTES];
    priority: number;
    changeFrequency: "weekly" | "monthly";
  }> = [
    { path: ROUTES.home, priority: 1.0, changeFrequency: "weekly" },
    { path: ROUTES.about, priority: 0.7, changeFrequency: "monthly" },
    { path: ROUTES.gallery, priority: 0.9, changeFrequency: "weekly" },
    { path: ROUTES.subscribers, priority: 0.6, changeFrequency: "monthly" },
    { path: ROUTES.contact, priority: 0.7, changeFrequency: "monthly" },
    { path: ROUTES.quotation, priority: 0.7, changeFrequency: "monthly" },
  ];

  return publicRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
