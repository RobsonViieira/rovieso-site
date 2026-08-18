export const locales = ["pt-BR", "pt-PT", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt-BR";

export const localeNames: Record<Locale, string> = {
  "pt-BR": "Português (BR)",
  "pt-PT": "Português (PT)",
  es: "Español",
};
