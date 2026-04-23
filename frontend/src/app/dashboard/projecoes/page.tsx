"use client";

import { useState } from "react";
import { Topbar } from "../_components/Topbar";
import { ProjectionSummary } from "./_components/ProjectionSummary";
import { ProjectionChart } from "./_components/ProjectionChart";
import { PredictiveAlerts } from "./_components/PredictiveAlerts";
import { SpendingSimulator } from "./_components/SpendingSimulator";

export interface DayData {
  dia: number;
  real: number | null;
  projetado: number | null;
}

export interface AlertItem {
  id: string;
  tipo: "limite" | "categoria" | "fatura" | "assinatura";
  titulo: string;
  descricao: string;
  severidade: "alta" | "media" | "baixa";
}

const DIAS_NO_MES = 30;
const HOJE = 21;
const GASTO_ATUAL = 3240;
const LIMITE_MENSAL = 4500;
const MEDIA_DIARIA = Math.round(GASTO_ATUAL / HOJE);
const PROJECAO_FINAL = Math.round(GASTO_ATUAL + MEDIA_DIARIA * (DIAS_NO_MES - HOJE));

export const SUMMARY_DATA = {
  gastoAtual: GASTO_ATUAL,
  limiteMensal: LIMITE_MENSAL,
  mediadiaria: MEDIA_DIARIA,
  projecaoFinal: PROJECAO_FINAL,
  hoje: HOJE,
  diasNoMes: DIAS_NO_MES,
};

// Gera dados diários reais + projetados
function generateDayData(): DayData[] {
  const days: DayData[] = [];
  let acumulado = 0;
  for (let dia = 1; dia <= DIAS_NO_MES; dia++) {
    if (dia <= HOJE) {
      const gasto = dia === 1 ? 120 : Math.round(80 + Math.random() * 120);
      acumulado += gasto;
      if (dia === HOJE) acumulado = GASTO_ATUAL;
      days.push({ dia, real: acumulado, projetado: null });
    } else {
      const proj = GASTO_ATUAL + MEDIA_DIARIA * (dia - HOJE);
      days.push({ dia, real: null, projetado: proj });
    }
  }
  return days;
}

export const DAY_DATA = generateDayData();

export const ALERTS: AlertItem[] = [
  {
    id: "a1",
    tipo: "limite",
    titulo: "C6 Bank a 91% do limite",
    descricao: "Com base nos seus hábitos, você ultrapassa o limite em aproximadamente 5 dias.",
    severidade: "alta",
  },
  {
    id: "a2",
    tipo: "fatura",
    titulo: "Fatura Nubank vence em 3 dias",
    descricao: "R$ 1.820 pendentes — pague até 23/04 para evitar juros e negativação.",
    severidade: "alta",
  },
  {
    id: "a3",
    tipo: "categoria",
    titulo: "Lazer 68% acima da média",
    descricao: "Você costumava gastar R$ 480 nessa categoria — este mês já são R$ 810.",
    severidade: "media",
  },
  {
    id: "a4",
    tipo: "assinatura",
    titulo: "3 assinaturas sem uso detectadas",
    descricao: "Spotify, Apple TV+ e Canva sem uso nos últimos 30 dias. Economia potencial: R$ 64/mês.",
    severidade: "baixa",
  },
];

export default function ProjecoesPage() {
  const [simulatorValue, setSimulatorValue] = useState(0);

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar
        title="Projeções"
        subtitle="Previsões inteligentes para o resto do mês"
      />

      <div className="flex flex-col gap-4 p-5">
        <ProjectionSummary
          data={SUMMARY_DATA}
          extraGasto={simulatorValue}
        />
        <ProjectionChart
          dayData={DAY_DATA}
          limiteMensal={SUMMARY_DATA.limiteMensal}
          extraGasto={simulatorValue}
          mediadiaria={SUMMARY_DATA.mediadiaria}
          hoje={SUMMARY_DATA.hoje}
          diasNoMes={SUMMARY_DATA.diasNoMes}
        />
        <div className="grid grid-cols-2 gap-4">
          <PredictiveAlerts alerts={ALERTS} />
          <SpendingSimulator
            value={simulatorValue}
            onChange={setSimulatorValue}
            limiteMensal={SUMMARY_DATA.limiteMensal}
            projecaoFinal={SUMMARY_DATA.projecaoFinal}
          />
        </div>
      </div>
    </div>
  );
}