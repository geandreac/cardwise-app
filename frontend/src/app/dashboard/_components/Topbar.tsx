"use client";

import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle = "Atualizado agora mesmo" }: TopbarProps) {
  const now = new Date();
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());

  function prev() {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else {
      setMonthIndex((m) => m - 1);
    }
  }

  function next() {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex((m) => m + 1);
    }
  }

  return (
    <header
      className="flex items-center justify-between px-6 py-3 flex-shrink-0"
      style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
    >
      <div>
        <h1
          className="text-[15px] font-semibold"
          style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
        >
          {title}
        </h1>
        <p className="text-[11px]" style={{ color: "#334155" }}>
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Seletor de mês */}
        <div
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <button
            type="button"
            onClick={prev}
            className="transition-opacity hover:opacity-70 active:scale-95"
            style={{ color: "#475569" }}
          >
            <ChevronLeft size={13} />
          </button>
          <span
            className="text-xs font-medium min-w-[80px] text-center"
            style={{ color: "#94a3b8" }}
          >
            {MONTHS[monthIndex]} {year}
          </span>
          <button
            type="button"
            onClick={next}
            className="transition-opacity hover:opacity-70 active:scale-95"
            style={{ color: "#475569" }}
          >
            <ChevronRight size={13} />
          </button>
        </div>

        {/* Notificações */}
        <button
          type="button"
          className="relative h-8 w-8 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
          style={{ background: "rgba(255,255,255,0.05)", color: "#475569" }}
        >
          <Bell size={14} />
          <span
            className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#7c3aed" }}
          />
        </button>
      </div>
    </header>
  );
}