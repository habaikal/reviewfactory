import { Star, ShoppingBag, Upload, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { marketplaceTemplates } from '@/lib/mock-data';

export default function MarketplacePage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">템플릿 마켓플레이스</h1>
            <p className="mt-1 text-sm text-white/45">크리에이터 이코노미 — 잘 깎은 프롬프트/스토리보드로 수익을 분배받으세요.</p>
          </div>
          <button className="btn-primary text-sm">
            <Upload size={15} />
            내 템플릿 등록하기
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: '등록된 템플릿', value: '3,842' },
            { label: '누적 판매', value: '128K+' },
            { label: '크리에이터 수익 분배율', value: '70%' },
            { label: '활성 크리에이터', value: '2,190' },
          ].map((s) => (
            <GlassPanel key={s.label} className="p-4 text-center">
              <div className="font-display text-xl font-bold text-white sm:text-2xl">{s.value}</div>
              <div className="mt-1 text-[11px] text-white/45">{s.label}</div>
            </GlassPanel>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {marketplaceTemplates.map((t) => (
            <GlassPanel
              key={t.id}
              className="group overflow-hidden p-0 transition-all hover:-translate-y-1 hover:border-white/20"
            >
              <div className={`relative flex aspect-video items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                <div className="grid-bg absolute inset-0 opacity-30" />
                <TrendingUp size={22} className="text-white/50" />
                <span className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-semibold text-amber-300 backdrop-blur-sm">
                  <Star size={10} fill="currentColor" />
                  {t.rating}
                </span>
              </div>
              <div className="p-4">
                <p className="line-clamp-1 font-display text-sm font-bold text-white">{t.title}</p>
                <p className="mt-1 text-xs text-white/40">{t.author} · 판매 {t.sales.toLocaleString()}건</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-base font-bold text-white">₩{t.price}</span>
                  <button className="btn-ghost !px-3.5 !py-1.5 text-xs">
                    <ShoppingBag size={12} />
                    구매
                  </button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
