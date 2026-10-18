/**
 * Login de respaldo cuando Supabase no está configurado (desarrollo sin .env).
 *
 * Corre en el navegador, así que solo evita accesos casuales; no es seguridad
 * real. En producción se usa Supabase Auth (ver authService.ts).
 */

import type { LoginResult, Session } from './authService';

const SESSION_KEY = 'travelfans_session';
const SESSION_HOURS = 8;

// Hash de la contraseña de ejemplo "travelfans2024". Define VITE_ADMIN_PASSWORD_HASH en .env
// (npm run hash-password -- "tu-contraseña") para reemplazarla.
const DEFAULT_PASSWORD_HASH =
  'pbkdf2:210000:2b7555c4d527911d55eecbce7840b002:f56e42b6a210ba52f4e440340737839f5369a1e238259a944d8d45156f80bd32';

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
const PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;

export const usingDefaultCredentials = !import.meta.env.VITE_ADMIN_PASSWORD_HASH;

const hexToBytes = (hex: string) => new Uint8Array(hex.match(/../g)?.map(h => parseInt(h, 16)) ?? []);
const bytesToHex = (bytes: ArrayBuffer) =>
  Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, iterations, saltHex, hashHex] = stored.split(':');
  if (scheme !== 'pbkdf2' || !iterations || !saltHex || !hashHex) return false;

  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: hexToBytes(saltHex), iterations: Number(iterations) },
    key,
    256
  );
  const candidate = bytesToHex(bits);

  // Comparación de tiempo constante.
  let diff = candidate.length ^ hashHex.length;
  for (let i = 0; i < Math.min(candidate.length, hashHex.length); i++) {
    diff |= candidate.charCodeAt(i) ^ hashHex.charCodeAt(i);
  }
  return diff === 0;
}

export function readJson<T>(storage: Storage, key: string): T | null {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeJson(storage: Storage, key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage bloqueado (modo privado estricto): la sesión dura solo mientras la página esté abierta.
  }
}

export function remove(storage: Storage, key: string) {
  try {
    storage.removeItem(key);
  } catch {
    // Storage bloqueado: no hay nada que limpiar.
  }
}

export async function login(username: string, password: string): Promise<LoginResult> {
  if (!globalThis.crypto?.subtle) {
    return { ok: false, reason: 'unsupported' };
  }

  // Siempre se calcula el hash, aunque el usuario no coincida, para no revelar qué usuario existe.
  const passwordOk = await verifyPassword(password, PASSWORD_HASH);
  if (passwordOk && username.trim() === ADMIN_USER) {
    const session: Session = { username: ADMIN_USER, expiresAt: Date.now() + SESSION_HOURS * 3600_000 };
    writeJson(sessionStorage, SESSION_KEY, session);
    return { ok: true, session };
  }
  return { ok: false, reason: 'invalid' };
}

export function getSession(): Session | null {
  const session = readJson<Session>(sessionStorage, SESSION_KEY);
  if (!session || typeof session.expiresAt !== 'number' || session.expiresAt <= Date.now()) {
    remove(sessionStorage, SESSION_KEY);
    return null;
  }
  return session;
}

export function logout() {
  remove(sessionStorage, SESSION_KEY);
  // Limpia la marca de sesión de la versión anterior, que daba acceso con solo escribirla.
  remove(localStorage, 'travelfans_auth');
}
