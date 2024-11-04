import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "./button";

interface CarouselSlide {
  src: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  buttonVariant: 'light' | 'dark' | 'disable';
}

const Carousel: React.FC<{ slides: CarouselSlide[] }> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[900px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`transition-opacity duration-700 ease-in-out absolute inset-0 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image src={slide.src} alt={slide.alt} layout="fill" objectFit="cover" />

          {/* Overlay Text and Button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg mb-4">{slide.description}</p>
            <Button
              onClick={() => window.location.href = slide.buttonLink}
              variant={slide.buttonVariant}
              className="text-lg font-semibold"
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Previous Slide"
      >
        &#9664;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Next Slide"
      >
        &#9654;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
