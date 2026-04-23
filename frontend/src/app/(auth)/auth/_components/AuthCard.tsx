"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LoginFace } from "./LoginFace";
import { RegisterFace } from "./RegisterFace";

type AuthMode = "login" | "register";

export function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("login");

  const isRegister = mode === "register";

  return (
    <div
      className="w-full max-w-[440px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{ rotateY: isRegister ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* Face frontal: Login */}
        <div style={{ backfaceVisibility: "hidden" }}>
          <LoginFace onSwitchMode={() => setMode("register")} />
        </div>

        {/* Face traseira: Cadastro */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <RegisterFace onSwitchMode={() => setMode("login")} />
        </div>
      </motion.div>
    </div>
  );
}