"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, Zap, AlertTriangle } from "lucide-react";

interface SummaryData {
  gastoAtual: number;
  limiteMensal: number;
  mediadiaria: number;
  projecaoFinal: number;
  hoje: number;
  diasNoMes: number;
}

interface Props {
  data: SummaryData;
  extraGasto: number;
}

export function ProjectionSummary({ data, extraGasto }: Props) {
  const projecaoComExtra = data.projecaoFinal + extraGasto;
  const pctAtual = Math.round((data.gastoAtual / data.limiteMensal) * 100);
  const pctProjetado = Math.round((projecaoComExtra / data.limiteMensal) * 100);
  const ultrapassaLimite = projecaoComExtra > data.limiteMensal;
  const diasRestantes = data.diasNoMes - data.hoje;

  const cards = [
    {
      icon: TrendingUp,
      iconColor: "#60a5fa",
      iconBg: "rgba(96,165,250,0.12)",
      label: "Gasto até hoje",
      value: `R$ ${data.gastoAtual.toLocaleString("pt-BR")}`,
      sub: `${pctAtual}% do limite mensal`,
    },
    {
      icon: Calendar,
      iconColor: "#a78bfa",
      iconBg: "rgba(167,139,250,0.12)",
      label: "Projeção até dia 30",
      value: `R$ ${projecaoComExtra.toLocaleString("pt-BR")}`,
      sub: ultrapassaLimite
        ? `⚠ ${pctProjetado - 100}% acima do limite`
        : `${pctProjetado}% do limite mensal`,
      subColor: ultrapassaLimite ? "#f87171" : undefined,
    },
    {
      icon: Zap,
      iconColor: "#34d399",
      iconBg: "rgba(52,211,153,0.12)",
      label: "Média diária",
      value: `R$ ${data.mediadiaria.toLocaleString("pt-BR")}`,
      sub: `Baseado nos últimos ${data.hoje} dias`,
    },
    {
      icon: AlertTriangle,
      iconColor: ultrapassaLimite ? "#f87171" : "#fbbf24",
      iconBg: ultrapassaLimite ? "rgba(248,113,113,0.12)" : "rgba(251,191,36,0.12)",
      label: "Dias restantes",
      value: `${diasRestantes} dias`,
      sub: ultrapassaLimite
        ? "Limite será ultrapassado"
        : `Margem: R$ ${(data.limiteMensal - projecaoComExtra).toLocaleString("pt-BR")}`,
      subColor: ultrapassaLimite ? "#f87171" : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: card.iconBg }}
              >
                <Icon size={14} style={{ color: card.iconColor }} />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#334155" }}>
                {card.label}
              </p>
            </div>
            <p className="text-lg font-bold mb-1" style={{ color: "#f1f5f9", letterSpacing: "-0.03em" }}>
              {card.value}
            </p>
            <p className="text-[10px]" style={{ color: card.subColor ?? "#475569" }}>
              {card.sub}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}