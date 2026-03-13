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
  // First try to get from local data
  if (DEMO_TRAININGS.length > 0) {
    return DEMO_TRAININGS.map(t => ({
      id: t.id,
      name: t.title,
      slug: t.slug,
      active: t.published ?? false,
      summary: t.summary,
      created_at: t.updated_at ?? new Date().toISOString(),
      updated_at: t.updated_at ?? new Date().toISOString(),
      tagline: t.tagline ?? null,
      category: t.category ?? 'training',
      who_its_for: t.whoItsFor ?? null,
      modules: t.modules ?? [],
      benefits: t.benefits ?? [],
      delivery_format: t.deliveryFormat ?? null,
      duration_label: t.duration_label ?? null,
      icon: t.icon ?? null,
      faq: t.faq ?? [],
    }));
  }
  
  // Fallback to database
  const { data, error } = await supabase
    .from('training_products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });
  if (error) return [];
  return (data ?? []) as TrainingProduct[];
}

export async function getTrainingProductBySlug(slug: string): Promise<TrainingProduct | null> {
  // First check local data - this ensures correct details match the service
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
  
  // Fallback to database if not found in local data
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
