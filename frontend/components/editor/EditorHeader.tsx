'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, Download, Cloud, ChevronDown } from 'lucide-react';

export function EditorHeader({ title }: { title: string }) {
  return (
    <div className="glass-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
        >
          <ArrowLeft size={15} />
        </Link>
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold text-white sm:text-base">{title}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-white/40">
            <Cloud size={11} className="text-emerald-300" />
            자동 저장됨 · 방금 전
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn-ghost !px-4 !py-2 text-xs">
          <Share2 size={13} />
          공유
        </button>
        <button className="btn-primary !px-4 !py-2 text-xs">
          <Download size={13} />
          내보내기
          <ChevronDown size={13} />
        </button>
      </div>
    </div>
  );
}
