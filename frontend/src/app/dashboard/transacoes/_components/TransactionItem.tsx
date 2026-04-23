"use client";

import { CATEGORY_EMOJI } from "../page";
import type { Transaction } from "../page";

interface Props {
  transaction: Transaction;
  onSelect: (t: Transaction) => void;
}

export function TransactionItem({ transaction: t, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(t)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:brightness-125 active:scale-[0.99] text-left"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      {/* Emoji categoria */}
      <div
        className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        {CATEGORY_EMOJI[t.categoria]}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold truncate" style={{ color: "#f1f5f9" }}>
          {t.nome}
        </p>
        <p className="text-[10px]" style={{ color: "#334155" }}>
          {t.categoria} · {t.cartao} · {t.hora}
        </p>
      </div>

      {/* Valor + badge parcelado */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <p className="text-[13px] font-bold" style={{ color: "#f1f5f9" }}>
          - R$ {t.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        {t.parcelado && (
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
            style={{ background: "rgba(96,165,250,0.15)", color: "#60a5fa" }}
          >
            {t.parcelaAtual}/{t.parcelaTotal}x
          </span>
        )}
      </div>
    </button>
  );
}