"use client";

import { motion } from "framer-motion";
import { CreditCard, DollarSign, Percent, LayoutGrid } from "lucide-react";
import type { CreditCard as CreditCardType } from "../page";

interface Props {
  cards: CreditCardType[];
}

export function CardsSummary({ cards }: Props) {
  const totalLimite = cards.reduce((sum, c) => sum + c.limite, 0);
  const totalGasto = cards.reduce((sum, c) => sum + c.gasto, 0);
  const percentual = Math.round((totalGasto / totalLimite) * 100);

  const stats = [
    {
      label: "LIMITE TOTAL",
      value: `R$ ${totalLimite.toLocaleString("pt-BR")}`,
      sub: "somado de todos os cartões",
      subColor: "#64748b",
      icon: DollarSign,
      iconColor: "#a78bfa",
      iconBg: "rgba(124,58,237,0.15)",
    },
    {
      label: "GASTO NO MÊS",
      value: `R$ ${totalGasto.toLocaleString("pt-BR")}`,
      sub: "total utilizado",
      subColor: "#64748b",
      icon: CreditCard,
      iconColor: "#34d399",
      iconBg: "rgba(52,211,153,0.12)",
    },
    {
      label: "USO MÉDIO",
      value: `${percentual}%`,
      sub: percentual < 50 ? "Confortável" : percentual < 80 ? "Atenção" : "Crítico",
      subColor: percentual < 50 ? "#34d399" : percentual < 80 ? "#fbbf24" : "#f87171",
      icon: Percent,
      iconColor: percentual < 50 ? "#34d399" : percentual < 80 ? "#fbbf24" : "#f87171",
      iconBg:
        percentual < 50
          ? "rgba(52,211,153,0.12)"
          : percentual < 80
          ? "rgba(251,191,36,0.12)"
          : "rgba(248,113,113,0.12)",
    },
    {
      label: "CARTÕES ATIVOS",
      value: `${cards.length}`,
      sub: `cartão${cards.length !== 1 ? "s" : ""} cadastrado${cards.length !== 1 ? "s" : ""}`,
      subColor: "#64748b",
      icon: LayoutGrid,
      iconColor: "#60a5fa",
      iconBg: "rgba(96,165,250,0.12)",
    },
  ];

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
            className="rounded-[14px] p-3.5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-start justify-between mb-2.5">
              <p className="text-[10px] font-semibold tracking-wider" style={{ color: "#475569" }}>
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
            <p className="text-[10px]" style={{ color: stat.subColor }}>
              {stat.sub}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}