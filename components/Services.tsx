"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  iconStyles,
  IconeAutomacao,
  IconeChatbot,
  IconeDados,
  IconeSobMedida,
  IconeDeploy,
} from "./ServiceIcons";

/* As ilustracoes substituem os PNGs de /icons. Ganho triplo:
   ~24 KB no total contra ~350 KB das imagens, animacao que explica
   o servico, e nitidez em qualquer resolucao.
   A ordem segue a de messages/*.json. */
const ILUSTRACOES = [
  IconeAutomacao,
  IconeChatbot,
  IconeDados,
  IconeSobMedida,
  IconeDeploy,
];

type Item = { name: string; description: string; example?: string };

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section id="servicos" className="px-5 py-16 sm:px-6 sm:py-24">
      {/* keyframes injetados uma vez para as cinco ilustracoes */}
      <style dangerouslySetInnerHTML={{ __html: iconStyles }} />

      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-lg sm:mb-14">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {items.map((item, i) => {
            const Ilustracao = ILUSTRACOES[i % ILUSTRACOES.length];
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-navy-deep/40 transition hover:border-cyan/40"
              >
                <Ilustracao />
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-lg font-medium text-mist">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>
                  {item.example && (
                    <p className="mt-3 border-t border-white/10 pt-3 text-[13px] leading-relaxed text-white/45">
                      {item.example}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
