import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import {
  LogOut,
  Home,
  Flag,
  Package,
  MessageSquare,
  Save,
  Plus,
  Trash2,
  Edit,
  Phone
} from 'lucide-react';
import logo from '../../imports/Travelfans_logo.png';

export function Admin() {
  const { logout } = useAuth();
  const { content, updateContent } = useContent();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hero');
  const [saved, setSaved] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateDestination = (id: number, field: string, value: any) => {
    const updated = content.destinations.map(dest =>
      dest.id === id ? { ...dest, [field]: value } : dest
    );
    updateContent({ destinations: updated });
  };

  const updatePackage = (id: number, field: string, value: any) => {
    const updated = content.packages.map(pkg =>
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    );
    updateContent({ packages: updated });
  };

  const updateTestimonial = (id: number, field: string, value: any) => {
    const updated = content.testimonials.map(test =>
      test.id === id ? { ...test, [field]: value } : test
    );
    updateContent({ testimonials: updated });
  };

  const deleteDestination = (id: number) => {
    const updated = content.destinations.filter(dest => dest.id !== id);
    updateContent({ destinations: updated });
  };

  const deletePackage = (id: number) => {
    const updated = content.packages.filter(pkg => pkg.id !== id);
    updateContent({ packages: updated });
  };

  const deleteTestimonial = (id: number) => {
    const updated = content.testimonials.filter(test => test.id !== id);
    updateContent({ testimonials: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="TravelFans" className="h-10 w-auto" />
              <h1 className="text-2xl bg-gradient-to-r from-[#c026d3] to-[#a855f7] bg-clip-text text-transparent">
                Panel de Administración
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {saved && (
                <span className="text-green-600 text-sm font-medium">
                  ✓ Guardado
                </span>
              )}
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-gray-700 hover:text-[#c026d3] transition-colors"
              >
                Ver Sitio
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'hero', label: 'Hero', icon: Home },
              { id: 'destinations', label: 'Destinos', icon: Flag },
              { id: 'packages', label: 'Paquetes', icon: Package },
              { id: 'testimonials', label: 'Testimonios', icon: MessageSquare },
              { id: 'settings', label: 'Configuración', icon: Phone }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#a855f7] text-[#a855f7]'
                      : 'border-transparent text-gray-600 hover:text-[#a855f7]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h2 className="text-2xl mb-6">Sección Hero</h2>

              <div>
                <label className="block text-gray-700 mb-2">Título Principal</label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => updateContent({ heroTitle: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Subtítulo</label>
                <textarea
                  value={content.heroSubtitle}
                  onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                />
              </div>

              <div>
                <h3 className="text-lg mb-4">Estadísticas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.heroStats.map((stat, index) => (
                    <div key={index} className="flex gap-4">
                      <input
                        type="text"
                        placeholder="Valor"
                        value={stat.value}
                        onChange={(e) => {
                          const updated = [...content.heroStats];
                          updated[index].value = e.target.value;
                          updateContent({ heroStats: updated });
                        }}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Etiqueta"
                        value={stat.label}
                        onChange={(e) => {
                          const updated = [...content.heroStats];
                          updated[index].label = e.target.value;
                          updateContent({ heroStats: updated });
                        }}
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          )}

          {/* Destinations Tab */}
          {activeTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Destinos</h2>
              </div>

              {content.destinations.map((dest) => (
                <div key={dest.id} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Destino #{dest.id}</h3>
                    <button
                      onClick={() => deleteDestination(dest.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Nombre</label>
                      <input
                        type="text"
                        value={dest.name}
                        onChange={(e) => updateDestination(dest.id, 'name', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Ubicación</label>
                      <input
                        type="text"
                        value={dest.location}
                        onChange={(e) => updateDestination(dest.id, 'location', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm">URL de Imagen</label>
                      <input
                        type="text"
                        value={dest.image}
                        onChange={(e) => updateDestination(dest.id, 'image', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        value={dest.rating}
                        onChange={(e) => updateDestination(dest.id, 'rating', parseFloat(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Reseñas</label>
                      <input
                        type="number"
                        value={dest.reviews}
                        onChange={(e) => updateDestination(dest.id, 'reviews', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm">Descripción</label>
                      <textarea
                        value={dest.description}
                        onChange={(e) => updateDestination(dest.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm">Highlights (separados por coma)</label>
                      <input
                        type="text"
                        value={dest.highlights.join(', ')}
                        onChange={(e) => updateDestination(dest.id, 'highlights', e.target.value.split(', '))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Paquetes</h2>
              </div>

              {content.packages.map((pkg) => (
                <div key={pkg.id} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Paquete #{pkg.id}</h3>
                    <button
                      onClick={() => deletePackage(pkg.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Nombre</label>
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Duración</label>
                      <input
                        type="text"
                        value={pkg.duration}
                        onChange={(e) => updatePackage(pkg.id, 'duration', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm">Destinos</label>
                      <input
                        type="text"
                        value={pkg.destinations}
                        onChange={(e) => updatePackage(pkg.id, 'destinations', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={pkg.popular}
                          onChange={(e) => updatePackage(pkg.id, 'popular', e.target.checked)}
                          className="w-4 h-4 text-[#a855f7] border-gray-300 rounded focus:ring-[#a855f7]"
                        />
                        <span className="text-gray-700 text-sm">Marcar como popular</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm">Características (separadas por coma)</label>
                      <textarea
                        value={pkg.features.join(', ')}
                        onChange={(e) => updatePackage(pkg.id, 'features', e.target.value.split(', '))}
                        rows={3}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Testimonios</h2>
              </div>

              {content.testimonials.map((test) => (
                <div key={test.id} className="border-2 border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Testimonio #{test.id}</h3>
                    <button
                      onClick={() => deleteTestimonial(test.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Nombre</label>
                      <input
                        type="text"
                        value={test.name}
                        onChange={(e) => updateTestimonial(test.id, 'name', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Ubicación</label>
                      <input
                        type="text"
                        value={test.location}
                        onChange={(e) => updateTestimonial(test.id, 'location', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">Rating</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={test.rating}
                        onChange={(e) => updateTestimonial(test.id, 'rating', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2 text-sm">URL de Imagen</label>
                      <input
                        type="text"
                        value={test.image}
                        onChange={(e) => updateTestimonial(test.id, 'image', e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2 text-sm">Testimonio</label>
                      <textarea
                        value={test.text}
                        onChange={(e) => updateTestimonial(test.id, 'text', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl mb-6">Configuración General</h2>

              <div>
                <label className="block text-gray-700 mb-2">Número de WhatsApp</label>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#a855f7]" />
                  <input
                    type="text"
                    value={content.whatsappNumber}
                    onChange={(e) => updateContent({ whatsappNumber: e.target.value })}
                    placeholder="5491123456789"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#a855f7] focus:outline-none"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Formato: código de país + número (ej: 5491123456789)
                </p>
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Save className="w-5 h-5" />
                Guardar Cambios
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
