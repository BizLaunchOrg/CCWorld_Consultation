import type { Service, ServiceLevel } from './service';
import type { Training } from './training';

/** Admin uses the same Service shape; can be extended with admin-only fields later. */
export type AdminService = Service;

/** Admin uses the same Training shape. */
export type AdminTraining = Training;

/** Transactions are training payments only. */
export type AdminTransactionType = 'training';

export type AdminTransactionStatus = 'pending' | 'paid' | 'failed';

export interface AdminTransaction {
  id: string;
  type: AdminTransactionType;
  reference: string;
  amount_ngn: number;
  status: AdminTransactionStatus;
  customer_name: string;
  customer_email: string;
  created_at: string;
  item_slug?: string;
  item_title?: string;
}

export type ConsultatingStatus = 'new' | 'in_review' | 'scheduled' | 'completed' | 'cancelled';

/** Engagement type from request form. */
export type EngagementType = 'licensing_pssp' | 'licensing_ptsp' | 'licensing_sandbox' | 'training' | 'advisory';

/** Stage when licensing is selected. */
export type LicensingStage = 'pre_application' | 'aip' | 'existing_ops' | 'not_sure';

/** Consultating requests only (no payment). */
export interface AdminConsultating {
  id: string;
  /** Engagement type from form. */
  engagement_type?: EngagementType;
  /** When engagement is licensing: pssp | ptsp | sandbox */
  license_type?: 'pssp' | 'ptsp' | 'sandbox';
  /** When licensing: stage in process */
  stage?: LicensingStage;
  customer_name: string;
  email: string;
  phone: string;
  company: string;
  job_title: string;
  /** Human-readable service/inquiry label (kept for backward compat). */
  service_selected: string;
  note: string;
  preferred_date?: string;
  preferred_time?: string;
  status: ConsultatingStatus;
  created_at: string;
  internal_notes?: string;
  /** Optional extra from form: team size, region, gap */
  team_size?: string;
  region?: string;
  gap?: string;
}

export interface AdminConversation {
  id: string;
  customer_name: string;
  customer_email: string;
  last_message: string;
  last_message_at: string;
  unread_count: number;
  updated_at: string;
}

export type MessageSenderRole = 'user' | 'admin' | 'system';

export interface AdminMessage {
  id: string;
  conversation_id: string;
  sender_role: MessageSenderRole;
  body: string;
  created_at: string;
  read_at?: string | null;
}

// Re-export for convenience
export type { ServiceLevel };
