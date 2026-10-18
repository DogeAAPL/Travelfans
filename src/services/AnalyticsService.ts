/**
 * Google Analytics con consentimiento previo.
 *
 * El script de Google solo se carga si:
 *  1. Existe VITE_GA_ID en el .env (si no, el sitio funciona sin analítica), y
 *  2. El visitante aceptó las cookies en el banner.
 */

export type ConsentState = 'granted' | 'denied' | 'unset';

const CONSENT_KEY = 'travelfans_cookie_consent';
const GA_ID = import.meta.env.VITE_GA_ID?.trim() || '';

export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(GA_ID);

let loaded = false;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsent(): ConsentState {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unset';
  } catch {
    return 'unset';
  }
}

export function setConsent(state: Exclude<ConsentState, 'unset'>) {
  try {
    localStorage.setItem(CONSENT_KEY, state);
  } catch {
    // Sin storage se volverá a preguntar en la próxima visita.
  }
  if (state === 'granted') {
    loadAnalytics();
  } else if (window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'denied' });
  }
}

export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Nada que limpiar.
  }
}

function loadAnalytics() {
  if (!analyticsEnabled || loaded) return;
  loaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag espera el objeto `arguments`, no un array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

/** Llamar una vez al iniciar la app: carga GA solo si ya había consentimiento guardado. */
export function initAnalytics() {
  if (getConsent() === 'granted') loadAnalytics();
}

function trackEvent(action: string, params: Record<string, unknown>) {
  if (loaded && window.gtag) window.gtag('event', action, params);
}

export function trackWhatsAppClick(source: string) {
  trackEvent('whatsapp_click', { event_category: 'engagement', event_label: source });
}
