import { AlertCircle } from 'lucide-react';

/**
 * Guía de Resoluciones Recomendadas para Imágenes
 * Componente informativo para el panel de administración
 */
export function ImageResolutionGuide() {
  const resolutionData = [
    {
      section: 'Destinos',
      resolution: '1200x800px',
      aspectRatio: '3:2',
      maxSize: '10MB',
      format: 'JPG, PNG o WebP',
      description: 'Imagen de portada para cards de destinos'
    },
    {
      section: 'Testimonios',
      resolution: '150x150px',
      aspectRatio: '1:1',
      maxSize: '10MB',
      format: 'JPG, PNG o WebP',
      description: 'Avatar circular del cliente'
    },
    {
      section: 'Paquetes',
      resolution: 'Sin imagen',
      aspectRatio: '-',
      maxSize: '-',
      format: '-',
      description: 'Los paquetes usan íconos, no imágenes'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">📋 Especificaciones de Imágenes</h3>
          <p className="text-sm text-gray-600">Guía de resoluciones recomendadas para optimizar tu sitio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resolutionData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{item.section}</h4>
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {item.resolution}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
            
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span className="font-medium">Proporción:</span>
                <span>{item.aspectRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Tamaño máx:</span>
                <span>{item.maxSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Formato:</span>
                <span>{item.format}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-200">
        <p className="text-sm text-gray-700">
          <strong>💡 Tip:</strong> Las imágenes que subes desde tu dispositivo se reducen y comprimen automáticamente.
          Si tienes la imagen publicada en internet, pegar su URL (https) ocupa todavía menos espacio.
        </p>
      </div>
    </div>
  );
}
