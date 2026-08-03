'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Clock, ImageOff, Sparkles, AlertTriangle, RotateCcw } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { GeneratedStoryboard } from '@/lib/types';

interface StoryboardStepProps {
  loading: boolean;
  data: GeneratedStoryboard | null;
  error: string | null;
  onRetry: () => void;
  onNext: () => void;
  onBack: () => void;
}

export function StoryboardStep({ loading, data, error, onRetry, onNext, onBack }: StoryboardStepProps) {
  const totalDuration = data ? data.scenes.reduce((sum, s) => sum + s.durationSec, 0) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            exit={{ opacity: 0 }}
            className="glass-panel flex flex-col items-center justify-center gap-5 px-6 py-24 text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center">
              <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-cyan-400 border-r-violet-400" />
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-white">Llama 3.3 70B가 스토리보드를 설계하고 있어요</p>
              <p className="mt-1.5 text-xs text-white/45">대본 생성 → 씬 분할 → Pexels 실사 소스 매칭 중...</p>
            </div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                />
              ))}
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            key="error"
            exit={{ opacity: 0 }}
            className="glass-panel flex flex-col items-center justify-center gap-4 border-magenta-400/25 bg-magenta-400/[0.04] px-6 py-20 text-center"
          >
            <AlertTriangle size={28} className="text-magenta-300" />
            <div>
              <p className="font-display text-base font-semibold text-white">스토리보드 생성에 실패했습니다</p>
              <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/50">{error}</p>
            </div>
            <div className="flex gap-2.5">
              <button onClick={onBack} className="btn-ghost text-sm">
                <ChevronLeft size={16} />
                브리프 수정
              </button>
              <button onClick={onRetry} className="btn-primary text-sm">
                <RotateCcw size={14} />
                다시 시도
              </button>
            </div>
          </motion.div>
        ) : data ? (
          <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-white">AI 생성 스토리보드</h3>
                <p className="mt-1 text-sm text-white/45">
                  {data.scenes.length}개 씬 · 예상 {totalDuration.toFixed(1)}초 · 무제한 무료 수정 가능
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.hashtags.slice(0, 4).map((tag) => (
                  <Badge key={tag} color="cyan" className="!text-[10px]">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {data.scenes.map((scene, i) => (
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <GlassPanel className="group flex h-full flex-col p-5 transition-colors hover:border-white/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-[10px] font-semibold text-white/40">Scene {String(i + 1).padStart(2, '0')}</span>
                        <h4 className="mt-1 font-display text-sm font-bold text-white">{scene.sceneTitle}</h4>
                      </div>
                    </div>

                    <div className="mt-3 aspect-video overflow-hidden rounded-lg border border-white/8 bg-void-900">
                      {scene.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={scene.image.url} alt={scene.sceneTitle} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center gap-1.5 text-white/25">
                          <ImageOff size={14} />
                          <span className="text-[10px]">이미지 없음</span>
                        </div>
                      )}
                    </div>

                    {scene.image && (
                      <p className="mt-1.5 text-[9px] text-white/30">
                        Photo by {scene.image.photographer} on Pexels
                      </p>
                    )}

                    <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-white/50">{scene.narration}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <Badge color="neutral" className="!text-[10px]">
                        {scene.shotType}
                      </Badge>
                      <Badge color="neutral" className="!text-[10px]">
                        <Clock size={9} />
                        {scene.durationSec.toFixed(1)}s
                      </Badge>
                      <Badge color="violet" className="!text-[10px]">
                        &quot;{scene.caption}&quot;
                      </Badge>
                    </div>
                  </GlassPanel>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button onClick={onBack} className="btn-ghost text-sm">
                <ChevronLeft size={16} />
                브리프 수정
              </button>
              <button onClick={onNext} className="btn-primary text-sm">
                하이브리드 렌더링 시작
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
