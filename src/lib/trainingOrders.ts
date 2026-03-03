import { supabase } from './supabase';

export type TrainingOrderStatus = 'pending' | 'paid' | 'failed' | 'expired';

export interface TrainingOrder {
  id: string;
  user_id: string;
  training_id: string;
  amount: number;
  status: TrainingOrderStatus;
  provider_reference: string | null;
  checkout_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export async function initTrainingPayment(trainingId: string): Promise<{
  checkout_url?: string;
  order_id?: string;
  error?: string;
}> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { error: 'You must be logged in to pay' };

  const { data, error } = await supabase.functions.invoke('seerbit-init', {
    body: { training_id: trainingId },
  });

  if (error) return { error: error.message };
  const err = (data as { error?: string })?.error;
  if (err) return { error: err };
  const url = (data as { checkout_url?: string })?.checkout_url;
  const orderId = (data as { order_id?: string })?.order_id;
  return { checkout_url: url, order_id: orderId };
}

export async function fetchMyTrainingOrders(): Promise<TrainingOrder[]> {
  const { data, error } = await supabase
    .from('training_orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as TrainingOrder[];
}
