import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

// Carrega Inter com todas as variações necessárias
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap", // Evita FOUT (flash de texto invisível)
});

export const metadata: Metadata = {
  title: "CardWise — Inteligência financeira para cartões",
  description:
    "Controle total dos seus gastos de cartão de crédito com IA. Importe faturas PDF, categorize automaticamente e preveja seus próximos gastos.",
  keywords: ["cartão de crédito", "controle financeiro", "fatura PDF", "IA"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        {children}
        {/*
          Toaster global do Sonner.
          position="top-center" funciona melhor em mobile.
          theme="dark" mantém consistência com o design system.
        */}
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.07)",
              backdropFilter: "blur(20px)",
              border: "0.5px solid rgba(255, 255, 255, 0.12)",
              color: "#f1f5f9",
            },
          }}
        />
      </body>
    </html>
  );
}