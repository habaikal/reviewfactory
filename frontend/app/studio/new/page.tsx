'use client';

import { useCallback, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { StepIndicator } from '@/components/studio/StepIndicator';
import { BriefStep } from '@/components/studio/BriefStep';
import { StoryboardStep } from '@/components/studio/StoryboardStep';
import { RenderStep } from '@/components/studio/RenderStep';
import { ResultStep } from '@/components/studio/ResultStep';
import { GeneratedStoryboard, ProjectConfig } from '@/lib/types';

export default function NewStudioPage() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ProjectConfig | null>(null);
  const [generated, setGenerated] = useState<GeneratedStoryboard | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  const runGeneration = useCallback(async (cfg: ProjectConfig) => {
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: cfg.brief, tone: cfg.tone, platforms: cfg.platforms }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || '생성 요청이 실패했습니다.');
      }
      setGenerated(data as GeneratedStoryboard);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      setGenerated(null);
    } finally {
      setGenerating(false);
    }
  }, []);

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">새 프로젝트 생성</h1>
          <p className="mt-1 text-sm text-white/45">브리프 한 줄로 기획부터 배포까지, 4단계면 충분합니다.</p>
        </div>

        <StepIndicator current={step} />

        {step === 1 && (
          <BriefStep
            onNext={(cfg) => {
              setConfig(cfg);
              setStep(2);
              if (cfg.mode === 'generate' && cfg.brief) {
                runGeneration(cfg);
              }
            }}
          />
        )}
        {step === 2 && (
          <StoryboardStep
            loading={generating}
            data={generated}
            error={genError}
            onRetry={() => config && runGeneration(config)}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && <RenderStep scenes={generated?.scenes} onNext={() => setStep(4)} />}
        {step === 4 && <ResultStep config={config} data={generated} />}
      </div>
    </AppShell>
  );
}
