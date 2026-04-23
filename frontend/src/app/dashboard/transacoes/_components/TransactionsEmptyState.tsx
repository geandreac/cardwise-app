import { Search } from "lucide-react";

interface Props {
  onClear: () => void;
  hasFilters: boolean;
}

export function TransactionsEmptyState({ onClear, hasFilters }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Search size={48} style={{ color: "#1e293b", opacity: 0.3 }} />
      <div className="text-center">
        <p className="text-sm font-medium mb-1" style={{ color: "#475569" }}>
          Nenhuma transação encontrada
        </p>
        <p className="text-xs" style={{ color: "#334155" }}>
          {hasFilters
            ? "Tente ajustar os filtros ou o período selecionado"
            : "Suas transações aparecerão aqui assim que forem registradas"}
        </p>
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
          style={{
            background: "rgba(124,58,237,0.15)",
            color: "#a78bfa",
            border: "1px solid rgba(124,58,237,0.25)",
          }}
        >
          Limpar filtros
        </button>
      )}
    </div>
  );
}