// components/JsonLd.tsx
// Diz ao Google que a Rovieso é uma entidade — empresa com CNPJ, serviços
// e áreas de atuação — e não apenas uma página solta.
// Usar dentro do <body> em app/[locale]/layout.tsx:
//   import JsonLd from "@/components/JsonLd";
//   ...
//   <body><JsonLd /> {children}</body>

export default function JsonLd() {
  const dados = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://rovieso.com.br/#organizacao",
    name: "Rovieso",
    alternateName: "Rovieso — Estúdio de Software e IA",
    url: "https://rovieso.com.br",
    description:
      "Estúdio de software e IA. Páginas de encomenda, automação de processos e sistemas à medida para pequenas e médias empresas.",
    founder: { "@type": "Person", name: "Robson Vieira" },
    // CNPJ da MEI — identificador fiscal reconhecido pelo schema.org
    taxID: "68.610.837/0001-96",
    areaServed: [
      { "@type": "Country", name: "Portugal" },
      { "@type": "Country", name: "Espanha" },
      { "@type": "Country", name: "Brasil" },
    ],
    availableLanguage: ["pt-PT", "pt-BR", "es"],
    knowsAbout: [
      "Desenvolvimento web",
      "Automação de processos",
      "Integração com WhatsApp",
      "Engenharia de dados",
      "Sistemas de logística",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Página de encomenda com WhatsApp",
            description:
              "Página única que converte visitas em pedidos pelo WhatsApp, com a mensagem já escrita.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Automação de processos",
            description:
              "Substituição de folhas de cálculo e trabalho manual por sistemas que correm sozinhos.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tratamento e consolidação de dados",
            description:
              "Extração, limpeza, deduplicação e padronização de dados a partir de Excel e PDF.",
          },
        },
      ],
    },
    sameAs: [
      "https://www.instagram.com/rovie.so",
      "https://github.com/RobsonViieira",
      // Acrescentar o URL da página de empresa no LinkedIn
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}
