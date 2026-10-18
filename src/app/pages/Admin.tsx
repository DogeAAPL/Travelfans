import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent, type ContentData, type Destination, type Package, type Testimonial } from '../context/ContentContext';
import {
  LogOut,
  Home,
  Flag,
  Package as PackageIcon,
  MessageSquare,
  Save,
  Plus,
  Trash2,
  Phone,
  Undo2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import logo from '../../imports/Travelfans_logo.png';
import { ImageUpload } from '../components/ImageUpload';
import { ImageResolutionGuide } from '../components/ImageResolutionGuide';
import { MAX_ITEMS, isValidWhatsapp, nextId, splitList, validateContent } from '../content/validation';
import { NotAuthorizedError, StorageFullError } from '../../services/contentService';
import { usingDefaultCredentials } from '../../services/authService';

const inputClass =
  'w-full px-3 md:px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#9333ea] focus:outline-none text-sm md:text-base';
const labelClass = 'block text-gray-700 mb-2 text-xs md:text-sm';
const primaryButtonClass =
  'flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white rounded-lg hover:shadow-lg transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed';

type Tab = 'hero' | 'destinations' | 'packages' | 'testimonials' | 'settings';

const TABS: Array<{ id: Tab; label: string; icon: typeof Home }> = [
  { id: 'hero', label: 'Inicio', icon: Home },
  { id: 'destinations', label: 'Destinos', icon: Flag },
  { id: 'packages', label: 'Paquetes', icon: PackageIcon },
  { id: 'testimonials', label: 'Testimonios', icon: MessageSquare },
  { id: 'settings', label: 'Configuración', icon: Phone },
];

/**
 * Campo de texto para listas separadas por coma. Guarda el texto tal como se
 * escribe (para no borrar la coma mientras se tipea) y entrega la lista limpia.
 */
function ListField({ id, label, value, onChange, rows }: {
  id: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  rows?: number;
}) {
  const [text, setText] = useState(value.join(', '));
  const props = {
    id,
    value: text,
    className: inputClass,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setText(e.target.value);
      onChange(splitList(e.target.value));
    },
  };
  return (
    <div>
      <label htmlFor={id} className={labelClass}>{label}</label>
      {rows ? <textarea rows={rows} {...props} /> : <input type="text" {...props} />}
    </div>
  );
}

function numberFrom(value: string, min: number, max: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : min;
}

export function Admin() {
  const { logout } = useAuth();
  const { content, saveContent, sharedContent } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [draft, setDraft] = useState<ContentData>(content);
  const [status, setStatus] = useState<{ type: 'saved' | 'error'; messages: string[] } | null>(null);
  const [saving, setSaving] = useState(false);
  // Cambia al reemplazar el borrador completo, para reiniciar los campos con estado propio (ListField).
  const [draftVersion, setDraftVersion] = useState(0);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content]);

  // El contenido guardado se carga de forma asíncrona: si aún no hay cambios, adoptarlo.
  useEffect(() => {
    if (!dirty) {
      setDraft(content);
      setDraftVersion(v => v + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  // Avisar antes de cerrar la pestaña con cambios sin guardar.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (partial: Partial<ContentData>) => {
    setDraft(prev => ({ ...prev, ...partial }));
    setStatus(null);
  };

  const leave = (to: string) => {
    if (dirty && !window.confirm('Tienes cambios sin guardar. ¿Salir de todas formas?')) return false;
    navigate(to);
    return true;
  };

  const handleLogout = async () => {
    if (dirty && !window.confirm('Tienes cambios sin guardar. ¿Cerrar sesión de todas formas?')) return;
    await logout();
    navigate('/login');
  };

  const handleSave = async () => {
    const errors = validateContent(draft);
    if (errors.length > 0) {
      setStatus({ type: 'error', messages: errors });
      return;
    }
    setSaving(true);
    try {
      const saved = await saveContent(draft);
      // Las imágenes subidas vuelven como URLs de Storage: el borrador pasa a ser lo guardado.
      setDraft(saved);
      setDraftVersion(v => v + 1);
      setStatus({
        type: 'saved',
        messages: [sharedContent ? 'Cambios publicados en el sitio.' : 'Cambios guardados en este navegador.'],
      });
    } catch (error) {
      const known = error instanceof StorageFullError || error instanceof NotAuthorizedError;
      setStatus({
        type: 'error',
        messages: [known ? (error as Error).message : 'No se pudieron guardar los cambios. Revisa tu conexión e intenta de nuevo.'],
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!window.confirm('¿Descartar todos los cambios sin guardar?')) return;
    setDraft(content);
    setDraftVersion(v => v + 1);
    setStatus(null);
  };

  const updateItem = <T extends { id: number }>(key: 'destinations' | 'packages' | 'testimonials', id: number, patch: Partial<T>) => {
    const items = draft[key] as unknown as T[];
    update({ [key]: items.map(item => (item.id === id ? { ...item, ...patch } : item)) } as Partial<ContentData>);
  };

  const removeItem = (key: 'destinations' | 'packages' | 'testimonials', id: number, name: string) => {
    if (!window.confirm(`¿Eliminar "${name || `#${id}`}"? El cambio se aplica al guardar.`)) return;
    update({ [key]: (draft[key] as Array<{ id: number }>).filter(item => item.id !== id) } as Partial<ContentData>);
  };

  const updateDestination = (id: number, patch: Partial<Destination>) => updateItem<Destination>('destinations', id, patch);
  const updatePackage = (id: number, patch: Partial<Package>) => updateItem<Package>('packages', id, patch);
  const updateTestimonial = (id: number, patch: Partial<Testimonial>) => updateItem<Testimonial>('testimonials', id, patch);

  const addButton = (count: number, label: string, onAdd: () => void) =>
    count < MAX_ITEMS ? (
      <button type="button" onClick={onAdd} className={primaryButtonClass}>
        <Plus className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">Agregar</span>
      </button>
    ) : (
      <span className="text-xs text-gray-600">Máximo {MAX_ITEMS}</span>
    );

  const deleteButton = (onClick: () => void, label: string) => (
    <button type="button" onClick={onClick} className="text-red-600 hover:text-red-700 p-2" aria-label={label}>
      <Trash2 className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4">
              <img src={logo} alt="TravelFans" className="h-8 md:h-10 w-auto" />
              <h1 className="text-lg md:text-2xl bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent">
                <span className="hidden sm:inline">Panel de Administración</span>
                <span className="sm:hidden">Admin</span>
              </h1>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
              <button
                type="button"
                onClick={() => leave('/')}
                className="hidden sm:block px-4 py-2 text-gray-700 hover:text-[#c026d3] transition-colors text-sm md:text-base"
              >
                Ver Sitio
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm md:text-base"
              >
                <LogOut className="w-3 h-3 md:w-4 md:h-4" aria-hidden="true" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
                <span className="sm:hidden">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {usingDefaultCredentials && (
          <div role="note" className="mb-6 flex gap-3 rounded-lg border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <p>
              Estás usando la contraseña de ejemplo. Antes de publicar el sitio, genera una propia con{' '}
              <code className="bg-amber-100 px-1 rounded">npm run hash-password -- "tu-contraseña"</code> y guárdala en el archivo{' '}
              <code className="bg-amber-100 px-1 rounded">.env</code> (ver <code className="bg-amber-100 px-1 rounded">.env.example</code>).
            </p>
          </div>
        )}

        {!sharedContent && (
          <div role="note" className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
            Modo local: Supabase no está configurado, así que los cambios se guardan solo en este navegador.
            Configura <code className="bg-blue-100 px-1 rounded">VITE_SUPABASE_URL</code> y{' '}
            <code className="bg-blue-100 px-1 rounded">VITE_SUPABASE_PUBLISHABLE_KEY</code> en el{' '}
            <code className="bg-blue-100 px-1 rounded">.env</code> para publicarlos.
          </div>
        )}

        <ImageResolutionGuide />

        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div role="tablist" aria-label="Secciones del sitio" className="flex border-b overflow-x-auto scrollbar-hide">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-3 md:py-4 border-b-2 transition-colors whitespace-nowrap text-sm md:text-base ${
                    selected ? 'border-[#9333ea] text-[#9333ea]' : 'border-transparent text-gray-600 hover:text-[#9333ea]'
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sr-only sm:hidden">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`} className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Sección de Inicio</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hero-title" className={labelClass}>Título principal</label>
                  <input id="hero-title" type="text" maxLength={60} value={draft.heroTitle} onChange={(e) => update({ heroTitle: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="hero-highlight" className={labelClass}>Título destacado (en color)</label>
                  <input id="hero-highlight" type="text" maxLength={60} value={draft.heroHighlight} onChange={(e) => update({ heroHighlight: e.target.value })} className={inputClass} />
                </div>
              </div>
              <p className="text-xs text-gray-600 -mt-3">
                Si dejas los textos originales, el sitio los muestra traducidos al idioma del visitante.
              </p>

              <div>
                <label htmlFor="hero-subtitle" className={labelClass}>Subtítulo</label>
                <textarea id="hero-subtitle" rows={3} maxLength={200} value={draft.heroSubtitle} onChange={(e) => update({ heroSubtitle: e.target.value })} className={inputClass} />
              </div>

              <fieldset>
                <legend className="text-base md:text-lg mb-3 md:mb-4">Estadísticas</legend>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {draft.heroStats.map((stat, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      <input
                        type="text"
                        aria-label={`Valor de la estadística ${index + 1}`}
                        placeholder="Valor"
                        maxLength={10}
                        value={stat.value}
                        onChange={(e) =>
                          update({ heroStats: draft.heroStats.map((s, i) => (i === index ? { ...s, value: e.target.value } : s)) })
                        }
                        className={`${inputClass} flex-1`}
                      />
                      <input
                        type="text"
                        aria-label={`Etiqueta de la estadística ${index + 1}`}
                        placeholder="Etiqueta"
                        maxLength={30}
                        value={stat.label}
                        onChange={(e) =>
                          update({ heroStats: draft.heroStats.map((s, i) => (i === index ? { ...s, label: e.target.value } : s)) })
                        }
                        className={`${inputClass} flex-1`}
                      />
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl">Destinos</h2>
                {addButton(draft.destinations.length, 'Agregar Destino', () =>
                  update({
                    destinations: [
                      ...draft.destinations,
                      {
                        id: nextId(draft.destinations),
                        name: 'Nuevo Destino',
                        location: 'Ubicación',
                        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1080',
                        rating: 5,
                        reviews: 0,
                        highlights: ['Lugar 1', 'Lugar 2', 'Lugar 3'],
                        description: 'Descripción del destino',
                      },
                    ],
                  })
                )}
              </div>

              {draft.destinations.length === 0 && <p className="text-gray-600">No hay destinos. La sección no se mostrará en el sitio.</p>}

              {draft.destinations.map((dest) => (
                <div key={dest.id} className="border-2 border-gray-200 rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold">{dest.name || `Destino #${dest.id}`}</h3>
                    {deleteButton(() => removeItem('destinations', dest.id, dest.name), `Eliminar destino ${dest.name}`)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label htmlFor={`dest-${dest.id}-name`} className={labelClass}>Nombre</label>
                      <input id={`dest-${dest.id}-name`} type="text" maxLength={40} value={dest.name} onChange={(e) => updateDestination(dest.id, { name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor={`dest-${dest.id}-location`} className={labelClass}>Ubicación</label>
                      <input id={`dest-${dest.id}-location`} type="text" maxLength={60} value={dest.location} onChange={(e) => updateDestination(dest.id, { location: e.target.value })} className={inputClass} />
                    </div>
                  </div>

                  <ImageUpload
                    currentImage={dest.image}
                    onImageChange={(url) => updateDestination(dest.id, { image: url })}
                    label="Imagen del destino"
                    recommendedResolution="1200x800px"
                    maxDimension={1200}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`dest-${dest.id}-rating`} className={labelClass}>Rating (0 a 5)</label>
                      <input id={`dest-${dest.id}-rating`} type="number" step="0.1" min="0" max="5" value={dest.rating} onChange={(e) => updateDestination(dest.id, { rating: numberFrom(e.target.value, 0, 5) })} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor={`dest-${dest.id}-reviews`} className={labelClass}>Reseñas</label>
                      <input id={`dest-${dest.id}-reviews`} type="number" min="0" step="1" value={dest.reviews} onChange={(e) => updateDestination(dest.id, { reviews: Math.round(numberFrom(e.target.value, 0, 1_000_000)) })} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`dest-${dest.id}-description`} className={labelClass}>Descripción</label>
                    <textarea id={`dest-${dest.id}-description`} rows={2} maxLength={160} value={dest.description} onChange={(e) => updateDestination(dest.id, { description: e.target.value })} className={inputClass} />
                  </div>

                  <ListField
                    key={`${draftVersion}-dest-${dest.id}-highlights`}
                    id={`dest-${dest.id}-highlights`}
                    label="Lugares destacados (separados por coma, se muestran los 3 primeros)"
                    value={dest.highlights}
                    onChange={(highlights) => updateDestination(dest.id, { highlights })}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl">Paquetes</h2>
                {addButton(draft.packages.length, 'Agregar Paquete', () =>
                  update({
                    packages: [
                      ...draft.packages,
                      {
                        id: nextId(draft.packages),
                        name: 'Nuevo Paquete',
                        duration: '5 días / 4 noches',
                        destinations: 'Destino',
                        popular: false,
                        features: ['Característica 1', 'Característica 2', 'Característica 3'],
                      },
                    ],
                  })
                )}
              </div>

              {draft.packages.length === 0 && <p className="text-gray-600">No hay paquetes. La sección no se mostrará en el sitio.</p>}

              {draft.packages.map((pkg) => (
                <div key={pkg.id} className="border-2 border-gray-200 rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold">{pkg.name || `Paquete #${pkg.id}`}</h3>
                    {deleteButton(() => removeItem('packages', pkg.id, pkg.name), `Eliminar paquete ${pkg.name}`)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label htmlFor={`pkg-${pkg.id}-name`} className={labelClass}>Nombre</label>
                      <input id={`pkg-${pkg.id}-name`} type="text" maxLength={40} value={pkg.name} onChange={(e) => updatePackage(pkg.id, { name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor={`pkg-${pkg.id}-duration`} className={labelClass}>Duración</label>
                      <input id={`pkg-${pkg.id}-duration`} type="text" maxLength={40} value={pkg.duration} onChange={(e) => updatePackage(pkg.id, { duration: e.target.value })} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`pkg-${pkg.id}-destinations`} className={labelClass}>Destinos</label>
                    <input id={`pkg-${pkg.id}-destinations`} type="text" maxLength={80} value={pkg.destinations} onChange={(e) => updatePackage(pkg.id, { destinations: e.target.value })} className={inputClass} />
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={pkg.popular}
                      onChange={(e) => updatePackage(pkg.id, { popular: e.target.checked })}
                      className="w-4 h-4 accent-[#9333ea]"
                    />
                    <span className="text-gray-700 text-xs md:text-sm">Marcar como popular</span>
                  </label>

                  <ListField
                    key={`${draftVersion}-pkg-${pkg.id}-features`}
                    id={`pkg-${pkg.id}-features`}
                    label="Características (separadas por coma, se muestran las 3 primeras)"
                    rows={3}
                    value={pkg.features}
                    onChange={(features) => updatePackage(pkg.id, { features })}
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl">Testimonios</h2>
                {addButton(draft.testimonials.length, 'Agregar Testimonio', () =>
                  update({
                    testimonials: [
                      ...draft.testimonials,
                      {
                        id: nextId(draft.testimonials),
                        name: 'Nuevo Cliente',
                        location: 'Ciudad, País',
                        rating: 5,
                        text: 'Testimonio del cliente...',
                        image: '',
                      },
                    ],
                  })
                )}
              </div>

              <p className="text-sm text-gray-600">
                Usa opiniones y fotos reales de clientes (con su permiso). Si no hay foto, se muestra la inicial del nombre.
              </p>

              {draft.testimonials.length === 0 && <p className="text-gray-600">No hay testimonios. La sección no se mostrará en el sitio.</p>}

              {draft.testimonials.map((test) => (
                <div key={test.id} className="border-2 border-gray-200 rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold">{test.name || `Testimonio #${test.id}`}</h3>
                    {deleteButton(() => removeItem('testimonials', test.id, test.name), `Eliminar testimonio de ${test.name}`)}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label htmlFor={`test-${test.id}-name`} className={labelClass}>Nombre</label>
                      <input id={`test-${test.id}-name`} type="text" maxLength={40} value={test.name} onChange={(e) => updateTestimonial(test.id, { name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor={`test-${test.id}-location`} className={labelClass}>Ubicación</label>
                      <input id={`test-${test.id}-location`} type="text" maxLength={60} value={test.location} onChange={(e) => updateTestimonial(test.id, { location: e.target.value })} className={inputClass} />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label htmlFor={`test-${test.id}-rating`} className={labelClass}>Estrellas (1 a 5)</label>
                    <select id={`test-${test.id}-rating`} value={test.rating} onChange={(e) => updateTestimonial(test.id, { rating: Number(e.target.value) })} className={inputClass}>
                      {[5, 4, 3, 2, 1].map(n => (
                        <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>
                      ))}
                    </select>
                  </div>

                  <ImageUpload
                    currentImage={test.image}
                    onImageChange={(url) => updateTestimonial(test.id, { image: url })}
                    label="Foto de perfil (opcional)"
                    recommendedResolution="150x150px"
                    maxDimension={300}
                  />

                  <div>
                    <label htmlFor={`test-${test.id}-text`} className={labelClass}>Testimonio</label>
                    <textarea id={`test-${test.id}-text`} rows={4} maxLength={400} value={test.text} onChange={(e) => updateTestimonial(test.id, { text: e.target.value })} className={inputClass} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl md:text-2xl mb-4 md:mb-6">Configuración General</h2>

              <div>
                <label htmlFor="settings-whatsapp" className="block text-gray-700 mb-2 text-sm md:text-base">Número de WhatsApp</label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#9333ea] flex-shrink-0" aria-hidden="true" />
                  <input
                    id="settings-whatsapp"
                    type="tel"
                    inputMode="numeric"
                    maxLength={15}
                    value={draft.whatsappNumber}
                    onChange={(e) => update({ whatsappNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="573156060833"
                    aria-invalid={!isValidWhatsapp(draft.whatsappNumber) ? true : undefined}
                    aria-describedby="settings-whatsapp-help"
                    className={`${inputClass} flex-1`}
                  />
                </div>
                <p id="settings-whatsapp-help" className={`text-xs md:text-sm mt-2 ${isValidWhatsapp(draft.whatsappNumber) ? 'text-gray-600' : 'text-red-600'}`}>
                  Código de país + número, solo dígitos y sin "+" (ej: 573156060833).
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Barra de guardado fija: visible en todas las pestañas */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 text-sm" aria-live="polite">
            {status?.type === 'error' ? (
              <div className="text-red-700">
                <p className="flex items-center gap-2 font-medium">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" /> No se guardó:
                </p>
                <ul className="list-disc ml-6 max-h-24 overflow-y-auto">
                  {status.messages.map((message, i) => <li key={i}>{message}</li>)}
                </ul>
              </div>
            ) : status?.type === 'saved' && !dirty ? (
              <p className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> {status.messages[0]}
              </p>
            ) : dirty ? (
              <p className="text-amber-700">Tienes cambios sin guardar.</p>
            ) : (
              <p className="text-gray-600">Sin cambios pendientes.</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleDiscard}
              disabled={!dirty || saving}
              className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Undo2 className="w-4 h-4" aria-hidden="true" />
              Descartar
            </button>
            <button type="button" onClick={handleSave} disabled={!dirty || saving} className={primaryButtonClass}>
              <Save className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
              {saving ? 'Guardando…' : 'Guardar Cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
