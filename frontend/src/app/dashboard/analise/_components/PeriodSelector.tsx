"use client";

import type { Period, AnaliseTab } from "../page";

interface Props {
  period: Period;
  onPeriod: (p: Period) => void;
  activeTab: AnaliseTab;
  onTab: (t: AnaliseTab) => void;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: "3m", label: "Últimos 3 meses" },
  { value: "6m", label: "Últimos 6 meses" },
  { value: "12m", label: "Últimos 12 meses" },
  { value: "year", label: "Este ano" },
];

const TABS: { value: AnaliseTab; label: string }[] = [
  { value: "evolucao", label: "Evolução" },
  { value: "comparar", label: "Comparar meses" },
];

export function PeriodSelector({ period, onPeriod, activeTab, onTab }: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      {/* Chips de período */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {PERIODS.map((p) => {
          const isActive = p.value === period && activeTab === "evolucao";
          return (
            <button
              key={p.value}
              type="button"
              onClick={() => { onPeriod(p.value); onTab("evolucao"); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:brightness-125 active:scale-95"
              style={{
                background: isActive ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                border: isActive ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.06)",
                color: isActive ? "#a78bfa" : "#475569",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Tabs de visualização */}
      <div
        className="flex items-center gap-1 p-1 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {TABS.map((t) => {
          const isActive = t.value === activeTab;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => onTab(t.value)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: isActive ? "rgba(124,58,237,0.2)" : "transparent",
                border: isActive ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                color: isActive ? "#a78bfa" : "#475569",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}