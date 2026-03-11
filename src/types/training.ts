export type TrainingCategory = 'training' | 'advisory';

export interface Training {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  benefits: string[];
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
