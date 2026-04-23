import { FileX } from "lucide-react";

export function InvoiceEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <FileX size={48} style={{ color: "#1e293b", opacity: 0.3 }} />
      <div className="text-center">
        <p className="text-sm font-medium mb-1" style={{ color: "#475569" }}>
          Nenhuma fatura encontrada
        </p>
        <p className="text-xs" style={{ color: "#334155" }}>
          As faturas aparecerão aqui conforme você registrar transações
        </p>
      </div>
    </div>
  );
}