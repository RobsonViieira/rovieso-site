"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/* ────────────────────────────────────────────────────────────────
   ChaosToOrder — substitui a imagem estática por uma animação que
   mostra literalmente o que o título promete: planilha com dados
   repetidos e mal formatados virando dashboard consolidado.

   4 fases em loop: dados sujos → duplicatas marcadas → colapso →
   dashboard. Só transform e opacity (a GPU compõe sem recalcular
   layout, então roda liso em celular fraco).

   Sem framer-motion aqui de propósito: a animação é temporal, não
   ligada ao scroll, e um setTimeout resolve com ~0 KB extra.
   ──────────────────────────────────────────────────────────────── */

/* Cada par de linhas é a MESMA entidade escrita de dois jeitos.
   Índice ímpar = a repetição que o merge elimina. */
const LINHAS = [
  ["PREFEITURA DE ITATIBA", "45.228.851/0001-24", "(11) 3456-7890", "itatiba"],
  ["Pref. Mun. de Itatiba", "45228851000124", "1134567890", "ITATIBA"],
  ["Câmara Mun. de Jundiaí", "12.345.678/0001-95", "11 94567-8901", "Jundiai"],
  ["CAMARA MUNICIPAL JUNDIAI", "12345678000195", "(11)945678901", "jundiaí"],
  ["Sec. Saúde de Campinas", "98.765.432/0001-10", "3456-7890", "CAMPINAS"],
  ["Secretaria de Saúde", "98765432000110", "+55 19 3456-7890", "Campinas"],
];

const BARRAS = [88, 62, 95, 71, 100, 54, 79];

/* duração de cada fase, em ms */
const FASES = [900, 1500, 1400, 4200];

export default function ChaosToOrder() {
  const t = useTranslations("chaos");
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [fase, setFase] = useState(0);

  /* só anima quando entra na viewport — animação rodando fora da
     tela consome bateria à toa, e isso aparece no mobile */
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

    /* quem pediu menos movimento vê o estado final, sem loop */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFase(3);
      return;
    }

    let cancelado = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const ciclo = () => {
      let acc = 0;
      FASES.forEach((dur, i) => {
        timers.push(setTimeout(() => !cancelado && setFase(i), acc));
        acc += dur;
      });
      timers.push(setTimeout(() => !cancelado && ciclo(), acc));
    };
    ciclo();

    /* limpar no unmount evita acúmulo de timers a cada navegação */
    return () => {
      cancelado = true;
      timers.forEach(clearTimeout);
    };
  }, [visivel]);

  const naPlanilha = fase < 3;
  const eDuplicata = (i: number) => i % 2 === 1;

  const kpis = [
    { v: "150", l: t("kpiRegistros") },
    { v: "45,8%", l: t("kpiDuplicidade") },
    { v: "100%", l: t("kpiValidado") },
  ];

  const statusFase = [
    t("statusLendo"),
    t("statusIdentificando"),
    t("statusConsolidando"),
    t("statusPronto"),
  ];

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-24"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-deep">
        {/* barra de janela */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <span
            className={`font-mono text-[11px] transition-colors duration-500 ${
              naPlanilha ? "text-white/40" : "text-cyan"
            }`}
          >
            {naPlanilha ? t("arquivoNome") : t("dashboardNome")}
          </span>
          <span className="w-12" />
        </div>

        {/* palco: as duas camadas ocupam o mesmo espaço e trocam por opacidade */}
        <div className="relative min-h-[268px] p-4 sm:min-h-[340px] sm:p-7">
          {/* ── camada planilha ── */}
          <div
            className="absolute inset-0 p-4 sm:p-7"
            style={{
              opacity: naPlanilha ? 1 : 0,
              transform: naPlanilha ? "none" : "scale(.96)",
              transition: "opacity .55s ease, transform .55s ease",
              pointerEvents: "none",
            }}
          >
            <div className="mb-2 grid grid-cols-2 gap-x-3 sm:grid-cols-4">
              {[t("colOrgao"), t("colCnpj"), t("colTelefone"), t("colMunicipio")].map(
                (h, i) => (
                  <div
                    key={h}
                    className={`border-b border-white/10 pb-1.5 font-mono text-[9px] tracking-wider text-white/35 sm:text-[10px] ${
                      i > 1 ? "hidden sm:block" : ""
                    }`}
                  >
                    {h}
                  </div>
                )
              )}
            </div>

            {LINHAS.map((linha, i) => {
              const dup = eDuplicata(i);
              const marcada = fase >= 1 && dup;
              const sumindo = fase >= 2 && dup;
              return (
                <div
                  key={i}
                  className="grid grid-cols-2 gap-x-3 rounded py-1.5 sm:grid-cols-4"
                  style={{
                    background: marcada ? "rgba(248,113,113,.14)" : "transparent",
                    outline: marcada ? "1px solid rgba(248,113,113,.45)" : "none",
                    opacity: sumindo ? 0 : 1,
                    transform: sumindo ? "translateX(26px) scaleY(.55)" : "none",
                    transition: "all .5s cubic-bezier(.4,0,.2,1)",
                    transitionDelay: sumindo ? `${i * 55}ms` : "0ms",
                  }}
                >
                  {linha.map((cel, j) => (
                    <span
                      key={j}
                      className={`truncate font-mono text-[10px] sm:text-[11px] ${
                        dup ? "text-white/40" : "text-white/75"
                      } ${j > 1 ? "hidden sm:block" : ""}`}
                    >
                      {cel}
                    </span>
                  ))}
                </div>
              );
            })}

            <span
              className="absolute right-6 top-1/2 rounded bg-red-400 px-2.5 py-1 font-mono text-[10px] font-semibold text-navy-deep"
              style={{
                opacity: fase === 1 ? 1 : 0,
                transform: fase === 1 ? "none" : "translateY(6px)",
                transition: "all .35s ease",
              }}
            >
              {t("duplicatas")}
            </span>
          </div>

          {/* ── camada dashboard ── */}
          <div
            className="absolute inset-0 p-4 sm:p-7"
            style={{
              opacity: fase === 3 ? 1 : 0,
              transform: fase === 3 ? "none" : "scale(1.03)",
              transition: "opacity .6s ease .15s, transform .6s ease .15s",
              pointerEvents: "none",
            }}
          >
            <div className="mb-4 grid grid-cols-3 gap-2 sm:mb-5 sm:gap-2.5">
              {kpis.map((k, i) => (
                <div
                  key={k.l}
                  className="rounded-lg border border-cyan/20 bg-white/5 px-3 py-2.5"
                  style={{
                    opacity: fase === 3 ? 1 : 0,
                    transform: fase === 3 ? "none" : "translateY(12px)",
                    transition: `all .5s cubic-bezier(.34,1.3,.64,1) ${
                      0.25 + i * 0.1
                    }s`,
                  }}
                >
                  <div className="text-lg font-bold leading-none text-cyan sm:text-xl">
                    {k.v}
                  </div>
                  <div className="mt-1.5 text-[9px] leading-tight text-white/50 sm:text-[10px]">
                    {k.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-2 font-mono text-[9px] tracking-wider text-white/35 sm:text-[10px]">
              {t("porFonte")}
            </div>
            <div className="flex h-20 items-end gap-2 sm:h-24">
              {BARRAS.map((h, i) => (
                <div key={i} className="flex h-full flex-1 flex-col justify-end">
                  <div
                    className="rounded-t bg-gradient-to-b from-cyan to-cyan/30"
                    style={{
                      height: fase === 3 ? `${h}%` : "0%",
                      transition: `height .65s cubic-bezier(.34,1.2,.64,1) ${
                        0.45 + i * 0.07
                      }s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* status da fase */}
        <div className="border-t border-white/10 px-5 py-2.5 font-mono text-[11px] text-white/45 sm:px-7">
          {statusFase[fase]}
        </div>
      </div>

      {/* legenda antes/depois + título, como já era */}
      <div className="mt-8">
        <div className="flex justify-between gap-6 text-xs sm:text-sm">
          <p className="max-w-[45%] text-white/60">{t("before")}</p>
          <p className="max-w-[45%] text-right text-cyan-soft">{t("after")}</p>
        </div>
        <h2 className="font-display mt-3 text-2xl font-medium text-mist sm:text-3xl">
          {t("title")}
        </h2>
      </div>
    </section>
  );
}
