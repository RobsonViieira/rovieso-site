"use client";

import Script from "next/script";

/**
 * Google Analytics 4.
 * Configure a variável NEXT_PUBLIC_GA_ID na Vercel com seu ID
 * de medição (formato G-XXXXXXXXXX). Se não estiver definida,
 * o componente simplesmente não carrega nada.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
