"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ChaosToOrder() {
  const t = useTranslations("chaos");
  const ref = useRef<HTMLDivElement>(null);
  const [pull, setPull] = useState({ x: 50, y: 50, active: false });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);

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

  function handleMove(e: React.MouseEvent | React.TouchEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setPull({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }

  return (
    <section
      ref={ref}
      className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-6 py-24"
    >
      <div
        className="relative h-64 w-full max-w-xl sm:h-80"
        onMouseMove={handleMove}
        onMouseLeave={() => setPull((p) => ({ ...p, active: false }))}
        onTouchMove={handleMove}
        onTouchEnd={() => setPull((p) => ({ ...p, active: false }))}
      >
        {points.map((p, i) => {
          const baseX = useTransform(progress, [0, 1], [`${p.chaosX}%`, `${p.orderX}%`]);
          const baseY = useTransform(progress, [0, 1], [`${p.chaosY}%`, `${p.orderY}%`]);
          const opacity = useTransform(progress, [0, 0.3], [0.4, 1]);

          const dx = pull.active ? pull.x - p.orderX : 0;
          const dy = pull.active ? pull.y - p.orderY : 0;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = pull.active ? Math.max(0, 1 - dist / 35) : 0;

          return (
            <motion.span
              key={i}
              style={{
                left: baseX,
                top: baseY,
                opacity,
                x: dx * influence * 0.4,
                y: dy * influence * 0.4,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
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
