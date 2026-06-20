import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode[];
  options?: {
    align?: 'start' | 'center' | 'end';
    loop?: boolean;
  };
}

export function Carousel({ children, options = {} }: CarouselProps) {
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
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6 px-4 sm:px-6 lg:px-8">
          {children.map((child, index) => (
            <div key={index} className="flex-[0_0_calc((100%-1rem)/3)] min-w-0 sm:flex-[0_0_calc((100%-1rem)/3)] lg:flex-[0_0_calc((100%-1.5rem)/3)]">
              {child}
            </div>
          ))}
        </div>
      </div>

      {prevBtnEnabled && (
        <button
          onClick={scrollPrev}
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-[#a855f7] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] hover:text-white transition-all"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {nextBtnEnabled && (
        <button
          onClick={scrollNext}
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center text-[#a855f7] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] hover:text-white transition-all"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}
    </div>
  );
}
