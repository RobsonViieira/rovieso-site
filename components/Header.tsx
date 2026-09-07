"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

/* Cabeçalho com navegação por scroll.

   Três coisas que o anterior não tinha:

   1. MENU NO MOBILE — antes era `hidden sm:flex`, então no celular
      só apareciam logo e idioma. A maior parte do tráfego é mobile.

   2. SEÇÃO ATIVA — IntersectionObserver marca em qual seção o
      visitante está. Sem isso, menu fixo em página longa vira
      decoração: a pessoa não sabe onde está nem quanto falta.

   3. LINKS ABSOLUTOS FORA DA HOME — em /privacidade, uma âncora
      "#servicos" não leva a lugar nenhum. Aqui o link vira
      "/pt-BR#servicos" quando o usuário não está na home. */

const SECOES = [
  { id: "servicos", chave: "services" },
  { id: "cases", chave: "cases" },
  { id: "investimento", chave: "pricing" },
  { id: "sobre", chave: "about" },
  { id: "faq", chave: "faq" },
  { id: "contato", chave: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const naHome = pathname === `/${locale}` || pathname === "/";
  const [ativa, setAtiva] = useState<string>("");
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [progresso, setProgresso] = useState(0);

  /* barra de progresso + estado compacto ao rolar */
  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(total > 0 ? (y / total) * 100 : 0);
      setRolou(y > 24);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  /* qual seção está na tela */
  useEffect(() => {
    if (!naHome) return;
    const alvos = SECOES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (!alvos.length) return;

    const obs = new IntersectionObserver(
      (entradas) => {
        const visiveis = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visiveis[0]) setAtiva(visiveis[0].target.id);
      },
      /* a faixa central da tela decide qual seção está "ativa" —
         topo e base ficam de fora para evitar troca a cada pixel */
      { rootMargin: "-45% 0px -45% 0px" }
    );
    alvos.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [naHome]);

  /* trava o scroll do corpo com o menu aberto */
  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  /* fecha com Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const href = (id: string) => (naHome ? `#${id}` : `/${locale}#${id}`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          rolou
            ? "border-white/10 bg-navy-deep/90 backdrop-blur-md"
            : "border-transparent bg-navy-deep/60 backdrop-blur-sm"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-6 ${
            rolou ? "py-2.5" : "py-3.5"
          }`}
        >
          <a href={`/${locale}`} className="flex shrink-0 items-center gap-2">
            <Image
              src="/brand/logo-icon.png"
              alt="Rovieso"
              width={28}
              height={28}
              className="h-7 w-7 rounded-md"
              priority
            />
            <span className="font-display text-sm font-semibold tracking-wide text-mist">
              ROVIESO
            </span>
          </a>

          {/* navegação em telas médias para cima */}
          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {SECOES.map((s) => {
              const on = ativa === s.id && naHome;
              return (
                <a
                  key={s.id}
                  href={href(s.id)}
                  className={`relative py-1 transition-colors ${
                    on ? "text-cyan" : "text-white/55 hover:text-mist"
                  }`}
                >
                  {t(s.chave)}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-cyan transition-all duration-300 ${
                      on ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {/* botão do menu — só abaixo de lg */}
            <button
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? t("fechar") : t("abrir")}
              aria-expanded={aberto}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-mist transition-all duration-300 ${
                    aberto ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-4 bg-mist transition-opacity duration-200 ${
                    aberto ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-mist transition-all duration-300 ${
                    aberto ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* progresso de leitura */}
        <div
          className="h-px origin-left bg-cyan transition-transform duration-150"
          style={{ transform: `scaleX(${progresso / 100})` }}
          aria-hidden
        />
      </header>

      {/* painel mobile */}
      <div
        onClick={() => setAberto(false)}
        className={`fixed inset-0 z-40 bg-navy-deep/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          aberto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <nav
        aria-label={t("menu")}
        className={`fixed inset-x-0 top-[57px] z-40 border-b border-white/10 bg-navy-deep px-5 pb-6 pt-2 transition-all duration-300 lg:hidden ${
          aberto
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {SECOES.map((s, i) => (
          <a
            key={s.id}
            href={href(s.id)}
            onClick={() => setAberto(false)}
            style={{ transitionDelay: aberto ? `${i * 35}ms` : "0ms" }}
            className={`flex items-center justify-between border-b border-white/5 py-3.5 text-[15px] transition-all duration-300 ${
              ativa === s.id && naHome ? "text-cyan" : "text-white/70"
            } ${aberto ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"}`}
          >
            {t(s.chave)}
            <span className="font-mono text-[11px] text-white/25">
              0{i + 1}
            </span>
          </a>
        ))}

        <a
          href={href("contato")}
          onClick={() => setAberto(false)}
          className="mt-5 block rounded-lg bg-cyan px-5 py-3.5 text-center text-sm font-semibold text-navy-deep"
        >
          {t("cta")}
        </a>
      </nav>
    </>
  );
}
