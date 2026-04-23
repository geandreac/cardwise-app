"use client";

import { motion } from "framer-motion";
import { Download, Trash2, Shield } from "lucide-react";

export function AccountData() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mb-4">
        <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
          Dados da Conta
        </p>
        <p className="text-[10px]" style={{ color: "#334155" }}>
          Gerencie seus dados, exporte ou exclua sua conta
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="rounded-xl p-4 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <Download size={16} style={{ color: "#34d399" }} />
            <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
              Exportar meus dados
            </p>
          </div>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "rgba(52,211,153,0.15)",
              color: "#34d399",
              border: "1px solid rgba(52,211,153,0.25)",
            }}
          >
            Baixar CSV
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="rounded-xl p-4 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <Shield size={16} style={{ color: "#fbbf24" }} />
            <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
              Alterar senha
            </p>
          </div>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "rgba(251,191,36,0.15)",
              color: "#fbbf24",
              border: "1px solid rgba(251,191,36,0.25)",
            }}
          >
            Redefinir
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="rounded-xl p-4 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center gap-3">
            <Trash2 size={16} style={{ color: "#f87171" }} />
            <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
              Excluir minha conta
            </p>
          </div>
          <button
            type="button"
            className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
            style={{
              background: "rgba(248,113,113,0.15)",
              color: "#f87171",
              border: "1px solid rgba(248,113,113,0.25)",
            }}
          >
            Excluir
          </button>
        </motion.div>
      </div>
    </div>
  );
}