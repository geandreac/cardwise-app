"use client";

import { useState } from "react";
import { Topbar } from "../_components/Topbar";
import { CardTabs } from "./_components/CardTabs";
import { MonthSelector } from "./_components/MonthSelector";
import { InvoiceList } from "./_components/InvoiceList";
import { InvoiceEmptyState } from "./_components/InvoiceEmptyState";
import { UploadDrawer } from "./_components/UploadDrawer";

export type InvoiceStatus = "aberta" | "fechada" | "paga" | "vencida";

export interface Invoice {
  id: string;
  cardId: string;
  mes: string;
  mesIndex: number; // 0=Jan, 1=Fev, ... 11=Dez
  ano: number;
  vencimento: string;
  fechamento: string;
  total: number;
  status: InvoiceStatus;
}

export interface CardTab {
  id: string;
  apelido: string;
  bandeira: string;
}

const MOCK_CARDS: CardTab[] = [
  { id: "1", apelido: "Nubank Ultravioleta", bandeira: "VISA" },
  { id: "2", apelido: "Itaú Personnalité", bandeira: "MC" },
  { id: "3", apelido: "C6 Bank Carbon", bandeira: "ELO" },
];

const MOCK_INVOICES: Invoice[] = [
  // Nubank — cartão 1
  {
    id: "inv-1",
    cardId: "1",
    mes: "Abril",
    mesIndex: 3,
    ano: 2026,
    vencimento: "23/04/2026",
    fechamento: "16/04/2026",
    total: 1820,
    status: "aberta",
  },
  {
    id: "inv-2",
    cardId: "1",
    mes: "Março",
    mesIndex: 2,
    ano: 2026,
    vencimento: "23/03/2026",
    fechamento: "16/03/2026",
    total: 2340,
    status: "paga",
  },
  {
    id: "inv-3",
    cardId: "1",
    mes: "Fevereiro",
    mesIndex: 1,
    ano: 2026,
    vencimento: "23/02/2026",
    fechamento: "16/02/2026",
    total: 1980,
    status: "paga",
  },
  {
    id: "inv-4",
    cardId: "1",
    mes: "Janeiro",
    mesIndex: 0,
    ano: 2026,
    vencimento: "23/01/2026",
    fechamento: "16/01/2026",
    total: 3100,
    status: "vencida",
  },
  {
    id: "inv-5",
    cardId: "1",
    mes: "Maio",
    mesIndex: 4,
    ano: 2026,
    vencimento: "23/05/2026",
    fechamento: "16/05/2026",
    total: 0,
    status: "fechada",
  },

  // Itaú — cartão 2
  {
    id: "inv-6",
    cardId: "2",
    mes: "Abril",
    mesIndex: 3,
    ano: 2026,
    vencimento: "10/04/2026",
    fechamento: "03/04/2026",
    total: 980,
    status: "aberta",
  },
  {
    id: "inv-7",
    cardId: "2",
    mes: "Março",
    mesIndex: 2,
    ano: 2026,
    vencimento: "10/03/2026",
    fechamento: "03/03/2026",
    total: 760,
    status: "fechada",
  },
  {
    id: "inv-8",
    cardId: "2",
    mes: "Fevereiro",
    mesIndex: 1,
    ano: 2026,
    vencimento: "10/02/2026",
    fechamento: "03/02/2026",
    total: 540,
    status: "paga",
  },

  // C6 — cartão 3
  {
    id: "inv-9",
    cardId: "3",
    mes: "Abril",
    mesIndex: 3,
    ano: 2026,
    vencimento: "15/04/2026",
    fechamento: "08/04/2026",
    total: 910,
    status: "fechada",
  },
  {
    id: "inv-10",
    cardId: "3",
    mes: "Março",
    mesIndex: 2,
    ano: 2026,
    vencimento: "15/03/2026",
    fechamento: "08/03/2026",
    total: 430,
    status: "paga",
  },
];

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const CURRENT_MONTH_INDEX = 3; // Abril

export default function FaturasPage() {
  const [selectedCardId, setSelectedCardId] = useState(MOCK_CARDS[0].id);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null); // null = todos os meses
  const [uploadDrawerOpen, setUploadDrawerOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Filtra por cartão e por mês (se algum mês estiver selecionado)
  const filteredInvoices = MOCK_INVOICES.filter((inv) => {
    const matchCard = inv.cardId === selectedCardId;
    const matchMonth = selectedMonth === null || inv.mesIndex === selectedMonth;
    return matchCard && matchMonth;
  });

  function handleCardSelect(id: string) {
    setSelectedCardId(id);
    setSelectedMonth(null); // reseta o filtro de mês ao trocar de cartão
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar
        title="Faturas"
        subtitle="Acompanhe e gerencie suas faturas"
      />

      <div className="flex flex-col gap-4 p-5">
        <CardTabs
          cards={MOCK_CARDS}
          selectedId={selectedCardId}
          onSelect={handleCardSelect}
        />

        <MonthSelector
          months={MONTHS}
          selectedIndex={selectedMonth}
          onSelect={(i) => setSelectedMonth((prev) => (prev === i ? null : i))}
          currentIndex={CURRENT_MONTH_INDEX}
        />

        {filteredInvoices.length === 0 ? (
          <InvoiceEmptyState />
        ) : (
          <InvoiceList
            invoices={filteredInvoices}
            onUpload={(invoice) => {
              setSelectedInvoice(invoice);
              setUploadDrawerOpen(true);
            }}
          />
        )}
      </div>

      <UploadDrawer
        open={uploadDrawerOpen}
        invoice={selectedInvoice}
        onClose={() => {
          setUploadDrawerOpen(false);
          setSelectedInvoice(null);
        }}
      />
    </div>
  );
}