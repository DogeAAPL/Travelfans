/**
 * Ejemplo de uso de las nuevas funcionalidades
 * Este archivo muestra cómo usar JWT, Analytics, i18n e Image Cache
 */

// ============================================
// 1. EJEMPLO DE USO DE JWT Y AUTENTICACIÓN
// ============================================

import { useAuth } from '@/app/context/AuthContextV2';

export function AuthenticationExample() {
  const { isAuthenticated, user, login, logout, isTokenExpired, token } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenido, {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Token activo: {!isTokenExpired()}</p>
          <button onClick={logout}>Cerrar Sesión</button>
        </div>
      ) : (
        <button onClick={() => login('admin', 'travelfans2024')}>
          Iniciar Sesión
        </button>
      )}
    </div>
  );
}

// ============================================
// 2. EJEMPLO DE ANALYTICS Y TRACKING
// ============================================

import { AnalyticsService } from '@/services/AnalyticsService';

export function AnalyticsExample() {
  const handleWhatsAppClick = () => {
    // Rastrear clic en WhatsApp
    AnalyticsService.trackWhatsAppClick('Peru');
    // Abrir WhatsApp...
  };

  const handleSearch = (query: string) => {
    // Rastrear búsqueda
    AnalyticsService.trackSearch(query);
  };

  const showAnalyticsSummary = () => {
    const summary = AnalyticsService.getSummary();
    console.log('Eventos rastreados:', summary.totalEvents);
    console.log('Por categoría:', summary.eventsByCategory);
  };

  return (
    <div>
      <button onClick={handleWhatsAppClick}>Cotizar por WhatsApp</button>
      <button onClick={() => handleSearch('Machu Picchu')}>Buscar</button>
      <button onClick={showAnalyticsSummary}>Ver Analytics</button>
    </div>
  );
}

// ============================================
// 3. EJEMPLO DE INTERNACIONALIZACIÓN (i18n)
// ============================================

import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';

export function I18nExample() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      
      <p>Idioma actual: {i18n.language}</p>
      
      {/* Selector de idioma */}
      <LanguageSelector className="mt-4" />
      
      {/* Cambiar idioma directamente */}
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
      <button onClick={() => i18n.changeLanguage('es')}>
        Español
      </button>
      <button onClick={() => i18n.changeLanguage('pt')}>
        Português
      </button>
    </div>
  );
}

// ============================================
// 4. EJEMPLO DE CACHÉ DE IMÁGENES OPTIMIZADO
// ============================================

import { OptimizedImage } from '@/components/OptimizedImage';
import { ImageCacheService } from '@/services/ImageCacheService';

export function ImageCacheExample() {
  const handlePreloadImages = async () => {
    const urls = [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377',
      'https://images.unsplash.com/photo-1583531352515-8884af319dc1',
      // ... más URLs
    ];
    
    await ImageCacheService.preloadImages(urls);
    console.log('Imágenes precargadas');
  };

  const showCacheStats = () => {
    const stats = ImageCacheService.getStats();
    console.log(`Uso de caché: ${stats.usage}`);
    console.log(`Items en caché: ${stats.itemCount}`);
  };

  const clearCache = () => {
    ImageCacheService.clearAll();
    console.log('Caché limpiado');
  };

  return (
    <div>
      {/* Imagen optimizada con caché */}
      <OptimizedImage
        src="https://images.unsplash.com/photo-1526392060635-9d6019884377"
        alt="Machu Picchu"
        className="w-full h-auto rounded-lg"
        onLoad={() => console.log('Imagen cargada')}
        onError={() => console.log('Error al cargar imagen')}
      />

      <button onClick={handlePreloadImages}>Precargar Imágenes</button>
      <button onClick={showCacheStats}>Ver Estadísticas de Caché</button>
      <button onClick={clearCache}>Limpiar Caché</button>
    </div>
  );
}

// ============================================
// 5. EJEMPLO DE COMPONENTE COMPLETO
// ============================================

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export function CompleteExample() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleDestinationClick = (destination: string) => {
    AnalyticsService.trackDestinationView(destination);
    const message = `Hola! Quiero cotizar un paquete a ${destination}`;
    window.open(`https://wa.me/+51912345678?text=${encodeURIComponent(message)}`);
  };

  const handleSearch = () => {
    if (searchQuery) {
      AnalyticsService.trackSearch(searchQuery);
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector de idioma */}
      <LanguageSelector />

      {/* Información de autenticación */}
      {isAuthenticated && (
        <div className="bg-green-50 p-4 rounded-lg">
          <p>✓ {t('auth.authenticated')}</p>
        </div>
      )}

      {/* Búsqueda con tracking */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('hero.search.destination')}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg"
        >
          {t('hero.search.button')}
        </button>
      </div>

      {/* Destinos con tracking */}
      <div className="grid grid-cols-2 gap-4">
        {['Peru', 'Colombia', 'Panama', 'Brazil'].map((dest) => (
          <button
            key={dest}
            onClick={() => handleDestinationClick(dest)}
            className="p-4 bg-gray-100 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {dest}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// 6. INTEGRACIONES EN COMPONENTES EXISTENTES
// ============================================

// En Navbar.tsx:
// - Agregar <LanguageSelector /> en la navegación
// - Usar t('nav.home'), t('nav.destinations'), etc.

// En Hero.tsx:
// - Usar OptimizedImage para imágenes
// - Rastrear búsquedas con AnalyticsService.trackSearch()

// En Destinations.tsx:
// - Usar OptimizedImage para imágenes de destinos
// - Rastrear vistas con AnalyticsService.trackDestinationView()

// En Footer.tsx:
// - Agregar LanguageSelector
// - Usar traducciones con useTranslation()

// En Admin Panel:
// - Proteger con useAuth()
// - Mostrar información del usuario actual
// - Rastrear acciones de administrador
