import { Upload, X, Info, AlertCircle } from 'lucide-react';
import { useState, useRef, useId } from 'react';
import { compressImage } from '../content/compressImage';
import { isSafeImageUrl } from '../content/validation';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  recommendedResolution?: string;
  /** Lado mayor (px) al que se reduce la imagen subida. */
  maxDimension?: number;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ImageUpload({
  currentImage,
  onImageChange,
  label = 'Imagen',
  recommendedResolution = '1280x720',
  maxDimension = 1200,
}: ImageUploadProps) {
  const id = useId();
  const [urlDraft, setUrlDraft] = useState(currentImage.startsWith('data:') ? '' : currentImage);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError('');

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Formato no soportado. Usa JPG, PNG o WebP.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('La imagen no debe superar 10 MB.');
      return;
    }

    setProcessing(true);
    try {
      const dataUrl = await compressImage(file, maxDimension);
      setUrlDraft('');
      onImageChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo procesar la imagen.');
    } finally {
      setProcessing(false);
    }
  };

  const handleRemove = () => {
    setUrlDraft('');
    setError('');
    onImageChange('');
  };

  const handleUrlChange = (url: string) => {
    setUrlDraft(url);
    const trimmed = url.trim();
    if (!trimmed) {
      setError('');
      onImageChange('');
    } else if (isSafeImageUrl(trimmed)) {
      setError('');
      onImageChange(trimmed);
    } else {
      setError('La URL debe empezar con https://');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="block text-gray-700 text-xs md:text-sm font-medium">{label}</span>
        <div className="flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded">
          <Info className="w-3 h-3" aria-hidden="true" />
          <span>Resolución recomendada: {recommendedResolution}</span>
        </div>
      </div>

      {currentImage && (
        <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center min-h-40">
          <img src={currentImage} alt={`Vista previa: ${label}`} className="max-w-full max-h-48 object-contain" />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            type="button"
            aria-label={`Quitar ${label}`}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={processing}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#9333ea] text-[#9333ea] rounded-lg hover:bg-purple-50 transition-colors text-sm disabled:opacity-60"
      >
        <Upload className="w-4 h-4" aria-hidden="true" />
        {processing ? 'Procesando…' : 'Subir desde dispositivo'}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleFileChange}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div>
        <label htmlFor={`${id}-url`} className="block text-gray-600 text-xs mb-1">O ingresa una URL:</label>
        <input
          id={`${id}-url`}
          type="url"
          inputMode="url"
          value={urlDraft}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={currentImage.startsWith('data:') ? 'Imagen subida desde el dispositivo' : 'https://ejemplo.com/imagen.jpg'}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full px-3 md:px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#9333ea] focus:outline-none text-sm md:text-base"
        />
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
