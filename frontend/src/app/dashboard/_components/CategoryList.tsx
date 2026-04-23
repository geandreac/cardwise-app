"use client";

import { motion } from "framer-motion";

const categories = [
  { label: "Alimentação", value: 980, color: "#7c3aed" },
  { label: "Transporte", value: 640, color: "#2563eb" },
  { label: "Assinaturas", value: 450, color: "#0891b2" },
  { label: "Saúde", value: 360, color: "#fbbf24" },
  { label: "Lazer", value: 810, color: "#f87171" },
];

const max = Math.max(...categories.map((c) => c.value));

export function CategoryList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="rounded-[14px] p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
          Gastos por categoria
        </p>
        <button
          type="button"
          className="text-[11px] transition-opacity hover:opacity-70 active:scale-95"
          style={{ color: "#7c3aed" }}
        >
          Ver tudo
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((cat, i) => {
          const barPercent = Math.round((cat.value / max) * 100);
          return (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.35 + i * 0.04 }}
              className="flex items-center gap-2"
            >
              <span
                className="h-2 w-2 rounded-full flex-shrink-0"
                style={{ background: cat.color }}
              />
              <span
                className="text-[11px] w-20 flex-shrink-0"
                style={{ color: "#94a3b8" }}
              >
                {cat.label}
              </span>
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${barPercent}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: "easeOut" }}
                  style={{ background: cat.color }}
                />
              </div>
              <span
                className="text-[11px] font-medium w-16 text-right flex-shrink-0"
                style={{ color: "#e2e8f0" }}
              >
                R$ {cat.value.toLocaleString("pt-BR")}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}