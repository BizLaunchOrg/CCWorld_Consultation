/** Shared Service type for public pages and admin. Single source of truth. */
export type ServiceLevel = 'Foundation' | 'Build' | 'Advanced' | 'Managed';

/** Type of service - either regular service or training */
export type ServiceType = 'service' | 'training';

/** Optional section for detail pages (e.g. licensing). Admin can edit. */
export interface ServiceContentSection {
  heading: string;
  /** Optional bullet list */
  bullets?: string[];
  /** Optional paragraph (if no bullets) */
  text?: string;
}

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
  icon: string;
  published: boolean;
  sort_order?: number;
  updated_at: string;
  /** Optional content sections for detail page (e.g. licensing advisory). */
  content_sections?: ServiceContentSection[];
  /** Type of service - training or regular service */
  service_type?: ServiceType;
}
