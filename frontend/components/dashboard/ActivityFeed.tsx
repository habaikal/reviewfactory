import { activityFeed } from '@/lib/mock-data';
import { iconMap } from '@/components/ui/icon-map';
import { GlassPanel } from '@/components/ui/GlassPanel';

export function ActivityFeed() {
  return (
    <GlassPanel className="p-5">
      <h3 className="font-display text-sm font-bold text-white">실시간 활동</h3>
      <div className="mt-4 space-y-4">
        {activityFeed.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.id} className="relative flex gap-3 pl-1">
              {i < activityFeed.length - 1 && (
                <span className="absolute left-[15px] top-8 h-[calc(100%-6px)] w-px bg-white/10" />
              )}
              <span className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-void-900 text-violet-300">
                {Icon && <Icon size={13} />}
              </span>
              <div className="pb-1">
                <p className="text-xs leading-relaxed text-white/70">{item.text}</p>
                <p className="mt-1 text-[10px] text-white/35">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
