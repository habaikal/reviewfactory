import Link from 'next/link';
import { Play, Loader2, CheckCircle2, Clock, FileEdit } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/lib/mock-data';

const statusConfig: Record<ProjectStatus, { label: string; color: string; icon: React.ElementType }> = {
  rendering: { label: '렌더링 중', color: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/25', icon: Loader2 },
  ready: { label: '완료', color: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25', icon: CheckCircle2 },
  draft: { label: '초안', color: 'text-white/60 bg-white/5 border-white/15', icon: FileEdit },
  queued: { label: '대기 중', color: 'text-amber-300 bg-amber-400/10 border-amber-400/25', icon: Clock },
};

export function ProjectCard({
  id,
  title,
  status,
  progress,
  platform,
  updated,
  duration,
  gradient,
}: {
  id: string;
  title: string;
  status: ProjectStatus;
  progress: number;
  platform: string;
  updated: string;
  duration: string;
  gradient: string;
}) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Link
      href={`/studio/${id}/edit`}
      className="group glass-panel flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
    >
      <div className={cn('relative flex aspect-video items-center justify-center bg-gradient-to-br', gradient)}>
        <div className="grid-bg absolute inset-0 opacity-30" />
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
          <Play size={18} className="ml-0.5 text-white" fill="white" />
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/50 px-1.5 py-0.5 font-mono text-[10px] text-white/85 backdrop-blur-sm">
          {duration}
        </span>
        <span
          className={cn(
            'absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm',
            config.color
          )}
        >
          <Icon size={10} className={status === 'rendering' ? 'animate-spin' : ''} />
          {config.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-display text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-white/40">{platform}</p>
        {status === 'rendering' && (
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <p className="mt-auto pt-1 text-[11px] text-white/35">{updated}</p>
      </div>
    </Link>
  );
}
