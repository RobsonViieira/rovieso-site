import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Space_Grotesk, Inter } from "next/font/google";
import { locales } from "@/i18n/config";
import Analytics from "@/components/Analytics";
import "../globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: "Rovieso — Automação, IA e Sistemas Sob Medida",
  description:
    "Automação, chatbots com IA, engenharia de dados e sistemas web sob medida.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/favicon-192.png",
  },
  openGraph: {
    title: "Rovieso — Automação, IA e Sistemas Sob Medida",
    description:
      "Automação, chatbots com IA, engenharia de dados e sistemas web sob medida.",
    images: ["/brand/logo-full.png"],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
