import { supabase } from './supabase';
import type { Service } from '../types/service';
import { getPublishedNonLicensingServices as getLocalNonLicensing, getLicensingServices as getLocalLicensing, getPublishedServices as getLocalPublished, getServiceBySlug, getTrainingServices as getLocalTraining } from '../data/services';

export interface ServiceRecord extends Service {
  // Supabase table is expected to mirror Service shape
}

export async function fetchPublishedServices(): Promise<ServiceRecord[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) {
      // Fallback to local data
      return getLocalPublished() as ServiceRecord[];
    }
    return data as ServiceRecord[];
  } catch {
    // Fallback to local data on any error
    return getLocalPublished() as ServiceRecord[];
  }
}

export async function fetchPublishedNonLicensingServices(): Promise<ServiceRecord[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) {
      // Fallback to local data
      return getLocalNonLicensing() as ServiceRecord[];
    }
    const list = data as ServiceRecord[];
    return list.filter((s) => !(s.categories || []).includes('Licensing'));
  } catch {
    // Fallback to local data on any error
    return getLocalNonLicensing() as ServiceRecord[];
  }
}

export async function fetchLicensingServices(): Promise<ServiceRecord[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) {
      // Fallback to local data
      return getLocalLicensing() as ServiceRecord[];
    }
    const list = data as ServiceRecord[];
    return list.filter((s) => (s.categories || []).includes('Licensing'));
  } catch {
    // Fallback to local data on any error
    return getLocalLicensing() as ServiceRecord[];
  }
}

export async function getServiceBySlugFromDb(slug: string): Promise<ServiceRecord | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    if (error || !data) {
      // Fallback to local data
      return getServiceBySlug(slug) || null;
    }
    return data as ServiceRecord;
  } catch {
    // Fallback to local data
    return getServiceBySlug(slug) || null;
  }
}

export async function fetchTrainingServices(): Promise<ServiceRecord[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) {
      // Fallback to local data
      return getLocalTraining() as ServiceRecord[];
    }
    const list = data as ServiceRecord[];
    return list.filter((s) => s.service_type === 'training');
  } catch {
    // Fallback to local data
    return getLocalTraining() as ServiceRecord[];
  }
}
