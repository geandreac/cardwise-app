import { AuthCard } from "./_components/AuthCard";

export const metadata = {
  title: "Entrar — CardWise",
  description: "Acesse sua conta CardWise ou crie uma nova gratuitamente.",
};

export default function AuthPage() {
  return (
    <main
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden px-4 py-8"
      style={{ backgroundColor: "#020617" }}
    >
      {/* Orbs decorativos */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="animate-orb-1 absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124, 58, 237, 0.22) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="animate-orb-2 absolute -bottom-32 -right-32 h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(67, 56, 202, 0.18) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="animate-orb-3 absolute top-1/4 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(109, 40, 217, 0.12) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Card centralizado */}
      <div className="relative z-10 w-full max-w-[440px]">
        <AuthCard />
      </div>
    </main>
  );
}