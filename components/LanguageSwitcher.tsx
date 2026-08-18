"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { locales, localeNames, type Locale } from "@/i18n/config";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${next}${rest ? `/${rest}` : ""}`);
  }

  return (
    <select
      value={locale}
      onChange={(e) => switchTo(e.target.value as Locale)}
      className="focus-ring rounded-md border border-white/15 bg-transparent px-2 py-1 text-xs text-white/70"
      aria-label="Idioma"
    >
      {locales.map((l) => (
        <option key={l} value={l} className="bg-navy-deep text-mist">
          {localeNames[l]}
        </option>
      ))}
    </select>
  );
}
