"use client";

import { useEffect, useRef, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   HeroVisual — substitui o terminal decorativo.

   O terminal antigo escrevia "$ git push" e "✓ sistema pronto":
   comando falso, saída falsa, e o mesmo repertório de qualquer
   portfólio de dev júnior. Não dizia o que a empresa faz.

   Aqui é um painel de operação: quatro processos reais rodando,
   com tempo e status. Um deles alterna de manual para automático
   em loop — o argumento da empresa em movimento.

   Mesma linguagem das ilustrações de serviço: Space Mono, grade
   técnica, laranja para o manual e ciano para o automático.
   ──────────────────────────────────────────────────────────────── */

const CYAN = "#00D9FF";
const LARANJA = "#FF7A29";
const VERDE = "#3ED598";
const TRACO = "rgba(255,255,255,.22)";
const FRACO = "rgba(255,255,255,.10)";

type Processo = { nome: string; det: string; barra: number; tempo: string };

export default function HeroVisual({ rotulos }: { rotulos: Processo[] }) {
  const [manual, setManual] = useState(0);   // índice do que ainda é manual
  const [visivel, setVisivel] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* a cada ciclo, o processo manual passa a ser automático e o
     próximo assume o lugar — mostra a migração acontecendo */
  useEffect(() => {
    if (!visivel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () => setManual((i) => (i + 1) % rotulos.length),
      3800
    );
    return () => clearInterval(id);
  }, [visivel, rotulos.length]);

  return (
    <div ref={ref} className="mx-auto mt-9 max-w-xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        .hv{display:block;width:100%;height:auto}
        .hv text{font-family:'Space Mono',ui-monospace,monospace}
        .hv-h{font-size:6px;font-weight:700;fill:rgba(255,255,255,.6);letter-spacing:.8px}
        .hv-n{font-size:6.4px;fill:rgba(255,255,255,.78)}
        .hv-d{font-size:5px;fill:rgba(255,255,255,.34)}
        .hv-t{font-size:5.6px;font-weight:700}
        @keyframes hvPulso{0%,100%{opacity:.3}50%{opacity:1}}
        .hv-pulso{animation:hvPulso 2s ease-in-out infinite}
        @keyframes hvBarra{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        .hv-barra{transform-origin:left;animation:hvBarra .7s cubic-bezier(.34,1.1,.5,1)}
        @keyframes hvVarre{0%{transform:translateX(-30px);opacity:0}
                           30%{opacity:.7}70%{opacity:.7}
                           100%{transform:translateX(258px);opacity:0}}
        .hv-varre{animation:hvVarre 3.8s linear infinite}
        @media (prefers-reduced-motion: reduce){ .hv *{animation:none!important} }
      `}</style>

      <svg viewBox="0 0 280 132" className="hv" role="img"
           aria-label="Painel de operação com processos automatizados">
        <defs>
          <pattern id="hvg" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0 L0 0 0 14" fill="none"
                  stroke="rgba(255,255,255,.05)" strokeWidth=".5" />
          </pattern>
          <filter id="hvGl" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="280" height="132" rx="6" fill="rgba(0,0,0,.32)"
              stroke={FRACO} strokeWidth="1" />
        <rect width="280" height="132" rx="6" fill="url(#hvg)" />

        {/* cabeçalho */}
        <line x1="0" y1="20" x2="280" y2="20" stroke={FRACO} strokeWidth=".9" />
        <circle cx="12" cy="10.5" r="2.4" fill={VERDE} className="hv-pulso" />
        <text x="20" y="13" className="hv-h">OPERAÇÃO · TEMPO REAL</text>
        <text x="268" y="13" textAnchor="end" className="hv-d">4 processos</text>

        {/* linha de varredura */}
        <rect x="0" y="20" width="30" height="112" fill={CYAN} opacity=".05"
              className="hv-varre" />

        {rotulos.map((p, i) => {
          const y = 30 + i * 24;
          const eManual = i === manual;
          const cor = eManual ? LARANJA : CYAN;
          return (
            <g key={p.nome}>
              <circle cx="12" cy={y + 7} r="2.2" fill={cor}
                      className={eManual ? "" : "hv-pulso"}
                      style={{ animationDelay: `${i * 0.3}s` }} />
              <text x="20" y={y + 5} className="hv-n">{p.nome}</text>
              <text x="20" y={y + 13} className="hv-d">{p.det}</text>

              {/* trilho e preenchimento */}
              <rect x="150" y={y + 3} width="76" height="5" rx="2.5"
                    fill="rgba(255,255,255,.07)" />
              <rect key={`${i}-${manual}`} x="150" y={y + 3}
                    width={76 * (eManual ? 0.34 : p.barra)} height="5" rx="2.5"
                    fill={cor} opacity={eManual ? 0.65 : 0.9}
                    className="hv-barra" filter={eManual ? undefined : "url(#hvGl)"} />

              <text x="268" y={y + 8} textAnchor="end" className="hv-t"
                    style={{ fill: cor }}>
                {eManual ? p.tempo : "0s"}
              </text>
              <line x1="12" y1={y + 18} x2="268" y2={y + 18}
                    stroke={FRACO} strokeWidth=".5" opacity=".6" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
