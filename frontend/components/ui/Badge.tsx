import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

const colorMap: Record<string, string> = {
  cyan: 'border-cyan-400/25 bg-cyan-400/[0.08] text-cyan-300',
  violet: 'border-violet-400/25 bg-violet-400/[0.08] text-violet-300',
  magenta: 'border-magenta-400/25 bg-magenta-400/[0.08] text-magenta-300',
  amber: 'border-amber-400/25 bg-amber-400/[0.08] text-amber-300',
  neutral: 'border-white/15 bg-white/[0.05] text-white/70',
};

export function Badge({
  className,
  color = 'neutral',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { color?: keyof typeof colorMap }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        colorMap[color],
        className
      )}
      {...props}
    />
  );
}
