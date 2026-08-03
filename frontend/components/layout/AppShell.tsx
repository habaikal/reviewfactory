'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Clapperboard,
  FolderOpen,
  Store,
  CreditCard,
  Settings,
  Orbit,
  Menu,
  X,
  Gem,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BackgroundFX } from '@/components/ui/BackgroundFX';

const navItems = [
  { href: '/dashboard', label: '대시보드', icon: LayoutGrid },
  { href: '/studio/new', label: '새로 만들기', icon: Plus },
  { href: '/library', label: '에셋 라이브러리', icon: FolderOpen },
  { href: '/marketplace', label: '마켓플레이스', icon: Store },
  { href: '/pricing', label: '요금제', icon: CreditCard },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2.5 px-2 py-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-violet-500 to-magenta-500 shadow-glow-violet">
          <Orbit className="text-white" size={17} strokeWidth={2.5} />
        </span>
        <span className="font-display text-base font-bold text-white">
          OMNICAST <span className="text-gradient">AI</span>
        </span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-all',
                active
                  ? 'border border-white/10 bg-white/[0.07] text-white shadow-glow-violet'
                  : 'border border-transparent text-white/55 hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
              )}
            >
              <item.icon
                size={17}
                className={cn(active ? 'text-cyan-300' : 'text-white/40 group-hover:text-white/70')}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="glass-panel flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-xs text-white/50">
          <span>렌더 크레딧</span>
          <Gem size={13} className="text-violet-300" />
        </div>
        <div className="font-display text-xl font-bold text-white">2,340</div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" />
        </div>
        <Link href="/pricing" className="btn-primary w-full !py-2 text-xs">
          크레딧 충전
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-3 px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/40 text-sm font-semibold text-white">
          지
        </div>
        <div className="flex-1 text-xs">
          <p className="font-medium text-white/85">김지수 님</p>
          <p className="text-white/40">Creator 플랜</p>
        </div>
        <Settings size={16} className="text-white/40" />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 p-5 lg:flex">
          {SidebarContent}
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <div className="glass-panel sticky top-0 z-40 mx-3 mt-3 flex items-center justify-between px-4 py-3 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-violet-500 to-magenta-500">
                <Orbit className="text-white" size={14} />
              </span>
              <span className="font-display text-sm font-bold text-white">OMNICAST AI</span>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label="메뉴 열기"
            >
              <Menu size={17} />
            </button>
          </div>

          <main className="flex-1 p-3 sm:p-5 lg:p-8">{children}</main>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs border-r border-white/10 bg-void-950/95 p-5 backdrop-blur-xl lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              >
                <X size={15} />
              </button>
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
