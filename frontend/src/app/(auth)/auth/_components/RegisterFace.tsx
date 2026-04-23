"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { getPasswordStrength } from "@/lib/utils";
import { CONFIG } from "@/constants";
import { createClient } from "@/lib/supabase";

interface RegisterFaceProps {
  onSwitchMode: () => void;
}

type ViewState = "form" | "verify";

const fadeVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const strengthConfig = [
  { label: "Muito fraca", color: "#f87171" },
  { label: "Fraca",       color: "#f87171" },
  { label: "Razoável",    color: "#fbbf24" },
  { label: "Boa",         color: "#60a5fa" },
  { label: "Forte",       color: "#34d399" },
];

export function RegisterFace({ onSwitchMode }: RegisterFaceProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("form");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordStrength = getPasswordStrength(passwordValue);
  const strengthInfo = strengthConfig[passwordStrength];

  function startCountdown() {
    setCountdown(45);
    setCanResend(false);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function formatCountdown(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  async function onSubmit(data: RegisterFormData) {
  setIsLoading(true);
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.full_name,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setSubmittedEmail(data.email);
    setViewState("verify");
    startCountdown();
  } catch {
    toast.error("Erro inesperado. Tente novamente.");
  } finally {
    setIsLoading(false);
  }
}

  return (
    <div className="glass-card p-8 w-full">
      <AnimatePresence mode="wait">
        {viewState === "form" ? (
          <motion.div
            key="register-form"
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
                  className="text-xl font-bold tracking-tight"
                  style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
                >
                  {CONFIG.APP_NAME}
                </span>
              </div>
              <p className="text-sm" style={{ color: "#94a3b8" }}>
                Crie sua conta gratuitamente
              </p>
            </div>

            {/* Tabs */}
            <div
              className="flex rounded-[10px] p-1 mb-6"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <button
                type="button"
                onClick={onSwitchMode}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{ color: "#94a3b8" }}
              >
                Entrar
              </button>
              <button
                type="button"
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: "rgba(124, 58, 237, 0.3)",
                  color: "#f1f5f9",
                  border: "0.5px solid rgba(124, 58, 237, 0.4)",
                }}
              >
                Criar conta
              </button>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.07 } },
                }}
              >
                {/* Nome */}
                <motion.div variants={fadeVariants}>
                  <label
                    htmlFor="register-name"
                    className="block text-xs font-medium mb-1.5"
                    style={{ color: "#94a3b8" }}
                  >
                    Nome completo
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    autoComplete="name"
                    placeholder="João Silva"
                    aria-describedby={errors.full_name ? "register-name-error" : undefined}
                    aria-invalid={!!errors.full_name}
                    className="glass-input w-full h-11 px-3 text-sm"
                    {...register("full_name")}
                  />
                  {errors.full_name && (
                    <p
                      id="register-name-error"
                      role="alert"
                      className="mt-1.5 text-xs"
                      style={{ color: "#f87171" }}
                    >
                      {errors.full_name.message}
                    </p>
                  )}
                </motion.div>

                {/* E-mail */}
                <motion.div variants={fadeVariants}>
                  <label
                    htmlFor="register-email"
                    className="block text-xs font-medium mb-1.5"
                    style={{ color: "#94a3b8" }}
                  >
                    E-mail
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu@email.com"
                    aria-describedby={errors.email ? "register-email-error" : undefined}
                    aria-invalid={!!errors.email}
                    className="glass-input w-full h-11 px-3 text-sm"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p
                      id="register-email-error"
                      role="alert"
                      className="mt-1.5 text-xs"
                      style={{ color: "#f87171" }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Senha + Strength */}
                <motion.div variants={fadeVariants}>
                  <label
                    htmlFor="register-password"
                    className="block text-xs font-medium mb-1.5"
                    style={{ color: "#94a3b8" }}
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Mínimo 8 caracteres"
                      aria-describedby="register-password-strength"
                      aria-invalid={!!errors.password}
                      className="glass-input w-full h-11 px-3 pr-10 text-sm"
                      {...register("password", {
                        onChange: (e) => setPasswordValue(e.target.value),
                      })}
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

                  {/* Barra de força */}
                  {passwordValue.length > 0 && (
                    <div id="register-password-strength" className="mt-2" aria-live="polite">
                      <div className="flex gap-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className="flex-1 h-1 rounded-full transition-all duration-300"
                            style={{
                              background:
                                passwordStrength >= level
                                  ? strengthInfo.color
                                  : "rgba(255,255,255,0.1)",
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-xs" style={{ color: strengthInfo.color }}>
                        {strengthInfo.label}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p
                      role="alert"
                      className="mt-1.5 text-xs"
                      style={{ color: "#f87171" }}
                    >
                      {errors.password.message}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              {/* Botão submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full h-11 mt-6 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Criando conta...</span>
                  </>
                ) : (
                  "Criar minha conta"
                )}
              </button>

              {/* Rodapé legal */}
              <p className="text-xs text-center mt-4" style={{ color: "#475569" }}>
                Ao criar, você concorda com os{" "}
                <a
                  href="/terms"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: "#7c3aed" }}
                >
                  Termos de Uso
                </a>
              </p>
            </form>
          </motion.div>
        ) : (
          /* Estado de verificação */
          <motion.div
            key="register-verify"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(52, 211, 153, 0.15)" }}
            >
              <Mail size={28} style={{ color: "#34d399" }} />
            </motion.div>

            <h2
              className="text-xl font-semibold mb-2"
              style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            >
              Confirme seu e-mail
            </h2>
            <p className="text-sm mb-1" style={{ color: "#94a3b8" }}>
              Enviamos um link de ativação para
            </p>
            <p className="text-sm font-medium mb-8" style={{ color: "#f1f5f9" }}>
              {submittedEmail}
            </p>

            {canResend ? (
              <button
                type="button"
                onClick={() => {
                  startCountdown();
                  toast.success("E-mail reenviado!");
                }}
                className="text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: "#7c3aed" }}
              >
                Reenviar e-mail
              </button>
            ) : (
              <p className="text-sm" style={{ color: "#475569" }}>
                Reenviar em{" "}
                <span style={{ color: "#94a3b8" }}>{formatCountdown(countdown)}</span>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}