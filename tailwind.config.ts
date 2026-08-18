import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0A0E3F",
        "navy-deep": "#060825",
        indigo: "#4B3F72",
        cyan: "#00D9FF",
        "cyan-soft": "#7FEBFF",
        mist: "#F5F7FA",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "circuit-fade":
          "radial-gradient(circle at 20% 20%, rgba(0,217,255,0.08), transparent 40%), radial-gradient(circle at 80% 60%, rgba(75,63,114,0.25), transparent 45%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(0,217,255,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
