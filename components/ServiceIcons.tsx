"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════════════
   ROVIESO — ilustrações de serviço, versão 5

   Duas mudanças desta versão:

   1. TIPOGRAFIA — saiu a mono do sistema, entrou Space Mono. É a
      companheira do Space Grotesk que o site já usa, então o
      conjunto fica coeso, e tem caráter próprio em vez do desenho
      genérico que todo SO entrega.

   2. ANOTAÇÃO — cada peça agora explica a si mesma com valores
      reais, linhas de chamada e rodapé de conclusão. O visitante
      entende o serviço olhando, sem depender do texto do card.

   COR
     laranja #FF7A29 → como é hoje: manual, divergente, o problema
     ciano   #00D9FF → como fica:  automático, conferido, o resultado
   ═══════════════════════════════════════════════════════════════════ */

const NAVY = "#0A0E3F";
const CYAN = "#00D9FF";
const LARANJA = "#FF7A29";
const VERDE = "#3ED598";
const TRACO = "rgba(255,255,255,.24)";
const FRACO = "rgba(255,255,255,.10)";
const PAPEL = "rgba(255,255,255,.05)";

export const iconStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

  .rv-svg{display:block;width:100%;height:auto;background:${NAVY};border-radius:12px}
  .rv-svg text{font-family:'Space Mono',ui-monospace,monospace}
  .rv-h  {font-size:6.5px;font-weight:700;fill:rgba(255,255,255,.72);letter-spacing:.6px}
  .rv-l  {font-size:5.6px;fill:rgba(255,255,255,.46);letter-spacing:.3px}
  .rv-xs {font-size:4.8px;fill:rgba(255,255,255,.32);letter-spacing:.3px}
  .rv-v  {font-size:5.4px;fill:rgba(255,255,255,.62)}
  .rv-num{font-size:9px;font-weight:700;letter-spacing:-.2px}

  @keyframes rvCheck{0%,8%{opacity:0;transform:scale(.4)}
                     18%,92%{opacity:1;transform:scale(1)}
                     100%{opacity:0;transform:scale(.4)}}
  .rv-check{animation:rvCheck 5.5s ease-out infinite;transform-box:fill-box;
            transform-origin:center}

  @keyframes rvScan{0%{transform:translateY(0);opacity:0}
                    10%{opacity:.9}90%{opacity:.9}
                    100%{transform:translateY(78px);opacity:0}}
  .rv-scan{animation:rvScan 5.5s linear infinite}

  @keyframes rvBolha{0%,10%{opacity:0;transform:translateY(6px)}
                     20%,88%{opacity:1;transform:none}
                     100%{opacity:0;transform:translateY(6px)}}
  .rv-b1{animation:rvBolha 7s ease-out infinite}
  .rv-b2{animation:rvBolha 7s ease-out infinite;animation-delay:1.5s}
  .rv-b3{animation:rvBolha 7s ease-out infinite;animation-delay:3.6s}
  @keyframes rvPts{0%,52%{opacity:0}58%,78%{opacity:1}84%,100%{opacity:0}}
  .rv-pts{animation:rvPts 7s ease-in-out infinite}
  @keyframes rvPulaPt{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
  .rv-pt{animation:rvPulaPt 1s ease-in-out infinite}

  @keyframes rvMarca{0%,18%{opacity:0}28%,54%{opacity:1}64%,100%{opacity:0}}
  .rv-marca{animation:rvMarca 6.5s ease-in-out infinite}
  @keyframes rvSome{0%,52%{opacity:.6;transform:none}
                    66%,100%{opacity:0;transform:translateX(16px)}}
  .rv-some{animation:rvSome 6.5s ease-in-out infinite}
  @keyframes rvLimpa{0%,60%{opacity:.1}72%,100%{opacity:1}}
  .rv-limpa{animation:rvLimpa 6.5s ease-out infinite}

  @keyframes rvModulo{0%,6%{opacity:0;transform:translate(12px,-7px)}
                      20%,90%{opacity:1;transform:none}
                      100%{opacity:0;transform:translate(12px,-7px)}}
  .rv-m{animation:rvModulo 6s cubic-bezier(.34,1.15,.5,1) infinite}
  @keyframes rvRecusa{0%,30%{opacity:.55}45%,100%{opacity:.15}}
  .rv-recusa{animation:rvRecusa 6s ease-in-out infinite}

  @keyframes rvSobe{0%{opacity:0;transform:translateY(0)}
                    14%{opacity:1}72%{opacity:1}
                    100%{opacity:0;transform:translateY(-56px)}}
  .rv-sobe{animation:rvSobe 3.6s ease-in-out infinite}
  @keyframes rvOnAir{0%,100%{opacity:.28}50%{opacity:1}}
  .rv-onair{animation:rvOnAir 2s ease-in-out infinite}
  @keyframes rvRecebe{0%,56%{opacity:.18}72%,100%{opacity:1}}
  .rv-recebe{animation:rvRecebe 3.6s ease-out infinite}

  @media (prefers-reduced-motion: reduce){
    .rv-svg *{animation:none !important}
    .rv-check,.rv-b1,.rv-b2,.rv-b3,.rv-m,.rv-limpa,.rv-recebe{opacity:1;transform:none}
    .rv-some,.rv-marca,.rv-pts,.rv-scan{opacity:.45}
  }
`;

/* moldura: grade, cantos, número e faixa de conclusão no rodapé */
const Base = ({ children, titulo, n, antes, depois }:
  { children: React.ReactNode; titulo: string; n: string; antes: string; depois: string }) => (
  <svg viewBox="0 0 300 214" className="rv-svg" role="img" aria-label={titulo}>
    <defs>
      <filter id="gl" x="-70%" y="-70%" width="240%" height="240%">
        <feGaussianBlur stdDeviation="2.2" result="b" />
        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
      <pattern id="gr" width="15" height="15" patternUnits="userSpaceOnUse">
        <path d="M15 0 L0 0 0 15" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth=".5" />
      </pattern>
    </defs>
    <rect width="300" height="214" fill="url(#gr)" />
    {children}

    {/* faixa de conclusão: antes → depois */}
    <line x1="14" y1="190" x2="286" y2="190" stroke={FRACO} strokeWidth=".8" />
    <circle cx="18" cy="202" r="2.4" fill={LARANJA} />
    <text x="25" y="204" className="rv-l">{antes}</text>
    <circle cx="160" cy="202" r="2.4" fill={CYAN} />
    <text x="167" y="204" className="rv-l" style={{ fill: "rgba(255,255,255,.62)" }}>{depois}</text>

    <g stroke={FRACO} strokeWidth=".9" fill="none">
      <path d="M9 18 L9 9 L18 9" /><path d="M282 9 L291 9 L291 18" />
    </g>
    <text x="291" y="15" textAnchor="end" className="rv-xs">{n}</text>
  </svg>
);

/* linha de chamada com rótulo */
const Chamada = ({ x1, y1, x2, y2, texto, anc = "start", cor = TRACO }:
  { x1: number; y1: number; x2: number; y2: number; texto: string; anc?: string; cor?: string }) => (
  <g>
    <path d={`M${x1} ${y1} L${x2} ${y2}`} stroke={cor} strokeWidth=".6" fill="none" />
    <circle cx={x1} cy={y1} r="1.2" fill={cor} />
    <text x={x2 + (anc === "end" ? -3 : 3)} y={y2 + 1.8} textAnchor={anc} className="rv-xs">
      {texto}
    </text>
  </g>
);

/* ── 01 · AUTOMAÇÃO ───────────────────────────────────────────────
   Planilha do financeiro contra o ERP. O script confere os 340
   registros e manda por e-mail só as 4 linhas que não batem. */
export function IconeAutomacao() {
  const linhas = [
    { nf: "4471", pl: "2.840,00", sis: "2.840,00", ok: true },
    { nf: "4472", pl: "1.196,50", sis: "1.196,50", ok: true },
    { nf: "4473", pl: "8.410,00", sis: "8.140,00", ok: false },
    { nf: "4474", pl: "645,20", sis: "645,20", ok: true },
    { nf: "4475", pl: "3.900,00", sis: "—", ok: false },
    { nf: "4476", pl: "12.055,00", sis: "12.055,00", ok: true },
  ];

  return (
    <Base titulo="Script conferindo planilha contra o ERP linha a linha" n="01"
          antes="2h por dia, uma pessoa" depois="6h da manhã, sozinho">
      <text x="14" y="26" className="rv-h">CONFERÊNCIA FINANCEIRA · DIÁRIA</text>

      {/* planilha */}
      <text x="14" y="42" className="rv-l">planilha_financeiro.xlsx</text>
      <rect x="14" y="46" width="88" height="104" rx="2" fill={PAPEL}
            stroke={TRACO} strokeWidth=".9" />
      <rect x="14" y="46" width="88" height="12" fill="rgba(255,122,41,.13)" />
      <text x="19" y="55" className="rv-xs">NF</text>
      <text x="52" y="55" className="rv-xs">VALOR R$</text>
      {linhas.map((l, i) => (
        <g key={l.nf} opacity={l.ok ? 0.75 : 1}>
          <text x="19" y={69 + i * 14} className="rv-v">{l.nf}</text>
          <text x="97" y={69 + i * 14} textAnchor="end" className="rv-v"
                style={{ fill: l.ok ? "rgba(255,255,255,.62)" : LARANJA }}>{l.pl}</text>
          <line x1="17" y1={72 + i * 14} x2="99" y2={72 + i * 14}
                stroke={FRACO} strokeWidth=".4" />
        </g>
      ))}
      <text x="14" y="160" className="rv-xs">340 linhas · digitadas à mão</text>

      {/* comparação */}
      <rect x="106" y="46" width="88" height="104" rx="2" fill="none"
            stroke={FRACO} strokeWidth=".6" strokeDasharray="2 3" />
      <rect x="106" y="46" width="88" height="2" fill={CYAN} opacity=".7"
            className="rv-scan" filter="url(#gl)" />
      <text x="150" y="55" textAnchor="middle" className="rv-xs">COMPARANDO…</text>

      {linhas.map((l, i) => (
        <g key={`c${l.nf}`} className="rv-check" style={{ animationDelay: `${i * 0.24}s` }}>
          <line x1="108" y1={66 + i * 14} x2="192" y2={66 + i * 14}
                stroke={l.ok ? CYAN : LARANJA} strokeWidth=".7"
                strokeDasharray={l.ok ? "0" : "2 2"} opacity={l.ok ? .3 : .75} />
          {l.ok ? (
            <path d={`M147 ${66 + i * 14} l2 2 l3.8 -4.4`} fill="none" stroke={CYAN}
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <g stroke={LARANJA} strokeWidth="1.3" strokeLinecap="round">
              <path d={`M147 ${63.4 + i * 14} l4.6 4.6`} />
              <path d={`M151.6 ${63.4 + i * 14} l-4.6 4.6`} />
            </g>
          )}
        </g>
      ))}

      {/* sistema */}
      <text x="198" y="42" className="rv-l">ERP · consulta automática</text>
      <rect x="198" y="46" width="88" height="104" rx="2"
            fill="rgba(0,217,255,.045)" stroke={CYAN} strokeWidth=".9" opacity=".9" />
      <rect x="198" y="46" width="88" height="12" fill="rgba(0,217,255,.15)" />
      <text x="203" y="55" className="rv-xs">PEDIDO</text>
      <text x="240" y="55" className="rv-xs">TOTAL R$</text>
      {linhas.map((l, i) => (
        <g key={`s${l.nf}`}>
          <text x="203" y={69 + i * 14} className="rv-v">{l.nf}</text>
          <text x="281" y={69 + i * 14} textAnchor="end" className="rv-v"
                style={{ fill: l.ok ? "rgba(255,255,255,.62)" : LARANJA }}>{l.sis}</text>
          <line x1="201" y1={72 + i * 14} x2="283" y2={72 + i * 14}
                stroke={FRACO} strokeWidth=".4" />
        </g>
      ))}
      <text x="286" y="160" textAnchor="end" className="rv-xs">340 registros</text>

      <Chamada x1={99} y1={97} x2={108} y2={175} texto="valor divergente" cor={LARANJA} />
      <Chamada x1={281} y1={125} x2={230} y2={175} texto="nota sem lançamento" anc="start" cor={LARANJA} />

      {/* e-mail */}
      <g className="rv-check" style={{ animationDelay: "1.9s" }}>
        <rect x="112" y="166" width="76" height="16" rx="2.5"
              fill="rgba(255,122,41,.13)" stroke={LARANJA} strokeWidth=".9" />
        <rect x="116" y="170" width="13" height="9" rx="1" fill="none"
              stroke={LARANJA} strokeWidth=".9" />
        <path d="M116 170 l6.5 4.5 l6.5 -4.5" fill="none" stroke={LARANJA}
              strokeWidth=".8" strokeLinejoin="round" />
        <text x="133" y="177" className="rv-xs"
              style={{ fill: "rgba(255,255,255,.8)" }}>4 divergências</text>
      </g>
    </Base>
  );
}

/* ── 02 · CHATBOT ─────────────────────────────────────────────────
   Janela de WhatsApp comercial. O assistente consulta o sistema e
   responde; o que ele não sabe, encaminha com histórico. */
export function IconeChatbot() {
  return (
    <Base titulo="Assistente respondendo consulta com dado do sistema" n="02"
          antes="60% das mensagens repetidas" depois="respondidas em 2 segundos">
      <text x="14" y="26" className="rv-h">WHATSAPP COMERCIAL</text>

      <rect x="40" y="34" width="220" height="148" rx="7"
            fill="rgba(255,255,255,.03)" stroke={TRACO} strokeWidth="1" />
      <line x1="40" y1="54" x2="260" y2="54" stroke={FRACO} strokeWidth=".9" />
      <circle cx="54" cy="44" r="6" fill="none" stroke={CYAN} strokeWidth="1" />
      <circle cx="54" cy="44" r="2.2" fill={CYAN} />
      <text x="66" y="46" className="rv-l" style={{ fill: "rgba(255,255,255,.7)" }}>
        ARIA · assistente
      </text>
      <circle cx="238" cy="44" r="2.4" fill={VERDE} />
      <text x="233" y="46" textAnchor="end" className="rv-xs">24h</text>

      <g className="rv-b1">
        <rect x="122" y="62" width="130" height="24" rx="6"
              fill="rgba(255,122,41,.14)" stroke={LARANJA} strokeWidth=".9" />
        <text x="130" y="72" className="rv-v">Bom dia, cadê o pedido 4471?</text>
        <text x="245" y="82" textAnchor="end" className="rv-xs">09:14 ✓✓</text>
      </g>

      <g className="rv-b2">
        <rect x="48" y="92" width="150" height="42" rx="6"
              fill="rgba(0,217,255,.13)" stroke={CYAN} strokeWidth=".9" />
        <text x="56" y="103" className="rv-v">Saiu do CD ontem 18h20.</text>
        <text x="56" y="113" className="rv-v">Previsão de entrega: hoje</text>
        <text x="56" y="123" className="rv-v">até 17h. NF 4471 · R$ 2.840</text>
        <line x1="56" y1="127" x2="190" y2="127" stroke={CYAN} strokeWidth=".4" opacity=".4" />
        <text x="56" y="131.5" className="rv-xs">09:14 · leu do ERP em 1,8s</text>
      </g>

      <g className="rv-pts">
        <rect x="48" y="140" width="32" height="15" rx="6"
              fill="rgba(0,217,255,.1)" stroke={CYAN} strokeWidth=".7" />
        {[56, 64, 72].map((x, i) => (
          <circle key={x} cx={x} cy="147.5" r="1.7" fill={CYAN} className="rv-pt"
                  style={{ animationDelay: `${i * 0.18}s` }} />
        ))}
      </g>

      <g className="rv-b3">
        <rect x="140" y="140" width="112" height="18" rx="6"
              fill="rgba(255,122,41,.14)" stroke={LARANJA} strokeWidth=".9" />
        <text x="148" y="151" className="rv-v">Consigo antecipar?</text>
      </g>

      <rect x="48" y="164" width="204" height="12" rx="6" fill={PAPEL}
            stroke={FRACO} strokeWidth=".7" />
      <text x="55" y="172.5" className="rv-xs">
        não sabe responder → encaminha com histórico
      </text>

      <Chamada x1={196} y1={122} x2={266} y2={104} texto="dado real" cor={CYAN} />
      <Chamada x1={252} y1={149} x2={272} y2={166} texto="humano" anc="end" cor={LARANJA} />
    </Base>
  );
}

/* ── 03 · DADOS & PIPELINES ───────────────────────────────────────
   O caso real: três arquivos com a mesma prefeitura escrita de
   jeitos diferentes viram um cadastro único. */
export function IconeDados() {
  const arquivos = [
    { y: 40, nome: "cadastro_2024.xlsx", amostra: "PREFEITURA DE ITATIBA" },
    { y: 84, nome: "relacao_estado.xlsx", amostra: "Pref. Mun. de Itatiba", dup: true },
    { y: 128, nome: "anexo_I.pdf", amostra: "PREF MUN ITATIBA" },
  ];

  return (
    <Base titulo="Três arquivos desiguais virando um cadastro único" n="03"
          antes="277 linhas, 3 formatos" depois="150 cadastros, 1 arquivo">
      <text x="14" y="26" className="rv-h">CONSOLIDAÇÃO DE CADASTRO</text>

      {arquivos.map((a, i) => (
        <g key={a.nome}>
          <text x="14" y={a.y - 4} className="rv-xs">{a.nome}</text>
          <rect x="14" y={a.y} width="94" height="36" rx="2" fill={PAPEL}
                stroke={a.dup ? LARANJA : TRACO} strokeWidth=".9"
                className={a.dup ? "rv-marca" : ""} />
          <text x="19" y={a.y + 12} className="rv-v"
                style={{ fill: a.dup ? LARANJA : "rgba(255,255,255,.6)" }}>
            {a.amostra}
          </text>
          <line x1="19" y1={a.y + 20} x2="72" y2={a.y + 20} stroke={TRACO}
                strokeWidth=".8" opacity=".55" className={a.dup ? "rv-some" : ""} />
          <line x1="19" y1={a.y + 27} x2="88" y2={a.y + 27} stroke={TRACO}
                strokeWidth=".8" opacity=".55" />
          <text x="103" y={a.y + 32} textAnchor="end" className="rv-xs">
            {[85, 85, 57][i]} lin.
          </text>
        </g>
      ))}

      <path d="M114 70 L146 96 L146 112 L114 138 Z"
            fill="rgba(255,255,255,.045)" stroke={TRACO} strokeWidth=".9" />
      <text x="130" y="64" textAnchor="middle" className="rv-xs">NORMALIZA</text>
      <text x="130" y="150" textAnchor="middle" className="rv-xs">DEDUPLICA</text>
      <text x="130" y="105" textAnchor="middle" className="rv-xs"
            style={{ fill: CYAN }}>CNPJ</text>

      <rect x="154" y="40" width="132" height="124" rx="3"
            fill="rgba(0,217,255,.05)" stroke={CYAN} strokeWidth="1" opacity=".85" />
      <rect x="154" y="40" width="132" height="13" fill="rgba(0,217,255,.16)" />
      <text x="160" y="49" className="rv-xs">ÓRGÃO</text>
      <text x="228" y="49" className="rv-xs">CNPJ</text>
      <text x="272" y="49" className="rv-xs">UF</text>

      <g className="rv-limpa">
        <text x="160" y="65" className="rv-v"
              style={{ fill: "rgba(255,255,255,.72)" }}>Prefeitura de Itatiba</text>
        <text x="228" y="65" className="rv-v">45.228.851…</text>
        <text x="272" y="65" className="rv-v">SP</text>
      </g>
      {Array.from({ length: 6 }, (_, l) => (
        <g key={l} className="rv-limpa" style={{ animationDelay: `${(l + 1) * 0.11}s` }}>
          <line x1="160" y1={80 + l * 13} x2="216" y2={80 + l * 13}
                stroke={CYAN} strokeWidth="1" opacity=".7" />
          <line x1="228" y1={80 + l * 13} x2="262" y2={80 + l * 13}
                stroke={CYAN} strokeWidth="1" opacity=".5" />
          <line x1="272" y1={80 + l * 13} x2="282" y2={80 + l * 13}
                stroke={CYAN} strokeWidth="1" opacity=".4" />
        </g>
      ))}

      <Chamada x1={108} y1={92} x2={116} y2={176} texto="mesma entidade, 3 grafias" cor={LARANJA} />
      <Chamada x1={230} y1={65} x2={244} y2={176} texto="validado módulo 11" anc="end" cor={CYAN} />
    </Base>
  );
}

/* ── 04 · SISTEMA SOB MEDIDA ──────────────────────────────────────
   O ERP genérico não tem a etapa que a operação usa. A tela é
   montada com as etapas que já existem no papel. */
export function IconeSobMedida() {
  const modulos = [
    { x: 160, y: 68, w: 58, h: 28, r: "RECEBER", d: "conferência na doca" },
    { x: 224, y: 68, w: 58, h: 28, r: "CONFERIR", d: "checklist por lote" },
    { x: 160, y: 102, w: 122, h: 26, r: "SEPARAR POR ROTA", d: "regra própria" },
    { x: 160, y: 134, w: 58, h: 26, r: "EXPEDIR", d: "" },
    { x: 224, y: 134, w: 58, h: 26, r: "RELATÓRIO", d: "" },
  ];

  return (
    <Base titulo="Módulos montados conforme as etapas reais do processo" n="04"
          antes="ERP não prevê 2 etapas" depois="cada tela = uma etapa real">
      <text x="14" y="26" className="rv-h">CONTROLE DE ARMAZÉM</text>

      <text x="14" y="44" className="rv-l">ERP de prateleira</text>
      {[
        { y: 50, r: "ENTRADA PADRÃO", ok: true },
        { y: 78, r: "ESTOQUE PADRÃO", ok: true },
        { y: 106, r: "SEPARAR POR ROTA", ok: false },
        { y: 134, r: "CONFERIR NA DOCA", ok: false },
      ].map((m, i) => (
        <g key={m.r} className={m.ok ? "" : "rv-recusa"}
           style={m.ok ? {} : { animationDelay: `${i * 0.2}s` }}>
          <rect x="14" y={m.y} width="104" height="22" rx="2" fill={PAPEL}
                stroke={m.ok ? TRACO : LARANJA} strokeWidth=".9" opacity={m.ok ? .8 : .7} />
          <text x="20" y={m.y + 14} className="rv-v"
                style={{ fill: m.ok ? "rgba(255,255,255,.5)" : LARANJA }}>{m.r}</text>
          {!m.ok && (
            <g stroke={LARANJA} strokeWidth="1.3" strokeLinecap="round">
              <path d={`M105 ${m.y + 7} l6 8`} /><path d={`M111 ${m.y + 7} l-6 8`} />
            </g>
          )}
        </g>
      ))}
      <text x="14" y="172" className="rv-xs" style={{ fill: LARANJA }}>
        2 de 4 etapas ficam fora
      </text>

      <path d="M124 104 L148 104 M142 98 l6 6 l-6 6" stroke={TRACO}
            strokeWidth="1" fill="none" strokeLinecap="round" />

      <rect x="152" y="40" width="134" height="128" rx="4"
            fill="rgba(255,255,255,.03)" stroke={CYAN} strokeWidth="1" />
      <line x1="152" y1="60" x2="286" y2="60" stroke={FRACO} strokeWidth=".8" />
      <text x="160" y="53" className="rv-l" style={{ fill: "rgba(255,255,255,.6)" }}>
        SLR · seu fluxo
      </text>
      <circle cx="278" cy="50" r="2.2" fill={VERDE} />

      {modulos.map((m, i) => (
        <g key={m.r} className="rv-m" style={{ animationDelay: `${i * 0.3}s` }}>
          <rect x={m.x} y={m.y} width={m.w} height={m.h} rx="2"
                fill="rgba(0,217,255,.09)" stroke={CYAN} strokeWidth=".9" />
          <text x={m.x + 5} y={m.y + 12} className="rv-v"
                style={{ fill: "rgba(255,255,255,.75)" }}>{m.r}</text>
          {m.d && <text x={m.x + 5} y={m.y + 21} className="rv-xs">{m.d}</text>}
        </g>
      ))}

      <Chamada x1={118} y1={117} x2={122} y2={180} texto="etapa que só você tem" cor={LARANJA} />
    </Base>
  );
}

/* ── 05 · DEPLOY EM NUVEM ─────────────────────────────────────────
   git push → servidor → acessível de qualquer lugar, com backup e
   restart automático. */
export function IconeDeploy() {
  return (
    <Base titulo="Publicação automática e aplicação no ar" n="05"
          antes="roda só na sua máquina" depois="no ar, com backup diário">
      <text x="14" y="26" className="rv-h">DO CÓDIGO AO AR</text>

      <text x="14" y="44" className="rv-l">seu repositório</text>
      <rect x="14" y="48" width="76" height="54" rx="3" fill={PAPEL}
            stroke={TRACO} strokeWidth=".9" />
      <line x1="14" y1="60" x2="90" y2="60" stroke={FRACO} strokeWidth=".8" />
      <text x="19" y="57" className="rv-xs">main</text>
      {[70, 78, 86, 94].map((y, i) => (
        <g key={y}>
          <text x="19" y={y + 2} className="rv-xs">{i + 1}</text>
          <line x1="26" y1={y} x2={26 + [50, 36, 56, 30][i]} y2={y}
                stroke={LARANJA} strokeWidth="1" opacity=".5" />
        </g>
      ))}
      <text x="14" y="112" className="rv-xs">$ git push</text>

      <g filter="url(#gl)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x="98" y="120" width="8" height="8" rx="1.5" fill="none"
                stroke={i === 2 ? CYAN : LARANJA} strokeWidth="1.1"
                className="rv-sobe" style={{ animationDelay: `${i * 1.2}s` }} />
        ))}
      </g>
      <text x="102" y="140" textAnchor="middle" className="rv-xs">deploy</text>

      <text x="116" y="44" className="rv-l">servidor</text>
      <rect x="116" y="48" width="74" height="86" rx="3"
            fill="rgba(255,255,255,.04)" stroke={CYAN} strokeWidth="1" />
      {[
        { y: 56, r: "nginx", s: "ssl ok" },
        { y: 74, r: "api", s: "8000" },
        { y: 92, r: "worker", s: "ativo" },
        { y: 110, r: "backup", s: "03h" },
      ].map((p, i) => (
        <g key={p.r}>
          <rect x="121" y={p.y} width="64" height="14" rx="1.5"
                fill="rgba(0,217,255,.07)" stroke={FRACO} strokeWidth=".6" />
          <text x="126" y={p.y + 9.5} className="rv-xs">{p.r}</text>
          <text x="172" y={p.y + 9.5} textAnchor="end" className="rv-xs">{p.s}</text>
          <circle cx="180" cy={p.y + 7} r="1.7" fill={VERDE}
                  className="rv-onair" style={{ animationDelay: `${i * 0.3}s` }} />
        </g>
      ))}
      <text x="153" y="146" textAnchor="middle" className="rv-xs"
            style={{ fill: CYAN }}>99,9% · restart automático</text>

      {[
        { x: 210, y: 52, w: 24, h: 36 },
        { x: 244, y: 52, w: 40, h: 28 },
        { x: 244, y: 88, w: 40, h: 28 },
      ].map((d, i) => (
        <g key={i} className="rv-recebe" style={{ animationDelay: `${i * 0.24}s` }}>
          <rect x={d.x} y={d.y} width={d.w} height={d.h} rx="2.5"
                fill="rgba(0,217,255,.06)" stroke={CYAN} strokeWidth=".9" />
          <line x1={d.x + 4} y1={d.y + 7} x2={d.x + d.w - 4} y2={d.y + 7}
                stroke={CYAN} strokeWidth=".7" opacity=".5" />
          <line x1={d.x + 4} y1={d.y + 12} x2={d.x + d.w - 10} y2={d.y + 12}
                stroke={CYAN} strokeWidth=".7" opacity=".3" />
        </g>
      ))}
      <path d="M192 90 L208 68 M192 90 L242 62 M192 90 L242 100"
            stroke={CYAN} strokeWidth=".7" fill="none" opacity=".3" />
      <text x="284" y="128" textAnchor="end" className="rv-xs">qualquer lugar</text>

      <Chamada x1={185} y1={117} x2={196} y2={172} texto="backup diário no S3" cor={CYAN} />
    </Base>
  );
}
