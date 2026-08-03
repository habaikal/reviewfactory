'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Play, Zap, Radio, Cpu } from 'lucide-react';
import { heroStats } from '@/lib/mock-data';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-40 sm:px-6 sm:pt-48 lg:px-8 lg:pt-52">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="section-eyebrow">
              <Radio size={13} className="animate-pulse-glow" />
              LLM 오케스트레이션 · 딥컴포지팅 · Zero-Editing
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              브리프 한 줄이 <span className="text-gradient">완성된 영상</span>이
              <br className="hidden sm:block" />
              되는 버추얼 스튜디오
            </h1>

            <p className="mt-6 max-w-xl text-balance text-base leading-relaxed text-white/60 sm:text-lg">
              목적과 에셋만 던지면 LLM이 기획하고, 다중 비디오 AI가 촬영하며, 자체 딥컴포지팅
              엔진이 자막·BGM·후반작업까지 100% 무인화로 완성합니다. 캡컷·프리미어 내보내기,
              숏폼 자동 변환까지 하나의 파이프라인에서.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/studio/new" className="btn-primary text-sm">
                지금 바로 생성하기
                <ChevronRight size={16} />
              </Link>
              <Link href="/dashboard" className="btn-ghost text-sm">
                <Play size={15} />
                라이브 데모 보기
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-white sm:text-3xl">{s.value}</div>
                  <div className="mt-1 text-xs leading-snug text-white/45">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: floating studio mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="glass-panel relative overflow-hidden p-5 shadow-glow-violet sm:p-6">
              <div className="absolute inset-0 bg-panel-sheen" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-magenta-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </div>
                <span className="chip font-mono !text-[10px]">RENDER_ROUTER.LIVE</span>
              </div>

              <div className="relative mt-5 aspect-video overflow-hidden rounded-xl border border-white/10 bg-void-900">
                <div className="grid-bg absolute inset-0 opacity-40" />
                <div className="absolute inset-0 bg-nebula-1 opacity-70" />
                <motion.div
                  animate={{ y: ['-100%', '340%'] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent"
                />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2 backdrop-blur-md">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/80">
                    <Zap size={12} className="text-amber-300" />
                    Scene 03 · Kling
                  </span>
                  <span className="font-mono text-[10px] text-cyan-300">64%</span>
                </div>
              </div>

              <div className="relative mt-5 space-y-2.5">
                {[
                  { label: '무음 구간 제거', pct: 100, color: 'from-cyan-500 to-cyan-400' },
                  { label: '공간인식 자막 합성', pct: 82, color: 'from-violet-500 to-violet-400' },
                  { label: 'BGM 드롭 싱크', pct: 57, color: 'from-magenta-500 to-magenta-400' },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="mb-1 flex justify-between text-[11px] text-white/55">
                      <span>{row.label}</span>
                      <span className="font-mono">{row.pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.pct}%` }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel absolute -left-6 -top-6 hidden items-center gap-2 px-3.5 py-2.5 sm:flex"
            >
              <Cpu size={14} className="text-cyan-300" />
              <span className="text-[11px] font-medium text-white/80">60 Workers Active</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="glass-panel absolute -bottom-5 -right-4 hidden items-center gap-2 px-3.5 py-2.5 sm:flex"
            >
              <span className="text-[11px] font-medium text-white/80">비용 절감</span>
              <span className="font-display text-sm font-bold text-emerald-300">-80%</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
