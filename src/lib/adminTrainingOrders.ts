import { supabase } from './supabase';

export interface TrainingOrderRow {
  id: string;
  user_id: string;
  training_id: string;
  amount: number;
  status: string;
  provider_reference: string | null;
  checkout_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface TrainingOrderWithProduct extends TrainingOrderRow {
  training_products?: { name: string; slug: string } | null;
  profiles?: { name: string | null; email: string | null } | null;
}

export async function fetchAdminTrainingOrders(): Promise<TrainingOrderWithProduct[]> {
  const { data, error } = await supabase
    .from('training_orders')
    .select('*, training_products(name, slug), profiles(name, email)')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as TrainingOrderWithProduct[];
}
