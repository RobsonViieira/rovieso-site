import React, { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   ROVIESO — animações para a landing
   Duas peças independentes, sem dependência externa além do React.
   Paleta da marca: navy #0A0E3F, cyan #00D9FF.
   Ambas respeitam prefers-reduced-motion.
   ═══════════════════════════════════════════════════════════════ */

const NAVY = "#0A0E3F";
const CYAN = "#00D9FF";

/* hook: detecta preferência de movimento reduzido */
function useReducedMotion() {
  const [reduzido, setReduzido] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzido(mq.matches);
    const h = (e) => setReduzido(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return reduzido;
}

/* hook: só anima quando o componente entra na viewport */
function useNaTela(margem = "-80px") {
  const ref = useRef(null);
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisivel(true),
      { rootMargin: margem }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margem]);
  return [ref, visivel];
}

/* ═══════════════════════════════════════════════════════════════
   1. CHATBOT ARIA
   Conversa que se digita sozinha, em loop. O ponto não é o texto
   bonito — é o ritmo: pausa antes de responder, indicador de
   digitação, velocidade irregular por caractere.
   ═══════════════════════════════════════════════════════════════ */

const CONVERSA = [
  { de: "user", txt: "quantas caixas do item 4471 ainda tem no galpão B?" },
  { de: "aria", txt: "37 caixas no galpão B, corredor 12. Saíram 14 esta semana — no ritmo atual acaba em 9 dias.", tempoDigita: 1400 },
  { de: "user", txt: "e se eu puxar do galpão A?" },
  { de: "aria", txt: "Galpão A tem 82. Transferindo 40, você cobre 4 semanas nos dois. Quer que eu gere a ordem de transferência?", tempoDigita: 1600 },
];

function BolhaChat({ de, children, entrando }) {
  const eUser = de === "user";
  return (
    <div
      className={`flex ${eUser ? "justify-end" : "justify-start"} mb-2.5`}
      style={{
        opacity: entrando ? 0 : 1,
        transform: entrando ? "translateY(8px)" : "none",
        transition: "opacity .3s ease, transform .3s ease",
      }}
    >
      <div
        className="max-w-[82%] px-3.5 py-2.5 text-[13px] leading-snug"
        style={{
          borderRadius: eUser ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
          background: eUser ? "rgba(255,255,255,.08)" : CYAN,
          color: eUser ? "rgba(255,255,255,.92)" : NAVY,
          fontWeight: eUser ? 400 : 500,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Digitando() {
  return (
    <div className="flex justify-start mb-2.5">
      <div
        className="px-4 py-3 flex gap-1.5 items-center"
        style={{ borderRadius: "14px 14px 14px 3px", background: CYAN }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{
              background: NAVY,
              animation: `roviesoPulso 1.2s ${i * 0.16}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function ChatbotAria() {
  const [ref, visivel] = useNaTela();
  const reduzido = useReducedMotion();
  const [msgs, setMsgs] = useState([]);
  const [digitando, setDigitando] = useState(false);
  const [parcial, setParcial] = useState("");
  const scrollRef = useRef(null);
  const timers = useRef([]);

  const limpar = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const agenda = useCallback((fn, ms) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    if (!visivel) return;

    // sem animação: mostra a conversa inteira de uma vez
    if (reduzido) {
      setMsgs(CONVERSA);
      return;
    }

    let cancelado = false;

    const rodar = () => {
      setMsgs([]);
      setParcial("");
      setDigitando(false);
      let t = 500;

      CONVERSA.forEach((m, i) => {
        if (m.de === "user") {
          // usuário: mensagem inteira aparece de uma vez, como no celular
          agenda(() => !cancelado && setMsgs((p) => [...p, m]), t);
          t += 900;
        } else {
          // ARIA: pensa, depois digita caractere a caractere
          agenda(() => !cancelado && setDigitando(true), t);
          t += m.tempoDigita;
          agenda(() => {
            if (cancelado) return;
            setDigitando(false);
            let idx = 0;
            const escrever = () => {
              if (cancelado) return;
              idx += 1;
              setParcial(m.txt.slice(0, idx));
              if (idx < m.txt.length) {
                // velocidade irregular: pausa maior após pontuação
                const c = m.txt[idx - 1];
                const espera = ".,!?—".includes(c) ? 140 : 18 + Math.random() * 26;
                timers.current.push(setTimeout(escrever, espera));
              } else {
                agenda(() => {
                  if (cancelado) return;
                  setMsgs((p) => [...p, m]);
                  setParcial("");
                }, 260);
              }
            };
            escrever();
          }, t);
          t += m.txt.length * 34 + 700;
        }
      });

      // reinicia o ciclo
      agenda(() => !cancelado && rodar(), t + 3200);
    };

    rodar();
    return () => {
      cancelado = true;
      limpar();
    };
  }, [visivel, reduzido, agenda, limpar]);

  // mantém o scroll no fim conforme a conversa cresce
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, parcial, digitando]);

  return (
    <div ref={ref} className="w-full max-w-sm mx-auto">
      <style>{`
        @keyframes roviesoPulso {
          0%,60%,100% { opacity:.35; transform:translateY(0) }
          30%        { opacity:1;   transform:translateY(-3px) }
        }
        @keyframes roviesoCursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>

      <div
        className="rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: NAVY, border: "1px solid rgba(0,217,255,.22)" }}
      >
        {/* cabeçalho */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,.09)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold shrink-0"
            style={{ background: CYAN, color: NAVY }}
          >
            AR
          </div>
          <div className="min-w-0">
            <div className="text-white text-sm font-semibold leading-tight">ARIA</div>
            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,.5)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#3ED598" }} />
              conectada ao estoque
            </div>
          </div>
        </div>

        {/* corpo */}
        <div ref={scrollRef} className="px-4 py-4 h-[290px] overflow-y-auto">
          {msgs.map((m, i) => (
            <BolhaChat key={i} de={m.de}>{m.txt}</BolhaChat>
          ))}
          {digitando && <Digitando />}
          {parcial && (
            <BolhaChat de="aria">
              {parcial}
              <span
                className="inline-block w-[2px] h-[13px] ml-0.5 align-middle"
                style={{ background: NAVY, animation: "roviesoCursor 1s infinite" }}
              />
            </BolhaChat>
          )}
        </div>

        {/* campo de entrada (decorativo) */}
        <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(255,255,255,.09)" }}>
          <div
            className="rounded-full px-4 py-2.5 text-[13px]"
            style={{ background: "rgba(255,255,255,.06)", color: "rgba(255,255,255,.32)" }}
          >
            Pergunte qualquer coisa sobre a operação…
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. PLANILHA CAÓTICA → DASHBOARD
   Quatro fases: dados sujos, duplicatas marcadas, colapso, ordem.
   Cada célula é posicionada por transform, não por layout — é o
   que permite a transição sem reflow.
   ═══════════════════════════════════════════════════════════════ */

const LINHAS_SUJAS = [
  ["PREFEITURA DE ITATIBA", "45.228.851/0001-24", "(11) 3456-7890", "itatiba"],
  ["Pref. Mun. de Itatiba", "45228851000124", "1134567890", "ITATIBA"],
  ["Câmara Mun. de Jundiaí", "12.345.678/0001-95", "11 94567-8901", "Jundiai"],
  ["CAMARA MUNICIPAL JUNDIAI", "12345678000195", "(11)945678901", "jundiaí"],
  ["Sec. Saúde de Campinas", "98.765.432/0001-10", "3456-7890", "CAMPINAS"],
  ["Secretaria de Saúde", "98765432000110", "+55 19 3456-7890", "Campinas"],
];

const KPIS = [
  { v: "150", l: "cadastros únicos" },
  { v: "45,8%", l: "duplicidade removida" },
  { v: "100%", l: "CNPJ validado" },
];

const BARRAS = [88, 62, 95, 71, 100, 54, 79];

export function CaosParaOrdem() {
  const [ref, visivel] = useNaTela();
  const reduzido = useReducedMotion();
  const [fase, setFase] = useState(0); // 0 sujo · 1 marcado · 2 colapso · 3 ordem
  const timers = useRef([]);

  useEffect(() => {
    if (!visivel) return;
    if (reduzido) { setFase(3); return; }

    let cancelado = false;
    const ciclo = () => {
      const passos = [
        [0, 900], [1, 1500], [2, 1400], [3, 4200],
      ];
      let acc = 0;
      passos.forEach(([f, dur]) => {
        timers.current.push(setTimeout(() => !cancelado && setFase(f), acc));
        acc += dur;
      });
      timers.current.push(setTimeout(() => !cancelado && ciclo(), acc));
    };
    ciclo();

    return () => {
      cancelado = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [visivel, reduzido]);

  const mostraPlanilha = fase < 3;
  const duplicada = (i) => i % 2 === 1; // as linhas ímpares são as repetições

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto">
      <div
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: NAVY, border: "1px solid rgba(0,217,255,.22)", minHeight: 340 }}
      >
        {/* barra de título */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,.09)" }}
        >
          <div className="flex gap-1.5">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: .8 }} />
            ))}
          </div>
          <div
            className="text-[11px] font-mono transition-colors duration-500"
            style={{ color: mostraPlanilha ? "rgba(255,255,255,.4)" : CYAN }}
          >
            {mostraPlanilha ? "cadastro_orgaos.xlsx" : "dashboard · ao vivo"}
          </div>
          <div className="w-12" />
        </div>

        <div className="relative p-4" style={{ minHeight: 290 }}>
          {/* ── camada planilha ── */}
          <div
            className="absolute inset-0 p-4"
            style={{
              opacity: mostraPlanilha ? 1 : 0,
              transform: mostraPlanilha ? "none" : "scale(.96)",
              transition: "opacity .55s ease, transform .55s ease",
              pointerEvents: "none",
            }}
          >
            <div className="grid grid-cols-4 gap-x-2 gap-y-1 mb-2">
              {["ÓRGÃO", "CNPJ", "TELEFONE", "MUNICÍPIO"].map((h) => (
                <div
                  key={h}
                  className="text-[9px] font-mono tracking-wider pb-1.5"
                  style={{ color: "rgba(255,255,255,.35)", borderBottom: "1px solid rgba(255,255,255,.1)" }}
                >
                  {h}
                </div>
              ))}
            </div>

            {LINHAS_SUJAS.map((linha, i) => {
              const dup = duplicada(i);
              const marcada = fase >= 1 && dup;
              const sumindo = fase >= 2 && dup;
              return (
                <div
                  key={i}
                  className="grid grid-cols-4 gap-x-2 py-1.5 rounded"
                  style={{
                    background: marcada ? "rgba(255,95,87,.14)" : "transparent",
                    outline: marcada ? "1px solid rgba(255,95,87,.45)" : "none",
                    opacity: sumindo ? 0 : 1,
                    transform: sumindo ? "translateX(26px) scaleY(.55)" : "none",
                    transition: "all .5s cubic-bezier(.4,0,.2,1)",
                    transitionDelay: sumindo ? `${i * 55}ms` : "0ms",
                  }}
                >
                  {linha.map((cel, j) => (
                    <div
                      key={j}
                      className="text-[10px] font-mono truncate"
                      style={{ color: dup ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.8)" }}
                    >
                      {cel}
                    </div>
                  ))}
                </div>
              );
            })}

            {/* etiqueta que aparece na fase de marcação */}
            <div
              className="absolute right-5 top-1/2 px-2.5 py-1 rounded text-[10px] font-mono font-semibold"
              style={{
                background: "#FF5F57",
                color: "#fff",
                opacity: fase === 1 ? 1 : 0,
                transform: fase === 1 ? "none" : "translateY(6px)",
                transition: "all .35s ease",
              }}
            >
              3 duplicatas
            </div>
          </div>

          {/* ── camada dashboard ── */}
          <div
            className="absolute inset-0 p-4"
            style={{
              opacity: fase === 3 ? 1 : 0,
              transform: fase === 3 ? "none" : "scale(1.03)",
              transition: "opacity .6s ease .15s, transform .6s ease .15s",
              pointerEvents: "none",
            }}
          >
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              {KPIS.map((k, i) => (
                <div
                  key={k.l}
                  className="rounded-lg px-3 py-2.5"
                  style={{
                    background: "rgba(255,255,255,.05)",
                    border: "1px solid rgba(0,217,255,.18)",
                    opacity: fase === 3 ? 1 : 0,
                    transform: fase === 3 ? "none" : "translateY(12px)",
                    transition: `all .5s cubic-bezier(.34,1.3,.64,1) ${0.25 + i * 0.1}s`,
                  }}
                >
                  <div className="text-lg font-bold leading-none" style={{ color: CYAN }}>{k.v}</div>
                  <div className="text-[9px] mt-1.5 leading-tight" style={{ color: "rgba(255,255,255,.5)" }}>
                    {k.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[9px] font-mono tracking-wider mb-2" style={{ color: "rgba(255,255,255,.35)" }}>
              REGISTROS POR FONTE
            </div>
            <div className="flex items-end gap-2 h-24">
              {BARRAS.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <div
                    className="rounded-t"
                    style={{
                      height: fase === 3 ? `${h}%` : "0%",
                      background: `linear-gradient(180deg, ${CYAN} 0%, rgba(0,217,255,.35) 100%)`,
                      transition: `height .65s cubic-bezier(.34,1.2,.64,1) ${0.45 + i * 0.07}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* legenda de fase */}
        <div
          className="px-4 py-2.5 text-[11px] font-mono"
          style={{ borderTop: "1px solid rgba(255,255,255,.09)", color: "rgba(255,255,255,.45)" }}
        >
          {["lendo 277 linhas…",
            "identificando repetições…",
            "consolidando registros…",
            "150 cadastros únicos · pronto"][fase]}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Página de demonstração — apague ao integrar no site e importe
   só ChatbotAria e CaosParaOrdem.
   ═══════════════════════════════════════════════════════════════ */
export default function Demo() {
  return (
    <div className="min-h-screen px-5 py-12" style={{ background: "#060830" }}>
      <div className="max-w-2xl mx-auto space-y-14">
        <section>
          <p className="text-[11px] font-mono tracking-widest mb-2" style={{ color: CYAN }}>
            CHATBOT COM IA
          </p>
          <h2 className="text-white text-2xl font-bold mb-5 leading-tight">
            Sua operação respondendo em linguagem natural
          </h2>
          <ChatbotAria />
        </section>

        <section>
          <p className="text-[11px] font-mono tracking-widest mb-2" style={{ color: CYAN }}>
            DADOS &amp; PIPELINES
          </p>
          <h2 className="text-white text-2xl font-bold mb-5 leading-tight">
            Planilha bagunçada vira informação confiável
          </h2>
          <CaosParaOrdem />
        </section>
      </div>
    </div>
  );
}
