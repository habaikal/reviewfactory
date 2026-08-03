import { pipelineStages } from '@/lib/mock-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const colorText: Record<string, string> = {
  cyan: 'text-cyan-300',
  violet: 'text-violet-300',
  magenta: 'text-magenta-300',
  amber: 'text-amber-300',
};
const colorBorder: Record<string, string> = {
  cyan: 'group-hover:border-cyan-400/40',
  violet: 'group-hover:border-violet-400/40',
  magenta: 'group-hover:border-magenta-400/40',
  amber: 'group-hover:border-amber-400/40',
};
const colorGlow: Record<string, string> = {
  cyan: 'group-hover:shadow-glow-cyan',
  violet: 'group-hover:shadow-glow-violet',
  magenta: 'group-hover:shadow-glow-magenta',
  amber: 'group-hover:shadow-[0_0_20px_rgba(255,171,31,0.35)]',
};

export function Pipeline() {
  return (
    <section id="pipeline" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="ONE UNIFIED PIPELINE"
          title={
            <>
              생성부터 배포까지, <span className="text-gradient">끊김 없는 4단계</span> 파이프라인
            </>
          }
          desc="ReviewFactory의 기획·생성 엔진과 FlowCut의 후반작업 엔진을 하나의 워크플로우로 통합했습니다. 처음부터 만들거나, 이미 촬영한 원본을 업로드하거나 — 결과는 동일하게 완성됩니다."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
          {pipelineStages.map((stage, i) => (
            <Reveal key={stage.id} delay={i * 0.1}>
              <div className="group relative flex h-full flex-col">
                <div
                  className={cn(
                    'glass-panel flex h-full flex-col p-6 transition-all duration-300',
                    colorBorder[stage.color],
                    colorGlow[stage.color]
                  )}
                >
                  <span className={cn('font-mono text-[11px] font-semibold tracking-wider', colorText[stage.color])}>
                    {stage.tag}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">{stage.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55">{stage.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {stage.stack.map((s) => (
                      <span key={s} className="chip !text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {i < pipelineStages.length - 1 && (
                  <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-void-900">
                      <ArrowRight size={13} className="text-white/40" />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
