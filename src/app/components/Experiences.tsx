import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useContent, type Experience } from '../context/ContentContext';
import { whatsappLinkProps } from '../content/whatsapp';
import { parseVideoUrl } from '../content/video';

export function ExperienceVideo({ experience }: { experience: Experience }) {
  const video = parseVideoUrl(experience.videoUrl);
  if (!video) return null;
  const frame = video.vertical ? 'aspect-[9/16] max-w-xs mx-auto' : 'aspect-video';
  return (
    <div className={`${frame} w-full rounded-2xl overflow-hidden bg-black`}>
      {video.kind === 'iframe' ? (
        <iframe
          src={video.src}
          title={experience.title}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="w-full h-full"
        />
      ) : (
        <video src={video.src} controls playsInline preload="metadata" className="w-full h-full object-cover" aria-label={experience.title} />
      )}
    </div>
  );
}

/** Videos de viajes ya realizados. Si el panel no tiene ninguno, la sección no se muestra. */
export function Experiences() {
  const { t } = useTranslation();
  const { content } = useContent();
  if (content.experiences.length === 0) return null;
  return (
    <section id="experiencias" aria-labelledby="experiencias-title" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 id="experiencias-title" className="text-4xl md:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#c026d3] to-[#9333ea] bg-clip-text text-transparent">
              {t('experiences.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t('experiences.subtitle')}</p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {content.experiences.map((experience, index) => (
            <article key={experience.id} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* En escritorio el video alterna de lado para que la lista no sea una columna repetida. */}
              <div className={index % 2 === 1 ? 'md:order-2' : undefined}>
                <ExperienceVideo experience={experience} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl mb-4">{experience.title}</h3>
                {experience.text && <p className="text-lg text-gray-700 mb-6 whitespace-pre-line">{experience.text}</p>}
                <a
                  {...whatsappLinkProps(content.whatsappNumber, t('experiences.message', { name: experience.title }), `experience:${experience.title}`)}
                  className="inline-flex items-center gap-2 border-2 border-[#9333ea] text-[#9333ea] px-6 py-3 rounded-full font-semibold hover:bg-[#9333ea] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  {t('experiences.quote')}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
