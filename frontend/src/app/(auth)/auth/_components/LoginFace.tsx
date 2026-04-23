"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { CONFIG } from "@/constants";
import { createClient } from "@/lib/supabase";

interface LoginFaceProps {
  onSwitchMode: () => void;
}

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function LoginFace({ onSwitchMode }: LoginFaceProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error("E-mail ou senha incorretos.");
        return;
      }

      router.push("/dashboard");
    } catch {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOAuth(provider: "google" | "github") {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="glass-card p-8 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key="login-form"
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          {/* Cabeçalho */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7c3aed, #4338ca)" }}
              >
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span
                className="text-xl font-bold"
                style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
              >
                {CONFIG.APP_NAME}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#94a3b8" }}>
              Bem-vindo de volta
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex rounded-[10px] p-1 mb-6"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <button
              type="button"
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: "rgba(124, 58, 237, 0.3)",
                color: "#f1f5f9",
                border: "0.5px solid rgba(124, 58, 237, 0.4)",
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={onSwitchMode}
              className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
              style={{ color: "#94a3b8" }}
            >
              Criar conta
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-4">
              {/* E-mail */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-medium mb-1.5"
                  style={{ color: "#94a3b8" }}
                >
                  E-mail
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  aria-describedby={errors.email ? "login-email-error" : undefined}
                  aria-invalid={!!errors.email}
                  className="glass-input w-full h-11 px-3 text-sm"
                  {...register("email")}
                />
                {errors.email && (
                  <p
                    id="login-email-error"
                    role="alert"
                    className="mt-1.5 text-xs"
                    style={{ color: "#f87171" }}
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Senha */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-medium"
                    style={{ color: "#94a3b8" }}
                  >
                    Senha
                  </label>
                  <button
                    type="button"
                    className="text-xs transition-opacity hover:opacity-80"
                    style={{ color: "#7c3aed" }}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                    aria-invalid={!!errors.password}
                    className="glass-input w-full h-11 px-3 pr-10 text-sm"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                    style={{ color: "#475569" }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="login-password-error"
                    role="alert"
                    className="mt-1.5 text-xs"
                    style={{ color: "#f87171" }}
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Botão submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full h-11 mt-6 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                "Entrar na conta"
              )}
            </button>
          </form>

          {/* Divisor OAuth */}
          <div className="flex items-center gap-3 my-6">
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
            <span className="text-xs" style={{ color: "#475569" }}>
              ou continue com
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </div>

          {/* Botões OAuth */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="flex items-center justify-center h-11 rounded-[10px] text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.10)",
                color: "#f1f5f9",
              }}
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("github")}
              className="flex items-center justify-center h-11 rounded-[10px] text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.10)",
                color: "#f1f5f9",
              }}
            >
              GitHub
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}