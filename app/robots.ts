// app/robots.ts
// Gera https://rovieso.com.br/robots.txt

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nada de indexar rotas internas ou da API
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://rovieso.com.br/sitemap.xml",
    host: "https://rovieso.com.br",
  };
}
