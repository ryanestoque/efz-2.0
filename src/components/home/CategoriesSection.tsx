import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/lib/data';

const BRAND_LOGOS = [
  { name: 'AMD', url: '/brand_logos/amd-white.png' },
  { name: 'Intel', url: '/brand_logos/intel-white.png' },
  { name: 'Nvidia', url: '/brand_logos/nvidia-white.png' },
  { name: 'ASUS', url: '/brand_logos/asus-white.png' },
  { name: 'Corsair', url: '/brand_logos/corsair-white.png' },
  { name: 'Razer', url: '/brand_logos/razer-white.png' },
  { name: 'Logitech', url: '/brand_logos/logitech-white.png' },
  { name: 'Gigabyte', url: '/brand_logos/gigabyte-white-1.png' },
  { name: 'MSI', url: '/brand_logos/msi-white.png' },
];

export function CategoriesSection() {
  return (
    <>
      {/* BRANDS MARQUEE */}
      <section className="border-y-3 border-[var(--border)] overflow-hidden bg-[#0A0A0A] py-6 flex items-center">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, i) => (
            <div key={i} className="flex items-center justify-center mx-12 w-[60px] md:w-[80px] transition-opacity">
              <Image
                src={brand.url}
                alt={brand.name}
                width={240}
                height={60}
                style={{width: 'auto', height: 'auto'}}
                className="h-10 w-full object-contain" 
              />
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>

      {/* CATEGORIES CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display font-black text-4xl uppercase tracking-tighter">Shop by Category</h2>
          <Link href="/shop" className="font-bold flex items-center hover:text-primary transition-colors uppercase text-sm tracking-wide">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link key={i} href={`/shop?category=${encodeURIComponent(cat.name.toUpperCase().replace('MEMORY (RAM)', 'MEMORY MODULES'))}`} className="group block h-full">
              <div className="brutal-card h-48 sm:h-56 relative overflow-hidden flex flex-col justify-end p-4">
                <div className={`absolute inset-0 ${cat.color} opacity-20 group-hover:opacity-100 mix-blend-multiply transition-opacity duration-300 z-10 dark:mix-blend-screen`} />
                <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 scale-105 group-hover:scale-110 object-center" />
                <div className="relative z-20 brutal-border bg-[var(--bg)] p-2 flex items-center justify-between group-hover:-translate-y-2 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="font-display font-bold tracking-tight uppercase">{cat.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
