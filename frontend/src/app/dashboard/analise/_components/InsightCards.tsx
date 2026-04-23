"use client";

import { TrendingUp, Smile, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";
import type { MonthData, Category } from "../page";

interface Props {
  data: MonthData[];
}

const CATEGORIES: Category[] = [
  "Alimentação",
  "Transporte",
  "Assinaturas",
  "Saúde",
  "Lazer",
  "Outros",
];

const SUBSCRIPTIONS = [
  { nome: "Netflix", valor: 55 },
  { nome: "Spotify", valor: 22 },
  { nome: "Apple TV+", valor: 21 },
];

export function InsightCards({ data }: Props) {
  const crescimento = useMemo(() => {
    if (data.length < 2) return null;
    const primeiro = data[0];
    const ultimo = data[data.length - 1];
    let maxGrowth = { cat: "" as Category, pct: -Infinity };
    for (const cat of CATEGORIES) {
      const ini = primeiro[cat] || 0;
      const fim = ultimo[cat] || 0;
      if (ini > 0) {
        const pct = ((fim - ini) / ini) * 100;
        if (pct > maxGrowth.pct) maxGrowth = { cat, pct };
      }
    }
    return maxGrowth;
  }, [data]);

  const melhorMes = useMemo(() => {
    return data.reduce(
      (best, d) => (d.total < best.total ? d : best),
      data[0]
    );
  }, [data]);

  const media = useMemo(
    () => data.reduce((s, d) => s + d.total, 0) / data.length,
    [data]
  );

  const totalAssinaturas = SUBSCRIPTIONS.reduce((s, a) => s + a.valor, 0);

  const cards = [
    {
      icon: TrendingUp,
      iconColor: "#f87171",
      iconBg: "rgba(248,113,113,0.12)",
      title: "Maior crescimento",
      main: crescimento
        ? `${crescimento.cat} cresceu ${Math.abs(Math.round(crescimento.pct))}%`
        : "Dados insuficientes",
      sub: "no período selecionado",
    },
    {
      icon: Smile,
      iconColor: "#34d399",
      iconBg: "rgba(52,211,153,0.12)",
      title: "Melhor mês",
      main: melhorMes
        ? `${melhorMes.mes} — R$ ${melhorMes.total.toLocaleString("pt-BR")}`
        : "—",
      sub: melhorMes
        ? `${Math.round(((media - melhorMes.total) / media) * 100)}% abaixo da média`
        : "",
    },
    {
      icon: Radio,
      iconColor: "#a78bfa",
      iconBg: "rgba(167,139,250,0.12)",
      title: "Assinaturas recorrentes",
      main: `R$ ${totalAssinaturas}/mês`,
      sub: SUBSCRIPTIONS.map((s) => s.nome).join(", "),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: card.iconBg }}
              >
                <Icon size={14} style={{ color: card.iconColor }} />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#334155" }}>
                {card.title}
              </p>
            </div>
            <p className="text-sm font-bold mb-1" style={{ color: "#f1f5f9" }}>
              {card.main}
            </p>
            <p className="text-[10px] leading-relaxed" style={{ color: "#475569" }}>
              {card.sub}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}