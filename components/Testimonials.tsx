"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

/* ────────────────────────────────────────────────────────────────
   Testimonials — prova social.

   ⚠️ ATENÇÃO ANTES DE PUBLICAR
   O conteúdo em messages/*.json na chave "testimonials" está
   marcado como EXEMPLO. Depoimento inventado é publicidade
   enganosa (CDC art. 37) e o risco real não é jurídico — é o
   cliente perguntar "posso falar com essa pessoa?".

   Enquanto não houver depoimento real, use a variante "resultado":
   descreva o que o sistema entregou, com número, sem colocar
   aspas na boca de ninguém. Isso convence e é verdade.
   ──────────────────────────────────────────────────────────────── */

type Depoimento = {
  texto: string;
  nome: string;
  cargo: string;
  empresa: string;
  iniciais: string;
};

const TROCA_MS = 7000;

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const itens = t.raw("items") as Depoimento[];

  const [ativo, setAtivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisivel(e.isIntersecting),
      { rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* só gira quando está na tela e o usuário não interagiu */
  useEffect(() => {
    if (!visivel || pausado || itens.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setAtivo((i) => (i + 1) % itens.length),
      TROCA_MS
    );
    return () => clearInterval(id);
  }, [visivel, pausado, itens.length]);

  if (!itens?.length) return null;
  const d = itens[ativo];

  return (
    <section
      ref={ref}
      id="depoimentos"
      className="px-5 py-16 sm:px-6 sm:py-24"
      onPointerDown={() => setPausado(true)}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 max-w-lg sm:mb-10">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo/25 to-navy-deep p-6 sm:p-10">
          {/* aspas decorativas, atrás do texto */}
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 left-4 select-none font-display text-[120px] leading-none text-cyan/10 sm:text-[160px]"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={ativo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="relative"
            >
              <p className="text-[15px] leading-relaxed text-white/85 sm:text-lg">
                {d.texto}
              </p>

              <footer className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-sm font-semibold text-cyan-soft">
                  {d.iniciais}
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-mist">
                    {d.nome}
                  </div>
                  <div className="truncate text-xs text-white/45">
                    {d.cargo} · {d.empresa}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          {/* navegação — só aparece com 2+ depoimentos */}
          {itens.length > 1 && (
            <div className="mt-7 flex items-center gap-2">
              {itens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAtivo(i);
                    setPausado(true);
                  }}
                  aria-label={`${t("verDepoimento")} ${i + 1}`}
                  aria-current={i === ativo}
                  className="group py-2"
                >
                  <span
                    className={`block h-1 rounded-full transition-all ${
                      i === ativo
                        ? "w-7 bg-cyan"
                        : "w-3 bg-white/20 group-hover:bg-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* linha de credibilidade abaixo do card */}
        <p className="mt-5 text-center text-xs text-white/35 sm:text-left">
          {t("nota")}
        </p>
      </div>
    </section>
  );
}
