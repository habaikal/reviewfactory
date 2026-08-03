import { killerFeatures } from '@/lib/mock-data';
import { iconMap } from '@/components/ui/icon-map';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';

export function Features() {
  return (
    <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="KILLER FEATURES v2.0"
          title={
            <>
              시장을 압살하는 <span className="text-gradient">9가지 초격차</span> 무기
            </>
          }
          desc="단순 생성 툴을 넘어, 마케팅 기획팀부터 후반 편집팀까지 대체하는 콘텐츠 팩토리의 표준 OS."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {killerFeatures.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <div className="group glass-panel relative flex h-full flex-col gap-4 overflow-hidden p-6 transition-all duration-300 hover:border-white/20">
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500/0 via-violet-500/10 to-magenta-500/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300">
                      {Icon && <Icon size={20} />}
                    </div>
                    <Badge color="neutral" className="!text-[10px]">
                      {f.tag}
                    </Badge>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-white/55">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
