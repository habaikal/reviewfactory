'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cpu, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { GeneratedScene } from '@/lib/types';
import { cn } from '@/lib/utils';

const WORKER_COUNT = 60;

const fallbackScenes: Pick<GeneratedScene, 'id' | 'sceneTitle' | 'shotType' | 'durationSec'>[] = [
  { id: 'f1', sceneTitle: '오프닝 훅', shotType: 'Hook', durationSec: 3 },
  { id: 'f2', sceneTitle: '핵심 장면', shotType: 'Main', durationSec: 5 },
  { id: 'f3', sceneTitle: '클로징', shotType: 'Outro', durationSec: 3 },
];

export function RenderStep({
  scenes,
  onNext,
}: {
  scenes?: GeneratedScene[];
  onNext: () => void;
}) {
  const activeScenes = scenes && scenes.length > 0 ? scenes : fallbackScenes;
  const [overall, setOverall] = useState(0);
  const offsets = useMemo(() => activeScenes.map((_, i) => i * (90 / activeScenes.length)), [activeScenes]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOverall((v) => (v >= 100 ? 100 : v + 1.6));
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const done = overall >= 100;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <GlassPanel className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-bold text-white">씬별 합성 · 자막/BGM 매칭</h3>
                <p className="mt-1 text-xs text-white/45">실사 소스와 대본을 타임라인에 순차 배치 중</p>
              </div>
              <Badge color={done ? 'cyan' : 'violet'}>
                {done ? <CheckCircle2 size={11} /> : <Loader2 size={11} className="animate-spin" />}
                {done ? '완료' : '처리 중'}
              </Badge>
            </div>

            <div className="mt-5 space-y-3">
              {activeScenes.map((scene, i) => {
                const pct = Math.max(0, Math.min(100, overall * 1.35 - offsets[i]));
                const sceneDone = pct >= 100;
                return (
                  <div key={scene.id} className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 font-medium text-white/75">
                        {sceneDone ? (
                          <CheckCircle2 size={13} className="text-emerald-300" />
                        ) : pct > 0 ? (
                          <Loader2 size={13} className="animate-spin text-cyan-300" />
                        ) : (
                          <span className="h-3 w-3 rounded-full border border-white/20" />
                        )}
                        Scene {String(i + 1).padStart(2, '0')} · {scene.sceneTitle}
                      </span>
                      <Badge color="cyan" className="!text-[10px]">
                        {scene.shotType}
                      </Badge>
                    </div>
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-200 ease-linear"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-cyan-300" />
              <h3 className="font-display text-sm font-bold text-white">마이크로 청킹 워커 그리드</h3>
              <span className="ml-auto font-mono text-[11px] text-white/40">{WORKER_COUNT} Spot Instances</span>
            </div>
            <div className="mt-4 grid grid-cols-10 gap-1.5 sm:grid-cols-[repeat(15,minmax(0,1fr))] md:grid-cols-[repeat(20,minmax(0,1fr))]">
              {Array.from({ length: WORKER_COUNT }).map((_, i) => {
                const activeThreshold = (i / WORKER_COUNT) * 100;
                const active = overall > activeThreshold && overall < 100;
                const finished = overall >= 100;
                return (
                  <motion.span
                    key={i}
                    className={cn(
                      'aspect-square rounded-[3px]',
                      finished ? 'bg-emerald-400/70' : active ? 'bg-cyan-400' : 'bg-white/8'
                    )}
                    animate={active ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
                    transition={{ duration: 0.8, repeat: active ? Infinity : 0 }}
                  />
                );
              })}
            </div>
          </GlassPanel>
        </div>

        <div className="flex flex-col gap-6">
          <GlassPanel className="p-5">
            <h3 className="font-display text-sm font-bold text-white">전체 진행률</h3>
            <div className="relative mt-5 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#grad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - overall / 100)}
                  className="transition-all duration-200 ease-linear"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#12d6e8" />
                    <stop offset="50%" stopColor="#8b4fff" />
                    <stop offset="100%" stopColor="#f430c0" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute font-display text-2xl font-bold text-white">{Math.min(100, Math.round(overall))}%</span>
            </div>

            <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-xs">
              <div className="flex justify-between text-white/50">
                <span>예상 완료</span>
                <span className="font-mono text-white/80">{done ? '완료됨' : `${Math.max(1, Math.round((100 - overall) / 20))}초`}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>씬 개수</span>
                <span className="font-mono text-white/80">{activeScenes.length}개</span>
              </div>
            </div>
          </GlassPanel>

          <GlassPanel className="flex items-start gap-2.5 border-violet-400/20 bg-violet-400/[0.04] p-4">
            <Zap size={15} className="mt-0.5 shrink-0 text-violet-300" />
            <p className="text-[11px] leading-relaxed text-white/55">
              실제 생성된 대본과 실사 소스를 타임라인에 합성하는 단계입니다. 화면 전환/합성 애니메이션은 시연용으로
              가속되었습니다.
            </p>
          </GlassPanel>

          <button
            onClick={onNext}
            disabled={!done}
            className={cn('w-full text-sm transition-opacity', done ? 'btn-primary' : 'btn-ghost opacity-50')}
          >
            {done ? '결과 확인하기' : '렌더링 진행 중...'}
            {done && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
