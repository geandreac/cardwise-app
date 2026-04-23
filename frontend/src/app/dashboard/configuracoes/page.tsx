"use client";

import { useState } from "react";
import { Topbar } from "../_components/Topbar";
import { MyCards } from "./_components/MyCards";
import { Categories } from "./_components/Categories";
import { SpendingLimits } from "./_components/SpendingLimits";
import { Notifications } from "./_components/Notifications";
import { AccountData } from "./_components/AccountData";

export type ConfigTab = "cartoes" | "categorias" | "limites" | "notificacoes" | "conta";

export interface CardItem {
  id: string;
  apelido: string;
  bandeira: "Visa" | "Mastercard" | "Elo";
  ultimosDigitos: string;
  cor: string;
}

export interface CategoryItem {
  id: string;
  nome: string;
  emoji: string;
}

export interface SpendingLimit {
  id: string;
  categoriaId: string;
  limite: number;
  gastoAtual: number;
}

export interface NotificationSetting {
  id: string;
  tipo: "email" | "push";
  evento: "limite_atingido" | "fatura_proxima" | "gasto_alto";
  ativo: boolean;
}

const MOCK_CARDS: CardItem[] = [
  { id: "c1", apelido: "Nubank Ultravioleta", bandeira: "Mastercard", ultimosDigitos: "1234", cor: "#8a2be2" },
  { id: "c2", apelido: "Itaú Personnalité", bandeira: "Visa", ultimosDigitos: "5678", cor: "#ff0000" },
  { id: "c3", apelido: "C6 Bank Carbon", bandeira: "Mastercard", ultimosDigitos: "9012", cor: "#000000" },
];

const MOCK_CATEGORIES: CategoryItem[] = [
  { id: "cat1", nome: "Alimentação", emoji: "🛒" },
  { id: "cat2", nome: "Transporte", emoji: "⛽" },
  { id: "cat3", nome: "Assinaturas", emoji: "📺" },
  { id: "cat4", nome: "Saúde", emoji: "💊" },
  { id: "cat5", nome: "Lazer", emoji: "🎬" },
  { id: "cat6", nome: "Outros", emoji: "📦" },
];

const MOCK_LIMITS: SpendingLimit[] = [
  { id: "l1", categoriaId: "cat1", limite: 1000, gastoAtual: 850 },
  { id: "l2", categoriaId: "cat2", limite: 500, gastoAtual: 400 },
  { id: "l3", categoriaId: "cat5", limite: 300, gastoAtual: 320 },
];

const MOCK_NOTIFICATIONS: NotificationSetting[] = [
  { id: "n1", tipo: "email", evento: "limite_atingido", ativo: true },
  { id: "n2", tipo: "push", evento: "limite_atingido", ativo: true },
  { id: "n3", tipo: "email", evento: "fatura_proxima", ativo: true },
  { id: "n4", tipo: "push", evento: "fatura_proxima", ativo: false },
  { id: "n5", tipo: "email", evento: "gasto_alto", ativo: false },
  { id: "n6", tipo: "push", evento: "gasto_alto", ativo: true },
];

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<ConfigTab>("cartoes");

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
      <Topbar title="Configurações" subtitle="Gerencie suas preferências e dados" />

      <div className="flex flex-col gap-4 p-5">
        {/* Navegação por abas */}
        <div
          className="flex items-center gap-1 p-1 rounded-xl flex-wrap"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <TabButton label="Meus Cartões" tab="cartoes" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton label="Categorias" tab="categorias" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton label="Limites de Gastos" tab="limites" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton label="Notificações" tab="notificacoes" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton label="Dados da Conta" tab="conta" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Conteúdo das abas */}
        <div className="flex-1">
          {activeTab === "cartoes" && <MyCards cards={MOCK_CARDS} />}
          {activeTab === "categorias" && <Categories categories={MOCK_CATEGORIES} />}
          {activeTab === "limites" && <SpendingLimits limits={MOCK_LIMITS} categories={MOCK_CATEGORIES} />}
          {activeTab === "notificacoes" && <Notifications settings={MOCK_NOTIFICATIONS} />}
          {activeTab === "conta" && <AccountData />}
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  label: string;
  tab: ConfigTab;
  activeTab: ConfigTab;
  setActiveTab: (tab: ConfigTab) => void;
}

function TabButton({ label, tab, activeTab, setActiveTab }: TabButtonProps) {
  const isActive = tab === activeTab;
  return (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
      style={{
        background: isActive ? "rgba(124,58,237,0.2)" : "transparent",
        border: isActive ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
        color: isActive ? "#a78bfa" : "#475569",
      }}
    >
      {label}
    </button>
  );
}