import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import { Space_Grotesk, Inter } from "next/font/google";
import { locales } from "@/i18n/config";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import "../globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

const BASE = "https://rovieso.com.br";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Metadados por idioma. Substitui o antigo `export const metadata`,
// que era estatico e servia o mesmo titulo as tres versoes do site.
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(BASE),
    title: { default: t("title"), template: "%s | Rovieso" },
    description: t("description"),

    alternates: {
      canonical: `${BASE}/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}`])),
        "x-default": `${BASE}/pt-PT`,
      },
    },

    icons: {
      icon: [
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/favicon-192.png",
    },

    openGraph: {
      type: "website",
      url: `${BASE}/${locale}`,
      siteName: "Rovieso",
      title: t("title"),
      description: t("description"),
      locale: locale.replace("-", "_"),
      images: ["/brand/logo-full.png"],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/brand/logo-full.png"],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },

    // Descomentar depois de obter o codigo no Search Console:
    // verification: { google: "COLE_AQUI_O_CODIGO" },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
