'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const BACKGROUND_IMAGES = [
  '/EFZ.webp',
  '/efz_2.webp',
  '/admin_team_3.webp',
];

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[var(--bg)]">
        {BACKGROUND_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt="EFZ Background"
            fill
            className={`object-cover grayscale transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-15 dark:opacity-10' : 'opacity-0'
              }`}
            priority={index === 0}
          />
        ))}
        {/* Subtle overlay to ensure text priority */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-transparent opacity-80 sm:opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-start space-y-8 z-10">
            <h1 className="font-display font-black text-7xl sm:text-8xl lg:text-8xl leading-[0.9] tracking-tight uppercase">
              SHOPPING<br />
              <span className="text-transparent bg-clip-text relative z-10" style={{ WebkitTextStroke: '2px var(--border)' }}>IS EASY</span><br />
              AT EFZ
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl font-medium opacity-80 max-w-md justify-self-center lg:justify-self-start">
              The home of quality and affordable tech store raised in Davao City, now on every Dabawenyo&apos;s fingertips!
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <Button asChild className="brutal-btn px-8 py-6 text-lg rounded-none">
                <Link href="/shop">Shop Now</Link>
              </Button>
              <Button variant="outline" className="brutal-btn-ghost px-8 py-6 text-lg rounded-none border-3">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-primary brutal-border translate-x-4 translate-y-4 -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--text)] opacity-[0.03] pattern-polka -z-0"></div>

            <div className="brutal-border bg-[var(--bg)] overflow-hidden relative z-10 aspect-square sm:aspect-video lg:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=1200"
                alt="High-end PC Build"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-90 scale-105 hover:scale-100"
              />
              <div className="absolute bottom-6 right-6 brutal-border bg-[var(--bg)] px-4 py-2 font-display font-bold uppercase text-sm brutal-shadow">
                RTX 4090 Build // ₱225,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
