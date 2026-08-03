import { architectureStack } from '@/lib/mock-data';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Database, Network, BrainCircuit } from 'lucide-react';

const groups = [
  { key: 'data', title: 'Polyglot Data Layer', desc: '데이터 성격별로 완전히 분리된 저장소', icon: Database, color: 'cyan' },
  { key: 'infra', title: 'Distributed Infra', desc: '마이크로 청킹 병렬 처리 인프라', icon: Network, color: 'violet' },
  { key: 'ai', title: 'Hybrid AI Layer', desc: '난이도 기반 동적 모델 라우팅', icon: BrainCircuit, color: 'magenta' },
] as const;

const ring: Record<string, string> = {
  cyan: 'border-cyan-400/30 text-cyan-300',
  violet: 'border-violet-400/30 text-violet-300',
  magenta: 'border-magenta-400/30 text-magenta-300',
};

export function Architecture() {
  return (
    <section id="architecture" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="ENTERPRISE-GRADE ARCHITECTURE"
          title={
            <>
              흔들리지 않는 <span className="text-gradient">폴리글랏 아키텍처</span>
            </>
          }
          desc="OTIO 범용 브릿지와 분리된 폴리글랏 DB로, 수백만 유저 트래픽과 NLE의 잦은 업데이트에도 견고한 성을 구축합니다."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {groups.map((group, gi) => (
            <Reveal key={group.key} delay={gi * 0.1}>
              <div className="glass-panel h-full p-6">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-white/[0.03] ${ring[group.color]}`}>
                  <group.icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{group.title}</h3>
                <p className="mt-1.5 text-sm text-white/50">{group.desc}</p>

                <div className="mt-5 space-y-3">
                  {architectureStack
                    .filter((s) => s.group === group.key)
                    .map((s) => (
                      <div
                        key={s.name}
                        className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
                      >
                        <span className="font-mono text-xs font-semibold text-white/85">{s.name}</span>
                        <span className="text-right text-[11px] leading-tight text-white/40">{s.role}</span>
                      </div>
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="glass-panel mt-6 flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h4 className="font-display text-base font-bold text-white">마이크로 청킹 처리 성능</h4>
              <p className="mt-1 text-sm text-white/50">1시간 영상 → 1분 단위 60개 청크 → 스팟 인스턴스 병렬 처리</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-cyan-300">90초</div>
                <div className="text-[11px] text-white/40">평균 처리 완료</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-violet-300">70%</div>
                <div className="text-[11px] text-white/40">서버 비용 절감</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-magenta-300">60x</div>
                <div className="text-[11px] text-white/40">동시 워커</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
