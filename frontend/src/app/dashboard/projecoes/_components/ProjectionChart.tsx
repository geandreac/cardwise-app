"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import type { DayData } from "../page";

interface Props {
  dayData: DayData[];
  limiteMensal: number;
  extraGasto: number;
  mediadiaria: number;
  hoje: number;
  diasNoMes: number;
}

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: number;
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
        minWidth: "150px",
      }}
    >
      <p className="font-semibold mb-2" style={{ color: "#f1f5f9" }}>
        Dia {label}
      </p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-1">
          <span style={{ color: "#64748b" }}>
            {p.name === "real" ? "Real" : "Projetado"}
          </span>
          <span style={{ color: p.color }}>
            R$ {p.value.toLocaleString("pt-BR")}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ProjectionChart({
  dayData,
  limiteMensal,
  extraGasto,
  mediadiaria,
  hoje,
  diasNoMes,
}: Props) {
  const gastoAtual = dayData.find((d) => d.dia === hoje)?.real ?? 0;

  const chartData = useMemo(() => {
    return dayData.map((d) => {
      if (d.dia <= hoje) {
        return { dia: d.dia, real: d.real, projetado: undefined };
      }
      const proj = gastoAtual + (mediadiaria + extraGasto / (diasNoMes - hoje)) * (d.dia - hoje);
      return { dia: d.dia, real: undefined, projetado: Math.round(proj) };
    });
  }, [dayData, gastoAtual, mediadiaria, extraGasto, hoje, diasNoMes]);

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
            Curva de gastos — Abril 2026
          </p>
          <p className="text-[10px]" style={{ color: "#334155" }}>
            Linha sólida = real · Linha tracejada = projeção
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-4 rounded-full" style={{ background: "#7c3aed" }} />
            <span className="text-[10px]" style={{ color: "#475569" }}>Real</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="h-px w-4"
              style={{ borderTop: "2px dashed #34d399" }}
            />
            <span className="text-[10px]" style={{ color: "#475569" }}>Projeção</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="h-px w-4"
              style={{ borderTop: "2px dashed #f87171" }}
            />
            <span className="text-[10px]" style={{ color: "#475569" }}>Limite</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradProj" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="dia"
            tick={{ fill: "#475569", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}`}
          />
          <YAxis
            tick={{ fill: "#475569", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `R$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={limiteMensal}
            stroke="#f87171"
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "Limite",
              position: "insideTopRight",
              fill: "#f87171",
              fontSize: 10,
            }}
          />
          <ReferenceLine
            x={hoje}
            stroke="rgba(255,255,255,0.15)"
            strokeDasharray="3 3"
            strokeWidth={1}
            label={{
              value: "Hoje",
              position: "insideTopRight",
              fill: "#475569",
              fontSize: 10,
            }}
          />
          <Area
            type="monotone"
            dataKey="real"
            stroke="#7c3aed"
            strokeWidth={2}
            fill="url(#gradReal)"
            dot={false}
            connectNulls={false}
          />
          <Area
            type="monotone"
            dataKey="projetado"
            stroke="#34d399"
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="url(#gradProj)"
            dot={false}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}