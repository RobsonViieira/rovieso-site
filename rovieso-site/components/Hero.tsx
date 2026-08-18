"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-circuit-fade px-6 pb-20 pt-28 sm:pt-36">
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
          className="font-display text-3xl font-medium leading-tight text-mist sm:text-5xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/60 sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contato"
            className="focus-ring rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-navy-deep transition hover:shadow-glow"
          >
            {t("cta")}
          </a>
          <a
            href="#servicos"
            className="focus-ring rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-cyan/40 hover:text-mist"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
