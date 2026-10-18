import { Star, MapPin, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';
import { Carousel } from './Carousel';

export function Destinations() {
  const { t } = useTranslation();
  const { content } = useContent();
  if (content.destinations.length === 0) return null;
  return (
    <section id="destinos" aria-labelledby="destinos-title" className="py-24 md:py-32 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 id="destinos-title" className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent">
              {t('destinations.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('destinations.subtitle')}</p>
        </div>

        <div className="relative py-6 px-0">
          <Carousel label={t('destinations.title')}>
          {content.destinations.map((destination) => (
            <article
              key={destination.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-purple-100">
                {destination.image && (
                  <img
                    src={destination.image}
                    alt={`${destination.name}, ${destination.location}`}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={800}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                )}
                <div
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1"
                  aria-label={t('destinations.reviews', { rating: destination.rating, count: destination.reviews })}
                >
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                  <span className="font-semibold" aria-hidden="true">{destination.rating}</span>
                  <span className="text-gray-600 text-sm" aria-hidden="true">({destination.reviews})</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-[#9333ea] mb-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">{destination.location}</span>
                </div>

                <h3 className="text-2xl mb-3">{destination.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{destination.description}</p>

                {destination.highlights.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">{t('destinations.includes')}</div>
                    <ul className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, i) => (
                        <li key={i} className="bg-purple-50 text-[#7e22ce] px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  {...whatsappLinkProps(content.whatsappNumber, t('destinations.message', { name: destination.name }), `destination:${destination.name}`)}
                  className="w-full bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg transition-all mt-auto"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('destinations.quote')}
                </a>
              </div>
            </article>
          ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
