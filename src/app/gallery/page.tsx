'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera, Users, Monitor, Sparkles, X } from 'lucide-react';

const CATEGORIES = ['All', 'PC Builds', 'Satisfied Customers', 'Events', 'Behind the Scenes'];

const GALLERY_IMAGES = [
  // PC Builds
  { 
    src: '/pc_builds/1.webp', 
    alt: 'High Performance Gaming Rig', 
    span: 'md:col-span-2 md:row-span-2',
    category: 'PC Builds',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/pc_builds/2.webp', 
    alt: 'Sleek Minimalist Setup', 
    span: 'col-span-1 row-span-1',
    category: 'PC Builds',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/pc_builds/3.webp', 
    alt: 'RGB Masterpiece', 
    span: 'col-span-1 row-span-1',
    category: 'PC Builds',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/pc_builds/4.webp', 
    alt: 'Content Creator Workstation', 
    span: 'md:col-span-2 md:row-span-1',
    category: 'PC Builds',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/pc_builds/5.webp', 
    alt: 'Compact Powerhouse', 
    span: 'col-span-1 row-span-1',
    category: 'PC Builds',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/pc_builds/6.webp', 
    alt: 'Liquid Cooled Beast', 
    span: 'col-span-1 row-span-1',
    category: 'PC Builds',
    icon: <Monitor className="h-4 w-4" />
  },

  // Satisfied Customers
  { 
    src: '/satisfied_customers/1.jpg', 
    alt: 'Happy Customer #1', 
    span: 'col-span-1 row-span-1',
    category: 'Satisfied Customers',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/satisfied_customers/2.jpg', 
    alt: 'Happy Customer #2', 
    span: 'md:col-span-2 md:row-span-2',
    category: 'Satisfied Customers',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/satisfied_customers/3.jpg', 
    alt: 'Happy Customer #3', 
    span: 'col-span-1 row-span-1',
    category: 'Satisfied Customers',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/satisfied_customers/4.jpg', 
    alt: 'Happy Customer #4', 
    span: 'col-span-1 row-span-1',
    category: 'Satisfied Customers',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/satisfied_customers/5.jpg', 
    alt: 'Happy Customer #5', 
    span: 'col-span-1 row-span-1',
    category: 'Satisfied Customers',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/satisfied_customers/6.jpg', 
    alt: 'Happy Customer #6', 
    span: 'md:col-span-2 md:row-span-1',
    category: 'Satisfied Customers',
    icon: <Users className="h-4 w-4" />
  },

  // Events & Behind the Scenes
  { 
    src: '/EFZ.webp', 
    alt: 'Grand Opening Day', 
    span: 'col-span-1 row-span-1',
    category: 'Events',
    icon: <Sparkles className="h-4 w-4" />
  },
  { 
    src: '/efz_2.webp', 
    alt: 'Tech Showroom', 
    span: 'md:col-span-2 md:row-span-1',
    category: 'Behind the Scenes',
    icon: <Camera className="h-4 w-4" />
  },
  { 
    src: '/eric_and_farah.webp', 
    alt: 'The Founders', 
    span: 'md:col-span-2 row-span-1',
    category: 'Behind the Scenes',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/eric.webp', 
    alt: 'Eric Zamora - Lead Tech', 
    span: 'col-span-1 row-span-1',
    category: 'Behind the Scenes',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/farah.webp', 
    alt: 'Farah Zamora - CEO', 
    span: 'col-span-1 row-span-1',
    category: 'Behind the Scenes',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/technical_team_1.webp', 
    alt: 'Inside the Workshop', 
    span: 'col-span-1 row-span-1',
    category: 'Behind the Scenes',
    icon: <Users className="h-4 w-4" />
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 border-b-8 border-[var(--border)] pb-8 inline-block transform -rotate-1">
          <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
            Gallery<span className="text-primary">.</span>
          </h1>
        </div>

        {/* Categories Filter */}
        <div className="mb-12 flex flex-wrap gap-4 items-center">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 font-display font-black uppercase text-sm tracking-widest transition-all brutal-border ${
                activeCategory === category 
                  ? 'bg-[var(--text)] text-[var(--bg)] brutal-shadow translate-x-[-2px] translate-y-[-2px]' 
                  : 'bg-[var(--bg)] text-[var(--text)] hover:bg-primary hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[350px] gap-8 transition-all duration-500">
          {filteredImages.length === 0 ? (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-[var(--border)]">
              <Camera className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <h3 className="font-display font-black text-2xl uppercase opacity-50">No images in this category yet.</h3>
            </div>
          ) : (
            filteredImages.map((img, i) => (
              <div 
                key={`${img.src}-${i}`} 
                onClick={() => setSelectedImage(img)}
                className={`brutal-card p-0 overflow-hidden brutal-border group relative cursor-pointer ${img.span} h-[250px] md:h-auto hover:z-20 animate-in fade-in zoom-in duration-500`}
              >
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-30 transition-all duration-300 z-10 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20 brutal-border bg-[var(--bg)] px-3 py-1 flex items-center gap-2 -translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                  {img.icon}
                  <span className="font-mono text-xs font-black uppercase tracking-tight">{img.category}</span>
                </div>

                {/* Image */}
                <Image 
                  src={img.src} 
                  alt={img.alt} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 ease-out" 
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 bg-[var(--bg)] brutal-border-t">
                  <div className="flex justify-between items-end">
                    <p className="font-display font-black uppercase tracking-tight text-xl md:text-2xl leading-none text-[var(--text)]">
                      {img.alt}
                    </p>
                    <div className="w-10 h-10 brutal-border bg-primary text-white flex items-center justify-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      <Sparkles className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
              </div>
            ))
          )}
        </div>

        {/* Footer info in gallery */}
        <div className="mt-20 p-12 brutal-border bg-[var(--text)] text-[var(--bg)] flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="text-center md:text-left">
            <h2 className="font-display font-black text-4xl uppercase tracking-tighter mb-2">Want to see more?</h2>
            <p className="font-mono text-lg opacity-80 uppercase">Follow our daily journey on social media.</p>
          </div>
          <div className="flex gap-4">
             {['Facebook', 'Instagram', 'TikTok'].map((platform) => (
               <a 
                 key={platform} 
                 href="#" 
                 className="brutal-btn bg-primary text-white px-6 py-3 font-display font-bold uppercase text-sm hover:translate-x-[-4px] hover:translate-y-[-4px] active:translate-x-0 active:translate-y-0 transition-all"
               >
                 {platform}
               </a>
             ))}
          </div>
        </div>
      </div>

      {/* Full-size Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[var(--text)]/90 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] bg-[var(--bg)] brutal-border brutal-shadow flex flex-col overflow-hidden animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 w-12 h-12 bg-primary text-white brutal-border flex items-center justify-center hover:bg-destructive transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="relative w-full h-[60vh] md:h-[75vh] bg-black/5">
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-6 md:p-8 bg-[var(--bg)] border-t-4 border-[var(--border)]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <p className="font-display font-black uppercase tracking-tight text-3xl md:text-4xl leading-none">
                    {selectedImage.alt}
                  </p>
                  <div className="flex items-center gap-2 mt-3 opacity-70">
                    {selectedImage.icon}
                    <span className="font-mono font-bold uppercase">{selectedImage.category}</span>
                  </div>
                </div>
                <div className="hidden md:flex w-12 h-12 brutal-border bg-primary text-white items-center justify-center">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
