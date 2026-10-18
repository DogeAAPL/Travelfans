/**
 * Reduce una imagen subida desde el dispositivo antes de guardarla:
 * la escala para que su lado mayor no supere `maxDimension` y la recomprime.
 * Una foto de celular de 4 MB queda en ~100–200 KB, lo que evita llenar el
 * almacenamiento del navegador (unos 5 MB en total).
 */
export async function compressImage(file: File, maxDimension: number, quality = 0.82): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('No se pudo leer la imagen.'));
      image.src = url;
    });

    const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Tu navegador no permite procesar imágenes.');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const webp = canvas.toDataURL('image/webp', quality);
    // Safari antiguo no genera WebP y devuelve PNG; en ese caso usar JPEG.
    return webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}
