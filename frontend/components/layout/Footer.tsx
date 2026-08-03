import Link from 'next/link';
import { Orbit, Github, Twitter, Linkedin } from 'lucide-react';

const columns = [
  {
    title: '제품',
    links: [
      { label: 'Zero-Editing 생성', href: '/studio/new' },
      { label: '후반작업 엔진', href: '/#pipeline' },
      { label: '타임라인 에디터', href: '/studio/demo/edit' },
      { label: '요금제', href: '/pricing' },
    ],
  },
  {
    title: '플랫폼',
    links: [
      { label: '대시보드', href: '/dashboard' },
      { label: '에셋 라이브러리', href: '/library' },
      { label: '템플릿 마켓플레이스', href: '/marketplace' },
      { label: '화이트라벨 API', href: '/pricing' },
    ],
  },
  {
    title: '리소스',
    links: [
      { label: '아키텍처 문서', href: '/#architecture' },
      { label: 'OTIO 브릿지 가이드', href: '/#architecture' },
      { label: '크리에이터 이코노미', href: '/marketplace' },
      { label: '고객지원', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 px-4 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 via-violet-500 to-magenta-500">
                <Orbit className="text-white" size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold text-white">
                OMNICAST <span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              기획 · 생성 · 후반작업 · 배포까지 하나로 통합한 버추얼 스튜디오. 마케팅 기획팀, 촬영팀, 편집팀을 소프트웨어 하나로.
            </p>
            <div className="mt-5 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>&copy; 2026 OMNICAST AI. All rights reserved. — 버추얼 스튜디오 플랫폼</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-white/70">이용약관</Link>
            <Link href="#" className="hover:text-white/70">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white/70">보안</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
