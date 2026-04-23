"use client";

import { motion } from "framer-motion";
import { Target, Plus, Edit, Trash2 } from "lucide-react";
import type { SpendingLimit, CategoryItem } from "../page";

interface Props {
  limits: SpendingLimit[];
  categories: CategoryItem[];
}

export function SpendingLimits({ limits, categories }: Props) {
  function getCategoryName(categoryId: string) {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? `${cat.emoji} ${cat.nome}` : "Desconhecida";
  }

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
            Limites de Gastos
          </p>
          <p className="text-[10px]" style={{ color: "#334155" }}>
            Defina tetos mensais para suas categorias
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4338ca)",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
          }}
        >
          <Plus size={12} />
          Adicionar Limite
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {limits.map((limit, i) => {
          const pct = Math.round((limit.gastoAtual / limit.limite) * 100);
          const isOver = limit.gastoAtual > limit.limite;
          return (
            <motion.div
              key={limit.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target size={16} style={{ color: isOver ? "#f87171" : "#34d399" }} />
                  <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                    {getCategoryName(limit.categoriaId)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}
                    aria-label="Editar limite"
                  >
                    <Edit size={12} />
                  </button>
                  <button
                    type="button"
                    className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
                    style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}
                    aria-label="Excluir limite"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-[11px]" style={{ color: "#475569" }}>
                  <span>
                    Gasto:{" "}
                    <span style={{ color: "#f1f5f9" }}>
                      R$ {limit.gastoAtual.toLocaleString("pt-BR")}
                    </span>
                  </span>
                  <span>
                    Limite:{" "}
                    <span style={{ color: "#f1f5f9" }}>
                      R$ {limit.limite.toLocaleString("pt-BR")}
                    </span>
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      background: isOver ? "#f87171" : "#34d399",
                    }}
                  />
                </div>
                <p className="text-[10px] text-right" style={{ color: isOver ? "#f87171" : "#34d399" }}>
                  {isOver ? `Ultrapassado em R$ ${(limit.gastoAtual - limit.limite).toLocaleString("pt-BR")}` : `${100 - pct}% restante`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}