import Link from 'next/link';
import { Check, ChevronRight, Building2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Faq } from '@/components/pricing/Faq';
import { pricingPlans } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="PAY-PER-SUCCESS"
          align="center"
          title={
            <>
              결과가 없으면, <span className="text-gradient">비용도 없습니다</span>
            </>
          }
          desc="스토리보드 단계는 무제한 무료 수정. 워터마크 없는 최종본을 다운로드할 때만 크레딧이 차감되는 결과 기반 과금 모델입니다."
          className="mx-auto"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <GlassPanel
              key={plan.name}
              className={cn(
                'relative flex flex-col p-7',
                plan.highlight && 'border-violet-400/40 shadow-glow-violet lg:-translate-y-3'
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
                href="/studio/new"
                className={cn('mt-7 w-full text-center text-sm', plan.highlight ? 'btn-primary' : 'btn-ghost')}
              >
                {plan.cta}
                <ChevronRight size={14} />
              </Link>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel className="relative overflow-hidden p-8 sm:p-10">
          <div className="absolute inset-0 bg-nebula-1 opacity-60" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-violet-300">
                <Building2 size={22} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">엔터프라이즈 화이트라벨</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/55">
                  대형 광고 대행사나 쇼핑몰 플랫폼이 OMNICAST의 엔진을 자사 솔루션처럼 사용할 수 있도록 API/SDK와
                  커스텀 대시보드를 제공합니다. 전용 GPU 렌더 파티션과 99.9% SLA를 보장합니다.
                </p>
              </div>
            </div>
            <Link href="#" className="btn-primary shrink-0 text-sm">
              영업팀 문의하기
              <ChevronRight size={15} />
            </Link>
          </div>
        </GlassPanel>

        <div>
          <SectionHeading eyebrow="FAQ" align="center" title="자주 묻는 질문" className="mx-auto mb-10" />
          <Faq />
        </div>
      </div>
    </AppShell>
  );
}
