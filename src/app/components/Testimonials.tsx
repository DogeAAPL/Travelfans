import { Star, Quote, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';
import { Carousel } from './Carousel';

export function Testimonials() {
  const { t } = useTranslation();
  const { content } = useContent();
  if (content.testimonials.length === 0) return null;
  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="py-24 md:py-32 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 id="testimonios-title" className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent">
              {t('testimonials.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        <div className="relative py-6 px-0">
          <Carousel label={t('testimonials.title')}>
          {content.testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all relative h-full flex flex-col"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-purple-100" aria-hidden="true" />

              <figcaption className="flex items-center gap-4 mb-6 relative z-10">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c026d3] to-[#9333ea] text-white text-2xl flex items-center justify-center flex-shrink-0"
                  >
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="mb-1 font-medium">{testimonial.name}</div>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </figcaption>

              <div className="flex gap-1 mb-4" role="img" aria-label={t('testimonials.rating', { count: testimonial.rating })}>
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>

              <blockquote className="text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </blockquote>
            </figure>
          ))}
          </Carousel>
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#c026d3] to-[#9333ea] rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl mb-4">{t('testimonials.ctaTitle')}</h3>
          <p className="text-xl mb-8 text-white">{t('testimonials.ctaSubtitle')}</p>
          <a
            {...whatsappLinkProps(content.whatsappNumber, t('testimonials.ctaMessage'), 'testimonials_cta')}
            className="inline-flex items-center gap-2 bg-white text-[#a21caf] px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            {t('testimonials.ctaButton')}
          </a>
        </div>
      </div>
    </section>
  );
}
