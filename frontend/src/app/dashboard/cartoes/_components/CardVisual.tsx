import type { CreditCard, CardColor } from "../page";

const gradients: Record<CardColor, string> = {
  roxo: "linear-gradient(135deg, #1e1b4b, #4c1d95)",
  azul: "linear-gradient(135deg, #0c1445, #1e40af)",
  verde: "linear-gradient(135deg, #052e16, #166534)",
  grafite: "linear-gradient(135deg, #111827, #374151)",
};

function getStatusBadge(percent: number) {
  if (percent < 60) return { label: "OK", color: "#34d399", bg: "rgba(52,211,153,0.15)" };
  if (percent < 85) return { label: "Atenção", color: "#fbbf24", bg: "rgba(251,191,36,0.15)" };
  return { label: "Crítico", color: "#f87171", bg: "rgba(248,113,113,0.15)" };
}

function getBarColor(percent: number) {
  if (percent < 60) return "#34d399";
  if (percent < 85) return "#fbbf24";
  return "#f87171";
}

interface Props {
  card: CreditCard;
}

export function CardVisual({ card }: Props) {
  const percent = Math.round((card.gasto / card.limite) * 100);
  const badge = getStatusBadge(percent);
  const barColor = getBarColor(percent);

  return (
    <div className="flex flex-col gap-2">
      {/* Cartão físico */}
      <div
        className="relative rounded-2xl p-4 overflow-hidden"
        style={{
          background: gradients[card.cor],
          aspectRatio: "1.586 / 1",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Reflexo sutil */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.4) 0%, transparent 60%)",
          }}
        />

        {/* Header */}
        <div className="relative flex items-start justify-between mb-4">
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
          >
            {card.bandeira}
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded"
            style={{ background: badge.bg, color: badge.color }}
          >
            {badge.label}
          </span>
        </div>

        {/* Número mascarado */}
        <div className="relative mb-4">
          <p
            className="text-sm font-mono tracking-widest"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            •••• •••• •••• {card.digitos}
          </p>
        </div>

        {/* Rodapé */}
        <div className="relative flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Titular
            </p>
            <p className="text-xs font-semibold tracking-wider" style={{ color: "rgba(255,255,255,0.9)" }}>
              {card.titular}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              Vencimento
            </p>
            <p className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>
              Dia {card.vencimento}
            </p>
          </div>
        </div>
      </div>

      {/* Barra de uso */}
      <div>
        <div
          className="h-1.5 rounded-full overflow-hidden mb-1.5"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${percent}%`, background: barColor }}
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[10px]" style={{ color: "#475569" }}>
            R$ {card.gasto.toLocaleString("pt-BR")} gastos
          </p>
          <p className="text-[10px]" style={{ color: "#334155" }}>
            de R$ {card.limite.toLocaleString("pt-BR")} · vence dia {card.vencimento}
          </p>
        </div>
      </div>
    </div>
  );
}