import { supabase } from './supabase';
import type { Service } from '../types/service';

export interface ServiceRecord extends Service {
  // Supabase table is expected to mirror Service shape
}

export async function fetchPublishedServices(): Promise<ServiceRecord[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error || !data) return [];
  return data as ServiceRecord[];
}

export async function fetchPublishedNonLicensingServices(): Promise<ServiceRecord[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error || !data) return [];
  const list = data as ServiceRecord[];
  return list.filter((s) => !(s.categories || []).includes('Licensing'));
}

export async function fetchLicensingServices(): Promise<ServiceRecord[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });
  if (error || !data) return [];
  const list = data as ServiceRecord[];
  return list.filter((s) => (s.categories || []).includes('Licensing'));
}

export async function getServiceBySlugFromDb(slug: string): Promise<ServiceRecord | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  if (error || !data) return null;
  return data as ServiceRecord;
}

