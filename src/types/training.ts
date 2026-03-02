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
  whoItsFor?: string;
  modules?: string[];
  deliveryFormat?: string;
  faq?: { q: string; a: string }[];
  /** e.g. "1 day", "2 weeks" */
  duration_label?: string;
  /** Who it's for (list items) */
  audience?: string[];
  /** What's included list */
  includes?: string[];
  icon?: string;
  sort_order?: number;
  updated_at?: string;
  published?: boolean;
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
