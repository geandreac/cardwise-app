// Rotas da aplicação
export const ROUTES = {
  AUTH: "/auth",
  DASHBOARD: "/dashboard",
  CARDS: "/dashboard/cards",
  TRANSACTIONS: "/dashboard/transactions",
  PROFILE: "/dashboard/profile",
} as const;

// Configurações gerais
export const CONFIG = {
  APP_NAME: "CardWise",
  APP_TAGLINE: "Inteligência financeira para quem usa cartão de crédito.",
  SUPPORT_EMAIL: "suporte@cardwise.app",
  MAX_FILE_SIZE_MB: 10,
} as const;