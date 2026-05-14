import { Star, Quote, MessageCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Madrid, España',
    rating: 5,
    text: 'Mi viaje a Perú fue increíble. La atención por WhatsApp fue rápida y personalizada. Machu Picchu superó todas mis expectativas. ¡Gracias TravelFans!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    text: 'Cartagena fue mágica. Todo el proceso de cotización por WhatsApp fue súper fácil y rápido. La mejor experiencia de viaje que he tenido.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    location: 'Ciudad de México, México',
    rating: 5,
    text: 'Brasil fue un sueño hecho realidad. El equipo de TravelFans respondió todas mis dudas al instante por WhatsApp. ¡100% recomendado!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
  }
];

export function Testimonials() {
  return (
    <section id="testimonios" className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#a855f7] bg-clip-text text-transparent">
              Opiniones de Viajeros
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conoce las experiencias de quienes ya viajaron con TravelFans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-purple-100" />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                />
                <div>
                  <h4 className="mb-1">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#c026d3] to-[#a855f7] rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl mb-4">
            ¿Listo para tu próxima aventura?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Únete a miles de viajeros satisfechos y descubre el mundo con nosotros
          </p>
          <a
            href="https://wa.me/5491123456789?text=Hola!%20Quiero%20planificar%20mi%20próximo%20viaje"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#c026d3] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Planifica tu Viaje Ahora
          </a>
        </div>
      </div>
    </section>
  );
}
