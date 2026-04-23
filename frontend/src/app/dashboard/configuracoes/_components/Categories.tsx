"use client";

import { motion } from "framer-motion";
import { Tag, Plus, Edit, Trash2 } from "lucide-react";
import type { CategoryItem } from "../page";

interface Props {
  categories: CategoryItem[];
}

export function Categories({ categories }: Props) {
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
            Categorias
          </p>
          <p className="text-[10px]" style={{ color: "#334155" }}>
            Organize seus gastos com categorias personalizadas
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
          Adicionar Categoria
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-xl p-4 flex items-center justify-between"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {cat.emoji}
              </div>
              <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                {cat.nome}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
                style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}
                aria-label="Editar categoria"
              >
                <Edit size={12} />
              </button>
              <button
                type="button"
                className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
                style={{ background: "rgba(248,113,113,0.1)", color: "#f87171" }}
                aria-label="Excluir categoria"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}