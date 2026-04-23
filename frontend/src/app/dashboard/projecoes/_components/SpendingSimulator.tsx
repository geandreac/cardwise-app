"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  value: number;
  onChange: (v: number) => void;
  limiteMensal: number;
  projecaoFinal: number;
}

const PRESETS = [
  { label: "+ R$ 200", value: 200 },
  { label: "+ R$ 500", value: 500 },
  { label: "+ R$ 1.000", value: 1000 },
  { label: "- R$ 300", value: -300 },
];

export function SpendingSimulator({
  value,
  onChange,
  limiteMensal,
  projecaoFinal,
}: Props) {
  const [inputVal, setInputVal] = useState("");

  const novaProjecao = projecaoFinal + value;
  const diff = novaProjecao - projecaoFinal;
  const ultrapassaLimite = novaProjecao > limiteMensal;
  const pct = Math.round((novaProjecao / limiteMensal) * 100);
  const margemRestante = limiteMensal - novaProjecao;

  function handlePreset(v: number) {
    const newValue = value + v; // Adiciona o valor do preset ao valor atual
    onChange(newValue);
    setInputVal(String(Math.abs(newValue))); // Atualiza o input visualmente
  }

  function handleInputChange(raw: string) {
    setInputVal(raw);
    const parsed = parseFloat(raw.replace(",", "."));
    if (!isNaN(parsed)) onChange(parsed);
    else if (raw === "" || raw === "-") onChange(0);
  }

  function handleReset() {
    onChange(0);
    setInputVal("");
  }

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="h-8 w-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(124,58,237,0.15)" }}
        >
          <Calculator size={14} style={{ color: "#a78bfa" }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
            Simulador de gastos
          </p>
          <p className="text-[10px]" style={{ color: "#334155" }}>
            E se eu gastar X a mais?
          </p>
        </div>
      </div>

      {/* Input personalizado */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#334155" }}>
          Valor extra (R$)
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Ex: 500"
            value={inputVal}
            onChange={(e) => handleInputChange(e.target.value)}
            className="flex-1 rounded-xl px-3 py-2 text-xs outline-none"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#f1f5f9",
            }}
          />
          {value !== 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl text-[10px] font-medium transition-all hover:brightness-125"
              style={{
                background: "rgba(248,113,113,0.1)",
                color: "#f87171",
                border: "1px solid rgba(248,113,113,0.2)",
              }}
            >
              Resetar
            </button>
          )}
        </div>
      </div>

      {/* Presets */}
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => handlePreset(p.value)} // Chamada alterada aqui
            className="py-2 rounded-xl text-[11px] font-semibold transition-all hover:brightness-125 active:scale-95"
            style={{
              background: value === p.value ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
              border: value === p.value ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.06)",
              color: value === p.value ? "#a78bfa" : "#475569",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Resultado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={novaProjecao}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl p-3 flex flex-col gap-2"
          style={{
            background: ultrapassaLimite
              ? "rgba(248,113,113,0.07)"
              : "rgba(52,211,153,0.07)",
            border: ultrapassaLimite
              ? "1px solid rgba(248,113,113,0.15)"
              : "1px solid rgba(52,211,153,0.15)",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold" style={{ color: "#334155" }}>
              Nova projeção
            </p>
            <div className="flex items-center gap-1">
              {diff > 0 ? (
                <TrendingUp size={11} style={{ color: "#f87171" }} />
              ) : diff < 0 ? (
                <TrendingDown size={11} style={{ color: "#34d399" }} />
              ) : null}
              {diff !== 0 && (
                <span
                  className="text-[10px] font-semibold"
                  style={{ color: diff > 0 ? "#f87171" : "#34d399" }}
                >
                  {diff > 0 ? "+" : ""}R$ {Math.abs(diff).toLocaleString("pt-BR")}
                </span>
              )}
            </div>
          </div>

          <p
            className="text-xl font-bold"
            style={{
              color: ultrapassaLimite ? "#f87171" : "#34d399",
              letterSpacing: "-0.03em",
            }}
          >
            R$ {novaProjecao.toLocaleString("pt-BR")}
          </p>

          {/* Barra de progresso */}
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${Math.min(pct, 100)}%` }}
              transition={{ duration: 0.4 }}
              style={{
                background: ultrapassaLimite
                  ? "#f87171"
                  : pct > 80
                  ? "#fbbf24"
                  : "#34d399",
              }}
            />
          </div>

          <p className="text-[10px]" style={{ color: ultrapassaLimite ? "#f87171" : "#475569" }}>
            {ultrapassaLimite
              ? `⚠ ${pct - 100}% acima do limite de R$ ${limiteMensal.toLocaleString("pt-BR")}`
              : `Margem restante: R$ ${margemRestante.toLocaleString("pt-BR")} (${100 - pct}%)`}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}