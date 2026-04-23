"use client";

import { TransactionItem } from "./TransactionItem";
import type { Transaction } from "../page";

interface Props {
  dateLabel: string;
  transactions: Transaction[];
  onSelect: (t: Transaction) => void;
}

export function TransactionGroup({ dateLabel, transactions, onSelect }: Props) {
  return (
    <div>
      {/* Separador de data */}
      <div className="flex items-center gap-2 mb-2 px-1">
        <p className="text-[11px] font-semibold" style={{ color: "#475569" }}>
          {dateLabel}
        </p>
        <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
        <p className="text-[10px]" style={{ color: "#334155" }}>
          {transactions.length} transaç{transactions.length !== 1 ? "ões" : "ão"}
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {transactions.map((t, i) => (
          <div key={t.id}>
            <TransactionItem transaction={t} onSelect={onSelect} />
            {i < transactions.length - 1 && (
              <div className="mx-3 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}