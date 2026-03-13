import { supabase } from './supabase';

export interface TrainingProductRow {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  summary: string | null;
  tagline: string | null;
  category: string | null;
  who_its_for: string | null;
  modules: string[] | null;
  benefits: string[] | null;
  delivery_format: string | null;
  duration_label: string | null;
  icon: string | null;
  faq: { q: string; a: string }[] | null;
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

export interface TrainingProductInput {
  id?: string;
  name: string;
  slug: string;
  active: boolean;
  summary?: string;
  tagline?: string;
  category?: string;
  who_its_for?: string;
  modules?: string[];
  benefits?: string[];
  delivery_format?: string;
  duration_label?: string;
  icon?: string;
  faq?: { q: string; a: string }[];
}

export async function upsertTrainingProduct(params: TrainingProductInput): Promise<{ id: string; error: Error | null }> {
  const updateData: Record<string, unknown> = {
    name: params.name,
    slug: params.slug,
    active: params.active,
    summary: params.summary ?? null,
    tagline: params.tagline ?? null,
    category: params.category ?? null,
    who_its_for: params.who_its_for ?? null,
    modules: params.modules ?? null,
    benefits: params.benefits ?? null,
    delivery_format: params.delivery_format ?? null,
    duration_label: params.duration_label ?? null,
    icon: params.icon ?? null,
    faq: params.faq ?? null,
  };

  if (params.id) {
    const { error } = await supabase
      .from('training_products')
      .update(updateData)
      .eq('id', params.id);
    return { id: params.id, error: error ? new Error(error.message) : null };
  }
  const { data, error } = await supabase
    .from('training_products')
    .insert(updateData)
    .select('id')
    .single();
  if (error) return { id: '', error: new Error(error.message) };
  return { id: data.id, error: null };
}

export async function deleteTrainingProduct(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from('training_products').delete().eq('id', id);
  return { error: error ? new Error(error.message) : null };
}
