"use client";

import type { Filters } from "../page";

interface Props {
  count: number;
  total: number;
  filters: Filters;
}

export function ResultsSummary({ count, total, filters }: Props) {
  const periodo =
    filters.dataInicio && filters.dataFim
      ? `${filters.dataInicio} até ${filters.dataFim}`
      : "Todo o período";

  return (
    <p className="text-[11px] px-1" style={{ color: "#334155" }}>
      Exibindo{" "}
      <span style={{ color: "#64748b" }}>{count} transação{count !== 1 ? "ões" : ""}</span>
      {" · "}Total:{" "}
      <span style={{ color: "#64748b" }}>
        R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>
      {" · "}
      <span>{periodo}</span>
    </p>
  );
}