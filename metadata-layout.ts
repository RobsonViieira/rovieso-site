// Colar em app/[locale]/layout.tsx — substitui o export de metadata atual.
// Se hoje tens `export const metadata = {...}`, apaga essa linha:
// metadata estático não sabe qual é o idioma da página.

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const BASE = "https://rovieso.com.br";
const LOCALES = ["pt-BR", "pt-PT", "es"] as const;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Lê title/description de messages/<locale>.json, secção "meta".
  // Se ainda não existir essa secção, ver o bloco no fim deste ficheiro.
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(BASE),
    title: {
      default: t("title"),
      template: `%s | Rovieso`,
    },
    description: t("description"),

    alternates: {
      // Cada idioma aponta para si próprio como versão oficial
      canonical: `${BASE}/${locale}`,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${BASE}/${l}`])),
        // Fallback para quem não bate com nenhum idioma declarado
        "x-default": `${BASE}/pt-PT`,
      },
    },

    openGraph: {
      type: "website",
      url: `${BASE}/${locale}`,
      siteName: "Rovieso",
      title: t("title"),
      description: t("description"),
      locale: locale.replace("-", "_"),
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.png"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },

    // Verificação do Search Console — colar aqui o código que o Google der
    // verification: { google: "COLE_AQUI_O_CODIGO" },
  };
}

/* ------------------------------------------------------------------
   Acrescentar em cada messages/*.json:

   pt-PT.json
   "meta": {
     "title": "Rovieso — Software e IA para negócios que ainda funcionam à mão",
     "description": "Estúdio de software e IA. Páginas de encomenda, automação de processos e sistemas à medida para PME em Portugal, Espanha e Brasil."
   }

   pt-BR.json
   "meta": {
     "title": "Rovieso — Software e IA para negócios que ainda funcionam no braço",
     "description": "Estúdio de software e IA. Sistemas sob medida, automação de processos e integração com WhatsApp para pequenas empresas."
   }

   es.json
   "meta": {
     "title": "Rovieso — Software e IA para negocios que aún funcionan a mano",
     "description": "Estudio de software e IA. Páginas de pedidos, automatización de procesos y sistemas a medida para pymes en España, Portugal y Brasil."
   }
------------------------------------------------------------------- */
