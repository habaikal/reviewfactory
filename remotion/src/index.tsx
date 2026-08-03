/**
 * ReviewFactory OS v2.0 - Remotion Template
 * 플랫폼별 고지문구 자동 삽입 + 멀티 플랫폼 배지 + 수익 최적화 자막
 * 
 * 설치: npm install remotion @remotion/tailwind @remotion/google-fonts
 * 실행: npx remotion preview src/CoupangReviewShort_v2.tsx
 */

import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  Audio,
} from 'remotion';

// --- 타입 정의 ---
type Platform = 'coupang' | 'toss' | 'naver' | 'youtube_shopping' | 'amazon' | 'shopify';

interface Product {
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
}

interface Insights {
  pros: { aspect: string; summary: string; count: number }[];
  cons: { aspect: string; summary: string; count: number }[];
  verdict: string;
}

interface VideoProps {
  platform: Platform;
  product: Product;
  insights: Insights;
  affiliateUrl: string;
  disclosure: string;
  isDirectTag: boolean;
  voiceUrl?: string; // Fish-Speech TTS 결과물 S3 URL
}

// --- 플랫폼별 디자인 시스템 (법적 고지 포함) ---
const PLATFORM_THEME: Record<Platform, { color: string; bg: string; badge: string; logo: string }> = {
  coupang: { color: '#FF3626', bg: '#FFF0EE', badge: '쿠팡 파트너스', logo: '🛒' },
  toss: { color: '#0064FF', bg: '#E8F0FF', badge: '토스쇼핑 10% 고수익', logo: '💙' },
  naver: { color: '#03C75A', bg: '#E6F9ED', badge: '네이버 커넥트', logo: 'N' },
  youtube_shopping: { color: '#FF0000', bg: '#FFE5E5', badge: '유튜브 쇼핑 공식 태그', logo: '▶️' },
  amazon: { color: '#FF9900', bg: '#FFF8E5', badge: 'Amazon Associates', logo: 'A' },
  shopify: { color: '#95BF47', bg: '#F0F7E5', badge: '자사몰', logo: 'S' },
};

const DISCLOSURE_STYLE: React.CSSProperties = {
  fontSize: 18,
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  padding: '6px 12px',
  borderRadius: 4,
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  textAlign: 'center',
  fontFamily: 'Pretendard, sans-serif',
};

// --- 메인 컴포넌트 ---
export const CoupangReviewShortV2: React.FC<VideoProps> = ({
  platform,
  product,
  insights,
  disclosure,
  isDirectTag,
  voiceUrl,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const theme = PLATFORM_THEME[platform];

  // 애니메이션: 0-3초 Hook, 3-23초 Body, 23-30초 CTA
  const hookOpacity = interpolate(frame, [0, 15, 75, 90], [0, 1, 1, 0]);
  const bodyOpacity = interpolate(frame, [80, 95, 660, 690], [0, 1, 1, 0]);
  const ctaScale = spring({ frame: frame - 700, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: 'black', fontFamily: 'Pretendard, sans-serif' }}>
      {/* 배경 이미지 - Ken Burns 효과 */}
      <Sequence from={0} durationInFrames={durationInFrames}>
        <Img
          src={product.images[0]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${interpolate(frame, [0, 900], [1, 1.15])})`,
            filter: 'brightness(0.7)',
          }}
        />
      </Sequence>

      {/* 상단: 플랫폼 배지 + 별점 바 */}
      <AbsoluteFill style={{ padding: 40 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: theme.color,
              color: 'white',
              padding: '8px 16px',
              borderRadius: 20,
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            {theme.logo} {theme.badge} {isDirectTag ? '· 직접태그' : '· 설명란 링크'}
          </div>
          <div style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: 12, fontWeight: 700 }}>
            ⭐ {product.rating} ({product.reviewCount.toLocaleString()}개 리뷰)
          </div>
        </div>
      </AbsoluteFill>

      {/* HOOK: 0-3초 */}
      <Sequence from={0} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', opacity: hookOpacity }}>
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px 50px',
              borderRadius: 30,
              textAlign: 'center',
              transform: `scale(${interpolate(frame, [0, 20], [0.8, 1])})`,
            }}
          >
            <div style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.2 }}>
              쿠팡에서 {product.reviewCount.toLocaleString()}개 팔린
              <br />
              <span style={{ color: theme.color }}>{product.title}</span>
              <br />
              100개 리뷰 다 읽어봤더니...
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* BODY: 3-23초 - 장점 TOP3 */}
      <Sequence from={90} durationInFrames={600}>
        <AbsoluteFill style={{ justifyContent: 'center', padding: 40, opacity: bodyOpacity }}>
          <div style={{ backgroundColor: 'white', borderRadius: 24, padding: 40, width: '100%' }}>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 20, color: theme.color }}>
              ✅ 장점 TOP 3
            </div>
            {insights.pros.slice(0, 3).map((pro, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <div
                  style={{
                    backgroundColor: theme.bg,
                    borderLeft: `6px solid ${theme.color}`,
                    padding: '12px 20px',
                    borderRadius: 12,
                    flex: 1,
                  }}
                >
                  <span style={{ fontWeight: 800, fontSize: 28 }}>{pro.aspect}</span>
                  <span style={{ fontSize: 26, marginLeft: 12 }}>{pro.summary}</span>
                  <span style={{ fontSize: 20, color: '#666', marginLeft: 12 }}>({pro.count}명 언급)</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 24, backgroundColor: '#FFF3CD', padding: 20, borderRadius: 12 }}>
              <div style={{ fontSize: 26, fontWeight: 700 }}>⚠️ 단점 1개 솔직히 말하면</div>
              <div style={{ fontSize: 24 }}>{insights.cons[0]?.summary} - 근데 이 가격이면 감안 가능</div>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* CTA: 23-30초 */}
      <Sequence from={690} durationInFrames={210}>
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: theme.color,
              color: 'white',
              padding: '30px 60px',
              borderRadius: 30,
              textAlign: 'center',
              transform: `scale(${ctaScale})`,
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 900 }}>지금 {product.price.toLocaleString()}원</div>
            <div style={{ fontSize: 28, marginTop: 10 }}>
              {platform === 'toss' ? '토스에서 최대 10% 적립' : '내일 도착 · 무료배송'}
            </div>
            <div style={{ fontSize: 22, marginTop: 12, opacity: 0.9 }}>
              {isDirectTag ? '영상 속 쇼핑 버튼 클릭!' : '설명란 링크에서 확인'}
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 법적 고지문구 - 플랫폼별 자동 삽입, 절대 빼면 안됨 */}
      <div style={DISCLOSURE_STYLE}>{disclosure}</div>

      {/* TTS 오디오 */}
      {voiceUrl && <Audio src={voiceUrl} />}
    </AbsoluteFill>
  );
};

// --- 사용 예시 (Remotion Studio에서) ---
/*
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReviewShortV2"
        component={CoupangReviewShortV2}
        durationInFrames={900} // 30초 * 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          platform: 'toss', // 플랫폼 바꾸면 색상/배지/고지 자동 변경
          product: {
            title: '샤오미 미지아 핸디 무선 청소기',
            price: 89000,
            rating: 4.7,
            reviewCount: 2847,
            images: ['https://...'],
          },
          insights: {
            pros: [
              { aspect: '흡입력', summary: '머리카락까지 싹 빨림', count: 47 },
              { aspect: '무게', summary: '1.2kg이라 한손으로 가능', count: 38 },
              { aspect: '가성비', summary: '이 가격에 이 성능 미쳤다', count: 52 },
            ],
            cons: [{ aspect: '소음', summary: '새벽엔 못 쓸 정도', count: 21 }],
            verdict: '자취생 가성비 끝판',
          },
          affiliateUrl: 'https://toss.im/...',
          disclosure: '이 포스팅은 토스쇼핑 파트너스 활동의 일환으로...',
          isDirectTag: true,
          voiceUrl: 'https://s3.../tts.wav',
        }}
      />
    </>
  );
};
*/
