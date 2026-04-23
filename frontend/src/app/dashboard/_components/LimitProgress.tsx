"use client";

import { motion } from "framer-motion";

const used = 3240;
const limit = 4500;
const percent = Math.round((used / limit) * 100);

function getPercentColor(p: number) {
  if (p < 50) return "#34d399";
  if (p < 80) return "#fbbf24";
  return "#f87171";
}

export function LimitProgress() {
  const percentColor = getPercentColor(percent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="rounded-[14px] px-5 py-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
          Uso do limite mensal
        </p>
        <span
          className="text-xl font-bold"
          style={{ color: percentColor, letterSpacing: "-0.03em" }}
        >
          {percent}%
        </span>
      </div>

      <div
        className="h-2 rounded-full overflow-hidden mb-2.5"
        style={{ background: "rgba(255,255,255,0.07)" }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            background: `linear-gradient(90deg, #7c3aed, ${percentColor})`,
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px]" style={{ color: "#334155" }}>
          R$ 0
        </span>
        <span className="text-[10px]" style={{ color: "#64748b" }}>
          R$ {used.toLocaleString("pt-BR")} gastos
        </span>
        <span className="text-[10px]" style={{ color: "#334155" }}>
          Limite R$ {limit.toLocaleString("pt-BR")}
        </span>
      </div>
    </motion.div>
  );
}