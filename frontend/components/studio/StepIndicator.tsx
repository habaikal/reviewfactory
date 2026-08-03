'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: '브리프 & 에셋' },
  { id: 2, label: 'AI 스토리보드' },
  { id: 3, label: '하이브리드 렌더링' },
  { id: 4, label: '결과 & 배포' },
];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="glass-panel flex items-center justify-between overflow-x-auto p-4 sm:p-5">
      {steps.map((step, i) => (
        <div key={step.id} className="flex flex-1 items-center last:flex-none">
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all',
                current > step.id
                  ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-300'
                  : current === step.id
                    ? 'border-violet-400/50 bg-gradient-to-br from-cyan-500 to-violet-500 text-white shadow-glow-violet'
                    : 'border-white/10 bg-white/[0.03] text-white/35'
              )}
            >
              {current > step.id ? <Check size={14} /> : step.id}
            </span>
            <span
              className={cn(
                'hidden text-xs font-medium sm:block',
                current >= step.id ? 'text-white/85' : 'text-white/35'
              )}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="mx-2 h-px flex-1 bg-white/10 sm:mx-4">
              <div
                className="h-px bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-500"
                style={{ width: current > step.id ? '100%' : '0%' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
