'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  Download,
  Smartphone,
  FileOutput,
  Sparkles,
  TrendingUp,
  Scissors,
  PartyPopper,
  RotateCcw,
  ShieldCheck,
  FileDown,
} from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { GeneratedStoryboard, ProjectConfig } from '@/lib/types';
import { assetLicenses as mockAudioVoiceLicenses } from '@/lib/mock-data';
import { generateThumbnailDataUrl } from '@/lib/thumbnail';
import { cn } from '@/lib/utils';

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const hookLabel: Record<string, string> = { high: '후킹력 상', medium: '후킹력 중', low: '후킹력 하' };
const hookColor: Record<string, 'magenta' | 'cyan' | 'neutral'> = { high: 'magenta', medium: 'cyan', low: 'neutral' };

const shorts = [
  { id: 1, label: '숏폼 #1 — 훅 강조', duration: '0:28' },
  { id: 2, label: '숏폼 #2 — 워킹 하이라이트', duration: '0:34' },
  { id: 3, label: '숏폼 #3 — 디테일 클로즈업', duration: '0:22' },
];

const exportOptions = [
  { name: 'OTIO 원본', desc: '범용 타임라인 표준 포맷', icon: FileOutput },
  { name: '캡컷용 내보내기', desc: 'OTIO → CapCut JSON 어댑터', icon: FileOutput },
  { name: '프리미어 프로', desc: 'OTIO → XML 어댑터', icon: FileOutput },
  { name: '풀 HD / 4K MP4', desc: '워터마크 없는 최종본', icon: Download },
];

export function ResultStep({ config, data }: { config: ProjectConfig | null; data: GeneratedStoryboard | null }) {
  const queryStr = config
    ? `?title=${encodeURIComponent(config.title)}&platform=${encodeURIComponent(
        config.platforms.join(',')
      )}&tone=${encodeURIComponent(config.tone)}`
    : '';
  const editUrl = `/studio/demo/edit${queryStr}`;
  const displayTitle = data?.title || config?.title || '신상 스니커즈 런칭 릴스';

  const platformLabelMap: Record<string, string> = {
    reels: 'Instagram Reels',
    shorts: 'YouTube Shorts',
    tiktok: 'TikTok',
    long: 'YouTube 롱폼',
  };
  const displayPlatform = config?.platforms && config.platforms.length > 0
    ? config.platforms.map((p) => platformLabelMap[p] || p).join(', ')
    : 'Instagram Reels';

  const isVertical = config?.platforms && config.platforms.length > 0
    ? config.platforms.some((p) => p === 'reels' || p === 'shorts' || p === 'tiktok')
    : true;
  const resolutionLabel = isVertical ? '1080×1920' : '1920×1080';

  // 실제 생성된 씬을 누적 시간(cue)으로 변환 — 재생 중 배경 이미지·자막이 씬에 맞춰 전환됨
  const previewCues = useMemo(() => {
    if (!data || data.scenes.length === 0) {
      return [{ at: 0, caption: '', image: null as string | null }];
    }
    let acc = 0;
    return data.scenes.map((scene) => {
      const cue = { at: acc, caption: scene.caption, image: scene.image?.url || null };
      acc += scene.durationSec;
      return cue;
    });
  }, [data]);

  const previewDuration = useMemo(
    () => (data ? Math.max(3, data.scenes.reduce((sum, s) => sum + s.durationSec, 0)) : 15),
    [data]
  );

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setCurrentTime((t) => {
        if (t >= previewDuration) {
          setPlaying(false);
          return 0;
        }
        return Math.min(previewDuration, t + 0.1);
      });
    }, 100);
    return () => clearInterval(interval);
  }, [playing, previewDuration]);

  const progressPct = (currentTime / previewDuration) * 100;
  const activeCue = [...previewCues].reverse().find((c) => currentTime >= c.at) || previewCues[0];

  // 실제 생성 파이프라인이라면 씬 이미지(Pexels)는 사진 출처 표기가 필요하고, BGM/음성은 아직 목업 라이선스 카탈로그를 사용
  const imageLicenses = (data?.scenes || [])
    .filter((s) => s.image)
    .map((s) => ({
      assetId: s.id,
      assetKind: 'image' as const,
      sourceName: 'Pexels',
      licenseType: 'Pexels License (무료 상업적 이용)',
      author: s.image!.photographer,
      sourceUrl: s.image!.pexelsPageUrl,
      attributionRequired: false,
      commercialUseAllowed: true,
      risk: 'safe' as const,
    }));
  const audioVoiceLicenses = mockAudioVoiceLicenses.filter((l) => l.assetKind === 'audio' || l.assetKind === 'voice');
  const allLicenses = [...imageLicenses, ...audioVoiceLicenses];
  const blockedAssets = allLicenses.filter((l) => l.risk === 'blocked');
  const allClear = blockedAssets.length === 0;

  const downloadCreditsFile = () => {
    const lines = [
      `${displayTitle} — 저작권 출처 표기`,
      `생성 일시: ${new Date().toLocaleString('ko-KR')}`,
      '',
      ...allLicenses.map((l) => `- ${l.author} · ${l.sourceName} (${l.licenseType})`),
      '',
      'ReviewFactory OS 저작권 안전 센터에서 자동 생성된 출처 표기 파일입니다.',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${displayTitle.replace(/\s+/g, '_')}_credits.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const heroImage = data?.scenes.find((s) => s.image)?.image?.url;
  const titleOptions = data?.titleOptions && data.titleOptions.length > 0 ? data.titleOptions : [{ text: displayTitle, hook: 'high' as const }];

  const [thumbnails, setThumbnails] = useState<(string | null)[]>([]);
  useEffect(() => {
    if (!heroImage) {
      setThumbnails([]);
      return;
    }
    let cancelled = false;
    Promise.all(
      titleOptions.slice(0, 3).map((t) => generateThumbnailDataUrl({ imageUrl: heroImage, title: t.text }).catch(() => null))
    ).then((results) => {
      if (!cancelled) setThumbnails(results);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroImage, data?.title]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <GlassPanel className="flex flex-col items-center gap-3 border-emerald-400/25 bg-emerald-400/[0.05] p-5 text-center sm:flex-row sm:justify-center">
        <PartyPopper size={18} className="text-emerald-300" />
        <p className="text-sm text-white/80">
          {data
            ? 'AI 스토리보드와 실사 소스 매칭이 완료됐습니다! 아래에서 실제 생성된 썸네일과 대본을 확인하세요.'
            : '렌더링이 완료됐습니다!'}
        </p>
      </GlassPanel>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <GlassPanel className="overflow-hidden p-0">
            <div
              className={cn(
                'relative mx-auto flex items-center justify-center overflow-hidden bg-void-900 transition-all duration-500',
                isVertical ? 'aspect-[9/16] max-h-[520px] w-auto' : 'aspect-video w-full'
              )}
            >
              {activeCue.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={activeCue.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="grid-bg absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-magenta-500/20 opacity-60" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

              {activeCue.caption && (
                <div className="absolute left-1/2 top-[68%] -translate-x-1/2 rounded-md bg-black/40 px-3 py-1.5 text-center backdrop-blur-sm">
                  <span className="font-display text-xs font-bold text-white sm:text-sm">{activeCue.caption}</span>
                </div>
              )}

              <button
                onClick={() => setPlaying(!playing)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md transition-transform hover:scale-105">
                  {playing ? (
                    <Pause size={24} className="text-white" fill="white" />
                  ) : (
                    <Play size={24} className="ml-1 text-white" fill="white" />
                  )}
                </span>
              </button>

              <span className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 font-mono text-xs text-white/85 backdrop-blur-sm">
                {formatTime(currentTime)} / {formatTime(previewDuration)}
              </span>

              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-display text-sm font-bold text-white">{displayTitle}</p>
                <p className="text-xs text-white/45">{displayPlatform} · {resolutionLabel} · 완료</p>
              </div>
              <Link href={editUrl} className="btn-ghost !py-2 text-xs">
                <Scissors size={13} />
                정밀 편집
              </Link>
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={15} className="text-amber-300" />
              <h3 className="font-display text-sm font-bold text-white">AI 생성 썸네일 & 제목 후보</h3>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {titleOptions.slice(0, 3).map((t, i) => {
                const src = thumbnails[i];
                return (
                  <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-lg border border-white/10 bg-void-900">
                    {src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={src} alt={t.text} className="h-full w-full object-cover" />
                    ) : (
                      <div
                        className={`h-full w-full bg-gradient-to-br ${
                          ['from-cyan-500/40 to-void-900', 'from-violet-500/40 to-void-900', 'from-magenta-500/40 to-void-900'][i]
                        }`}
                      />
                    )}
                    <span className="absolute left-1.5 top-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold text-white/80">
                      후보 {i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 space-y-2">
              {titleOptions.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-2.5"
                >
                  <span className="text-xs text-white/70">{t.text}</span>
                  <Badge color={hookColor[t.hook] || 'neutral'} className="!text-[10px] shrink-0">
                    {hookLabel[t.hook] || t.hook}
                  </Badge>
                </div>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <Smartphone size={15} className="text-cyan-300" />
              <h3 className="font-display text-sm font-bold text-white">멀티플랫폼 숏폼 자동 변환</h3>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {shorts.map((s) => (
                <div key={s.id} className="overflow-hidden rounded-xl border border-white/10">
                  <div className="relative flex aspect-[9/16] items-center justify-center bg-gradient-to-b from-violet-500/25 to-void-900">
                    <Play size={18} className="text-white/70" />
                    <span className="absolute bottom-1.5 right-1.5 rounded bg-black/50 px-1 py-0.5 text-[9px] text-white/80">
                      {s.duration}
                    </span>
                  </div>
                  <p className="truncate p-2 text-[10px] text-white/55">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        <div className="flex flex-col gap-6">
          <GlassPanel
            className={cn(
              'p-5',
              allClear ? 'border-emerald-400/20 bg-emerald-400/[0.03]' : 'border-amber-400/25 bg-amber-400/[0.04]'
            )}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={15} className={allClear ? 'text-emerald-300' : 'text-amber-300'} />
              <h3 className="font-display text-sm font-bold text-white">저작권 안전 리포트</h3>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/50">
              {allClear
                ? `실사 이미지 ${imageLicenses.length}개 모두 Pexels 무료 상업적 이용 라이선스로 확인됐어요.`
                : `${blockedAssets.length}개 자산이 이용 제한 상태입니다. 배포 전 교체를 권장해요.`}
            </p>
            <button
              onClick={downloadCreditsFile}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-xs font-medium text-white/80 transition-colors hover:border-cyan-400/30 hover:text-cyan-300"
            >
              <FileDown size={13} />
              출처 표기 파일 다운로드 (.txt)
            </button>
          </GlassPanel>

          <GlassPanel className="p-5">
            <h3 className="font-display text-sm font-bold text-white">내보내기</h3>
            <div className="mt-4 space-y-2.5">
              {exportOptions.map((opt) => (
                <button
                  key={opt.name}
                  className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3 text-left transition-colors hover:border-white/20"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-violet-300">
                    <opt.icon size={15} />
                  </span>
                  <span className="flex-1">
                    <p className="text-xs font-medium text-white/85">{opt.name}</p>
                    <p className="text-[10px] text-white/40">{opt.desc}</p>
                  </span>
                  <Download size={13} className="text-white/30" />
                </button>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="flex items-start gap-2.5 border-cyan-400/20 bg-cyan-400/[0.04] p-4">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-cyan-300" />
            <p className="text-[11px] leading-relaxed text-white/55">
              생성된 컷은 벡터 DB에 자동 자산화됩니다. 다음 캠페인에서 분위기가 맞으면 재렌더링 없이 재활용돼요.
            </p>
          </GlassPanel>

          <div className="flex flex-col gap-2.5">
            <Link href="/dashboard" className="btn-primary w-full text-sm">
              대시보드로 이동
            </Link>
            <Link href="/studio/new" className="btn-ghost w-full text-sm">
              <RotateCcw size={14} />
              새 프로젝트 만들기
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
