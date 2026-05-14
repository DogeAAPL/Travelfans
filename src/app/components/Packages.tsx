import { Check, Plane, Hotel, Camera, MessageCircle } from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'Aventura Caribe',
    duration: '5 días / 4 noches',
    destinations: 'Cartagena, Colombia',
    popular: false,
    features: [
      'Vuelos incluidos',
      'Hotel boutique',
      'Desayunos',
      'City tour',
      'Playas del Caribe'
    ],
    icon: Hotel
  },
  {
    id: 2,
    name: 'Maravillas del Perú',
    duration: '7 días / 6 noches',
    destinations: 'Lima, Cusco y Machu Picchu',
    popular: true,
    features: [
      'Vuelos nacionales',
      'Hoteles 4 estrellas',
      'Desayunos incluidos',
      'Entrada a Machu Picchu',
      'Guía en español',
      'Traslados privados'
    ],
    icon: Camera
  },
  {
    id: 3,
    name: 'Brasil Completo',
    duration: '10 días / 9 noches',
    destinations: 'Río, Salvador y Amazonas',
    popular: false,
    features: [
      'Vuelos incluidos',
      'Hoteles premium',
      'Desayunos',
      'Cristo Redentor',
      'Tour del Amazonas',
      'Playas de Río'
    ],
    icon: Plane
  }
];

export function Packages() {
  return (
    <section id="paquetes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#a855f7] bg-clip-text text-transparent">
              Paquetes de Viaje
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Paquetes armados para cada tipo de viajero. Cotiza por WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 ${
                  pkg.popular
                    ? 'border-2 border-[#a855f7] shadow-2xl scale-105'
                    : 'border-2 border-gray-200 hover:border-[#a855f7] hover:shadow-xl'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </div>
                )}

                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c026d3] to-[#a855f7] rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl mb-2">{pkg.name}</h3>
                  <p className="text-[#a855f7] text-sm mb-1">{pkg.destinations}</p>
                  <p className="text-gray-600 text-sm">{pkg.duration}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl bg-gradient-to-r from-[#c026d3] to-[#a855f7] bg-clip-text text-transparent mb-2">
                    Consulta precios
                  </div>
                  <p className="text-gray-500 text-sm">Cotiza por WhatsApp</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1">
                        <Check className="w-5 h-5 text-[#a855f7]" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/5491123456789?text=Hola!%20Quiero%20cotizar%20el%20paquete%20${pkg.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white hover:shadow-lg'
                      : 'border-2 border-[#a855f7] text-[#a855f7] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Cotizar por WhatsApp
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
