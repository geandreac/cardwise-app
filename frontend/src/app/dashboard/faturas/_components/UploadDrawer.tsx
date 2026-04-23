"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload, FileText, CheckCircle, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Invoice } from "../page";

interface Props {
  open: boolean;
  invoice: Invoice | null;
  onClose: () => void;
}

type UploadState = "idle" | "selected" | "processing" | "success" | "error";

export function UploadDrawer({ open, invoice, onClose }: Props) {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset ao abrir
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setUploadState("idle");
      setFileName(null);
      setProgress(0);
    }
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  function handleFileSelect(file: File) {
    if (!file || file.type !== "application/pdf") return;
    setFileName(file.name);
    setUploadState("selected");
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function handleProcess() {
    setUploadState("processing");
    setProgress(0);

    // Simulação de progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simula sucesso após completar
          setTimeout(() => setUploadState("success"), 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
  }

  function handleRetry() {
    setUploadState("idle");
    setFileName(null);
    setProgress(0);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
            style={{
              width: "420px",
              background: "#0a0f1a",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "-24px 0 60px rgba(0,0,0,0.5)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div>
                <h2 className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>
                  Importar fatura em PDF
                </h2>
                <p className="text-[10px]" style={{ color: "#334155" }}>
                  {invoice ? `${invoice.mes} ${invoice.ano}` : "Selecione um arquivo"}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="h-8 w-8 rounded-lg flex items-center justify-center transition-all hover:brightness-125 active:scale-95"
                style={{ background: "rgba(255,255,255,0.06)", color: "#64748b" }}
                aria-label="Fechar drawer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 px-5 py-6 flex flex-col gap-5 overflow-y-auto">

              {/* Estado idle ou selected — área de drop */}
              {(uploadState === "idle" || uploadState === "selected") && (
                <>
                  <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center gap-3 rounded-2xl p-8 cursor-pointer transition-all hover:brightness-110"
                    style={{
                      border: "1.5px dashed rgba(124,58,237,0.3)",
                      background: "rgba(124,58,237,0.04)",
                      minHeight: "180px",
                    }}
                  >
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center"
                      style={{ background: "rgba(124,58,237,0.15)" }}
                    >
                      <Upload size={22} style={{ color: "#a78bfa" }} />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-semibold mb-1" style={{ color: "#94a3b8" }}>
                        Arraste o PDF aqui ou clique para selecionar
                      </p>
                      <p className="text-[10px]" style={{ color: "#334155" }}>
                        Apenas arquivos .pdf são aceitos
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect(file);
                      }}
                    />
                  </div>

                  {/* Arquivo selecionado */}
                  {uploadState === "selected" && fileName && (
                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{
                        background: "rgba(52,211,153,0.06)",
                        border: "1px solid rgba(52,211,153,0.15)",
                      }}
                    >
                      <FileText size={16} style={{ color: "#34d399" }} />
                      <p className="text-xs font-medium flex-1 truncate" style={{ color: "#94a3b8" }}>
                        {fileName}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFileName(null);
                          setUploadState("idle");
                        }}
                        aria-label="Remover arquivo"
                      >
                        <X size={13} style={{ color: "#475569" }} />
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Estado processing */}
              {uploadState === "processing" && (
                <div className="flex flex-col items-center justify-center gap-5 py-10">
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(124,58,237,0.15)" }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw size={28} style={{ color: "#a78bfa" }} />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-1" style={{ color: "#f1f5f9" }}>
                      Lendo sua fatura...
                    </p>
                    <p className="text-[10px]" style={{ color: "#334155" }}>
                      A IA está extraindo as transações do PDF
                    </p>
                  </div>
                  <div className="w-full">
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa)", width: `${Math.min(progress, 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-[10px] mt-1.5 text-right" style={{ color: "#334155" }}>
                      {Math.min(progress, 100)}%
                    </p>
                  </div>
                </div>
              )}

              {/* Estado success */}
              {uploadState === "success" && (
                <div className="flex flex-col items-center justify-center gap-4 py-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="h-16 w-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(52,211,153,0.15)" }}
                  >
                    <CheckCircle size={32} style={{ color: "#34d399" }} />
                  </motion.div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-1" style={{ color: "#f1f5f9" }}>
                      Fatura importada com sucesso!
                    </p>
                    <p className="text-[10px]" style={{ color: "#34d399" }}>
                      As transações já estão disponíveis
                    </p>
                  </div>
                </div>
              )}

              {/* Estado error */}
              {uploadState === "error" && (
                <div className="flex flex-col items-center justify-center gap-4 py-10">
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(248,113,113,0.15)" }}
                  >
                    <X size={32} style={{ color: "#f87171" }} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-1" style={{ color: "#f1f5f9" }}>
                      Erro ao processar o PDF
                    </p>
                    <p className="text-[10px]" style={{ color: "#334155" }}>
                      Verifique se o arquivo é uma fatura válida
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
                    style={{
                      background: "rgba(248,113,113,0.12)",
                      color: "#f87171",
                      border: "1px solid rgba(248,113,113,0.2)",
                    }}
                  >
                    Tentar novamente
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {(uploadState === "idle" || uploadState === "selected") && (
              <div
                className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-xs font-medium transition-all hover:brightness-125 active:scale-95"
                  style={{ background: "rgba(255,255,255,0.05)", color: "#64748b" }}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleProcess}
                  disabled={uploadState !== "selected"}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #4338ca)",
                    color: "#fff",
                    boxShadow: uploadState === "selected" ? "0 4px 16px rgba(124,58,237,0.3)" : "none",
                  }}
                >
                  Processar fatura
                </button>
              </div>
            )}

            {uploadState === "success" && (
              <div
                className="px-5 py-4 flex-shrink-0"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all hover:brightness-110 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #059669, #065f46)",
                    color: "#fff",
                  }}
                >
                  Concluir
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}