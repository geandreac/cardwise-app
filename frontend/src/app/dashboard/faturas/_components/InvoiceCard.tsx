"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import type { Invoice, InvoiceStatus } from "../page";

const statusConfig: Record<
  InvoiceStatus,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  aberta: { label: "Aberta", color: "#60a5fa", bg: "rgba(96,165,250,0.12)", icon: Clock },
  fechada: { label: "Fechada", color: "#fbbf24", bg: "rgba(251,191,36,0.12)", icon: FileText },
  paga: { label: "Paga", color: "#34d399", bg: "rgba(52,211,153,0.12)", icon: CheckCircle },
  vencida: { label: "Vencida", color: "#f87171", bg: "rgba(248,113,113,0.12)", icon: AlertTriangle },
};

const actionLabel: Record<InvoiceStatus, string> = {
  aberta: "Ver transações",
  fechada: "Importar PDF",
  paga: "Ver detalhes",
  vencida: "Regularizar",
};

interface Props {
  invoice: Invoice;
  index: number;
  onUpload: (invoice: Invoice) => void;
}

export function InvoiceCard({ invoice, index, onUpload }: Props) {
  const config = statusConfig[invoice.status];
  const StatusIcon = config.icon;

  function handleAction() {
    if (invoice.status === "fechada") {
      onUpload(invoice);
    }
  }

  const progressPercent =
    invoice.status === "aberta" ? Math.floor(Math.random() * 60) + 20 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Linha principal */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: config.bg }}
          >
            <StatusIcon size={16} style={{ color: config.color }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
              {invoice.mes} {invoice.ano}
            </p>
            <p className="text-[10px]" style={{ color: "#334155" }}>
              Vence em {invoice.vencimento} · Fechou em {invoice.fechamento}
            </p>
          </div>
        </div>

        <div className="text-right flex items-center gap-3">
          <div>
            <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>
              R$ {invoice.total.toLocaleString("pt-BR")}
            </p>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: config.bg, color: config.color }}
            >
              {config.label}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAction}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:brightness-125 active:scale-95"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
            }}
          >
            {actionLabel[invoice.status]}
            <ChevronRight size={11} />
          </button>
        </div>
      </div>

      {/* Barra de progresso (apenas fatura aberta) */}
      {progressPercent !== null && (
        <div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%`, background: "#60a5fa" }}
            />
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#334155" }}>
            {progressPercent}% do ciclo atual
          </p>
        </div>
      )}
    </motion.div>
  );
}