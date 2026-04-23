"use client";

import { Search, X } from "lucide-react";
import type { Filters, Category } from "../page";
import { CARDS_OPTIONS, CATEGORIES } from "../page";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const inputBase = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#f1f5f9",
  borderRadius: "10px",
  fontSize: "12px",
  outline: "none",
};

export function FilterBar({ filters, onChange, onClear, hasActiveFilters }: Props) {
  function set<K extends keyof Filters>(key: K, value: Filters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function toggleCartao(id: string) {
    const current = filters.cartoes;
    set("cartoes", current.includes(id) ? current.filter((c) => c !== id) : [...current, id]);
  }

  function toggleCategoria(cat: Category) {
    const current = filters.categorias;
    set(
      "categorias",
      current.includes(cat) ? current.filter((c) => c !== cat) : [...current, cat]
    );
  }

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Linha 1 — busca + datas + valor */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Busca */}
        <div className="relative flex-1 min-w-[160px]">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "#475569" }}
          />
          <input
            style={{ ...inputBase, padding: "8px 12px 8px 32px", width: "100%" }}
            placeholder="Buscar estabelecimento..."
            value={filters.busca}
            onChange={(e) => set("busca", e.target.value)}
          />
        </div>

        {/* Data início */}
        <input
          type="date"
          style={{ ...inputBase, padding: "8px 10px" }}
          value={filters.dataInicio}
          onChange={(e) => set("dataInicio", e.target.value)}
        />

        {/* Data fim */}
        <input
          type="date"
          style={{ ...inputBase, padding: "8px 10px" }}
          value={filters.dataFim}
          onChange={(e) => set("dataFim", e.target.value)}
        />

        {/* Limpar filtros */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:brightness-125 active:scale-95"
            style={{
              background: "rgba(248,113,113,0.1)",
              border: "1px solid rgba(248,113,113,0.2)",
              color: "#f87171",
            }}
          >
            <X size={11} />
            Limpar
          </button>
        )}
      </div>

      {/* Linha 2 — chips de cartão + categoria */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#334155" }}>
          Cartão:
        </span>
        {CARDS_OPTIONS.map((c) => {
          const active = filters.cartoes.includes(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleCartao(c.id)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:brightness-125 active:scale-95"
              style={{
                background: active ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                border: active ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.06)",
                color: active ? "#a78bfa" : "#475569",
              }}
            >
              {c.label}
            </button>
          );
        })}

        <span
          className="text-[10px] font-semibold uppercase tracking-wider ml-2"
          style={{ color: "#334155" }}
        >
          Categoria:
        </span>
        {CATEGORIES.map((cat) => {
          const active = filters.categorias.includes(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleCategoria(cat)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:brightness-125 active:scale-95"
              style={{
                background: active ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                border: active ? "1px solid rgba(124,58,237,0.35)" : "1px solid rgba(255,255,255,0.06)",
                color: active ? "#a78bfa" : "#475569",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Linha 3 — range de valor */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap" style={{ color: "#334155" }}>
          Valor:
        </span>
        <span className="text-[11px]" style={{ color: "#475569" }}>
          R$ {filters.valorMin}
        </span>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={filters.valorMin}
          onChange={(e) => set("valorMin", Number(e.target.value))}
          className="flex-1 accent-violet-600"
        />
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={filters.valorMax}
          onChange={(e) => set("valorMax", Number(e.target.value))}
          className="flex-1 accent-violet-600"
        />
        <span className="text-[11px]" style={{ color: "#475569" }}>
          R$ {filters.valorMax === 5000 ? "5.000+" : filters.valorMax}
        </span>
      </div>
    </div>
  );
}