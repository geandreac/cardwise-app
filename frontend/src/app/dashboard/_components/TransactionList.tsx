"use client";

import { motion } from "framer-motion";

const transactions = [
  {
    emoji: "🛒",
    name: "Mercado Extra",
    date: "Hoje",
    card: "Nubank",
    category: "Alimentação",
    value: -187,
  },
  {
    emoji: "⛽",
    name: "Posto Ipiranga",
    date: "Ontem",
    card: "Itaú",
    category: "Transporte",
    value: -220,
  },
  {
    emoji: "🎬",
    name: "Netflix",
    date: "19 abr",
    card: "Nubank",
    category: "Assinaturas",
    value: -55,
  },
  {
    emoji: "💊",
    name: "Drogasil",
    date: "18 abr",
    card: "C6",
    category: "Saúde",
    value: -94,
  },
];

export function TransactionList() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.35 }}
      className="rounded-[14px] p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
          Últimas transações
        </p>
        <button
          type="button"
          className="text-[11px] transition-opacity hover:opacity-70 active:scale-95"
          style={{ color: "#7c3aed" }}
        >
          Ver todas
        </button>
      </div>

      <div className="space-y-0.5">
        {transactions.map((tx, i) => (
          <motion.div
            key={tx.name + tx.date}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.4 + i * 0.04 }}
            className="flex items-center justify-between py-2.5 transition-all rounded-lg px-2 hover:brightness-125"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {tx.emoji}
              </div>
              <div>
                <p
                  className="text-xs font-medium"
                  style={{ color: "#e2e8f0" }}
                >
                  {tx.name}
                </p>
                <p className="text-[10px]" style={{ color: "#334155" }}>
                  {tx.date} · {tx.card} · {tx.category}
                </p>
              </div>
            </div>
            <span
              className="text-xs font-semibold"
              style={{ color: tx.value < 0 ? "#f87171" : "#34d399" }}
            >
              {tx.value < 0 ? "- " : "+ "}R$ {Math.abs(tx.value)}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}