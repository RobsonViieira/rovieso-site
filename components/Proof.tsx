"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

type Metrica = { valor: string; unidade?: string; rotulo: string; contexto: string };

export default function Proof() {
  const t = useTranslations("proof");
  const metricas = t.raw("metrics") as Metrica[];

  return (
    <section id="resultados" className="px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {metricas.map((m, i) => (
            <motion.div
              key={m.rotulo}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="bg-navy-deep p-6 sm:p-7"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-medium leading-none text-cyan sm:text-4xl">
                  {m.valor}
                </span>
                {m.unidade && <span className="text-sm text-cyan/70">{m.unidade}</span>}
              </div>
              <div className="mt-3 text-sm font-medium text-mist">{m.rotulo}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-white/45">{m.contexto}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 text-xs text-white/35">{t("nota")}</p>
      </div>
    </section>
  );
}
