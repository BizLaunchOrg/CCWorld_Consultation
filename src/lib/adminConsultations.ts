import { supabase } from './supabase';
import type { AdminConsultation, ConsultationStatus } from '../types/admin';

interface ConsultationRow {
  id: string;
  user_id: string;
  topic: string;
  scheduled_at: string;
  details: Record<string, unknown>;
  status: ConsultationStatus;
  internal_notes: string | null;
  created_at: string;
}

function rowToAdminConsultation(r: ConsultationRow): AdminConsultation {
  const d = (r.details || {}) as Record<string, unknown>;
  const scheduled = new Date(r.scheduled_at);
  return {
    id: r.id,
    customer_name: (d.fullName as string) || '—',
    email: (d.email as string) || '—',
    phone: (d.phone as string) || '—',
    company: (d.companyName as string) ?? '',
    job_title: (d.jobTitle as string) ?? '',
    service_selected: r.topic,
    note: (d.note as string) ?? '',
    preferred_date: scheduled.toLocaleDateString('en-CA'),
    preferred_time: scheduled.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    status: r.status,
    created_at: r.created_at,
    internal_notes: r.internal_notes ?? undefined,
    engagement_type: d.engagement_type as AdminConsultation['engagement_type'],
    license_type: d.license_type as AdminConsultation['license_type'],
    stage: d.stage as AdminConsultation['stage'],
    team_size: d.teamSize as string | undefined,
    region: d.region as string | undefined,
    gap: d.gap as string | undefined,
  };
}

export async function fetchAdminConsultations(): Promise<AdminConsultation[]> {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return ((data ?? []) as ConsultationRow[]).map(rowToAdminConsultation);
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus,
  internal_notes: string
): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from('consultations')
    .update({ status, internal_notes: internal_notes || null })
    .eq('id', id);
  return { error: error ? new Error(error.message) : null };
}
