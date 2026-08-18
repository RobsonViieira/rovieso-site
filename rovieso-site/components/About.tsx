"use client";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="sobre" className="px-6 py-24">
      <div className="mx-auto max-w-3xl border-l-2 border-cyan/30 pl-6 sm:pl-10">
        <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
          {t("body")}
        </p>
        <p className="mt-6 text-sm font-medium uppercase tracking-wide text-cyan-soft">
          {t("signature")}
        </p>
      </div>
    </section>
  );
}
