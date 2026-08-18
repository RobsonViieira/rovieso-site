"use client";

import { useTranslations } from "next-intl";

export default function Cases() {
  const t = useTranslations("cases");
  const tags = [
    t("slrTag1"),
    t("slrTag2"),
    t("slrTag3"),
    t("slrTag4"),
  ];

  return (
    <section id="cases" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-lg">
          <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-white/50">{t("subtitle")}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo/30 to-navy-deep">
          <div className="grid grid-cols-1 gap-8 p-8 sm:p-10 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="font-display text-xl font-medium text-mist sm:text-2xl">
                {t("slrTitle")}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                {t("slrDescription")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan/25 px-3 py-1 text-xs text-cyan-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mockup abstrato de dashboard, sem depender de imagem externa */}
            <div className="rounded-xl border border-white/10 bg-navy-deep/60 p-5">
              <div className="flex items-end gap-2 h-24">
                {[40, 65, 50, 85, 60].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t bg-cyan/60"
                  />
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-3/4 rounded bg-white/10" />
                <div className="h-2 w-1/2 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
