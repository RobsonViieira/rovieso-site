import type { Metadata } from "next";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "termos" });
  return {
    title: t("titulo"),
    description: t("meta"),
    alternates: { canonical: `https://rovieso.com.br/${locale}/termos` },
  };
}

export default function Termos({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Header />
      <LegalPage locale={locale} chave="termos" />
      <Footer />
    </>
  );
}
