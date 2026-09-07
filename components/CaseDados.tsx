"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

/* Case 2 — consolidação de dados públicos.

   Diferente do SLR, este case tem prova externa verificável:
   dashboard público e código aberto. É o argumento mais forte que
   a Rovieso tem, e estava fora do site.

   A ilustração mostra o resultado real — 277 marcas, 127 delas
   apagando — em vez de descrever. Mesma linguagem do resto:
   laranja para o bruto, ciano para o consolidado. */

const BRUTO = 277;
const FINAL = 150;

export default function CaseDados() {
  const t = useTranslations("caseDados");
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [apagado, setApagado] = useState(false);

  const metricas = t.raw("metricas") as { v: string; l: string }[];
  const tags = t.raw("tags") as string[];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisivel(true),
      { rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visivel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setApagado(true);
      return;
    }
    const id = setTimeout(() => setApagado(true), BRUTO * 3.2 + 600);
    return () => clearTimeout(id);
  }, [visivel]);

  /* as redundantes são distribuídas ao longo do bloco, não
     agrupadas no fim — assim a leitura é "espalhadas por toda a
     base", que é o que acontece de verdade */
  const dups = new Set<number>();
  const qtd = BRUTO - FINAL;
  for (let i = 0; i < qtd; i++) dups.add(Math.floor((i * BRUTO) / qtd));

  return (
    <div
      ref={ref}
      className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy-deep to-[#0d1233]"
    >
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 md:grid-cols-2 md:items-center">
        <div>
          <h3 className="font-display text-xl font-medium text-mist sm:text-2xl">
            {t("titulo")}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            {t("descricao")}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {metricas.map((m) => (
              <div key={m.l}>
                <div className="font-display text-lg font-medium text-cyan sm:text-xl">
                  {m.v}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-white/40">
                  {m.l}
                </div>
              </div>
            ))}
          </div>

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

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://guiorobson.mooo.com/dados/"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg bg-cyan px-5 py-3 text-center text-sm font-semibold text-navy-deep transition hover:shadow-glow"
            >
              {t("ctaDashboard")}
            </a>
            <a
              href="https://github.com/RobsonViieira/rovieso-dados"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded-lg border border-white/15 px-5 py-3 text-center text-sm font-medium text-white/80 transition hover:border-cyan/40 hover:text-mist"
            >
              {t("ctaCodigo")}
            </a>
          </div>
        </div>

        {/* 277 linhas recebidas; as repetidas apagam */}
        <div>
          <style>{`
            @keyframes cdSurge{from{opacity:0;transform:scaleY(.2)}
                               to{opacity:.9;transform:none}}
            @keyframes cdApaga{to{opacity:.12;transform:scaleY(.16)}}
            .cd-m{animation:cdSurge .45s ease-out backwards}
            .cd-some{animation:cdApaga .5s ease-in forwards}
            @media (prefers-reduced-motion: reduce){
              .cd-m{animation:none;opacity:.9}
              .cd-some{animation:none;opacity:.12}
            }
          `}</style>

          <div className="mb-2.5 flex items-baseline justify-between font-mono text-[10px] tracking-wider text-white/35">
            <span>{t("rotuloGrid")}</span>
            <span>
              {BRUTO} → <span className="text-cyan">{FINAL}</span>
            </span>
          </div>

          <div
            className="grid gap-[3px] rounded-lg border border-white/10 bg-black/25 p-3"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(7px, 1fr))" }}
            role="img"
            aria-label={t("altGrid")}
          >
            {visivel &&
              Array.from({ length: BRUTO }, (_, i) => {
                const dup = dups.has(i);
                return (
                  <i
                    key={i}
                    className={`block h-3 rounded-[1px] cd-m ${
                      apagado && dup ? "cd-some" : ""
                    }`}
                    style={{
                      background: dup ? "#FF7A29" : "#00D9FF",
                      animationDelay: `${i * 3.2}ms`,
                    }}
                  />
                );
              })}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[10px] text-white/40">
            <span className="flex items-center gap-1.5">
              <i className="block h-2 w-2 rounded-[1px] bg-cyan" />
              {t("legendaUnica")}
            </span>
            <span className="flex items-center gap-1.5">
              <i
                className="block h-2 w-2 rounded-[1px]"
                style={{ background: "#FF7A29" }}
              />
              {t("legendaRepetida")}
            </span>
          </div>
        </div>
      </div>

      {/* o que não foi preenchido — a ressalva que diferencia */}
      <div className="border-t border-white/10 px-6 py-5 sm:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[13px] leading-relaxed text-white/45"
        >
          <span className="font-medium text-white/70">{t("ressalvaTitulo")}</span>{" "}
          {t("ressalva")}
        </motion.p>
      </div>
    </div>
  );
}
