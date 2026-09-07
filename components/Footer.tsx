"use client";

import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-5 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-white/35 sm:flex-row">
          <p>ROVIESO — {t("tagline")}</p>
          {/* Links legais no rodapé: exigência prática de LGPD/RGPD —
              a política precisa estar acessível de qualquer página. */}
          <nav className="flex items-center gap-5">
            <a href={`/${locale}/privacidade`} className="transition hover:text-cyan">
              {t("privacidade")}
            </a>
            <a href={`/${locale}/termos`} className="transition hover:text-cyan">
              {t("termos")}
            </a>
          </nav>
        </div>
        <p className="mt-5 text-center text-xs text-white/25 sm:text-left">
          © {year} Rovieso. {t("rights")} · {t("cnpj")}
        </p>
      </div>
    </footer>
  );
}
