"use client";

interface Props {
  months: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  currentIndex: number;
}

export function MonthSelector({ months, selectedIndex, onSelect, currentIndex }: Props) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {months.map((month, i) => {
        const isSelected = i === selectedIndex;
        const isCurrent = i === currentIndex;

        return (
          <button
            key={month}
            type="button"
            onClick={() => onSelect(i)}
            className="relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:brightness-125 active:scale-95"
            style={{
              background: isSelected
                ? "rgba(124,58,237,0.2)"
                : "rgba(255,255,255,0.03)",
              border: isSelected
                ? "1px solid rgba(124,58,237,0.35)"
                : "1px solid rgba(255,255,255,0.06)",
              color: isSelected ? "#a78bfa" : "#475569",
            }}
          >
            {month}
            {isCurrent && (
              <span
                className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                style={{ background: "#7c3aed" }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}