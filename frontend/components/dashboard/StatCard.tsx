import { iconMap } from '@/components/ui/icon-map';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

export function StatCard({
  label,
  value,
  delta,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  icon: string;
}) {
  const Icon = iconMap[icon];
  const positive = delta.startsWith('+');
  return (
    <GlassPanel className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-violet-300">
          {Icon && <Icon size={16} />}
        </span>
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-[11px] font-semibold',
            positive ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300'
          )}
        >
          {delta}
        </span>
      </div>
      <div>
        <div className="font-display text-2xl font-bold text-white">{value}</div>
        <div className="mt-0.5 text-xs text-white/45">{label}</div>
      </div>
    </GlassPanel>
  );
}
