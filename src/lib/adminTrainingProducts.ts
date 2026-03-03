import { supabase } from './supabase';

export interface TrainingProductRow {
  id: string;
  name: string;
  slug: string;
  amount: number;
  active: boolean;
  summary: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchAdminTrainingProducts(): Promise<TrainingProductRow[]> {
  const { data, error } = await supabase
    .from('training_products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as TrainingProductRow[];
}

export async function upsertTrainingProduct(params: {
  id?: string;
  name: string;
  slug: string;
  amount: number;
  active: boolean;
  summary?: string;
}): Promise<{ id: string; error: Error | null }> {
  if (params.id) {
    const { error } = await supabase
      .from('training_products')
      .update({
        name: params.name,
        slug: params.slug,
        amount: params.amount,
        active: params.active,
        summary: params.summary ?? null,
      })
      .eq('id', params.id);
    return { id: params.id, error: error ? new Error(error.message) : null };
  }
  const { data, error } = await supabase
    .from('training_products')
    .insert({
      name: params.name,
      slug: params.slug,
      amount: params.amount,
      active: params.active,
      summary: params.summary ?? null,
    })
    .select('id')
    .single();
  if (error) return { id: '', error: new Error(error.message) };
  return { id: data.id, error: null };
}

export async function deleteTrainingProduct(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('training_products').delete().eq('id', id);
  return { error: error ? new Error(error.message) : null };
}
