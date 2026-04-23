"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthData, Category } from "../page";

interface Props {
  allData: MonthData[];
}

const CATEGORIES: Category[] = [
  "Alimentação",
  "Transporte",
  "Assinaturas",
  "Saúde",
  "Lazer",
  "Outros",
];

const selectStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#f1f5f9",
  borderRadius: "10px",
  padding: "8px 12px",
  fontSize: "12px",
  outline: "none",
  cursor: "pointer",
};

interface TooltipPayloadItem {
  name: string;
  value: number;
  fill: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 text-xs"
      style={{
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <p className="font-semibold mb-2" style={{ color: "#f1f5f9" }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-6 mb-1">
          <span style={{ color: "#64748b" }}>{p.name}</span>
          <span style={{ color: p.fill }}>R$ {p.value.toLocaleString("pt-BR")}</span>
        </div>
      ))}
    </div>
  );
}

export function MonthComparison({ allData }: Props) {
  const months = allData.map((d) => d.mes);
  const [mesA, setMesA] = useState(months[months.length - 2]);
  const [mesB, setMesB] = useState(months[months.length - 1]);

  const dataA = allData.find((d) => d.mes === mesA);
  const dataB = allData.find((d) => d.mes === mesB);

  const chartData = useMemo(() => {
    if (!dataA || !dataB) return [];
    return CATEGORIES.map((cat) => ({
      categoria: cat,
      [mesA]: dataA[cat] || 0,
      [mesB]: dataB[cat] || 0,
    }));
  }, [dataA, dataB, mesA, mesB]);

  const tableData = useMemo(() => {
    if (!dataA || !dataB) return [];
    return CATEGORIES.map((cat) => {
      const a = dataA[cat] || 0;
      const b = dataB[cat] || 0;
      const diff = b - a;
      const pct = a > 0 ? Math.round((diff / a) * 100) : 0;
      return { cat, a, b, diff, pct };
    }).sort((x, y) => Math.abs(y.diff) - Math.abs(x.diff));
  }, [dataA, dataB]);

  return (
    <div className="flex flex-col gap-4">
      {/* Seletores */}
      <div
        className="rounded-2xl p-4 flex items-center gap-4 flex-wrap"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <p className="text-xs font-semibold" style={{ color: "#475569" }}>Comparar</p>
        <select
          style={selectStyle}
          value={mesA}
          onChange={(e) => setMesA(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m} style={{ background: "#0a0f1a" }}>{m}</option>
          ))}
        </select>
        <p className="text-xs" style={{ color: "#334155" }}>com</p>
        <select
          style={selectStyle}
          value={mesB}
          onChange={(e) => setMesB(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m} style={{ background: "#0a0f1a" }}>{m}</option>
          ))}
        </select>
      </div>

      {/* Gráfico */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="categoria"
              tick={{ fill: "#475569", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#475569", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => `R$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Legend wrapperStyle={{ fontSize: "11px", color: "#475569", paddingTop: "12px" }} />
            <Bar dataKey={mesA} fill="#7c3aed" radius={[4, 4, 0, 0]} />
            <Bar dataKey={mesB} fill="#34d399" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela de diferenças */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="grid grid-cols-5 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider"
          style={{
            color: "#334155",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span>Categoria</span>
          <span className="text-right">{mesA}</span>
          <span className="text-right">{mesB}</span>
          <span className="text-right">Diferença</span>
          <span className="text-right">Variação</span>
        </div>
        {tableData.map((row, i) => {
          const isUp = row.diff > 0;
          return (
            <div
              key={row.cat}
              className="grid grid-cols-5 px-4 py-3 text-xs"
              style={{
                borderBottom: i < tableData.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              }}
            >
              <span className="font-medium" style={{ color: "#94a3b8" }}>
                {row.cat}
              </span>
              <span className="text-right" style={{ color: "#64748b" }}>
                R$ {row.a.toLocaleString("pt-BR")}
              </span>
              <span className="text-right" style={{ color: "#64748b" }}>
                R$ {row.b.toLocaleString("pt-BR")}
              </span>
              <span className="text-right font-semibold" style={{ color: isUp ? "#f87171" : "#34d399" }}>
                {isUp ? "+" : ""}R$ {Math.abs(row.diff).toLocaleString("pt-BR")}
              </span>
              <span className="text-right font-semibold" style={{ color: isUp ? "#f87171" : "#34d399" }}>
                {isUp ? "↑" : "↓"} {Math.abs(row.pct)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}