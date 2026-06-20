import { Upload, X, Info } from 'lucide-react';
import { useState, useRef } from 'react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  label?: string;
  recommendedResolution?: string;
  recommendedSize?: string;
  maxFileSize?: number;
}

export function ImageUpload({ 
  currentImage, 
  onImageChange, 
  label = 'Imagen',
  recommendedResolution = '1280x720',
  recommendedSize = '5MB',
  maxFileSize = 5 * 1024 * 1024
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(currentImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño
    if (file.size > maxFileSize) {
      alert(`La imagen no debe superar ${recommendedSize}`);
      return;
    }

    // Convertir a base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);
      onImageChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onImageChange(url);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-gray-700 text-xs md:text-sm font-medium">{label}</label>
        <div className="flex items-center gap-1 text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">
          <Info className="w-3 h-3" />
          <span>Resolución recomendada: {recommendedResolution}</span>
        </div>
      </div>

      {/* Preview */}
      {preview && (
        <div className="relative w-full rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center" style={{ minHeight: '10rem' }}>
          <img
            src={preview}
            alt="Preview"
            className="max-w-full max-h-48 object-contain"
          />
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload button */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#a855f7] text-[#a855f7] rounded-lg hover:bg-purple-50 transition-colors text-sm"
        >
          <Upload className="w-4 h-4" />
          Subir desde dispositivo
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* URL input */}
      <div>
        <label className="block text-gray-600 text-xs mb-1">O ingresa una URL:</label>
        <input
          type="text"
          value={preview}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full px-3 md:px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none text-sm md:text-base"
        />
      </div>

      {/* Info hint */}
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>📋 Recomendaciones:</strong> Formato PNG o JPG, máximo {recommendedSize}, resolución mínima {recommendedResolution}
        </p>
      </div>
    </div>
  );
}
