/**
 * Autenticación del panel de administración.
 *
 * Con Supabase configurado se usa Supabase Auth (correo + contraseña) y el
 * servidor decide quién es administrador (tabla private.admins); las reglas
 * RLS de la base de datos bloquean cualquier escritura que no venga de un admin.
 * Sin Supabase se usa el login local de respaldo (localAuth.ts).
 */
import { supabase } from './supabaseClient';
import * as localAuth from './localAuth';
import { readJson, remove, writeJson } from './localAuth';

export interface Session {
  username: string;
  /** Momento en que expira la sesión, o null si el proveedor la renueva solo (Supabase). */
  expiresAt: number | null;
}

export type LoginResult =
  | { ok: true; session: Session }
  | {
      ok: false;
      reason: 'invalid' | 'locked' | 'unsupported' | 'forbidden' | 'unavailable';
      retryInSeconds?: number;
    };

/** 'supabase' usa correo y verificación en el servidor; 'local' es el respaldo sin backend. */
export const authMode: 'supabase' | 'local' = supabase ? 'supabase' : 'local';

/** Solo aplica al modo local: avisa si sigue la contraseña de ejemplo. */
export const usingDefaultCredentials = authMode === 'local' && localAuth.usingDefaultCredentials;

const ATTEMPTS_KEY = 'travelfans_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCK_SECONDS = 60;

interface Attempts {
  count: number;
  lockedUntil: number;
}

async function isAdmin(): Promise<boolean> {
  const { data, error } = await supabase!.rpc('current_user_is_admin');
  return !error && data === true;
}

async function supabaseLogin(email: string, password: string): Promise<LoginResult> {
  const { data, error } = await supabase!.auth.signInWithPassword({ email: email.trim(), password });
  if (error) {
    if (error.status === 429) return { ok: false, reason: 'locked', retryInSeconds: LOCK_SECONDS };
    if (error.status === 400 || error.status === 401 || error.status === 422) return { ok: false, reason: 'invalid' };
    return { ok: false, reason: 'unavailable' };
  }
  if (!(await isAdmin())) {
    await supabase!.auth.signOut();
    return { ok: false, reason: 'forbidden' };
  }
  return { ok: true, session: { username: data.user.email ?? email, expiresAt: null } };
}

export async function login(username: string, password: string): Promise<LoginResult> {
  // Límite de intentos en el navegador (Supabase además limita en el servidor).
  const attempts = readJson<Attempts>(localStorage, ATTEMPTS_KEY) ?? { count: 0, lockedUntil: 0 };
  const now = Date.now();
  if (attempts.lockedUntil > now) {
    return { ok: false, reason: 'locked', retryInSeconds: Math.ceil((attempts.lockedUntil - now) / 1000) };
  }

  let result: LoginResult;
  try {
    result = authMode === 'supabase' ? await supabaseLogin(username, password) : await localAuth.login(username, password);
  } catch {
    return { ok: false, reason: 'unavailable' };
  }

  if (result.ok) {
    remove(localStorage, ATTEMPTS_KEY);
  } else if (result.reason === 'invalid') {
    const count = attempts.count + 1;
    const locked = count >= MAX_ATTEMPTS;
    writeJson(localStorage, ATTEMPTS_KEY, {
      count: locked ? 0 : count,
      lockedUntil: locked ? now + LOCK_SECONDS * 1000 : 0,
    });
    if (locked) return { ok: false, reason: 'locked', retryInSeconds: LOCK_SECONDS };
  }
  return result;
}

/** Recupera la sesión guardada (si sigue vigente y es de un administrador). */
export async function restoreSession(): Promise<Session | null> {
  if (authMode === 'local') return localAuth.getSession();
  try {
    const { data } = await supabase!.auth.getSession();
    if (!data.session) return null;
    if (!(await isAdmin())) return null;
    return { username: data.session.user.email ?? '', expiresAt: null };
  } catch {
    return null;
  }
}

/** Avisa cuando Supabase cierra la sesión (expiró, se cerró en otra pestaña, etc.). */
export function onSignedOut(callback: () => void): () => void {
  if (authMode === 'local') return () => {};
  const { data } = supabase!.auth.onAuthStateChange(event => {
    if (event === 'SIGNED_OUT') callback();
  });
  return () => data.subscription.unsubscribe();
}

export async function logout() {
  localAuth.logout();
  if (authMode === 'supabase') {
    try {
      await supabase!.auth.signOut();
    } catch {
      // Sin conexión: la sesión local de Supabase igual se descarta.
    }
  }
}
