"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import HeroVisual from "./HeroVisual";

type Processo = { nome: string; det: string; barra: number; tempo: string };

export default function Hero() {
  const t = useTranslations("hero");
  const processos = t.raw("processos") as Processo[];

  return (
    <section className="relative overflow-hidden bg-circuit-fade px-5 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-36">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-block rounded-full border border-cyan/30 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-cyan-soft"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[26px] font-medium leading-[1.15] text-mist sm:text-5xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-[15px] text-white/60 sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <HeroVisual rotulos={processos} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contato"
            className="focus-ring w-full rounded-lg bg-cyan px-6 py-3.5 text-center text-sm font-semibold text-navy-deep transition hover:shadow-glow sm:w-auto sm:py-3"
          >
            {t("cta")}
          </a>
          <a
            href="#servicos"
            className="focus-ring w-full rounded-lg border border-white/15 px-6 py-3.5 text-center text-sm font-medium text-white/80 transition hover:border-cyan/40 hover:text-mist sm:w-auto sm:py-3"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
