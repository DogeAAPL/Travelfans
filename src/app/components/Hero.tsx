import { MapPin, Calendar, Users, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useContent } from '../context/ContentContext';
import { useHeroText } from '../content/useHeroText';
import { whatsappUrl } from '../content/whatsapp';
import { trackWhatsAppClick } from '../../services/AnalyticsService';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1602608099803-96718a589bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGJlYWNoJTIwc3Vuc2V0JTIwY2FyaWJiZWFufGVufDF8fHx8MTc3ODc4NjU5MHww&ixlib=rb-4.1.0&q=80';

const TRAVELER_OPTIONS = [1, 2, 3, 4, 5];
const MAX_TRAVELERS = TRAVELER_OPTIONS[TRAVELER_OPTIONS.length - 1];

/** Fecha de hoy en formato yyyy-mm-dd según la zona horaria local. */
function today(): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

export function Hero() {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const hero = useHeroText();
  const [searchData, setSearchData] = useState({ destination: '', date: '', travelers: '1' });
  const [dateError, setDateError] = useState('');

  const travelersLabel = (count: number) =>
    count === MAX_TRAVELERS ? t('hero.form.travelersOptionMax', { count }) : t('hero.form.travelersOption', { count });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchData.date && searchData.date < today()) {
      setDateError(t('hero.form.datePast'));
      return;
    }
    setDateError('');

    const undecided = t('hero.message.undecided');
    const date = searchData.date
      ? new Date(`${searchData.date}T00:00:00`).toLocaleDateString(i18n.language, {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : undecided;
    const message = [
      t('hero.message.intro'),
      '',
      t('hero.message.destination', { value: searchData.destination.trim() || undecided }),
      t('hero.message.date', { value: date }),
      t('hero.message.travelers', { value: travelersLabel(Number(searchData.travelers)) }),
    ].join('\n');

    trackWhatsAppClick('hero_form');
    window.open(whatsappUrl(content.whatsappNumber, message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={`${HERO_IMAGE}&w=1920`}
          srcSet={`${HERO_IMAGE}&w=768 768w, ${HERO_IMAGE}&w=1280 1280w, ${HERO_IMAGE}&w=1920 1920w`}
          sizes="100vw"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#86198f]/85 to-[#6b21a8]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-7xl text-white mb-6 break-words">
            {hero.title}
            {hero.highlight && (
              <>
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  {hero.highlight}
                </span>
              </>
            )}
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">{hero.subtitle}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          aria-label={t('hero.form.title')}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <label htmlFor="hero-destination" className="sr-only">{t('hero.form.destination')}</label>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9333ea]" aria-hidden="true" />
              <input
                id="hero-destination"
                type="text"
                list="hero-destination-options"
                maxLength={80}
                placeholder={t('hero.form.destinationPlaceholder')}
                value={searchData.destination}
                onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#9333ea] focus:outline-none"
              />
              <datalist id="hero-destination-options">
                {content.destinations.map(dest => (
                  <option key={dest.id} value={dest.name} />
                ))}
              </datalist>
            </div>

            <div>
              <div className="relative">
                <label htmlFor="hero-date" className="sr-only">{t('hero.form.date')}</label>
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9333ea] pointer-events-none" aria-hidden="true" />
                <input
                  id="hero-date"
                  type="date"
                  min={today()}
                  value={searchData.date}
                  aria-invalid={dateError ? true : undefined}
                  aria-describedby={dateError ? 'hero-date-error' : undefined}
                  onChange={(e) => {
                    setSearchData({ ...searchData, date: e.target.value });
                    setDateError('');
                  }}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg focus:border-[#9333ea] focus:outline-none ${
                    dateError ? 'border-red-400' : 'border-gray-200'
                  }`}
                />
              </div>
              {dateError && (
                <p id="hero-date-error" role="alert" className="text-sm text-red-600 mt-1">{dateError}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="hero-travelers" className="sr-only">{t('hero.form.travelers')}</label>
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9333ea] pointer-events-none" aria-hidden="true" />
              <select
                id="hero-travelers"
                value={searchData.travelers}
                onChange={(e) => setSearchData({ ...searchData, travelers: e.target.value })}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#9333ea] focus:outline-none appearance-none bg-white"
              >
                {TRAVELER_OPTIONS.map(count => (
                  <option key={count} value={count}>{travelersLabel(count)}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#c026d3] to-[#9333ea] text-white py-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            {t('hero.form.submit')}
          </button>
        </form>

        <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
          {hero.stats.map((stat, index) => (
            <div key={index} className="flex flex-col-reverse">
              <dt className="text-white/90">{stat.label}</dt>
              <dd className="text-4xl mb-2">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
