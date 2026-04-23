import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export function AddCardButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl transition-all duration-200 hover:brightness-125 active:scale-95 w-full"
      style={{
        border: "1.5px dashed rgba(124,58,237,0.3)",
        background: "rgba(124,58,237,0.04)",
        aspectRatio: "1 / 1.1",
        minHeight: "180px",
      }}
    >
      <div
        className="h-10 w-10 rounded-xl flex items-center justify-center"
        style={{ background: "rgba(124,58,237,0.15)" }}
      >
        <Plus size={20} style={{ color: "#a78bfa" }} />
      </div>
      <p className="text-xs font-medium" style={{ color: "#7c3aed" }}>
        Adicionar cartão
      </p>
    </button>
  );
}