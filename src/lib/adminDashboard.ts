import { supabase } from './supabase';

export interface DashboardStats {
  newConsultatingsCount: number;
  activeTrainingsCount: number;
  unreadMessagesCount: number;
  recentConsultatings: { id: string; customerName: string; topic: string; status: string; created_at: string }[];
  /** Set when one or more Supabase queries failed (e.g. RLS or network). */
  error?: string;
}

export async function fetchAdminDashboardStats(): Promise<DashboardStats> {
  const [consultationsRes, productsRes, unreadRes] = await Promise.all([
    supabase
      .from('consultations')
      .select('id, topic, status, details, created_at')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('training_products').select('id').eq('active', true),
    supabase
      .from('chat_messages')
      .select('*', { count: 'exact', head: true })
      .eq('sender_role', 'user')
      .is('read_at', null),
  ]);

  const errors: string[] = [];
  if (consultationsRes.error) errors.push(`Consultatings: ${consultationsRes.error.message}`);
  if (productsRes.error) errors.push(`Products: ${productsRes.error.message}`);
  if (unreadRes.error) errors.push(`Unread: ${unreadRes.error.message}`);
  const error = errors.length > 0 ? errors.join('; ') : undefined;

  const consultations = (consultationsRes.data ?? []) as Array<{
    id: string;
    topic: string;
    status: string;
    details: Record<string, unknown>;
    created_at: string;
  }>;

  const newConsultatingsCount = consultations.filter((c) => c.status === 'new').length;
  const activeTrainingsCount = (productsRes.data ?? []).length;
  const unreadMessagesCount = unreadRes.count ?? 0;

  const recentConsultatings = consultations.slice(0, 10).map((c) => ({
    id: c.id,
    customerName: (c.details?.fullName as string) || '—',
    topic: c.topic,
    status: c.status,
    created_at: c.created_at,
  }));

  return {
    newConsultatingsCount,
    activeTrainingsCount,
    unreadMessagesCount,
    recentConsultatings,
    error,
  };
}
