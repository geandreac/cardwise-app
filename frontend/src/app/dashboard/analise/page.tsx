"use client";

import { useState } from "react";
import { Topbar } from "../_components/Topbar";
import { PeriodSelector } from "./_components/PeriodSelector";
import { EvolutionChart } from "./_components/EvolutionChart";
import { InsightCards } from "./_components/InsightCards";
import { CategoryBreakdown } from "./_components/CategoryBreakdown";
import { MonthComparison } from "./_components/MonthComparison";

export type Period = "3m" | "6m" | "12m" | "year";
export type AnaliseTab = "evolucao" | "comparar";

export type Category =
  | "Alimentação"
  | "Transporte"
  | "Assinaturas"
  | "Saúde"
  | "Lazer"
  | "Outros";

export const CATEGORY_COLORS: Record<Category, string> = {
  Alimentação: "#34d399",
  Transporte: "#60a5fa",
  Assinaturas: "#a78bfa",
  Saúde: "#f472b6",
  Lazer: "#fbbf24",
  Outros: "#94a3b8",
};

export interface MonthData {
  mes: string;
  ano: number;
  Alimentação: number;
  Transporte: number;
  Assinaturas: number;
  Saúde: number;
  Lazer: number;
  Outros: number;
  total: number;
}

const ALL_DATA: MonthData[] = [
  { mes: "Mai/25", ano: 2025, Alimentação: 820, Transporte: 410, Assinaturas: 320, Saúde: 180, Lazer: 520, Outros: 90, total: 2340 },
  { mes: "Jun/25", ano: 2025, Alimentação: 760, Transporte: 380, Assinaturas: 320, Saúde: 240, Lazer: 480, Outros: 110, total: 2290 },
  { mes: "Jul/25", ano: 2025, Alimentação: 910, Transporte: 460, Assinaturas: 330, Saúde: 200, Lazer: 600, Outros: 80, total: 2580 },
  { mes: "Ago/25", ano: 2025, Alimentação: 870, Transporte: 420, Assinaturas: 330, Saúde: 160, Lazer: 540, Outros: 130, total: 2450 },
  { mes: "Set/25", ano: 2025, Alimentação: 800, Transporte: 390, Assinaturas: 340, Saúde: 190, Lazer: 490, Outros: 100, total: 2310 },
  { mes: "Out/25", ano: 2025, Alimentação: 950, Transporte: 500, Assinaturas: 340, Saúde: 210, Lazer: 700, Outros: 150, total: 2850 },
  { mes: "Nov/25", ano: 2025, Alimentação: 1100, Transporte: 550, Assinaturas: 350, Saúde: 230, Lazer: 850, Outros: 200, total: 3280 },
  { mes: "Dez/25", ano: 2025, Alimentação: 1400, Transporte: 600, Assinaturas: 350, Saúde: 180, Lazer: 1200, Outros: 300, total: 4030 },
  { mes: "Jan/26", ano: 2026, Alimentação: 900, Transporte: 480, Assinaturas: 360, Saúde: 220, Lazer: 580, Outros: 120, total: 2660 },
  { mes: "Fev/26", ano: 2026, Alimentação: 780, Transporte: 350, Assinaturas: 360, Saúde: 170, Lazer: 310, Outros: 90, total: 2060 },
  { mes: "Mar/26", ano: 2026, Alimentação: 920, Transporte: 440, Assinaturas: 370, Saúde: 200, Lazer: 680, Outros: 110, total: 2720 },
  { mes: "Abr/26", ano: 2026, Alimentação: 980, Transporte: 640, Assinaturas: 450, Saúde: 360, Lazer: 810, Outros: 0, total: 3240 },
];

function getDataByPeriod(period: Period): MonthData[] {
  switch (period) {
    case "3m":
      return ALL_DATA.slice(-3);
    case "6m":
      return ALL_DATA.slice(-6);
    case "12m":
      return ALL_DATA.slice(-12);
    case "year":
      return ALL_DATA.filter((d) => d.ano === 2026);
  }
}

export default function AnalisePage() {
  const [period, setPeriod] = useState<Period>("6m");
  const [activeTab, setActiveTab] = useState<AnaliseTab>("evolucao");

  const data = getDataByPeriod(period);

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar title="Análise" subtitle="Inteligência financeira ao longo do tempo" />

      <div className="flex flex-col gap-4 p-5">
        <PeriodSelector
          period={period}
          onPeriod={setPeriod}
          activeTab={activeTab}
          onTab={setActiveTab}
        />

        {activeTab === "evolucao" ? (
          <>
            <EvolutionChart data={data} />
            <InsightCards data={data} />
            <CategoryBreakdown data={data} />
          </>
        ) : (
          <MonthComparison allData={ALL_DATA} />
        )}
      </div>
    </div>
  );
}