"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CreditCard, FileText, Radio } from "lucide-react";
import type { AlertItem } from "../page";

interface Props {
  alerts: AlertItem[];
}

const tipoConfig = {
  limite: { icon: CreditCard, color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  fatura: { icon: FileText, color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  categoria: { icon: AlertTriangle, color: "#fb923c", bg: "rgba(251,146,60,0.12)" },
  assinatura: { icon: Radio, color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
};

const severidadeBadge = {
  alta: { label: "Alta", color: "#f87171", bg: "rgba(248,113,113,0.12)" },
  media: { label: "Média", color: "#fbbf24", bg: "rgba(251,191,36,0.12)" },
  baixa: { label: "Baixa", color: "#34d399", bg: "rgba(52,211,153,0.12)" },
};

export function PredictiveAlerts({ alerts }: Props) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
          Alertas preditivos
        </p>
        <span
          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: "rgba(167,139,250,0.12)", color: "#a78bfa" }}
        >
          IA · ao vivo
        </span>
      </div>

      {alerts.map((alert, i) => {
        const config = tipoConfig[alert.tipo];
        const badge = severidadeBadge[alert.severidade];
        const Icon = config.icon;

        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.07 }}
            className="flex gap-3 rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: config.bg }}
            >
              <Icon size={14} style={{ color: config.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-semibold truncate" style={{ color: "#f1f5f9" }}>
                  {alert.titulo}
                </p>
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: badge.bg, color: badge.color }}
                >
                  {badge.label}
                </span>
              </div>
              <p className="text-[10px] leading-relaxed" style={{ color: "#475569" }}>
                {alert.descricao}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}