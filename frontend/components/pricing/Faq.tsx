'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { cn } from '@/lib/utils';

const faqs = [
  {
    q: 'Pay-per-Success는 정확히 어떻게 작동하나요?',
    a: '스토리보드 기획 및 수정 단계는 무제한 무료입니다. 워터마크 없는 최종 렌더링본을 다운로드하는 순간에만 크레딧이 차감되어, 실패한 시도에는 비용을 청구하지 않습니다.',
  },
  {
    q: '렌더 크레딧은 어떻게 소모되나요?',
    a: '컷의 복잡도에 따라 동적 라우터가 모델을 선택합니다. 인물·복잡 모션(High-tier)은 더 많은 크레딧을, 단순 풍경·턴테이블(Mid-tier)은 적은 크레딧을 사용합니다. 에셋 리사이클링으로 재활용된 컷은 크레딧이 차감되지 않습니다.',
  },
  {
    q: '화이트라벨 플랜은 무엇을 포함하나요?',
    a: '대형 광고 대행사나 쇼핑몰 플랫폼이 ReviewFactory의 엔진을 자사 솔루션처럼 사용할 수 있도록 API/SDK, 커스텀 대시보드, 전용 GPU 렌더 파티션, RBAC/SSO를 제공합니다.',
  },
  {
    q: '캡컷·프리미어로 내보낸 프로젝트가 깨지지 않나요?',
    a: '모든 편집 결과는 OpenTimelineIO(OTIO) 표준으로 생성되며, 검증된 어댑터를 통해 실시간 변환됩니다. NLE가 업데이트돼도 어댑터만 갱신하면 되므로 무결성이 유지됩니다.',
  },
  {
    q: '템플릿 마켓플레이스 수익은 어떻게 정산되나요?',
    a: '크리에이터가 등록한 템플릿이 판매될 때마다 70%의 수익을 분배받습니다. 정산은 매월 자동으로 처리됩니다.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f, i) => (
        <GlassPanel key={f.q} className="overflow-hidden p-0">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left"
          >
            <span className="text-sm font-medium text-white/85">{f.q}</span>
            <ChevronDown
              size={16}
              className={cn('shrink-0 text-white/40 transition-transform', open === i && 'rotate-180')}
            />
          </button>
          <div
            className={cn(
              'grid transition-all duration-300',
              open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm leading-relaxed text-white/55">{f.a}</p>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}
