/** Shared Service type for public pages and admin. Single source of truth. */
export type ServiceLevel = 'Foundation' | 'Build' | 'Advanced' | 'Managed';

export interface Service {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  summary: string;
  categories: string[];
  outcomes: string[];
  duration_label: string;
  level: ServiceLevel;
  amount: string;
  icon: string;
  published: boolean;
  sort_order?: number;
  updated_at: string;
}
