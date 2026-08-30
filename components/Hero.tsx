"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const COMMANDS = [
  "$ git push origin main",
  "✓ deploy iniciado...",
  "$ pm2 restart api",
  "✓ ARIA online",
  "✓ sistema pronto.",
];

export default function Hero() {
  const t = useTranslations("hero");
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < COMMANDS.length) {
        setLines((prev) => [...prev, COMMANDS[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
          className="mx-auto mt-5 max-w-xl text-[15px] sm:text-base text-white/60 sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-8 max-w-md rounded-xl border border-white/10 bg-black/40 p-4 text-left font-mono text-xs text-cyan-soft sm:text-sm"
        >
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
          <span className="animate-pulse">▍</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contato"
            className="focus-ring w-full rounded-lg bg-cyan px-6 py-3.5 text-center sm:w-auto sm:py-3 text-sm font-semibold text-navy-deep transition hover:shadow-glow"
          >
            {t("cta")}
          </a>
          <a
            href="#servicos"
            className="focus-ring w-full rounded-lg border border-white/15 px-6 py-3.5 text-center sm:w-auto sm:py-3 text-sm font-medium text-white/80 transition hover:border-cyan/40 hover:text-mist"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
