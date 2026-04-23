"use client";

import { motion } from "framer-motion";
import { TrendingUp, CreditCard, AlertCircle, TrendingDown } from "lucide-react";

const stats = [
  {
    label: "GASTO NO MÊS",
    value: "R$ 3.240",
    delta: "↑ 12% vs março",
    deltaColor: "#f87171",
    icon: TrendingUp,
    iconColor: "#a78bfa",
    iconBg: "rgba(124, 58, 237, 0.15)",
    highlight: true,
  },
  {
    label: "LIMITE TOTAL",
    value: "R$ 12.500",
    delta: "72% disponível",
    deltaColor: "#34d399",
    icon: CreditCard,
    iconColor: "#34d399",
    iconBg: "rgba(52, 211, 153, 0.12)",
    highlight: false,
  },
  {
    label: "FATURA MAIS PRÓXIMA",
    value: "R$ 1.820",
    delta: "Vence em 3 dias",
    deltaColor: "#fbbf24",
    icon: AlertCircle,
    iconColor: "#fbbf24",
    iconBg: "rgba(251, 191, 36, 0.12)",
    highlight: false,
  },
  {
    label: "GASTOS ACIMA DO PADRÃO",
    value: "R$ 640",
    delta: "2 categorias em alerta",
    deltaColor: "#f87171",
    icon: TrendingDown,
    iconColor: "#f87171",
    iconBg: "rgba(248, 113, 113, 0.12)",
    highlight: false,
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="rounded-[14px] p-3.5 cursor-default"
            style={{
              background: stat.highlight
                ? "rgba(124, 58, 237, 0.12)"
                : "rgba(255,255,255,0.03)",
              border: stat.highlight
                ? "1px solid rgba(124, 58, 237, 0.25)"
                : "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start justify-between mb-2.5">
              <p
                className="text-[10px] font-semibold tracking-wider leading-tight"
                style={{ color: "#475569" }}
              >
                {stat.label}
              </p>
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: stat.iconBg }}
              >
                <Icon size={13} style={{ color: stat.iconColor }} />
              </div>
            </div>
            <p
              className="text-xl font-bold mb-1"
              style={{ color: "#f1f5f9", letterSpacing: "-0.03em" }}
            >
              {stat.value}
            </p>
            <p className="text-[10px]" style={{ color: stat.deltaColor }}>
              {stat.delta}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}