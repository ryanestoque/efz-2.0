import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedDeals } from '@/components/home/FeaturedDeals';
import { AboutSection } from '@/components/home/AboutSection';
import { Reviews } from '@/components/home/Reviews';
import { Newsletter } from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedDeals />
      <AboutSection />
      <Reviews />
      <Newsletter />
    </>
  );
}
