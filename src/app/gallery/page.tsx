import Image from 'next/image';
import { Camera, Users, Monitor, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Gallery | EFZ Computers',
  description: 'A glimpse into the life and work at EFZ Computers.',
};

const GALLERY_IMAGES = [
  { 
    src: '/EFZ.webp', 
    alt: 'EFZ Main Storefront', 
    span: 'md:col-span-2 md:row-span-2',
    category: 'Store',
    icon: <Sparkles className="h-4 w-4" />
  },
  { 
    src: '/admin_team_1.webp', 
    alt: 'Our Admin Superstars', 
    span: 'col-span-1 row-span-1',
    category: 'Team',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/technical_team_2.webp', 
    alt: 'Precision PC Assembly', 
    span: 'col-span-1 row-span-1',
    category: 'Tech',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/admin_team_3.webp', 
    alt: 'Managing Orders with Care', 
    span: 'col-span-1 row-span-1',
    category: 'Team',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/efz_2.webp', 
    alt: 'Tech Showroom', 
    span: 'md:col-span-2 md:row-span-1',
    category: 'Store',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/eric_and_farah.webp', 
    alt: 'The Founders', 
    span: 'md:col-span-2 row-span-1',
    category: 'Founders',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/eric.webp', 
    alt: 'Eric Zamora - Lead Tech', 
    span: 'col-span-1 row-span-1',
    category: 'Team',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/farah.webp', 
    alt: 'Farah Zamora - CEO', 
    span: 'col-span-1 row-span-1',
    category: 'Team',
    icon: <Users className="h-4 w-4" />
  },
  { 
    src: '/technical_team_1.webp', 
    alt: 'Inside the Workshop', 
    span: 'md:col-span-2 md:row-span-2',
    category: 'Tech',
    icon: <Monitor className="h-4 w-4" />
  },
  { 
    src: '/admin_team_2.webp', 
    alt: 'Customer Support Hub', 
    span: 'md:col-span-1 row-span-1',
    category: 'Team',
    icon: <Users className="h-4 w-4" />
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] pt-24 pb-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-16 border-b-8 border-[var(--border)] pb-8 inline-block transform -rotate-1">
          {/* <div className="flex items-center gap-4 mb-2">
            <Camera className="h-10 w-10 text-primary" />
            <span className="font-mono text-xl font-bold uppercase tracking-widest opacity-60">Visual Archive</span>
          </div> */}
          <h1 className="font-display font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none">
            Gallery<span className="text-primary">.</span>
          </h1>
          {/* <div className="mt-6">
             <p className="text-xl md:text-2xl font-bold opacity-100 max-w-2xl bg-primary text-white p-4 inline-block brutal-border brutal-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all">
              BEHIND THE BUILD AT EFZ COMPUTERS
            </p>
          </div> */}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[350px] gap-8">
          {GALLERY_IMAGES.map((img, i) => (
            <div 
              key={i} 
              className={`brutal-card p-0 overflow-hidden brutal-border group relative ${img.span} h-[250px] md:h-auto hover:z-20`}
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
          ))}
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
    </div>
  );
}
