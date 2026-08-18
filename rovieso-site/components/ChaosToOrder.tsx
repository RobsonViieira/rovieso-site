"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

/**
 * Elemento de assinatura da Rovieso: pontos espalhados (caos)
 * convergem em uma grade organizada conforme o usuário rola a página.
 * É a metáfora do serviço, vivida na interface.
 */
export default function ChaosToOrder() {
  const t = useTranslations("chaos");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

  // Posições iniciais "caóticas" e finais em grade (5x4 pontos)
  const cols = 5;
  const rows = 4;
  const points = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const chaosX = Math.random() * 100;
    const chaosY = Math.random() * 100;
    const orderX = (col / (cols - 1)) * 80 + 10;
    const orderY = (row / (rows - 1)) * 80 + 10;
    return { chaosX, chaosY, orderX, orderY };
  });

  return (
    <section
      ref={ref}
      className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 py-24"
    >
      <div className="relative h-64 w-full max-w-xl sm:h-80">
        {points.map((p, i) => {
          const x = useTransform(progress, [0, 1], [`${p.chaosX}%`, `${p.orderX}%`]);
          const y = useTransform(progress, [0, 1], [`${p.chaosY}%`, `${p.orderY}%`]);
          const opacity = useTransform(progress, [0, 0.3], [0.4, 1]);
          return (
            <motion.span
              key={i}
              style={{ left: x, top: y, opacity }}
              className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-glow"
            />
          );
        })}
      </div>

      <div className="mt-10 flex w-full max-w-xl justify-between gap-6 text-sm">
        <p className="max-w-[45%] text-white/50">{t("before")}</p>
        <p className="max-w-[45%] text-right text-cyan-soft">{t("after")}</p>
      </div>

      <h2 className="font-display mt-6 text-center text-2xl font-medium text-mist sm:text-3xl">
        {t("title")}
      </h2>
    </section>
  );
}
