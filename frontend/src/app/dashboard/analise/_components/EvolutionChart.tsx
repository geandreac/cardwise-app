"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { CATEGORY_COLORS } from "../page";
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

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s: number, p: any) => s + (p.value || 0), 0);
  return (
    <div
      className="rounded-xl p-3 text-xs"
      style={{
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        minWidth: "160px",
      }}
    >
      <p className="font-semibold mb-2" style={{ color: "#f1f5f9" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full" style={{ background: p.fill }} />
            <span style={{ color: "#64748b" }}>{p.name}</span>
          </div>
          <span style={{ color: "#f1f5f9" }}>
            R$ {p.value.toLocaleString("pt-BR")}
          </span>
        </div>
      ))}
      <div
        className="flex items-center justify-between mt-2 pt-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span style={{ color: "#64748b" }}>Total</span>
        <span className="font-semibold" style={{ color: "#a78bfa" }}>
          R$ {total.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}

export function EvolutionChart({ data }: Props) {
  const average = useMemo(
    () => Math.round(data.reduce((s, d) => s + d.total, 0) / data.length),
    [data]
  );

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
            Evolução de gastos
          </p>
          <p className="text-[10px]" style={{ color: "#334155" }}>
            Por categoria ao longo do período
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}
        >
          <div className="h-px w-4" style={{ borderTop: "2px dashed #a78bfa" }} />
          <span className="text-[10px] font-medium" style={{ color: "#a78bfa" }}>
            Média: R$ {average.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="mes"
            tick={{ fill: "#475569", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: "11px", color: "#475569", paddingTop: "12px" }}
          />
          <ReferenceLine
            y={average}
            stroke="#a78bfa"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          {CATEGORIES.map((cat) => (
            <Bar
              key={cat}
              dataKey={cat}
              stackId="a"
              fill={CATEGORY_COLORS[cat]}
              radius={cat === "Outros" ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}