"use client";

import { motion } from "framer-motion";
import type { CardTab } from "../page";

interface Props {
  cards: CardTab[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CardTabs({ cards, selectedId, onSelect }: Props) {
  return (
    <div
      className="flex items-center gap-1 p-1 rounded-xl w-fit"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {cards.map((card) => {
        const isActive = card.id === selectedId;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            className="relative px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
            style={{ color: isActive ? "#f1f5f9" : "#475569" }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-lg"
                style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
                transition={{ duration: 0.2 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: isActive ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.06)",
                  color: isActive ? "#a78bfa" : "#334155",
                }}
              >
                {card.bandeira}
              </span>
              {card.apelido}
            </span>
          </button>
        );
      })}
    </div>
  );
}
