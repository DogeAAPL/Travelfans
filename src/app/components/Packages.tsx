import { Check, Plane, Hotel, Camera, MessageCircle, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';
import { Carousel } from './Carousel';

const iconMap: Record<number, typeof Hotel> = {
  1: Hotel,
  2: Camera,
  3: Plane,
  4: Briefcase,
  5: Hotel,
  6: Camera,
  7: Plane,
  8: Briefcase,
  9: Hotel,
  10: Camera
};

export function Packages() {
  const { t } = useTranslation();
  const { content } = useContent();
  if (content.packages.length === 0) return null;
  return (
    <section id="paquetes" aria-labelledby="paquetes-title" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 id="paquetes-title" className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent">
              {t('packages.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('packages.subtitle')}</p>
        </div>

        <div className="relative py-6 px-0">
          <Carousel label={t('packages.title')}>
          {content.packages.map((pkg) => {
            const Icon = iconMap[pkg.id] || Hotel;
            return (
              <div key={pkg.id} className={`${pkg.popular ? 'md:scale-105 md:z-10' : ''} transition-transform`}>
                <div
                  className={`relative bg-white rounded-2xl p-6 transition-all duration-300 h-full flex flex-col shadow-md hover:shadow-lg ${
                    pkg.popular
                      ? 'border-2 border-[#9333ea]'
                      : 'border-2 border-gray-200 hover:border-[#9333ea]'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white px-6 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      {t('packages.popular')}
                    </div>
                  )}

                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#c026d3] to-[#9333ea] rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl mb-2">{pkg.name}</h3>
                  <p className="text-[#9333ea] text-sm mb-1">{pkg.destinations}</p>
                  <p className="text-gray-600 text-sm">{pkg.duration}</p>
                </div>

                <div className="text-center mb-6">
                  <div className="text-2xl bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent mb-2">
                    {t('packages.askPrice')}
                  </div>
                  <p className="text-gray-600 text-sm">{t('packages.viaWhatsapp')}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {pkg.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-0.5 flex-shrink-0">
                        <Check className="w-4 h-4 text-[#9333ea]" aria-hidden="true" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  {...whatsappLinkProps(content.whatsappNumber, t('packages.message', { name: pkg.name }), `package:${pkg.name}`)}
                  className={`w-full py-3 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white hover:shadow-lg'
                      : 'border-2 border-[#9333ea] text-[#9333ea] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#9333ea] hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('packages.quote')}
                </a>
                </div>
              </div>
            );
          })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
