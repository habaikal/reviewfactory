import Link from 'next/link';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { RouterWidget } from '@/components/dashboard/RouterWidget';
import { dashboardStats, dashboardProjects } from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
              안녕하세요, 지수님 <span className="align-middle">👋</span>
            </h1>
            <p className="mt-1 text-sm text-white/45">오늘도 콘텐츠 팩토리가 쉬지 않고 돌아가고 있어요.</p>
          </div>
          <Link href="/studio/new" className="btn-primary text-sm">
            <Plus size={16} />
            새 프로젝트 생성
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dashboardStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-lg font-bold text-white">내 프로젝트</h2>
              <div className="flex items-center gap-2">
                <div className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-white/40">
                  <Search size={14} />
                  <input
                    placeholder="프로젝트 검색..."
                    className="w-32 bg-transparent text-xs text-white/80 placeholder:text-white/30 focus:outline-none sm:w-44"
                  />
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60">
                  <SlidersHorizontal size={14} />
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {dashboardProjects.map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <RouterWidget />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
