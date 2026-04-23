"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type AlertType = "danger" | "warn" | "info";

const alerts: { type: AlertType; title: string; detail: string }[] = [
  {
    type: "danger",
    title: "C6 Bank a 91% do limite.",
    detail: "Com base nos seus hábitos, você ultrapassa o limite em ~5 dias.",
  },
  {
    type: "warn",
    title: "Fatura Nubank vence em 3 dias.",
    detail: "R$ 1.820 pendentes — pague até 23/04 para evitar juros.",
  },
  {
    type: "warn",
    title: "Lazer 68% acima da média.",
    detail: "Você costumava gastar R$ 480 — este mês já são R$ 810.",
  },
  {
    type: "info",
    title: "3 assinaturas não usadas.",
    detail: "Spotify, Apple TV+ e Canva detectados sem uso nos últimos 30 dias.",
  },
];

const alertStyles: Record<AlertType, { color: string; bg: string; border: string }> = {
  danger: {
    color: "#f87171",
    bg: "rgba(248, 113, 113, 0.08)",
    border: "rgba(248, 113, 113, 0.15)",
  },
  warn: {
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.08)",
    border: "rgba(251, 191, 36, 0.15)",
  },
  info: {
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.08)",
    border: "rgba(96, 165, 250, 0.15)",
  },
};

export function AlertsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="rounded-[14px] p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={13} style={{ color: "#a78bfa" }} />
        <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
          Alertas inteligentes
        </p>
        <span className="text-[10px] ml-auto" style={{ color: "#334155" }}>
          IA · atualizado há 2h
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {alerts.map((alert, i) => {
          const style = alertStyles[alert.type];
          return (
            <motion.div
              key={alert.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.45 + i * 0.05 }}
              className="rounded-xl p-3.5"
              style={{
                background: style.bg,
                border: `0.5px solid ${style.border}`,
              }}
            >
              <div className="flex items-start gap-2 mb-1">
                <span
                  className="h-1.5 w-1.5 rounded-full flex-shrink-0 mt-1"
                  style={{ background: style.color }}
                />
                <p
                  className="text-[11px] font-semibold leading-snug"
                  style={{ color: style.color }}
                >
                  {alert.title}
                </p>
              </div>
              <p
                className="text-[10px] leading-relaxed pl-3.5"
                style={{ color: "#64748b" }}
              >
                {alert.detail}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}