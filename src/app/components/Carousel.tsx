import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  label: string;
  options?: {
    align?: 'start' | 'center' | 'end';
    loop?: boolean;
  };
}

export function Carousel({ children, label, options = {} }: CarouselProps) {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: options.align || 'start',
    loop: options.loop !== false,
    skipSnaps: false,
    dragFree: false
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (children.length === 0) return null;

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 py-6" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
          {children.map((child, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${children.length}`}
              className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_calc((100%-1rem)/2)] lg:flex-[0_0_calc((100%-3rem)/3)]"
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {prevBtnEnabled && (
        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-[#9333ea] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#9333ea] hover:text-white transition-all"
          aria-label={t('carousel.previous')}
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        </button>
      )}

      {nextBtnEnabled && (
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-[#9333ea] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#9333ea] hover:text-white transition-all"
          aria-label={t('carousel.next')}
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
