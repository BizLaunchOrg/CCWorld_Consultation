import { supabase } from './supabase';

export interface DashboardStats {
  paidTrainingCount: number;
  newConsultationsCount: number;
  activeTrainingsCount: number;
  recentOrders: { id: string; reference: string; amount: number; productName: string; status: string; created_at: string }[];
  recentConsultations: { id: string; customerName: string; topic: string; status: string; created_at: string }[];
  /** Set when one or more Supabase queries failed (e.g. RLS or network). */
  error?: string;
}

export async function fetchAdminDashboardStats(): Promise<DashboardStats> {
  const [ordersRes, consultationsRes, productsRes] = await Promise.all([
    supabase
      .from('training_orders')
      .select('id, amount, status, provider_reference, created_at, training_products!training_id(name)')
      .order('created_at', { ascending: false })
      .limit(50),
    supabase
      .from('consultations')
      .select('id, topic, status, details, created_at')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase.from('training_products').select('id').eq('active', true),
  ]);

  const errors: string[] = [];
  if (ordersRes.error) errors.push(`Orders: ${ordersRes.error.message}`);
  if (consultationsRes.error) errors.push(`Consultations: ${consultationsRes.error.message}`);
  if (productsRes.error) errors.push(`Products: ${productsRes.error.message}`);
  const error = errors.length > 0 ? errors.join('; ') : undefined;

  const orders = (ordersRes.data ?? []) as Array<{
    id: string;
    amount: number;
    status: string;
    provider_reference: string | null;
    created_at: string;
    training_products: { name: string } | { name: string }[] | null;
  }>;
  const consultations = (consultationsRes.data ?? []) as Array<{
    id: string;
    topic: string;
    status: string;
    details: Record<string, unknown>;
    created_at: string;
  }>;

  const paidTrainingCount = orders.filter((o) => o.status === 'paid').length;
  const newConsultationsCount = consultations.filter((c) => c.status === 'new').length;
  const activeTrainingsCount = (productsRes.data ?? []).length;

  const recentOrders = orders.slice(0, 10).map((o) => {
    const product = Array.isArray(o.training_products) ? o.training_products[0] : o.training_products;
    return {
      id: o.id,
      reference: o.provider_reference || o.id,
      amount: o.amount,
      productName: product?.name ?? 'Training',
      status: o.status,
      created_at: o.created_at,
    };
  });

  const recentConsultations = consultations.slice(0, 10).map((c) => ({
    id: c.id,
    customerName: (c.details?.fullName as string) || '—',
    topic: c.topic,
    status: c.status,
    created_at: c.created_at,
  }));

  return {
    paidTrainingCount,
    newConsultationsCount,
    activeTrainingsCount,
    recentOrders,
    recentConsultations,
    error,
  };
}
