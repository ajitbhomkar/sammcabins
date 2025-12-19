'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  order: number;
}

interface HeroSliderProps {
  slides: Slide[];
  autoPlayInterval?: number;
}

export default function HeroSlider({ slides, autoPlayInterval = 5000 }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sort slides by order
  const sortedSlides = [...slides].sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!isAutoPlaying || sortedSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sortedSlides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sortedSlides.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sortedSlides.length) % sortedSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sortedSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!sortedSlides || sortedSlides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900">
      {/* Slides */}
      {sortedSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              quality={90}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div
                className={`transition-all duration-700 delay-300 ${
                  index === currentSlide
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
              >
                {/* Subtitle */}
                {slide.subtitle && (
                  <p className="text-amber-400 text-lg md:text-xl font-semibold mb-4 tracking-wide uppercase">
                    {slide.subtitle}
                  </p>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>

                {/* Button */}
                {slide.buttonText && slide.buttonLink && (
                  <a
                    href={slide.buttonLink}
                    className="inline-block px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                  >
                    {slide.buttonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {sortedSlides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {sortedSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
          {sortedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-amber-500'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {sortedSlides.length > 1 && (
        <div className="absolute top-8 right-8 z-30 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white font-semibold">
            {currentSlide + 1} / {sortedSlides.length}
          </span>
        </div>
      )}
    </div>
  );
}
