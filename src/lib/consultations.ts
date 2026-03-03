import { supabase } from './supabase';

export interface ConsultationDetails {
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

export interface CreateConsultationInput {
  topic: string;
  scheduled_at: string; // ISO string
  details: ConsultationDetails;
}

/**
 * Submit a consultation booking. Requires authenticated user (RLS).
 * Fails if user already has a booking at the same scheduled_at (unique constraint).
 */
export async function createConsultation(
  input: CreateConsultationInput
): Promise<{ data?: { id: string }; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: new Error('You must be logged in to book a consultation') };

  const { data, error } = await supabase
    .from('consultations')
    .insert({
      user_id: user.id,
      topic: input.topic,
      scheduled_at: input.scheduled_at,
      details: input.details,
      status: 'new',
    })
    .select('id')
    .single();

  if (error) {
    if (error.code === '23505') {
      return { error: new Error('You already have a consultation booked at this date and time.') };
    }
    return { error: new Error(error.message) };
  }
  return { data: { id: data.id }, error: null };
}
