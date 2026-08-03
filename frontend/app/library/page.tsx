'use client';

import { useState } from 'react';
import { Search, Recycle, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { libraryAssets } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const filters = ['전체', 'B-roll', '생성 자산', '업로드 원본'];

export default function LibraryPage() {
  const [filter, setFilter] = useState('전체');
  const [query, setQuery] = useState('');

  const filtered = libraryAssets.filter((a) => {
    const matchFilter = filter === '전체' || a.kind === filter;
    const matchQuery = query === '' || a.title.includes(query) || a.tags.some((t) => t.includes(query));
    return matchFilter && matchQuery;
  });

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">에셋 라이브러리</h1>
            <p className="mt-1 text-sm text-white/45">벡터 DB 기반 스마트 에셋 리사이클링으로 크레딧 소모를 0으로.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-2 text-xs text-emerald-300">
            <Recycle size={13} />
            이번 달 860 크레딧 절감
          </div>
        </div>

        <GlassPanel className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 sm:w-96">
            <Search size={15} className="text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='시맨틱 검색... 예: "A급 B-roll", "도심 야경"'
              className="w-full bg-transparent text-sm text-white/80 placeholder:text-white/30 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                  filter === f
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                    : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </GlassPanel>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((a) => (
            <GlassPanel key={a.id} className="group overflow-hidden p-0 transition-all hover:-translate-y-1 hover:border-white/20">
              <div className={`relative aspect-video bg-gradient-to-br ${a.gradient}`}>
                <div className="grid-bg absolute inset-0 opacity-30" />
                <Badge color="cyan" className="absolute right-2 top-2 !text-[10px] backdrop-blur-sm">
                  <Sparkles size={9} />
                  {Math.round(a.score * 100)}% 매칭
                </Badge>
              </div>
              <div className="p-3.5">
                <p className="line-clamp-1 text-xs font-semibold text-white/85">{a.title}</p>
                <p className="mt-0.5 text-[10px] text-white/40">{a.kind}</p>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {a.tags.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] text-white/50">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        {filtered.length === 0 && (
          <GlassPanel className="flex flex-col items-center gap-2 p-16 text-center text-white/40">
            <Search size={22} />
            <p className="text-sm">검색 결과가 없습니다.</p>
          </GlassPanel>
        )}
      </div>
    </AppShell>
  );
}
