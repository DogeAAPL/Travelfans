import { Star, MapPin, MessageCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export function Destinations() {
  const { content } = useContent();
  return (
    <section id="destinos" className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#a855f7] bg-clip-text text-transparent">
              Destinos Populares
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conectamos tu pasión por viajar con los mejores destinos de Latinoamérica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.destinations.map((destination) => (
            <div
              key={destination.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{destination.rating}</span>
                  <span className="text-gray-500 text-sm">({destination.reviews})</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-[#a855f7] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.location}</span>
                </div>

                <h3 className="text-2xl mb-3">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>

                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Incluye:</div>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 3).map((highlight, i) => (
                      <span key={i} className="bg-purple-50 text-[#a855f7] px-3 py-1 rounded-full text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${content.whatsappNumber}?text=Hola!%20Quiero%20cotizar%20un%20paquete%20a%20${destination.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#c026d3] to-[#a855f7] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Cotizar Ahora
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
