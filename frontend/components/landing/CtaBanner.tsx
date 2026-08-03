import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="relative px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel relative overflow-hidden px-6 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-nebula-1 opacity-80" />
          <div className="grid-bg absolute inset-0 opacity-30" />
          <div className="relative">
            <span className="section-eyebrow">
              <Sparkles size={13} />
              지금 바로 콘텐츠 팩토리를 가동하세요
            </span>
            <h2 className="mx-auto mt-6 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              뇌(기획)만 남기고, 나머지 모든 수족은 <span className="text-gradient">OMNICAST AI</span>에게
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/55">
              신용카드 없이 무료로 시작하고, 완성된 결과물만 다운로드할 때 결제하세요.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/studio/new" className="btn-primary text-sm">
                무료로 시작하기
                <ChevronRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-ghost text-sm">
                요금제 살펴보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
