'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Orbit, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#pipeline', label: '파이프라인' },
  { href: '/#features', label: '킬러 기능' },
  { href: '/#architecture', label: '아키텍처' },
  { href: '/pricing', label: '요금제' },
  { href: '/marketplace', label: '마켓플레이스' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel flex items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-violet-500 to-magenta-500 shadow-glow-violet">
              <Orbit className="h-4.5 w-4.5 text-white" size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              ReviewFactory <span className="text-gradient">AI</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/65 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/dashboard" className="btn-ghost !px-5 !py-2.5 text-sm">
              대시보드
            </Link>
            <Link href="/studio/new" className="btn-primary !px-5 !py-2.5 text-sm">
              무료로 시작하기
              <ChevronRight size={15} />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="메뉴 열기"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel mt-2 overflow-hidden lg:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
                  <Link href="/dashboard" className="btn-ghost w-full text-sm">
                    대시보드
                  </Link>
                  <Link href="/studio/new" className="btn-primary w-full text-sm">
                    무료로 시작하기
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
