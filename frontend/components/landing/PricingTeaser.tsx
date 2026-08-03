import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';
import { pricingPlans } from '@/lib/mock-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

export function PricingTeaser() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="PAY-PER-SUCCESS"
          title={
            <>
              실패에 과금하지 않습니다, <span className="text-gradient">완성에만 과금</span>합니다
            </>
          }
          desc="스토리보드 단계는 무제한 무료 수정. 워터마크 없는 최종본을 다운로드할 때만 크레딧이 차감됩니다."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div
                className={cn(
                  'glass-panel relative flex h-full flex-col p-7',
                  plan.highlight && 'border-violet-400/40 shadow-glow-violet'
                )}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-magenta-500 px-3 py-1 text-[10px] font-bold text-white">
                    가장 인기
                  </span>
                )}
                <h3 className="font-display text-lg font-bold text-white">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-white/50">{plan.desc}</p>
                <div className="mt-5 flex items-end gap-1">
                  <span className="font-display text-3xl font-bold text-white">
                    {plan.price !== 'Custom' && '₩'}
                    {plan.price}
                  </span>
                  <span className="pb-1 text-sm text-white/40">{plan.unit}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                      <Check size={15} className="mt-0.5 shrink-0 text-cyan-300" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className={cn('mt-7 w-full text-center text-sm', plan.highlight ? 'btn-primary' : 'btn-ghost')}
                >
                  {plan.cta}
                  <ChevronRight size={14} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
