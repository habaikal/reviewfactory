'use client';

import { useState } from 'react';
import {
  Wand2,
  FileOutput,
  FolderOpen,
  VolumeX,
  Fingerprint,
  Search,
  Smartphone,
  Captions,
  AudioLines,
  Download,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Copy,
  FileDown,
} from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { libraryAssets, assetLicenses } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { LicenseRisk } from '@/lib/types';

const tabs = [
  { id: 'ai', label: 'AI 툴', icon: Wand2 },
  { id: 'assets', label: '에셋 매칭', icon: FolderOpen },
  { id: 'license', label: '저작권', icon: ShieldCheck },
  { id: 'export', label: '내보내기', icon: FileOutput },
] as const;

const riskBadgeColor: Record<LicenseRisk, 'cyan' | 'amber' | 'magenta'> = {
  safe: 'cyan',
  caution: 'amber',
  blocked: 'magenta',
};

const riskLabel: Record<LicenseRisk, string> = {
  safe: '상업적 이용 가능',
  caution: '확인 필요',
  blocked: '이용 제한',
};

function riskIcon(risk: LicenseRisk) {
  if (risk === 'safe') return ShieldCheck;
  if (risk === 'caution') return ShieldAlert;
  return ShieldX;
}

function buildLicenseReport() {
  const lines = [
    'OMNICAST AI — 저작권 안전 리포트',
    `생성 일시: ${new Date().toLocaleString('ko-KR')}`,
    '',
    ...assetLicenses.map(
      (l) =>
        `[${riskLabel[l.risk]}] ${l.sourceName} — ${l.licenseType} · 저작자: ${l.author}${
          l.attributionRequired ? ' · 출처 표기 필수' : ''
        }${l.sourceUrl !== '#' ? ` · ${l.sourceUrl}` : ''}`
    ),
    '',
    '본 리포트는 배포 전 저작권 위험을 사전 확인하기 위한 참고 자료이며, 최종 상업적 이용 책임은 사용자에게 있습니다.',
  ];
  return lines.join('\n');
}

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative h-5 w-9 shrink-0 rounded-full transition-colors',
        on ? 'bg-gradient-to-r from-cyan-500 to-violet-500' : 'bg-white/10'
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform',
          on ? 'translate-x-4' : 'translate-x-0.5'
        )}
      />
    </button>
  );
}

interface ToolsPanelProps {
  silence: boolean;
  setSilence: (v: boolean) => void;
  caption: boolean;
  setCaption: (v: boolean) => void;
  bgm: boolean;
  setBgm: (v: boolean) => void;
}

export function ToolsPanel({
  silence,
  setSilence,
  caption,
  setCaption,
  bgm,
  setBgm,
}: ToolsPanelProps) {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('ai');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const blockedCount = assetLicenses.filter((l) => l.risk === 'blocked').length;
  const cautionCount = assetLicenses.filter((l) => l.risk === 'caution').length;

  const copyAttribution = (l: (typeof assetLicenses)[number]) => {
    const text = `${l.author} — ${l.sourceName} (${l.licenseType})`;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(l.assetId);
    setTimeout(() => setCopiedId((c) => (c === l.assetId ? null : c)), 1500);
  };

  const downloadReport = () => {
    const blob = new Blob([buildLicenseReport()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'omnicast-copyright-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <GlassPanel className="flex flex-col p-4 sm:p-5">
      <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[11px] font-medium transition-colors',
              tab === t.id ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
            )}
          >
            <t.icon size={12} />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {tab === 'ai' && (
          <>
            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2.5">
                <VolumeX size={15} className="text-cyan-300" />
                <div>
                  <p className="text-xs font-medium text-white/85">무음 구간 자동 제거</p>
                  <p className="text-[10px] text-white/40">Tier 1 · Llama 3 8B</p>
                </div>
              </div>
              <Toggle on={silence} onClick={() => setSilence(!silence)} />
            </div>

            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2.5">
                <Fingerprint size={15} className="text-violet-300" />
                <div>
                  <p className="text-xs font-medium text-white/85">스타일 클로닝 프로필</p>
                  <p className="text-[10px] text-white/40">편집 리듬 · 컷 타이밍 학습</p>
                </div>
              </div>
              <select className="mt-3 w-full rounded-lg border border-white/10 bg-void-900 px-2.5 py-2 text-[11px] text-white/75 focus:outline-none">
                <option>제주 브이로그체</option>
                <option>미니멀 커머스체</option>
                <option>다이나믹 스포츠체</option>
              </select>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2.5">
                <Captions size={15} className="text-emerald-300" />
                <div>
                  <p className="text-xs font-medium text-white/85">공간 인식형 자막</p>
                  <p className="text-[10px] text-white/40">Depth Estimation AI</p>
                </div>
              </div>
              <Toggle on={caption} onClick={() => setCaption(!caption)} />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3.5">
              <div className="flex items-center gap-2.5">
                <AudioLines size={15} className="text-magenta-300" />
                <div>
                  <p className="text-xs font-medium text-white/85">BGM 드롭 싱크</p>
                  <p className="text-[10px] text-white/40">컷 전환 타이밍 자동 매칭</p>
                </div>
              </div>
              <Toggle on={bgm} onClick={() => setBgm(!bgm)} />
            </div>

            <button className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3.5 text-left transition-colors hover:border-cyan-400/30">
              <div className="flex items-center gap-2.5">
                <Smartphone size={15} className="text-amber-300" />
                <div>
                  <p className="text-xs font-medium text-white/85">숏폼 자동 변환</p>
                  <p className="text-[10px] text-white/40">스피커 트래킹 세로 크롭</p>
                </div>
              </div>
              <ChevronRight size={13} className="text-white/30" />
            </button>
          </>
        )}

        {tab === 'assets' && (
          <>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2">
              <Search size={13} className="text-white/40" />
              <input
                placeholder="B-roll 시맨틱 검색... 예: 도심 야경"
                className="w-full bg-transparent text-xs text-white/80 placeholder:text-white/30 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {libraryAssets.slice(0, 4).map((a) => (
                <div key={a.id} className="overflow-hidden rounded-lg border border-white/8">
                  <div className={`aspect-video bg-gradient-to-br ${a.gradient}`} />
                  <div className="p-2">
                    <p className="truncate text-[10px] font-medium text-white/80">{a.title}</p>
                    <Badge color="cyan" className="mt-1 !text-[9px]">
                      매칭 {Math.round(a.score * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'license' && (
          <>
            <div
              className={cn(
                'flex items-start gap-2.5 rounded-xl border p-3.5',
                blockedCount > 0
                  ? 'border-magenta-400/25 bg-magenta-400/[0.06]'
                  : cautionCount > 0
                    ? 'border-amber-400/25 bg-amber-400/[0.06]'
                    : 'border-cyan-400/25 bg-cyan-400/[0.06]'
              )}
            >
              {blockedCount > 0 ? (
                <ShieldX size={15} className="mt-0.5 shrink-0 text-magenta-300" />
              ) : cautionCount > 0 ? (
                <ShieldAlert size={15} className="mt-0.5 shrink-0 text-amber-300" />
              ) : (
                <ShieldCheck size={15} className="mt-0.5 shrink-0 text-cyan-300" />
              )}
              <p className="text-[11px] leading-relaxed text-white/70">
                {blockedCount > 0
                  ? `이용 제한 자산 ${blockedCount}개가 있습니다. 배포 전 교체해 주세요.`
                  : cautionCount > 0
                    ? `확인이 필요한 자산 ${cautionCount}개가 있습니다.`
                    : '모든 에셋이 상업적 이용 가능한 라이선스로 확인되었습니다.'}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {assetLicenses.map((l) => {
                const Icon = riskIcon(l.risk);
                return (
                  <div
                    key={l.assetId}
                    className="flex items-start justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-3"
                  >
                    <div className="flex min-w-0 items-start gap-2">
                      <Icon
                        size={14}
                        className={cn(
                          'mt-0.5 shrink-0',
                          l.risk === 'safe' ? 'text-cyan-300' : l.risk === 'caution' ? 'text-amber-300' : 'text-magenta-300'
                        )}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-white/85">{l.sourceName}</p>
                        <p className="truncate text-[10px] text-white/40">{l.licenseType} · {l.author}</p>
                        <Badge color={riskBadgeColor[l.risk]} className="mt-1.5 !text-[9px]">
                          {riskLabel[l.risk]}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={() => copyAttribution(l)}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-white/10 px-2 py-1 text-[10px] text-white/50 transition-colors hover:border-cyan-400/30 hover:text-cyan-300"
                    >
                      <Copy size={10} />
                      {copiedId === l.assetId ? '복사됨' : '표기 복사'}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={downloadReport}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs font-medium text-white/80 transition-colors hover:border-cyan-400/30 hover:text-cyan-300"
            >
              <FileDown size={13} />
              저작권 리포트 다운로드 (.txt)
            </button>
          </>
        )}

        {tab === 'export' && (
          <>
            {[
              { name: 'OTIO 원본', desc: '범용 타임라인 표준' },
              { name: '캡컷 내보내기', desc: 'OTIO → CapCut 어댑터' },
              { name: '프리미어 프로', desc: 'OTIO → XML 어댑터' },
              { name: '풀 HD / 4K MP4', desc: '워터마크 없는 최종본' },
            ].map((opt) => (
              <button
                key={opt.name}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] p-3.5 text-left transition-colors hover:border-white/20"
              >
                <span>
                  <p className="text-xs font-medium text-white/85">{opt.name}</p>
                  <p className="text-[10px] text-white/40">{opt.desc}</p>
                </span>
                <Download size={13} className="text-white/30" />
              </button>
            ))}
          </>
        )}
      </div>
    </GlassPanel>
  );
}

