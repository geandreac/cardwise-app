"use client";

import { useState, useEffect } from "react";
import { X, CreditCard, Tag, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transaction, Category } from "../page";
import { CATEGORIES, CATEGORY_EMOJI } from "../page";

interface Props {
  transaction: Transaction | null;
  open: boolean;
  onClose: () => void;
  onSave: (t: Transaction) => void;
}

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#f1f5f9",
  borderRadius: "10px",
  padding: "8px 12px",
  fontSize: "12px",
  width: "100%",
  outline: "none",
};

const labelStyle = {
  fontSize: "10px",
  fontWeight: 600 as const,
  color: "#475569",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "4px",
  display: "block",
};

export function TransactionDrawer({ transaction, open, onClose, onSave }: Props) {
  const [categoria, setCategoria] = useState<Category>("Outros");
  const [nota, setNota] = useState("");

  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open && transaction) {
      setCategoria(transaction.categoria);
      setNota(transaction.nota ?? "");
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!transaction) return null;

  const isDirty = categoria !== transaction.categoria || nota !== (transaction.nota ?? "");

  function handleSave() {
    if (!transaction) return;
    onSave({ ...transaction, categoria, nota });
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: "400px",
              background: "#0a0f1a",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "-24px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {CATEGORY_EMOJI[transaction.categoria]}
                </div>
                <div>
                  <h2 className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                    {transaction.nome}
                  </h2>
                  <p className="text-[10px]" style={{ color: "#334155" }}>
                    {transaction.data} às {transaction.hora}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
                style={{ background: "rgba(255,255,255,0.06)", color: "#64748b" }}
                aria-label="Fechar drawer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 px-5 py-5 flex flex-col gap-5 overflow-y-auto">

              {/* Valor em destaque */}
              <div
                className="rounded-2xl p-4 text-center"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.15)",
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: "#475569" }}>
                  Valor da transação
                </p>
                <p className="text-3xl font-bold" style={{ color: "#f1f5f9", letterSpacing: "-0.04em" }}>
                  - R$ {transaction.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                {transaction.parcelado && (
                  <p className="text-[11px] mt-1" style={{ color: "#64748b" }}>
                    Parcela {transaction.parcelaAtual} de {transaction.parcelaTotal} ·{" "}
                    Total R${" "}
                    {(transaction.valor * transaction.parcelaTotal!).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                )}
              </div>

              {/* Detalhes */}
              <div className="flex flex-col gap-3">
                <div
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <CreditCard size={14} style={{ color: "#475569" }} />
                  <div>
                    <p className="text-[10px]" style={{ color: "#334155" }}>Cartão utilizado</p>
                    <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>{transaction.cartao}</p>
                  </div>
                </div>

                <div
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <Tag size={14} style={{ color: "#475569" }} />
                  <div>
                    <p className="text-[10px]" style={{ color: "#334155" }}>Categoria atual</p>
                    <p className="text-xs font-semibold" style={{ color: "#94a3b8" }}>
                      {CATEGORY_EMOJI[transaction.categoria]} {transaction.categoria}
                    </p>
                  </div>
                </div>
              </div>

              {/* Editar categoria */}
              <div>
                <label style={labelStyle}>Alterar categoria</label>
                <select
                  style={{ ...inputStyle, cursor: "pointer" }}
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value as Category)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} style={{ background: "#0a0f1a" }}>
                      {CATEGORY_EMOJI[cat]} {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nota */}
              <div>
                <label style={labelStyle}>
                  <FileText size={10} className="inline mr-1" />
                  Nota / observação
                </label>
                <textarea
                  style={{ ...inputStyle, resize: "none", minHeight: "90px" }}
                  placeholder="Adicione uma observação sobre essa transação..."
                  maxLength={200}
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                />
                <p className="text-[10px] text-right mt-1" style={{ color: "#334155" }}>
                  {nota.length}/200
                </p>
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all hover:brightness-125 active:scale-95"
                style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}
              >
                Fechar
              </button>
              {isDirty && (
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4338ca)",
                    color: "#fff",
                    boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                  }}
                >
                  Salvar alterações
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}