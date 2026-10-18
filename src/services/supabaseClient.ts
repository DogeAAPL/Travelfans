import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL?.trim();
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();

/**
 * Cliente de Supabase, o null si faltan las variables de entorno.
 * Sin Supabase el sitio sigue funcionando en "modo local" (contenido en el
 * navegador y login de respaldo), útil para desarrollo sin conexión.
 */
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;

export const SITE_IMAGES_BUCKET = 'site-images';
