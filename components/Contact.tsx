"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };
    try {
      // Aponta para o endpoint /contato no seu backend FastAPI (EC2)
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/contato",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-medium text-mist sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-white/50">{t("subtitle")}</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            name="name"
            required
            placeholder={t("name")}
            className="focus-ring w-full rounded-lg border border-white/15 bg-navy-deep/60 px-4 py-3 text-sm text-mist placeholder:text-white/35"
          />
          <input
            name="email"
            type="email"
            required
            placeholder={t("email")}
            className="focus-ring w-full rounded-lg border border-white/15 bg-navy-deep/60 px-4 py-3 text-sm text-mist placeholder:text-white/35"
          />
          <textarea
            name="message"
            required
            rows={4}
            placeholder={t("message")}
            className="focus-ring w-full rounded-lg border border-white/15 bg-navy-deep/60 px-4 py-3 text-sm text-mist placeholder:text-white/35"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="focus-ring rounded-lg bg-cyan px-6 py-3 text-sm font-semibold text-navy-deep transition hover:shadow-glow disabled:opacity-60"
          >
            {t("submit")}
          </button>

          {status === "sent" && (
            <p className="text-sm text-cyan-soft">{t("success")}</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-300">{t("error")}</p>
          )}
        </form>

        <p className="mt-6 text-sm text-white/40">
          {t("or")}{" "}
          <a
            href="https://wa.me/5511922143722"
            className="text-cyan-soft underline underline-offset-2"
          >
            WhatsApp →
          </a>
        </p>
      </div>
    </section>
  );
}
