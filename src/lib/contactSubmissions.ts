import { supabase } from './supabase';

const FORMSPREE_CONTACT_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_CONTACT_ENDPOINT || 'https://formspree.io/f/mreybzkv';

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

/** Send the same contact data to Formspree so the client receives an email. */
export async function submitContactFormToFormspree(data: {
  name: string;
  email: string;
  send_to: ContactSendTo;
  subject?: string;
  message: string;
}): Promise<{ error: Error | null }> {
  const body = {
    name: data.name.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    _subject: data.subject?.trim() || `Contact from ${data.name.trim()}`,
    _replyto: data.email.trim(),
    'Send to': getContactSendToLabel(data.send_to),
  };
  const res = await fetch(FORMSPREE_CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    return { error: new Error(`Formspree: ${res.status}`) };
  }
  return { error: null };
}

export async function fetchAdminContactSubmissions(): Promise<ContactSubmission[]> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('id, name, email, send_to, subject, message, created_at')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as ContactSubmission[];
}
