import { supabase } from './supabase';
import { DEMO_TRAININGS } from '../data/trainings';

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
  
  // Fallback to local data if not found in database
  if (error || !data) {
    const localTraining = DEMO_TRAININGS.find(t => t.slug === slug);
    if (localTraining) {
      return {
        id: localTraining.id,
        name: localTraining.title,
        slug: localTraining.slug,
        active: localTraining.published ?? false,
        summary: localTraining.summary,
        created_at: localTraining.updated_at ?? new Date().toISOString(),
        updated_at: localTraining.updated_at ?? new Date().toISOString(),
        tagline: localTraining.tagline ?? null,
        category: localTraining.category ?? 'training',
        who_its_for: localTraining.whoItsFor ?? null,
        modules: localTraining.modules ?? [],
        benefits: localTraining.benefits ?? [],
        delivery_format: localTraining.deliveryFormat ?? null,
        duration_label: localTraining.duration_label ?? null,
        icon: localTraining.icon ?? null,
        faq: localTraining.faq ?? [],
      };
    }
    return null;
  }
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
