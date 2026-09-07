import { getTranslations } from "next-intl/server";

/* Página legal (privacidade e termos).

   Server component de propósito: é texto estático, indexável, e não
   precisa de JS no cliente. Índice lateral usa âncora nativa em vez
   de scroll suave por script — funciona sem JS e é acessível. */

type Secao = { id: string; titulo: string; corpo: string[] };

export default async function LegalPage({
  locale,
  chave,
}: {
  locale: string;
  chave: "privacidade" | "termos";
}) {
  const t = await getTranslations({ locale, namespace: chave });
  const secoes = t.raw("secoes") as Secao[];

  return (
    <main className="px-5 pb-20 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-6 text-sm text-white/40">
          <a href={`/${locale}`} className="hover:text-cyan">
            {t("inicio")}
          </a>
          <span className="mx-2">/</span>
          <span>{t("titulo")}</span>
        </nav>

        <h1 className="font-display text-3xl font-medium text-mist sm:text-4xl">
          {t("titulo")}
        </h1>
        <p className="mt-3 text-sm text-white/45">{t("atualizado")}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* índice — vira lista rolável no mobile */}
          <nav
            aria-label={t("indice")}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-white/35">
              {t("indice")}
            </p>
            <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
              {secoes.map((s, i) => (
                <li key={s.id} className="shrink-0 lg:shrink">
                  <a
                    href={`#${s.id}`}
                    className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-white/50 transition hover:bg-cyan/10 hover:text-cyan lg:whitespace-normal"
                  >
                    {i + 1}. {s.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="max-w-2xl">
            {secoes.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-display mt-10 text-lg font-medium text-mist first:mt-0">
                  {i + 1}. {s.titulo}
                </h2>
                {s.corpo.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <div className="mt-14 rounded-xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/60">{t("contatoTexto")}</p>
              <a
                href="mailto:contato@rovieso.com.br"
                className="mt-2 inline-block text-sm font-medium text-cyan hover:underline"
              >
                contato@rovieso.com.br
              </a>
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
