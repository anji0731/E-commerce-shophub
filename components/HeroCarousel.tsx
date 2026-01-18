'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const heroImages = [
  { src: '/hero-product-1.jpg', alt: 'Premium products showcase' },
  { src: '/hero-product-2.jpg', alt: 'Fashion items collection' },
  { src: '/hero-product-3.jpg', alt: 'Luxury smartwatch and fitness tracker' },
  { src: '/hero-product-4.jpg', alt: 'Home decor and furniture' },
  { src: '/hero-product-5.jpg', alt: 'Sports equipment and athletic wear' },
  { src: '/hero-product-6.jpg', alt: 'Premium cosmetics and beauty' },
  { src: '/hero-product-7.jpg', alt: 'Books and stationery' },
  { src: '/hero-product-8.jpg', alt: 'Kitchen appliances' },
  { src: '/hero-product-9.jpg', alt: 'Gaming accessories' },
  { src: '/hero-product-10.jpg', alt: 'Luxury handbags and accessories' },
];

const secondaryImages = [
  { src: '/hero-product-11.jpg', alt: 'Jewelry and timepieces' },
  { src: '/hero-product-12.jpg', alt: 'Travel and outdoor gear' },
  { src: '/hero-product-1.jpg', alt: 'Premium products showcase' },
  { src: '/hero-product-2.jpg', alt: 'Fashion items collection' },
  { src: '/hero-product-3.jpg', alt: 'Luxury smartwatch' },
  { src: '/hero-product-4.jpg', alt: 'Home decor' },
  { src: '/hero-product-5.jpg', alt: 'Sports equipment' },
  { src: '/hero-product-6.jpg', alt: 'Beauty products' },
  { src: '/hero-product-7.jpg', alt: 'Books collection' },
  { src: '/hero-product-8.jpg', alt: 'Kitchen appliances' },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 relative h-64 md:h-80 w-full">
      {/* Main Hero Image */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={heroImages[currentIndex].src || "/placeholder.svg"}
          alt={heroImages[currentIndex].alt}
          fill
          className="object-cover transition-opacity duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
      </div>

      {/* Secondary Image Carousel */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-lg border-4 border-primary-foreground">
        <Image
          src={secondaryImages[currentIndex].src || "/placeholder.svg"}
          alt={secondaryImages[currentIndex].alt}
          fill
          className="object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-4 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-primary-foreground w-8'
                : 'bg-primary-foreground/50 hover:bg-primary-foreground/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
