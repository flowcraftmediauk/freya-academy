import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://edecimvvijdhkdmngopz.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_bAz1pEuM5E2DcWMQc_FfDw_kaZf-DMF';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseAppointmentInput {
  fullName: string;
  email?: string;
  phone: string;
  medicalSpecialty: string;
  preferredDate?: string;
  service: string;
  notes?: string;
}

export interface SupabaseAppointment {
  id: string;
  fullName: string;
  email?: string;
  phone: string;
  medicalSpecialty: string;
  preferredDate?: string;
  service: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

/**
 * Saves a new course registration / appointment to Supabase.
 */
export async function saveAppointmentToSupabase(input: SupabaseAppointmentInput) {
  try {
    const { data, error } = await supabase.from('appointments').insert([
      {
        full_name: input.fullName,
        email: input.email || null,
        phone: input.phone,
        medical_specialty: input.medicalSpecialty,
        preferred_date: input.preferredDate || null,
        service: input.service,
        notes: input.notes || null,
        status: 'pending',
      },
    ]).select();

    if (error) {
      console.warn('Supabase appointment insert notice:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn('Supabase unexpected error:', message);
    return { success: false, error: message };
  }
}

/**
 * Fetches all appointments from Supabase ordered by creation date descending.
 */
export async function fetchAppointmentsFromSupabase(): Promise<SupabaseAppointment[]> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.warn('Supabase fetch appointments notice:', error?.message);
      return [];
    }

    return data.map((item: any) => ({
      id: String(item.id),
      fullName: item.full_name || item.fullName || '',
      email: item.email || '',
      phone: item.phone || '',
      medicalSpecialty: item.medical_specialty || item.medicalSpecialty || '',
      preferredDate: item.preferred_date || item.preferredDate || '',
      service: item.service || '',
      notes: item.notes || '',
      status: (item.status as any) || 'pending',
      createdAt: item.created_at || item.createdAt || new Date().toISOString(),
    }));
  } catch (err) {
    console.warn('Supabase fetch error:', err);
    return [];
  }
}

/**
 * Updates an appointment's status in Supabase.
 */
export async function updateAppointmentStatusInSupabase(
  id: string,
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.warn('Supabase update status notice:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase update error:', err);
    return false;
  }
}

/**
 * Deletes an appointment from Supabase.
 */
export async function deleteAppointmentInSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Supabase delete notice:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase delete error:', err);
    return false;
  }
}
