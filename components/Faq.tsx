"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/* FAQ com acordeão e JSON-LD.

   O schema FAQPage é o que faz o Google mostrar as perguntas
   direto no resultado de busca. Só vale se as respostas forem
   visíveis na página — pergunta escondida atrás de JS que o
   crawler não executa é penalizada. Por isso o conteúdo está
   sempre no DOM e o acordeão só controla a altura. */

type Item = { p: string; r: string };

export default function Faq() {
  const t = useTranslations("faq");
  const itens = t.raw("items") as Item[];
  const [aberto, setAberto] = useState<number | null>(0);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((i) => ({
      "@type": "Question",
      name: i.p,
      acceptedAnswer: { "@type": "Answer", text: i.r },
    })),
  };

  return (
    <section id="faq" className="px-5 py-16 sm:px-6 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
          <a
            href="#contato"
            className="mt-6 inline-block text-sm font-medium text-cyan hover:underline"
          >
            {t("cta")}
          </a>
        </div>

        <div>
          {itens.map((item, i) => {
            const on = aberto === i;
            return (
              <div key={item.p} className="border-b border-white/10">
                <button
                  onClick={() => setAberto(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                >
                  <span className="font-display text-[15px] font-medium text-mist sm:text-base">
                    {item.p}
                  </span>
                  <span
                    className={`shrink-0 text-xl leading-none text-cyan transition-transform duration-300 ${
                      on ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-white/55">
                      {item.r}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
