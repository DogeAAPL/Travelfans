/**
 * Convierte el enlace que pega el administrador en algo que la portada puede mostrar.
 * Acepta YouTube (watch, youtu.be, shorts), Vimeo y archivos .mp4/.webm, siempre con https.
 * Devuelve null si el enlace no es de uno de esos tipos.
 */
export interface VideoEmbed {
  kind: 'iframe' | 'file';
  src: string;
  /** Video vertical (YouTube Shorts): se muestra en formato 9:16. */
  vertical: boolean;
}

export function parseVideoUrl(value: string): VideoEmbed | null {
  let url: URL;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^(www|m)\./, '');

  if (host === 'youtube.com' || host === 'youtu.be') {
    const shorts = url.pathname.match(/^\/shorts\/([^/]+)/)?.[1];
    const id =
      host === 'youtu.be'
        ? url.pathname.split('/')[1]
        : url.pathname === '/watch'
          ? url.searchParams.get('v')
          : (shorts ?? url.pathname.match(/^\/embed\/([^/]+)/)?.[1]);
    if (!id || !/^[\w-]{6,20}$/.test(id)) return null;
    // youtube-nocookie: no deja cookies de YouTube hasta que el visitante da play.
    return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}`, vertical: Boolean(shorts) };
  }

  if (host === 'vimeo.com') {
    const id = url.pathname.match(/^\/(\d+)/)?.[1];
    return id ? { kind: 'iframe', src: `https://player.vimeo.com/video/${id}?dnt=1`, vertical: false } : null;
  }

  if (/\.(mp4|webm)$/i.test(url.pathname)) return { kind: 'file', src: url.href, vertical: false };
  return null;
}
