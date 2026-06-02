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
    <div className="relative px-1">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4 md:-ml-6">
          {children.map((child, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4 md:pl-6">
              {child}
            </div>
          ))}
        </div>
      </div>

      {prevBtnEnabled && (
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#a855f7] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] hover:text-white transition-all z-10"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}

      {nextBtnEnabled && (
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-[#a855f7] hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#a855f7] hover:text-white transition-all z-10"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      )}
    </div>
  );
}
