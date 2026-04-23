import { CreditCard } from "lucide-react";

interface Props {
  onAdd: () => void;
}

export function CardsEmptyState({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <CreditCard size={48} style={{ color: "#1e293b", opacity: 0.3 }} />
      <div className="text-center">
        <p className="text-sm font-medium mb-1" style={{ color: "#475569" }}>
          Nenhum cartão cadastrado
        </p>
        <p className="text-xs" style={{ color: "#334155" }}>
          Adicione seu primeiro cartão para começar a acompanhar seus gastos
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
        style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}
      >
        + Adicionar meu primeiro cartão
      </button>
    </div>
  );
}