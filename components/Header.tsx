"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-navy-deep/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="#" className="flex items-center gap-2">
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

        <nav className="hidden items-center gap-7 text-sm text-white/60 sm:flex">
          <a href="#servicos" className="hover:text-mist">
            {t("services")}
          </a>
          <a href="#cases" className="hover:text-mist">
            {t("cases")}
          </a>
          <a href="#sobre" className="hover:text-mist">
            {t("about")}
          </a>
          <a href="#contato" className="hover:text-mist">
            {t("contact")}
          </a>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
