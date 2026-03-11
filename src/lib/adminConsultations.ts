import { supabase } from './supabase';
import type { AdminConsultating, ConsultatingStatus } from '../types/admin';

interface ConsultatingRow {
  id: string;
  user_id: string;
  topic: string;
  scheduled_at: string;
  details: Record<string, unknown>;
  status: ConsultatingStatus;
  internal_notes: string | null;
  created_at: string;
}

function rowToAdminConsultating(r: ConsultatingRow): AdminConsultating {
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
    engagement_type: d.engagement_type as AdminConsultating['engagement_type'],
    license_type: d.license_type as AdminConsultating['license_type'],
    stage: d.stage as AdminConsultating['stage'],
    team_size: d.teamSize as string | undefined,
    region: d.region as string | undefined,
    gap: d.gap as string | undefined,
    preferred_time_label: d.consultatingTimeLabel as string | undefined,
  };
}

export async function fetchAdminConsultatings(): Promise<AdminConsultating[]> {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return ((data ?? []) as ConsultatingRow[]).map(rowToAdminConsultating);
}

export async function updateConsultatingStatus(
  id: string,
  status: ConsultatingStatus,
  internal_notes: string
): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from('consultations')
    .update({ status, internal_notes: internal_notes || null })
    .eq('id', id);
  return { error: error ? new Error(error.message) : null };
}
