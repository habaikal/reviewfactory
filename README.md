# 🚀 ReviewFactory OS v2.1

AI 기반 멀티 온라인 쇼핑몰 리뷰 요약 및 숏폼 비디오 생성 자동화 팩토리 시스템입니다.

## 🛠️ 주요 구성 요소 (Components)

- **Frontend (웹 애플리케이션)**
  - Next.js 14, Framer Motion, Tailwind CSS 기반의 반응형 크리에이터 스튜디오 UI
  - 템플릿 마켓플레이스, 타임라인 에디터 및 AI 숏폼 렌더러 연동

- **Backend (오케스트레이터 API)**
  - FastAPI, pgvector (PostgreSQL), Redis 기반
  - 쇼핑몰 상품 URL 분석 및 AI 스토리보드 조합 제어

- **Remotion Server**
  - 프로그래밍 방식 비디오 합성 및 미디어 렌더러 엔진

- **ComfyUI**
  - Flux 모델을 활용한 고품질 시각 에셋 생성 워크플로우 구성

---

자세한 프로덕션 운영 및 배포 설정은 [README_PROD.md](README_PROD.md)를 확인해 주시기 바랍니다.