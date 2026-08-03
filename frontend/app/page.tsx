import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BackgroundFX } from '@/components/ui/BackgroundFX';
import { Hero } from '@/components/landing/Hero';
import { TrustMarquee } from '@/components/landing/TrustMarquee';
import { Pipeline } from '@/components/landing/Pipeline';
import { Features } from '@/components/landing/Features';
import { Architecture } from '@/components/landing/Architecture';
import { PricingTeaser } from '@/components/landing/PricingTeaser';
import { CtaBanner } from '@/components/landing/CtaBanner';

export default function HomePage() {
  return (
    <div className="relative">
      <BackgroundFX />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <Pipeline />
        <Features />
        <Architecture />
        <PricingTeaser />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
