import { supabase } from './supabase';

export type TrainingCategory = 'training' | 'advisory';

export interface TrainingProduct {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  summary: string | null;
  created_at: string;
  updated_at: string;
  tagline?: string | null;
  category?: TrainingCategory;
  who_its_for?: string | null;
  modules?: string[];
  benefits?: string[];
  delivery_format?: string | null;
  duration_label?: string | null;
  icon?: string | null;
  faq?: { q: string; a: string }[];
}

export async function fetchTrainingProducts(): Promise<TrainingProduct[]> {
  const { data, error } = await supabase
    .from('training_products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as TrainingProduct[];
}

export async function getTrainingProductBySlug(slug: string): Promise<TrainingProduct | null> {
  const { data, error } = await supabase
    .from('training_products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();
  if (error || !data) return null;
  return data as TrainingProduct;
}

export async function getTrainingProductById(id: string): Promise<TrainingProduct | null> {
  const { data, error } = await supabase
    .from('training_products')
    .select('*')
    .eq('id', id)
    .single();
  if (error || !data) return null;
  return data as TrainingProduct;
}
