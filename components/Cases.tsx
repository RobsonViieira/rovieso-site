"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import AriaChat from "./AriaChat";

const LAYERS = [
  { key: "layerProblem", color: "bg-red-500/20 border-red-400/30" },
  { key: "layerBackend", color: "bg-cyan/10 border-cyan/30" },
  { key: "layerAI", color: "bg-indigo/20 border-indigo-400/30" },
  { key: "layerDashboard", color: "bg-cyan/25 border-cyan/50" },
];

/* Camada extraída para componente próprio.
   Antes os useTransform ficavam dentro do .map() — isso viola as
   Rules of Hooks (a contagem de hooks tem que ser estável entre
   renders). Funcionava por acaso porque LAYERS tem tamanho fixo,
   mas quebra no primeiro item condicional. Com um componente por
   camada, cada instância tem seus próprios hooks. */
function Camada({
  progresso,
  indice,
  total,
  cor,
  texto,
}: {
  progresso: MotionValue<number>;
  indice: number;
  total: number;
  cor: string;
  texto: string;
}) {
  const inicio = indice / total;
  const fim = inicio + 1 / total;
  const opacity = useTransform(progresso, [inicio, fim], [0, 1]);
  const x = useTransform(progresso, [inicio, fim], [-30, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className={`rounded-lg border px-4 py-3 text-xs text-white/70 ${cor}`}
    >
      {texto}
    </motion.div>
  );
}

export default function Cases() {
  const t = useTranslations("cases");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const tags = [t("slrTag1"), t("slrTag2"), t("slrTag3"), t("slrTag4")];

  return (
    <section id="cases" ref={ref} className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo/30 to-navy-deep">
          <div className="grid grid-cols-1 gap-8 p-8 sm:p-10 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-display text-xl font-medium text-mist sm:text-2xl">
                {t("slrTitle")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {t("slrDescription")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan/25 px-3 py-1 text-xs text-cyan-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ARIA em funcionamento: mostra o assistente que a
                descrição promete, em vez de só afirmar que existe */}
            <AriaChat />
          </div>

          {/* Camadas do sistema revelando-se conforme rola */}
          <div className="border-t border-white/10 px-8 pb-8 sm:px-10">
            <div className="grid gap-2 pt-8 sm:grid-cols-2">
              {LAYERS.map((layer, i) => (
                <Camada
                  key={layer.key}
                  progresso={scrollYProgress}
                  indice={i}
                  total={LAYERS.length}
                  cor={layer.color}
                  texto={t(layer.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
