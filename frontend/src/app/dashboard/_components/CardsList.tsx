"use client";

import { motion } from "framer-motion";

const cards = [
  {
    brand: "VISA",
    name: "Nubank Ultravioleta",
    limit: 8000,
    bill: 1820,
    color: "#7c3aed",
  },
  {
    brand: "MC",
    name: "Itaú Personnalité",
    limit: 3500,
    bill: 980,
    color: "#2563eb",
  },
  {
    brand: "ELO",
    name: "C6 Bank Carbon",
    limit: 1000,
    bill: 910,
    color: "#0891b2",
  },
];

function getBarColor(percent: number) {
  if (percent < 60) return "#34d399";
  if (percent < 85) return "#fbbf24";
  return "#f87171";
}

export function CardsList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="rounded-[14px] p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
          Meus cartões
        </p>
        <button
          type="button"
          className="text-[11px] font-medium transition-opacity hover:opacity-70 active:scale-95"
          style={{ color: "#7c3aed" }}
        >
          + Adicionar
        </button>
      </div>

      <div className="space-y-4">
        {cards.map((card, i) => {
          const percent = Math.round((card.bill / card.limit) * 100);
          const barColor = getBarColor(percent);
          return (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: 0.3 + i * 0.04 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{ background: card.color, color: "#fff" }}
                  >
                    {card.brand}
                  </span>
                  <div>
                    <p
                      className="text-[11px] font-medium leading-tight"
                      style={{ color: "#e2e8f0" }}
                    >
                      {card.name}
                    </p>
                    <p className="text-[10px]" style={{ color: "#334155" }}>
                      Limite R$ {card.limit.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ color: "#f1f5f9" }}>
                  R$ {card.bill.toLocaleString("pt-BR")}
                </p>
              </div>
              <div
                className="h-[3px] rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: "easeOut" }}
                  style={{ background: barColor }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}