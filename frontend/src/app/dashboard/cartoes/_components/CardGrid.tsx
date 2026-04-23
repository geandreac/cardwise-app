"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CardVisual } from "./CardVisual";
import { CardMenu } from "./CardMenu";
import { AddCardButton } from "./AddCardButton";
import type { CreditCard } from "../page";

interface Props {
  cards: CreditCard[];
  onAdd: () => void;
  onEdit: (card: CreditCard) => void;
  onDelete: (id: string) => void;
}

export function CardGrid({ cards, onAdd, onEdit, onDelete }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <AnimatePresence>
        {cards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold truncate" style={{ color: "#94a3b8" }}>
                {card.apelido}
              </p>
              <CardMenu card={card} onEdit={onEdit} onDelete={onDelete} />
            </div>
            <CardVisual card={card} />
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AddCardButton onClick={onAdd} />
      </motion.div>
    </div>
  );
}