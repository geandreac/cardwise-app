"use client";

import { useState } from "react";
import { Topbar } from "../_components/Topbar";
import { CardsSummary } from "./_components/CardsSummary";
import { CardGrid } from "./_components/CardGrid";
import { CardDrawer } from "./_components/CardDrawer";
import { CardsEmptyState } from "./_components/CardsEmptyState";

export type CardColor = "roxo" | "azul" | "verde" | "grafite";
export type CardBrand = "VISA" | "MC" | "ELO" | "AMEX" | "HIPERCARD";

export interface CreditCard {
  id: string;
  apelido: string;
  bandeira: CardBrand;
  digitos: string;
  titular: string;
  limite: number;
  vencimento: number;
  fechamento: number;
  cor: CardColor;
  gasto: number;
}

const MOCK_CARDS: CreditCard[] = [
  {
    id: "1",
    apelido: "Nubank Ultravioleta",
    bandeira: "VISA",
    digitos: "4321",
    titular: "JOAO MIRANDA",
    limite: 8000,
    vencimento: 23,
    fechamento: 16,
    cor: "roxo",
    gasto: 1820,
  },
  {
    id: "2",
    apelido: "Itaú Personnalité",
    bandeira: "MC",
    digitos: "8876",
    titular: "JOAO MIRANDA",
    limite: 3500,
    vencimento: 10,
    fechamento: 3,
    cor: "azul",
    gasto: 980,
  },
  {
    id: "3",
    apelido: "C6 Bank Carbon",
    bandeira: "ELO",
    digitos: "2290",
    titular: "JOAO MIRANDA",
    limite: 1000,
    vencimento: 15,
    fechamento: 8,
    cor: "grafite",
    gasto: 910,
  },
];

export default function CartoesPage() {
  const [cards, setCards] = useState<CreditCard[]>(MOCK_CARDS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<CreditCard | null>(null);

  function handleAdd(card: CreditCard) {
    setCards((prev) => [...prev, card]);
  }

  function handleEdit(card: CreditCard) {
    setCards((prev) => prev.map((c) => (c.id === card.id ? card : c)));
  }

  function handleDelete(id: string) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }

  function openAdd() {
    setEditingCard(null);
    setDrawerOpen(true);
  }

  function openEdit(card: CreditCard) {
    setEditingCard(card);
    setDrawerOpen(true);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar title="Meus cartões" subtitle={`${cards.length} cartão${cards.length !== 1 ? "s" : ""} ativo${cards.length !== 1 ? "s" : ""}`} />

      <div className="flex flex-col gap-3 p-5">
        {cards.length > 0 && <CardsSummary cards={cards} />}

        {cards.length === 0 ? (
          <CardsEmptyState onAdd={openAdd} />
        ) : (
          <CardGrid
            cards={cards}
            onAdd={openAdd}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <CardDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSave={(card) => {
          if (editingCard) {
            handleEdit(card);
          } else {
            handleAdd(card);
          }
          setDrawerOpen(false);
        }}
        editingCard={editingCard}
      />
    </div>
  );
}