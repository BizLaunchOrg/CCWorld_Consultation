export type TrainingCategory = 'training' | 'advisory';

export interface Training {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  benefits: string[];
  priceNGN: number;
  category: TrainingCategory;
  /** Who it's for (demo) */
  whoItsFor?: string;
  /** What you'll learn - module titles (demo) */
  modules?: string[];
  /** Delivery format (demo) */
  deliveryFormat?: string;
  /** FAQ entries (demo) */
  faq?: { q: string; a: string }[];
}

export type TransactionStatus = 'pending' | 'paid' | 'failed';

export interface Transaction {
  id: string;
  user_id: string | null;
  training_id: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  created_at: string;
  reference: string;
}
