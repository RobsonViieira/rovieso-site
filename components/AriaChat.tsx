"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/* ────────────────────────────────────────────────────────────────
   AriaChat — conversa que se digita sozinha, em loop.

   O que faz parecer real não é o texto: é o ritmo. A ARIA "pensa"
   antes de responder, digita caractere a caractere em velocidade
   irregular e pausa mais depois de pontuação. A mensagem do usuário
   aparece inteira de uma vez, como acontece no celular.

   Textos vêm do next-intl (chave "aria"), então a demo funciona
   nos três idiomas sem código duplicado.
   ──────────────────────────────────────────────────────────────── */

type Msg = { de: "user" | "aria"; txt: string };

export default function AriaChat() {
  const t = useTranslations("aria");

  /* a conversa vive nas traduções: 2 perguntas, 2 respostas */
  const conversa: Msg[] = [
    { de: "user", txt: t("q1") },
    { de: "aria", txt: t("a1") },
    { de: "user", txt: t("q2") },
    { de: "aria", txt: t("a2") },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [visivel, setVisivel] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [digitando, setDigitando] = useState(false);
  const [parcial, setParcial] = useState("");

  const agenda = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

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
      setMsgs(conversa);
      return;
    }

    let cancelado = false;

    const rodar = () => {
      setMsgs([]);
      setParcial("");
      setDigitando(false);
      let t0 = 500;

      conversa.forEach((m) => {
        if (m.de === "user") {
          agenda(() => !cancelado && setMsgs((p) => [...p, m]), t0);
          t0 += 900;
        } else {
          agenda(() => !cancelado && setDigitando(true), t0);
          t0 += 1400;
          agenda(() => {
            if (cancelado) return;
            setDigitando(false);
            let i = 0;
            const escrever = () => {
              if (cancelado) return;
              i += 1;
              setParcial(m.txt.slice(0, i));
              if (i < m.txt.length) {
                const c = m.txt[i - 1];
                /* pausa maior depois de pontuação: é o que dá
                   naturalidade em vez de metralhadora de letras */
                const espera = ".,!?—".includes(c)
                  ? 140
                  : 18 + Math.random() * 26;
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
          }, t0);
          t0 += m.txt.length * 34 + 700;
        }
      });

      agenda(() => !cancelado && rodar(), t0 + 3200);
    };

    rodar();
    return () => {
      cancelado = true;
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visivel]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, parcial, digitando]);

  const Bolha = ({ de, children }: { de: "user" | "aria"; children: React.ReactNode }) => {
    const eUser = de === "user";
    return (
      <div className={`mb-2.5 flex ${eUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-snug ${
            eUser
              ? "bg-white/10 text-white/90"
              : "bg-cyan font-medium text-navy-deep"
          }`}
          style={{
            borderRadius: eUser ? "14px 14px 3px 14px" : "14px 14px 14px 3px",
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div ref={ref} className="w-full">
      <style>{`
        @keyframes ariaPulso {
          0%,60%,100% { opacity:.35; transform:translateY(0) }
          30%         { opacity:1;   transform:translateY(-3px) }
        }
        @keyframes ariaCursor { 0%,49%{opacity:1} 50%,100%{opacity:0} }
      `}</style>

      <div className="overflow-hidden rounded-xl border border-cyan/20 bg-navy-deep">
        {/* cabeçalho */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan text-[13px] font-bold text-navy-deep">
            AR
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight text-mist">ARIA</div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {t("status")}
            </div>
          </div>
        </div>

        {/* conversa */}
        <div ref={scrollRef} className="h-[270px] overflow-y-auto px-4 py-4">
          {msgs.map((m, i) => (
            <Bolha key={i} de={m.de}>
              {m.txt}
            </Bolha>
          ))}

          {digitando && (
            <div className="mb-2.5 flex justify-start">
              <div
                className="flex items-center gap-1.5 bg-cyan px-4 py-3"
                style={{ borderRadius: "14px 14px 14px 3px" }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="block h-1.5 w-1.5 rounded-full bg-navy-deep"
                    style={{
                      animation: `ariaPulso 1.2s ${i * 0.16}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {parcial && (
            <Bolha de="aria">
              {parcial}
              <span
                className="ml-0.5 inline-block h-[13px] w-[2px] align-middle bg-navy-deep"
                style={{ animation: "ariaCursor 1s infinite" }}
              />
            </Bolha>
          )}
        </div>

        {/* campo decorativo */}
        <div className="border-t border-white/10 px-4 py-3">
          <div className="rounded-full bg-white/5 px-4 py-2.5 text-[13px] text-white/30">
            {t("placeholder")}
          </div>
        </div>
      </div>
    </div>
  );
}
