'use client';

import { useRef } from 'react';
import { Scissors, ZoomIn, ZoomOut, Volume2, Type, Film } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

const trackIcon: Record<string, React.ElementType> = {
  video: Film,
  caption: Type,
  audio: Volume2,
};

interface TimelineProps {
  currentTime: number;
  setCurrentTime: (t: number) => void;
  duration: number;
  tracks: {
    id: string;
    label: string;
    type: string;
    clips: {
      id: string;
      start: number;
      width: number;
      label: string;
      color: string;
    }[];
  }[];
  playing: boolean;
}

export function Timeline({
  currentTime,
  setCurrentTime,
  duration,
  tracks,
  playing,
}: TimelineProps) {
  const trackAreaRef = useRef<HTMLDivElement>(null);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackAreaRef.current) return;
    const rect = trackAreaRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(pct * duration);
  };

  const formatRulerTime = (secs: number) => {
    if (secs >= 60) {
      const m = Math.floor(secs / 60);
      const s = Math.round(secs % 60);
      return `${m}m${s > 0 ? ` ${s}s` : ''}`;
    }
    return `${secs.toFixed(secs % 1 === 0 ? 0 : 1)}s`;
  };

  return (
    <GlassPanel className="p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-white">타임라인</h3>
        <div className="flex items-center gap-2">
          <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50">
            <Scissors size={12} />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50">
            <ZoomOut size={12} />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50">
            <ZoomIn size={12} />
          </button>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <div className="min-w-[640px]">
          {/* ruler */}
          <div className="relative mb-2 flex h-5 border-b border-white/10 pl-24">
            {/* 클릭 가능한 보이지 않는 타임라인 클릭 영역 */}
            <div
              ref={trackAreaRef}
              onClick={handleTimelineClick}
              className="absolute inset-0 left-24 z-10 cursor-pointer"
            />
            {Array.from({ length: 11 }).map((_, i) => (
              <span
                key={i}
                className="flex-1 border-l border-white/8 pl-1 font-mono text-[9px] text-white/30 pointer-events-none"
              >
                {formatRulerTime(i * (duration / 10))}
              </span>
            ))}
          </div>

          {/* 플레이헤드 */}
          <div
            className="absolute top-0 z-20 flex h-full w-px flex-col items-center pointer-events-none transition-all duration-100 ease-linear"
            style={{
              left: `calc(96px + (100% - 96px) * ${duration > 0 ? currentTime / duration : 0})`,
              height: tracks.length * 56 + 20,
            }}
          >
            <span className="h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-400 shadow-glow-cyan" />
            <span className="w-px flex-1 bg-cyan-400/70" />
          </div>

          <div className="space-y-2">
            {tracks.map((track) => {
              const Icon = trackIcon[track.type] || Film;
              return (
                <div key={track.id} className="flex items-center gap-2">
                  <div className="flex w-24 shrink-0 items-center gap-1.5 text-[11px] font-medium text-white/50">
                    <Icon size={12} />
                    {track.label}
                  </div>
                  <div
                    onClick={handleTimelineClick}
                    className="relative h-11 flex-1 rounded-lg border border-white/8 bg-white/[0.015] cursor-pointer"
                  >
                    {track.clips.map((clip) => (
                      <div
                        key={clip.id}
                        className={cn(
                          'group absolute top-1 flex h-9 items-center overflow-hidden rounded-md border border-white/15 bg-gradient-to-r px-2 transition-all hover:border-white/40 pointer-events-none',
                          clip.color
                        )}
                        style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
                      >
                        <span className="truncate text-[10px] font-medium text-white/90">{clip.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
