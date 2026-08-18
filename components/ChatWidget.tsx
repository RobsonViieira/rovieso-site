"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const t = useTranslations("chat");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  async function sendMessage() {
    if (!input.trim()) return;
    const next: Message[] = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Chama o endpoint /chat no seu backend FastAPI (EC2)
      // que usa o system prompt do Agente Comercial da Rovieso.
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "Erro ao conectar. Tenta novamente em instantes.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-2xl border border-cyan/25 bg-navy-deep shadow-2xl sm:w-[360px]"
          >
            <div className="border-b border-white/10 bg-indigo/30 px-4 py-3">
              <p className="text-sm font-semibold text-mist">Rovieso</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
              <div className="max-w-[85%] rounded-lg rounded-bl-none bg-white/8 px-3 py-2 text-sm text-white/80">
                {t("greeting")}
              </div>
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "ml-auto rounded-br-none bg-cyan/90 text-navy-deep"
                      : "rounded-bl-none bg-white/8 text-white/80"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="max-w-[60%] rounded-lg rounded-bl-none bg-white/8 px-3 py-2 text-sm text-white/40">
                  …
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={t("placeholder")}
                className="focus-ring flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-mist placeholder:text-white/35"
              />
              <button
                onClick={sendMessage}
                className="focus-ring rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-navy-deep"
              >
                →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="focus-ring flex items-center gap-2 rounded-full bg-cyan px-5 py-3 text-sm font-semibold text-navy-deep shadow-glow transition hover:brightness-105"
      >
        {t("bubble")}
      </button>
    </div>
  );
}
