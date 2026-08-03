'use client';

import {
  Play,
  Pause,
  Volume2,
  Maximize2,
  RectangleHorizontal,
  RectangleVertical,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  playing: boolean;
  setPlaying: (p: boolean) => void;
  ratio: '16:9' | '9:16';
  setRatio: (r: '16:9' | '9:16') => void;
  currentTime: number;
  duration: number;
  showCaption: boolean;
}

export function PreviewPanel({
  playing,
  setPlaying,
  ratio,
  setRatio,
  currentTime,
  duration,
  showCaption,
}: PreviewPanelProps) {
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  // 재생 구간에 따라 동적으로 자막 스크립트 출력
  let activeCaption = '';
  if (progressPct < 25) {
    activeCaption = '🎬 OMNICAST AI 자동 편집 시작';
  } else if (progressPct < 55) {
    activeCaption = '⚡ 인공지능 모델 라우팅 실시간 최적화';
  } else if (progressPct < 85) {
    activeCaption = '✨ 공간인식 자막 딥컴포지팅 기법 적용';
  } else {
    activeCaption = '🔥 내보내기 및 렌더링 완성!';
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <GlassPanel className="flex flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/8 p-3">
        <span className="chip !text-[10px]">PREVIEW</span>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
          <button
            onClick={() => setRatio('16:9')}
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors',
              ratio === '16:9' ? 'bg-white/10 text-white' : 'text-white/40'
            )}
          >
            <RectangleHorizontal size={11} />
            16:9
          </button>
          <button
            onClick={() => setRatio('9:16')}
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors',
              ratio === '9:16' ? 'bg-white/10 text-white' : 'text-white/40'
            )}
          >
            <RectangleVertical size={11} />
            9:16
          </button>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-void-950 p-6">
        <div
          className={cn(
            'relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-cyan-500/10 to-magenta-500/15 transition-all duration-300',
            ratio === '16:9' ? 'aspect-video w-full max-w-2xl' : 'aspect-[9/16] h-[420px]'
          )}
        >
          <div className="grid-bg absolute inset-0 opacity-30" />

          {/* 공간인식 자막 렌더링 연동 */}
          {showCaption && activeCaption && (
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 rounded-md bg-black/40 px-3 py-1.5 text-center backdrop-blur-sm transition-opacity duration-200">
              <span className="font-display text-xs font-bold text-white sm:text-sm">{activeCaption}</span>
            </div>
          )}

          <button
            onClick={() => setPlaying(!playing)}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md transition-transform hover:scale-105">
              {playing ? (
                <Pause size={20} className="text-white" fill="white" />
              ) : (
                <Play size={20} className="ml-1 text-white" fill="white" />
              )}
            </span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-white/8 p-3">
        <button onClick={() => setPlaying(false)} className="text-white/50 hover:text-white">
          <SkipBack size={15} />
        </button>
        <button onClick={() => setPlaying(!playing)} className="text-white hover:text-cyan-300">
          {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        </button>
        <button onClick={() => setPlaying(false)} className="text-white/50 hover:text-white">
          <SkipForward size={15} />
        </button>
        <span className="font-mono text-[11px] text-white/50">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <div className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-100 ease-linear"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <Volume2 size={15} className="text-white/50" />
        <Maximize2 size={14} className="text-white/50" />
      </div>
    </GlassPanel>
  );
}

