import { GlassPanel } from '@/components/ui/GlassPanel';
import { Route } from 'lucide-react';

const routes = [
  { model: 'Claude 3.5 Sonnet', pct: 34, color: 'bg-violet-400' },
  { model: 'Runway Gen-3 / Kling', pct: 28, color: 'bg-magenta-400' },
  { model: 'Stable Video Diffusion', pct: 24, color: 'bg-cyan-400' },
  { model: 'Llama-3 / Groq', pct: 14, color: 'bg-amber-400' },
];

export function RouterWidget() {
  return (
    <GlassPanel className="p-5">
      <div className="flex items-center gap-2">
        <Route size={14} className="text-cyan-300" />
        <h3 className="font-display text-sm font-bold text-white">이번 달 LLM 라우팅 분포</h3>
      </div>
      <p className="mt-1 text-[11px] text-white/40">Hybrid AI Routing으로 API 비용 80% 절감</p>

      <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-white/5">
        {routes.map((r) => (
          <div key={r.model} className={r.color} style={{ width: `${r.pct}%` }} />
        ))}
      </div>

      <div className="mt-4 space-y-2.5">
        {routes.map((r) => (
          <div key={r.model} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-white/60">
              <span className={`h-2 w-2 rounded-full ${r.color}`} />
              {r.model}
            </span>
            <span className="font-mono text-white/40">{r.pct}%</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}
