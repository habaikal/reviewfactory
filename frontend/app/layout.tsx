import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const notoKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-kr',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ReviewFactory OS — 초개인화 비디오 자동화 통합 플랫폼',
  description:
    '기획부터 생성, 후반작업, 멀티플랫폼 배포까지 100% 무인화. LLM 오케스트레이션과 딥컴포지팅 엔진으로 완성하는 차세대 비디오 자동화 플랫폼, ReviewFactory OS.',
  keywords: ['ReviewFactory OS', 'AI 영상 생성', '영상 자동화', 'Zero-Editing', 'AI 비디오 SaaS'],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#040509',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoKr.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
