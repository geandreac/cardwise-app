"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { MonthData, Category } from "../page";
import { CATEGORY_COLORS } from "../page";

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

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: { fill: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div
      className="rounded-xl px-3 py-2 text-xs"
      style={{
        background: "#0f172a",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
      }}
    >
      <p style={{ color: item.payload.fill }}>{item.name}</p>
      <p className="font-semibold" style={{ color: "#f1f5f9" }}>
        R$ {item.value.toLocaleString("pt-BR")}
      </p>
    </div>
  );
}

export function CategoryBreakdown({ data }: Props) {
  const totals = useMemo(() => {
    const result: { cat: Category; total: number }[] = CATEGORIES.map((cat) => ({
      cat,
      total: data.reduce((s, d) => s + (d[cat] || 0), 0),
    }));
    return result.sort((a, b) => b.total - a.total);
  }, [data]);

  const grandTotal = useMemo(
    () => totals.reduce((s, t) => s + t.total, 0),
    [totals]
  );

  const variations: Record<Category, number> = {
    Alimentação: 8,
    Transporte: -12,
    Assinaturas: 5,
    Saúde: -3,
    Lazer: 24,
    Outros: -18,
  };

  const pieData = totals.map((t) => ({
    name: t.cat,
    value: t.total,
    fill: CATEGORY_COLORS[t.cat],
  }));

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mb-4">
        <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
          Breakdown por categoria
        </p>
        <p className="text-[10px]" style={{ color: "#334155" }}>
          Total no período selecionado
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Gráfico de rosca */}
        <div className="relative">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Centro da rosca */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[10px]" style={{ color: "#334155" }}>Total</p>
            <p className="text-lg font-bold" style={{ color: "#f1f5f9", letterSpacing: "-0.03em" }}>
              R$ {(grandTotal / 1000).toFixed(1)}k
            </p>
          </div>
        </div>

        {/* Ranking de categorias */}
        <div className="flex flex-col gap-2">
          {totals.map((t, i) => {
            const pct = Math.round((t.total / grandTotal) * 100);
            const variation = variations[t.cat];
            const isUp = variation > 0;
            return (
              <div key={t.cat} className="flex items-center gap-2.5">
                <span className="text-[10px] font-bold w-4" style={{ color: "#334155" }}>
                  {i + 1}º
                </span>
                <div
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: CATEGORY_COLORS[t.cat] }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[11px] font-medium truncate" style={{ color: "#94a3b8" }}>
                      {t.cat}
                    </p>
                    <div className="flex items-center gap-1">
                      {isUp ? (
                        <TrendingUp size={10} style={{ color: "#f87171" }} />
                      ) : (
                        <TrendingDown size={10} style={{ color: "#34d399" }} />
                      )}
                      <span
                        className="text-[10px] font-semibold"
                        style={{ color: isUp ? "#f87171" : "#34d399" }}
                      >
                        {isUp ? "+" : ""}{variation}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: CATEGORY_COLORS[t.cat],
                          opacity: 0.7,
                        }}
                      />
                    </div>
                    <span className="text-[10px] w-8 text-right" style={{ color: "#334155" }}>
                      {pct}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}