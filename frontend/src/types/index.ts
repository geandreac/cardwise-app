// Tipos globais do CardWise

export interface IUser {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ICard {
  id: string;
  user_id: string;
  name: string;
  last_four: string;
  brand: "visa" | "mastercard" | "elo" | "amex" | "hipercard" | "other";
  credit_limit: number;
  closing_day: number;
  due_day: number;
  color: string;
  created_at: string;
}

export interface ITransaction {
  id: string;
  card_id: string;
  user_id: string;
  description: string;
  amount: number;
  category: string;
  transaction_date: string;
  installment_current: number | null;
  installment_total: number | null;
  created_at: string;
}