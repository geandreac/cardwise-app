"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  ArrowLeftRight,
  BarChart2,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const navGroups = [
  {
    label: "PRINCIPAL",
    items: [
      { label: "Visão geral", href: "/dashboard", icon: LayoutDashboard },
      { label: "Meus cartões", href: "/dashboard/cartoes", icon: CreditCard },
      { label: "Faturas", href: "/dashboard/faturas", icon: FileText },
      { label: "Transações", href: "/dashboard/transacoes", icon: ArrowLeftRight },
    ],
  },
  {
    label: "INTELIGÊNCIA",
    items: [
      { label: "Análise", href: "/dashboard/analise", icon: BarChart2 },
      { label: "Projeções", href: "/dashboard/projecoes", icon: TrendingUp },
      { label: "Relatórios", href: "/dashboard/relatorios", icon: BookOpen },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[200px] min-h-[100dvh] flex flex-col py-5 px-3 flex-shrink-0"
      style={{
        backgroundColor: "#0a0f1a",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-7">
        <div
          className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #4338ca)" }}
        >
          <span className="text-white font-bold text-xs">C</span>
        </div>
        <span
          className="text-base font-bold"
          style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
        >
          CardWise
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-5 flex-1">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p
              className="text-[10px] font-semibold px-2 mb-1.5 tracking-wider"
              style={{ color: "#334155" }}
            >
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-150"
                    style={{
                      background: isActive
                        ? "rgba(124, 58, 237, 0.15)"
                        : "transparent",
                      color: isActive ? "#c4b5fd" : "#475569",
                      borderLeft: isActive
                        ? "2px solid #7c3aed"
                        : "2px solid transparent",
                    }}
                  >
                    <Icon size={14} strokeWidth={2} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div
        className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <div
          className="h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #4338ca)",
            color: "#fff",
          }}
        >
          JM
        </div>
        <div className="min-w-0">
          <p
            className="text-xs font-medium truncate"
            style={{ color: "#f1f5f9" }}
          >
            João M.
          </p>
          <p className="text-[10px] truncate" style={{ color: "#334155" }}>
            Plano grátis
          </p>
        </div>
      </div>
    </aside>
  );
}