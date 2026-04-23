"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, Smartphone } from "lucide-react";
import type { NotificationSetting } from "../page";

interface Props {
  settings: NotificationSetting[];
}

const eventLabels = {
  limite_atingido: "Limite de gastos atingido",
  fatura_proxima: "Fatura próxima do vencimento",
  gasto_alto: "Gasto atípico detectado",
};

export function Notifications({ settings: initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);

  function toggleSetting(id: string) {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ativo: !s.ativo } : s))
    );
  }

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
          Notificações
        </p>
        <p className="text-[10px]" style={{ color: "#334155" }}>
          Escolha como e quando você quer ser notificado
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(eventLabels).map(([eventKey, eventLabel], i) => (
          <motion.div
            key={eventKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="rounded-xl p-4 flex flex-col gap-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center gap-3">
              <Bell size={16} style={{ color: "#a78bfa" }} />
              <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                {eventLabel}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {settings
                .filter((s) => s.evento === eventKey)
                .map((setting) => (
                  <button
                    key={setting.id}
                    type="button"
                    onClick={() => toggleSetting(setting.id)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:brightness-125 active:scale-95"
                    style={{
                      background: setting.ativo
                        ? "rgba(52,211,153,0.15)"
                        : "rgba(255,255,255,0.04)",
                      border: setting.ativo
                        ? "1px solid rgba(52,211,153,0.25)"
                        : "1px solid rgba(255,255,255,0.06)",
                      color: setting.ativo ? "#34d399" : "#475569",
                    }}
                  >
                    {setting.tipo === "email" ? (
                      <Mail size={12} />
                    ) : (
                      <Smartphone size={12} />
                    )}
                    {setting.tipo === "email" ? "E-mail" : "Push"}
                    {setting.ativo ? " (Ativo)" : " (Inativo)"}
                  </button>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}