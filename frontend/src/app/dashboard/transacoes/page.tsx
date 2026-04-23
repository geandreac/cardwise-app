"use client";

import { useState, useMemo, useCallback } from "react";
import { Topbar } from "../_components/Topbar";
import { FilterBar } from "./_components/FilterBar";
import { ResultsSummary } from "./_components/ResultsSummary";
import { TransactionGroup } from "./_components/TransactionGroup";
import { TransactionsEmptyState } from "./_components/TransactionsEmptyState";
import { TransactionDrawer } from "./_components/TransactionDrawer";

export type Category =
  | "Alimentação"
  | "Transporte"
  | "Assinaturas"
  | "Saúde"
  | "Lazer"
  | "Outros";

export interface Transaction {
  id: string;
  nome: string;
  categoria: Category;
  cartao: string;
  cartaoId: string;
  valor: number;
  data: string; // ISO string
  hora: string;
  parcelado?: boolean;
  parcelaAtual?: number;
  parcelaTotal?: number;
  nota?: string;
}

export interface Filters {
  busca: string;
  cartoes: string[];
  categorias: Category[];
  dataInicio: string;
  dataFim: string;
  valorMin: number;
  valorMax: number;
}

const CATEGORY_EMOJI: Record<Category, string> = {
  Alimentação: "🛒",
  Transporte: "⛽",
  Assinaturas: "📺",
  Saúde: "💊",
  Lazer: "🎬",
  Outros: "📦",
};

export { CATEGORY_EMOJI };

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "t1", nome: "Mercado Extra", categoria: "Alimentação", cartao: "Nubank", cartaoId: "1", valor: 187, data: "2026-04-21", hora: "14:32" },
  { id: "t2", nome: "iFood", categoria: "Alimentação", cartao: "Nubank", cartaoId: "1", valor: 54, data: "2026-04-21", hora: "20:10" },
  { id: "t3", nome: "Posto Ipiranga", categoria: "Transporte", cartao: "Itaú", cartaoId: "2", valor: 220, data: "2026-04-20", hora: "08:45" },
  { id: "t4", nome: "Uber", categoria: "Transporte", cartao: "Nubank", cartaoId: "1", valor: 38, data: "2026-04-20", hora: "22:18" },
  { id: "t5", nome: "Netflix", categoria: "Assinaturas", cartao: "Nubank", cartaoId: "1", valor: 55, data: "2026-04-19", hora: "00:00" },
  { id: "t6", nome: "Spotify", categoria: "Assinaturas", cartao: "Nubank", cartaoId: "1", valor: 22, data: "2026-04-19", hora: "00:00" },
  { id: "t7", nome: "Drogasil", categoria: "Saúde", cartao: "C6 Bank", cartaoId: "3", valor: 94, data: "2026-04-18", hora: "10:20" },
  { id: "t8", nome: "Cinema Kinoplex", categoria: "Lazer", cartao: "Itaú", cartaoId: "2", valor: 120, data: "2026-04-18", hora: "19:30", parcelado: true, parcelaAtual: 2, parcelaTotal: 3 },
  { id: "t9", nome: "Padaria do Bairro", categoria: "Alimentação", cartao: "Nubank", cartaoId: "1", valor: 32, data: "2026-04-17", hora: "07:55" },
  { id: "t10", nome: "Shell", categoria: "Transporte", cartao: "C6 Bank", cartaoId: "3", valor: 180, data: "2026-04-17", hora: "17:40" },
  { id: "t11", nome: "Apple TV+", categoria: "Assinaturas", cartao: "Itaú", cartaoId: "2", valor: 21, data: "2026-04-16", hora: "00:00" },
  { id: "t12", nome: "Farmácia Nissei", categoria: "Saúde", cartao: "Nubank", cartaoId: "1", valor: 67, data: "2026-04-16", hora: "15:12" },
  { id: "t13", nome: "Bar do Zé", categoria: "Lazer", cartao: "C6 Bank", cartaoId: "3", valor: 210, data: "2026-04-15", hora: "21:00", parcelado: true, parcelaAtual: 1, parcelaTotal: 2 },
  { id: "t14", nome: "Rappi", categoria: "Alimentação", cartao: "Nubank", cartaoId: "1", valor: 89, data: "2026-04-14", hora: "12:30" },
  { id: "t15", nome: "Decathlon", categoria: "Lazer", cartao: "Itaú", cartaoId: "2", valor: 340, data: "2026-04-13", hora: "16:00", parcelado: true, parcelaAtual: 3, parcelaTotal: 12 },
];

export const CARDS_OPTIONS = [
  { id: "1", label: "Nubank" },
  { id: "2", label: "Itaú" },
  { id: "3", label: "C6 Bank" },
];

export const CATEGORIES: Category[] = [
  "Alimentação",
  "Transporte",
  "Assinaturas",
  "Saúde",
  "Lazer",
  "Outros",
];

const DEFAULT_FILTERS: Filters = {
  busca: "",
  cartoes: [],
  categorias: [],
  dataInicio: "",
  dataFim: "",
  valorMin: 0,
  valorMax: 5000,
};

function groupByDate(transactions: Transaction[]) {
  const groups: Record<string, Transaction[]> = {};
  for (const t of transactions) {
    if (!groups[t.data]) groups[t.data] = [];
    groups[t.data].push(t);
  }
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
}

function formatDateLabel(dateStr: string) {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const date = new Date(dateStr + "T12:00:00");
  const todayStr = today.toISOString().slice(0, 10);
  const yestStr = yesterday.toISOString().slice(0, 10);

  if (dateStr === todayStr) return "Hoje";
  if (dateStr === yestStr) return "Ontem";

  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });
}

export { formatDateLabel };

export default function TransacoesPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (filters.busca && !t.nome.toLowerCase().includes(filters.busca.toLowerCase())) return false;
      if (filters.cartoes.length > 0 && !filters.cartoes.includes(t.cartaoId)) return false;
      if (filters.categorias.length > 0 && !filters.categorias.includes(t.categoria)) return false;
      if (filters.dataInicio && t.data < filters.dataInicio) return false;
      if (filters.dataFim && t.data > filters.dataFim) return false;
      if (t.valor < filters.valorMin) return false;
      if (t.valor > filters.valorMax) return false;
      return true;
    });
  }, [transactions, filters]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);
  const totalFiltrado = useMemo(() => filtered.reduce((s, t) => s + t.valor, 0), [filtered]);

  const hasActiveFilters =
    filters.busca !== "" ||
    filters.cartoes.length > 0 ||
    filters.categorias.length > 0 ||
    filters.dataInicio !== "" ||
    filters.dataFim !== "" ||
    filters.valorMin !== 0 ||
    filters.valorMax !== 5000;

  const handleClearFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  function handleSaveTransaction(updated: Transaction) {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
    setSelectedTransaction(null);
  }

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar title="Transações" subtitle="Histórico completo de gastos" />

      <div className="flex flex-col gap-3 p-5">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onClear={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <ResultsSummary
          count={filtered.length}
          total={totalFiltrado}
          filters={filters}
        />

        {filtered.length === 0 ? (
          <TransactionsEmptyState onClear={handleClearFilters} hasFilters={hasActiveFilters} />
        ) : (
          <div className="flex flex-col gap-4">
            {grouped.map(([date, items]) => (
              <TransactionGroup
                key={date}
                dateLabel={formatDateLabel(date)}
                transactions={items}
                onSelect={setSelectedTransaction}
              />
            ))}
          </div>
        )}
      </div>

      <TransactionDrawer
        transaction={selectedTransaction}
        open={selectedTransaction !== null}
        onClose={() => setSelectedTransaction(null)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}