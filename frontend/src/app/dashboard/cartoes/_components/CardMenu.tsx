"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Pencil, FileText, PowerOff, Trash2 } from "lucide-react";
import type { CreditCard } from "../page";
import { ConfirmModal } from "@/components/shared/ConfirmModal";

interface Props {
  card: CreditCard;
  onEdit: (card: CreditCard) => void;
  onDelete: (id: string) => void;
}

export function CardMenu({ card, onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: "Editar informações",
      icon: Pencil,
      color: "#94a3b8",
      onClick: () => { onEdit(card); setOpen(false); },
    },
    {
      label: "Ver fatura atual",
      icon: FileText,
      color: "#94a3b8",
      onClick: () => setOpen(false),
    },
    {
      label: "Desativar cartão",
      icon: PowerOff,
      color: "#fbbf24",
      onClick: () => setOpen(false),
    },
    {
      label: "Excluir cartão",
      icon: Trash2,
      color: "#f87171",
      onClick: () => { setConfirmOpen(true); setOpen(false); },
    },
  ];

  return (
    <>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
          style={{ background: "rgba(255,255,255,0.07)", color: "#64748b" }}
          aria-label="Opções do cartão"
        >
          <MoreVertical size={13} />
        </button>

        {open && (
          <div
            className="absolute right-0 top-9 z-50 rounded-xl overflow-hidden w-48 py-1"
            style={{
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
            }}
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-all hover:brightness-125"
                  style={{
                    color: item.color,
                    background: "transparent",
                  }}
                >
                  <Icon size={13} />
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title={`Excluir ${card.apelido}?`}
        description="Todos os dados deste cartão, incluindo transações e faturas, serão permanentemente removidos. Essa ação não pode ser desfeita."
        onConfirm={() => { onDelete(card.id); setConfirmOpen(false); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}