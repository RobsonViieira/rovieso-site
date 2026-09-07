"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

/* Faixas de investimento, não tabela de plano fechado.

   Software sob medida não tem preço de prateleira — anunciar
   "R$ 1.900/mês" sem conhecer o escopo gera expectativa errada
   dos dois lados. Faixa com o que determina o valor qualifica o
   lead e evita a conversa que começa em "quanto custa?". */

type Faixa = {
  nome: string;
  para: string;
  valor: string;
  unidade: string;
  itens: string[];
  destaque?: boolean;
  cta: string;
};

export default function Pricing() {
  const t = useTranslations("pricing");
  const faixas = t.raw("faixas") as Faixa[];
  const fatores = t.raw("fatores") as string[];

  return (
    <section id="investimento" className="px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-xl">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {faixas.map((f, i) => (
            <motion.div
              key={f.nome}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`flex flex-col rounded-2xl border p-6 sm:p-7 ${
                f.destaque
                  ? "border-cyan/40 bg-cyan/[0.04]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <h3 className="font-display text-lg font-medium text-mist">
                {f.nome}
              </h3>
              <p className="mt-1.5 text-[13px] text-white/45">{f.para}</p>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl font-medium text-cyan sm:text-[28px]">
                  {f.valor}
                </span>
                <span className="text-xs text-white/40">{f.unidade}</span>
              </div>

              <ul className="mt-5 flex-1 space-y-2.5">
                {f.itens.map((it) => (
                  <li key={it} className="flex gap-2.5 text-[13px] text-white/60">
                    <span className="mt-[3px] shrink-0 text-cyan" aria-hidden>
                      ✓
                    </span>
                    {it}
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className={`mt-6 rounded-lg px-5 py-3 text-center text-sm font-semibold transition ${
                  f.destaque
                    ? "bg-cyan text-navy-deep hover:shadow-glow"
                    : "border border-white/15 text-white/80 hover:border-cyan/40 hover:text-mist"
                }`}
              >
                {f.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
          <p className="font-display text-sm font-medium text-mist">
            {t("fatoresTitulo")}
          </p>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {fatores.map((f) => (
              <li key={f} className="flex gap-2.5 text-[13px] text-white/55">
                <span className="mt-[3px] shrink-0 text-white/25" aria-hidden>
                  ·
                </span>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/35">{t("nota")}</p>
        </div>
      </div>
    </section>
  );
}
