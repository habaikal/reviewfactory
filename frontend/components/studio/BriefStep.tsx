'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Upload,
  Image as ImageIcon,
  Film,
  ChevronRight,
  Instagram,
  Youtube,
  Music2,
  X,
  Wand2,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const purposes = ['제품 홍보', '브랜드 필름', '브이로그 편집', '튜토리얼', '이벤트 홍보', '시즌 프로모션'];
const tones = ['시네마틱', '미니멀 & 클린', '팝하고 발랄한', '럭셔리', '레트로 필름'];
const platforms = [
  { id: 'reels', label: 'Instagram Reels', icon: Instagram },
  { id: 'shorts', label: 'YouTube Shorts', icon: Youtube },
  { id: 'tiktok', label: 'TikTok', icon: Music2 },
  { id: 'long', label: 'YouTube 롱폼', icon: Film },
];

// 빠른 시작 모드에서 브리프 문장의 키워드만으로 톤을 자동 추정 (사용자가 톤을 직접 고르지 않아도 되도록)
function inferTone(text: string): string {
  const t = text.toLowerCase();
  if (/할인|이벤트|특가|세일|한정/.test(t)) return '팝하고 발랄한';
  if (/럭셔리|프리미엄|하이엔드|명품/.test(t)) return '럭셔리';
  if (/빈티지|레트로|필름/.test(t)) return '레트로 필름';
  if (/미니멀|심플|클린/.test(t)) return '미니멀 & 클린';
  return '시네마틱';
}

export function BriefStep({
  onNext,
}: {
  onNext: (config: { title: string; brief: string; tone: string; platforms: string[]; mode: 'generate' | 'upload' }) => void;
}) {
  const [mode, setMode] = useState<'generate' | 'upload'>('generate');
  const [quickMode, setQuickMode] = useState(true);
  const [purpose, setPurpose] = useState('제품 홍보');
  const [tone, setTone] = useState('시네마틱');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['reels', 'shorts']);
  const [assets, setAssets] = useState<string[]>(['logo_omnicast.png', 'product_hero_01.jpg']);
  const [brief, setBrief] = useState('여름 신상 스니커즈 라인 런칭. 도심 속 액티브한 라이프스타일 강조, 타겟은 20대 초중반.');

  const togglePlatform = (id: string) =>
    setSelectedPlatforms((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          {/* Mode select */}
          <GlassPanel className="p-5 sm:p-6">
            <h3 className="font-display text-base font-bold text-white">시작 방식을 선택하세요</h3>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => setMode('generate')}
                className={cn(
                  'flex items-start gap-3 rounded-xl border p-4 text-left transition-all',
                  mode === 'generate'
                    ? 'border-violet-400/50 bg-violet-400/[0.07] shadow-glow-violet'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                )}
              >
                <Wand2 size={18} className="mt-0.5 shrink-0 text-violet-300" />
                <div>
                  <p className="text-sm font-semibold text-white">처음부터 생성 (Zero-Editing)</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">
                    LLM이 기획부터 촬영까지 100% 무인화로 완성
                  </p>
                </div>
              </button>
              <button
                onClick={() => setMode('upload')}
                className={cn(
                  'flex items-start gap-3 rounded-xl border p-4 text-left transition-all',
                  mode === 'upload'
                    ? 'border-cyan-400/50 bg-cyan-400/[0.07] shadow-glow-cyan'
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                )}
              >
                <Upload size={18} className="mt-0.5 shrink-0 text-cyan-300" />
                <div>
                  <p className="text-sm font-semibold text-white">기존 원본 업로드 (FlowCut 엔진)</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">
                    촬영된 롱폼 영상을 마이크로 청킹으로 자동 후반작업
                  </p>
                </div>
              </button>
            </div>
          </GlassPanel>

          {/* Brief text */}
          <GlassPanel className="p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-base font-bold text-white">
                {mode === 'generate' ? '목적을 알려주세요' : '원본 영상 업로드'}
              </h3>
              {mode === 'generate' && (
                <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1">
                  <button
                    onClick={() => setQuickMode(true)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors',
                      quickMode ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                    )}
                  >
                    <Zap size={11} />
                    빠른 시작
                  </button>
                  <button
                    onClick={() => setQuickMode(false)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors',
                      !quickMode ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'
                    )}
                  >
                    <SlidersHorizontal size={11} />
                    상세 설정
                  </button>
                </div>
              )}
            </div>

            {mode === 'generate' ? (
              quickMode ? (
                <>
                  <p className="mt-3 text-xs leading-relaxed text-white/45">
                    주제 한 줄만 입력하면 톤·대본·자막·음성·BGM까지 AI가 전부 자동으로 채웁니다.
                  </p>
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={3}
                    placeholder="예: 체형 교정 전문 필라테스 센터, 신규 회원 첫 달 50% 할인 이벤트 홍보"
                    className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/85 placeholder:text-white/30 focus:border-cyan-400/40 focus:outline-none"
                  />
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-400/[0.05] px-3 py-2">
                    <Wand2 size={12} className="shrink-0 text-violet-300" />
                    <p className="text-[11px] text-white/50">
                      톤은 <span className="text-violet-300">{inferTone(brief)}</span>(으)로 자동 추천됩니다 · 목적은{' '}
                      <span className="text-violet-300">{purpose}</span> 기준
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {purposes.map((p) => (
                      <button
                        key={p}
                        onClick={() => setPurpose(p)}
                        className={cn(
                          'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all',
                          purpose === p
                            ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                            : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/25'
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={4}
                    placeholder="어떤 영상을 만들고 싶으신가요? 목적, 타겟, 분위기를 자유롭게 적어주세요."
                    className="mt-4 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-white/85 placeholder:text-white/30 focus:border-cyan-400/40 focus:outline-none"
                  />
                </>
              )
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-white/15 bg-white/[0.02] px-6 py-12 text-center transition-colors hover:border-cyan-400/30">
                <Film size={26} className="text-white/30" />
                <p className="text-sm text-white/60">원본 영상을 드래그하거나 클릭해서 업로드하세요</p>
                <p className="text-xs text-white/35">MP4, MOV · 최대 8GB · 로컬 프록시 자동 생성으로 즉시 업로드</p>
                <span className="btn-ghost mt-1 !py-2 text-xs">파일 선택</span>
              </div>
            )}
          </GlassPanel>

          {/* Assets */}
          <GlassPanel className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white">브랜드 에셋</h3>
              <button
                onClick={() => setAssets((a) => [...a, `asset_${a.length + 1}.png`])}
                className="chip cursor-pointer hover:border-cyan-400/30 hover:text-cyan-300"
              >
                <Upload size={11} />
                에셋 추가
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {assets.map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-1"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-cyan-500/40 to-violet-500/40">
                    <ImageIcon size={11} className="text-white" />
                  </span>
                  <span className="text-xs text-white/70">{a}</span>
                  <button
                    onClick={() => setAssets((list) => list.filter((x) => x !== a))}
                    className="flex h-5 w-5 items-center justify-center rounded text-white/30 hover:text-white/70"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Right config panel */}
        <div className="flex flex-col gap-6">
          <GlassPanel className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-white">톤 & 스타일</h3>
              {mode === 'generate' && quickMode && (
                <Badge>
                  <Wand2 size={10} />
                  AI 자동
                </Badge>
              )}
            </div>
            {mode === 'generate' && quickMode ? (
              <p className="mt-3 text-xs leading-relaxed text-white/45">
                브리프 문장을 분석해 <span className="font-medium text-white/70">{inferTone(brief)}</span> 톤으로
                자동 설정됩니다. 직접 고르려면 상단의 <span className="text-violet-300">상세 설정</span>을 눌러주세요.
              </p>
            ) : (
              <div className="mt-3 flex flex-col gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={cn(
                      'flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-xs font-medium transition-all',
                      tone === t
                        ? 'border-violet-400/40 bg-violet-400/[0.08] text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/55 hover:border-white/20'
                    )}
                  >
                    {t}
                    {tone === t && <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />}
                  </button>
                ))}
              </div>
            )}
          </GlassPanel>

          <GlassPanel className="p-5">
            <h3 className="font-display text-sm font-bold text-white">배포 플랫폼</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => togglePlatform(p.id)}
                  className={cn(
                    'flex flex-col items-center gap-1.5 rounded-lg border px-3 py-3 transition-all',
                    selectedPlatforms.includes(p.id)
                      ? 'border-cyan-400/40 bg-cyan-400/[0.08]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  )}
                >
                  <p.icon size={16} className={selectedPlatforms.includes(p.id) ? 'text-cyan-300' : 'text-white/40'} />
                  <span className="text-[10px] font-medium text-white/60">{p.label}</span>
                </button>
              ))}
            </div>
          </GlassPanel>

          <GlassPanel className="flex items-start gap-2.5 border-cyan-400/20 bg-cyan-400/[0.04] p-4">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-cyan-300" />
            <p className="text-[11px] leading-relaxed text-white/55">
              스토리보드 단계는 <span className="text-cyan-300">무제한 무료 수정</span>이 가능합니다. 크레딧은 최종
              렌더링 다운로드 시에만 차감돼요.
            </p>
          </GlassPanel>

          <button
            onClick={() => {
              const cleanTitle = brief.trim().split(/[.\n]/)[0] || '신규 자동화 프로젝트';
              onNext({
                title: cleanTitle.length > 24 ? cleanTitle.substring(0, 24) + '...' : cleanTitle,
                brief: brief.trim(),
                tone: mode === 'generate' && quickMode ? inferTone(brief) : tone,
                platforms: selectedPlatforms,
                mode,
              });
            }}
            className="btn-primary w-full text-sm"
          >
            AI 스토리보드 생성하기
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
