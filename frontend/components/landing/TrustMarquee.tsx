import { trustLogos } from '@/lib/mock-data';

export function TrustMarquee() {
  const list = [...trustLogos, ...trustLogos];
  return (
    <section className="relative border-y border-white/5 bg-white/[0.015] py-8">
      <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/35">
        1,200개 이상의 브랜드가 ReviewFactory OS로 콘텐츠를 제작합니다
      </p>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void-950 to-transparent" />
        <div className="flex w-max animate-marquee gap-16">
          {list.map((name, i) => (
            <span
              key={i}
              className="font-display text-lg font-bold tracking-wide text-white/25 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
