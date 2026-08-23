// app/sitemap.ts
// Gera https://rovieso.com.br/sitemap.xml automaticamente.
// Declara as três versões de idioma como alternates — é o que impede
// o Google de tratar PT-BR, PT-PT e ES como conteúdo duplicado.

import type { MetadataRoute } from "next";

const BASE = "https://rovieso.com.br";
const LOCALES = ["pt-BR", "pt-PT", "es"] as const;

// Adicionar aqui cada nova rota do site (sem o prefixo de idioma).
const ROTAS = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  const entradas: MetadataRoute.Sitemap = [];

  for (const rota of ROTAS) {
    for (const locale of LOCALES) {
      entradas.push({
        url: `${BASE}/${locale}${rota}`,
        lastModified: new Date(),
        changeFrequency: rota === "" ? "weekly" : "monthly",
        priority: rota === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE}/${l}${rota}`])
          ),
        },
      });
    }
  }

  return entradas;
}
