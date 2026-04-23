import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tokens CardWise — sempre dark mode
        cw: {
          bg: "#020617",           // slate-950 — fundo base
          "glass-card": "rgba(255, 255, 255, 0.07)",
          "glass-elevated": "rgba(255, 255, 255, 0.12)",
          "border-glass": "rgba(255, 255, 255, 0.12)",
          "border-hover": "rgba(255, 255, 255, 0.20)",
          "accent-from": "#7c3aed",  // violet-600
          "accent-to": "#4338ca",    // indigo-700
          "accent-hover": "#6d28d9", // violet-700
          "text-primary": "#f1f5f9", // slate-100
          "text-secondary": "#94a3b8", // slate-400
          "text-muted": "#475569",   // slate-600
          success: "#34d399",        // emerald-400
          error: "#f87171",          // red-400
          warning: "#fbbf24",        // amber-400
          info: "#60a5fa",           // blue-400
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "card": "24px",
        "card-inner": "16px",
        "input": "10px",
      },
      backdropBlur: {
        "card": "20px",
        "elevated": "16px",
        "input": "12px",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #7c3aed, #4338ca)",
        "accent-gradient-hover": "linear-gradient(135deg, #6d28d9, #3730a3)",
      },
      keyframes: {
        // Orbs do background animado
        "orb-float-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 15px) scale(0.97)" },
        },
        "orb-float-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-25px, 20px) scale(0.95)" },
          "66%": { transform: "translate(20px, -25px) scale(1.08)" },
        },
        "orb-float-3": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(15px, 10px) scale(1.03)" },
        },
        // Fade in suave para elementos
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Pulse do glow no botão
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 35px rgba(124, 58, 237, 0.5)" },
        },
      },
      animation: {
        "orb-1": "orb-float-1 12s ease-in-out infinite",
        "orb-2": "orb-float-2 16s ease-in-out infinite",
        "orb-3": "orb-float-3 10s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};

export default config;