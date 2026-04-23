"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { CreditCard, CardBrand, CardColor } from "../page";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (card: CreditCard) => void;
  editingCard: CreditCard | null;
}

const BRANDS: CardBrand[] = ["VISA", "MC", "ELO", "AMEX", "HIPERCARD"];
const COLORS: { value: CardColor; label: string; gradient: string }[] = [
  { value: "roxo", label: "Roxo", gradient: "linear-gradient(135deg, #1e1b4b, #4c1d95)" },
  { value: "azul", label: "Azul", gradient: "linear-gradient(135deg, #0c1445, #1e40af)" },
  { value: "verde", label: "Verde", gradient: "linear-gradient(135deg, #052e16, #166534)" },
  { value: "grafite", label: "Grafite", gradient: "linear-gradient(135deg, #111827, #374151)" },
];

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
  fontWeight: 600,
  color: "#475569",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "4px",
  display: "block",
};

interface FormErrors {
  apelido?: string;
  digitos?: string;
  titular?: string;
  limite?: string;
  vencimento?: string;
  fechamento?: string;
}

function validate(form: Partial<CreditCard>): FormErrors {
  const errors: FormErrors = {};
  if (!form.apelido || form.apelido.length < 2) errors.apelido = "Mínimo 2 caracteres";
  if (form.apelido && form.apelido.length > 30) errors.apelido = "Máximo 30 caracteres";
  if (!form.digitos || !/^\d{4}$/.test(form.digitos)) errors.digitos = "Exatamente 4 números";
  if (!form.titular) errors.titular = "Campo obrigatório";
  if (!form.limite || form.limite <= 0) errors.limite = "Valor inválido";
  if (form.limite && form.limite > 999999) errors.limite = "Máximo R$ 999.999";
  if (!form.vencimento || form.vencimento < 1 || form.vencimento > 31) errors.vencimento = "Entre 1 e 31";
  if (!form.fechamento || form.fechamento < 1 || form.fechamento > 31) errors.fechamento = "Entre 1 e 31";
  return errors;
}

function getInitialForm(editingCard: CreditCard | null): Partial<CreditCard> {
  if (editingCard) return { ...editingCard };
  return { bandeira: "VISA", cor: "roxo", gasto: 0 };
}

export function CardDrawer({ open, onClose, onSave, editingCard }: Props) {
  const [form, setForm] = useState<Partial<CreditCard>>(() => getInitialForm(editingCard));
  const [errors, setErrors] = useState<FormErrors>({});

  // Reseta o form apenas quando o drawer abre ou troca de cartão
  // sem usar setState dentro do efeito diretamente no corpo
  const [prevOpen, setPrevOpen] = useState(open);
  const [prevEditingId, setPrevEditingId] = useState(editingCard?.id);

  if (open !== prevOpen || editingCard?.id !== prevEditingId) {
    setPrevOpen(open);
    setPrevEditingId(editingCard?.id);
    if (open) {
      setForm(getInitialForm(editingCard));
      setErrors({});
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleChange(field: keyof CreditCard, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit() {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave({
      ...form,
      id: editingCard?.id ?? crypto.randomUUID(),
      gasto: editingCard?.gasto ?? 0,
    } as CreditCard);
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
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col overflow-y-auto"
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
              <div>
                <h2 className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                  {editingCard ? "Editar cartão" : "Adicionar cartão"}
                </h2>
                <p className="text-[10px]" style={{ color: "#334155" }}>
                  {editingCard ? "Atualize as informações" : "Preencha os dados do seu cartão"}
                </p>
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

            {/* Form */}
            <div className="flex-1 px-5 py-5 flex flex-col gap-4">

              <div>
                <label style={labelStyle}>Apelido do cartão</label>
                <input
                  style={inputStyle}
                  placeholder="Ex: Nubank do dia a dia"
                  value={form.apelido ?? ""}
                  onChange={(e) => handleChange("apelido", e.target.value)}
                />
                {errors.apelido && (
                  <p className="text-[10px] mt-1" style={{ color: "#f87171" }}>{errors.apelido}</p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Bandeira</label>
                <select
                  style={{ ...inputStyle, cursor: "pointer" }}
                  value={form.bandeira}
                  onChange={(e) => handleChange("bandeira", e.target.value as CardBrand)}
                >
                  {BRANDS.map((b) => (
                    <option key={b} value={b} style={{ background: "#0a0f1a" }}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Últimos 4 dígitos</label>
                  <input
                    style={inputStyle}
                    placeholder="0000"
                    maxLength={4}
                    value={form.digitos ?? ""}
                    onChange={(e) => handleChange("digitos", e.target.value.replace(/\D/g, ""))}
                  />
                  {errors.digitos && (
                    <p className="text-[10px] mt-1" style={{ color: "#f87171" }}>{errors.digitos}</p>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Nome do titular</label>
                  <input
                    style={inputStyle}
                    placeholder="NOME SOBRENOME"
                    value={form.titular ?? ""}
                    onChange={(e) => handleChange("titular", e.target.value.toUpperCase())}
                  />
                  {errors.titular && (
                    <p className="text-[10px] mt-1" style={{ color: "#f87171" }}>{errors.titular}</p>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Limite total (R$)</label>
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="0,00"
                  min={1}
                  max={999999}
                  value={form.limite ?? ""}
                  onChange={(e) => handleChange("limite", Number(e.target.value))}
                />
                {errors.limite && (
                  <p className="text-[10px] mt-1" style={{ color: "#f87171" }}>{errors.limite}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Dia de vencimento</label>
                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="Ex: 10"
                    min={1}
                    max={31}
                    value={form.vencimento ?? ""}
                    onChange={(e) => handleChange("vencimento", Number(e.target.value))}
                  />
                  {errors.vencimento && (
                    <p className="text-[10px] mt-1" style={{ color: "#f87171" }}>{errors.vencimento}</p>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Dia de fechamento</label>
                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="Ex: 3"
                    min={1}
                    max={31}
                    value={form.fechamento ?? ""}
                    onChange={(e) => handleChange("fechamento", Number(e.target.value))}
                  />
                  {errors.fechamento && (
                    <p className="text-[10px] mt-1" style={{ color: "#f87171" }}>{errors.fechamento}</p>
                  )}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Cor do cartão</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => handleChange("cor", c.value)}
                      className="flex flex-col items-center gap-1.5 transition-all active:scale-95"
                    >
                      <div
                        className="h-10 w-full rounded-xl"
                        style={{
                          background: c.gradient,
                          outline: form.cor === c.value ? "2px solid #7c3aed" : "2px solid transparent",
                          outlineOffset: "2px",
                          boxShadow: form.cor === c.value ? "0 0 12px rgba(124,58,237,0.4)" : "none",
                        }}
                      />
                      <span className="text-[10px]" style={{ color: form.cor === c.value ? "#a78bfa" : "#334155" }}>
                        {c.label}
                      </span>
                    </button>
                  ))}
                </div>
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
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4338ca)",
                  color: "#fff",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
                }}
              >
                {editingCard ? "Salvar alterações" : "Adicionar cartão"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}