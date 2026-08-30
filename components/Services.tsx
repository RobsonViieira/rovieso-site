"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

// Ícones reais da marca Rovieso, na mesma ordem dos serviços
// definidos em messages/*.json
const iconImages = [
  "/icons/automacao.png",
  "/icons/chatbot-ia.png",
  "/icons/dados-pipelines.png",
  "/icons/sistema-sob-medida.png",
  "/icons/deploy-nuvem.png",
];

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as { name: string; description: string }[];

  return (
    <section id="servicos" className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 max-w-lg">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-navy-deep/40 transition hover:border-cyan/40"
            >
              <div className="flex h-32 items-center justify-center bg-navy-deep/60 p-4">
                <Image
                  src={iconImages[i % iconImages.length]}
                  alt=""
                  width={120}
                  height={80}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
              <div className="p-6 pt-4">
              <h3 className="font-display text-lg font-medium text-mist">
                {item.name}
              </h3>
              <p className="mt-2 text-sm text-white/55">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
