"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-white/35 sm:flex-row">
        <p>ROVIESO — {t("tagline")}</p>
        <p>
          © {year} Rovieso. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
