import { supabase } from './supabase';

export type ContactSendTo = 'general' | 'company' | 'opeyemi';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  send_to: ContactSendTo;
  subject: string | null;
  message: string;
  created_at: string;
}

const SEND_TO_LABELS: Record<ContactSendTo, string> = {
  general: 'General (ccworldconsulting@gmail.com)',
  company: 'Company (ccworldconsulting.com)',
  opeyemi: 'Opeyemi (Opeyemioluwa@ccworldconsulting.com)',
};

export const CONTACT_SEND_TO_OPTIONS: { value: ContactSendTo; label: string }[] = [
  { value: 'general', label: SEND_TO_LABELS.general },
  { value: 'company', label: SEND_TO_LABELS.company },
  { value: 'opeyemi', label: SEND_TO_LABELS.opeyemi },
];

export function getContactSendToLabel(sendTo: ContactSendTo): string {
  return SEND_TO_LABELS[sendTo];
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  send_to: ContactSendTo;
  subject?: string;
  message: string;
}): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('contact_submissions').insert({
    name: data.name.trim(),
    email: data.email.trim(),
    send_to: data.send_to,
    subject: data.subject?.trim() || null,
    message: data.message.trim(),
  });
  return { error: error ? new Error(error.message) : null };
}

export async function fetchAdminContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id, name, email, send_to, subject, message, created_at')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as ContactSubmission[];
}
