import { supabase } from './supabase';

export interface ConsultatingDetails {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  jobTitle?: string;
  engagement_type?: string;
  license_type?: string;
  stage?: string;
  note: string;
  teamSize?: string;
  region?: string;
  gap?: string;
}

export interface CreateConsultatingInput {
  topic: string;
  scheduled_at: string; // ISO string
  details: ConsultatingDetails;
}

/**
 * Submit a consultating booking. Works with or without auth (guest: user_id null).
 */
export async function createConsultating(
  input: CreateConsultatingInput
): Promise<{ data?: { id: string }; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('consultations')
    .insert({
      user_id: user?.id ?? null,
      topic: input.topic,
      scheduled_at: input.scheduled_at,
      details: input.details,
      status: 'new',
    })
    .select('id')
    .single();

  if (error) {
    if (error.code === '23505') {
      return { error: new Error('You already have a consultating booked at this date and time.') };
    }
    return { error: new Error(error.message) };
  }
  return { data: { id: data.id }, error: null };
}
