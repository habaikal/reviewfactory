// OMNICAST AI — 데모용 목업 데이터 (실제 백엔드/AI 연동 없이 UI 시연용)

export const pipelineStages = [
  {
    id: 'brief',
    tag: '01 · THE BRAIN',
    title: '기획 · 브리프',
    desc: '목적과 에셋만 던지면 LLM이 스토리보드를 설계합니다. Claude 3.5 Sonnet이 복잡한 추론과 컨셉을 잡고, 자체 호스팅 Llama-3가 메타데이터·문장 교정을 초저가로 처리합니다.',
    stack: ['Claude 3.5 Sonnet', 'Llama-3 (Self-hosted)', 'MongoDB', 'Vector RAG'],
    color: 'cyan',
  },
  {
    id: 'generate',
    tag: '02 · THE MUSCLE',
    title: '하이브리드 생성',
    desc: '컷마다 요구 난이도를 판단해 동적 라우터가 최적 모델에 실시간 배정합니다. 인물·복잡 모션은 Runway/Kling, 단순 풍경·턴테이블은 자체 호스팅 SVD로 비용을 최적화합니다.',
    stack: ['Runway Gen-3', 'Kling', 'Stable Video Diffusion', 'Redis Queue'],
    color: 'violet',
  },
  {
    id: 'post',
    tag: '03 · THE STUDIO',
    title: '딥컴포지팅 후반작업',
    desc: '업로드한 원본 롱폼도, 생성된 컷도 동일 엔진에서 마이크로 청킹으로 병렬 처리됩니다. 무음 제거, 스타일 클로닝, 공간 인식형 자막, BGM 드롭 싱크까지 자동 완성.',
    stack: ['FFmpeg', 'Depth Estimation AI', 'WebAudio API', 'OTIO Bridge'],
    color: 'magenta',
  },
  {
    id: 'distribute',
    tag: '04 · THE LAUNCH',
    title: '멀티플랫폼 배포',
    desc: '세로형 숏폼 3~5개 자동 파생, CTR 최적화 썸네일·제목 A/B 세트 생성, 캡컷·프리미어용 OTIO 어댑터 내보내기까지 한 번에.',
    stack: ['OTIO Adapter', 'S3 + CloudFront', 'Shorts Auto-Reframe', 'A/B Thumbnail'],
    color: 'amber',
  },
];

export const killerFeatures = [
  {
    icon: 'Sparkles',
    title: 'Zero-Editing 생성 엔진',
    desc: "목적(예: '인스타 신상품 홍보')과 로고·제품 사진만 넣으면 기획부터 렌더링까지 100% 무인화로 완성됩니다.",
    tag: 'OMNICAST Core',
  },
  {
    icon: 'Layers3',
    title: '마이크로 청킹 후반작업',
    desc: '1시간 영상을 1분 단위 60개 청크로 쪼개 스팟 인스턴스 워커가 병렬 처리, 컷 편집·자막 분석을 90초 내 완료합니다.',
    tag: 'FlowCut Engine',
  },
  {
    icon: 'Fingerprint',
    title: '유저 스타일 클로닝',
    desc: '크리에이터 고유의 편집 리듬·컷 타이밍·톤을 학습해, AI가 획일화되지 않은 "나만의 편집체"를 재현합니다.',
    tag: 'FlowCut Engine',
  },
  {
    icon: 'AudioLines',
    title: '오디오-비주얼 인텔리전스',
    desc: 'BGM의 드롭 구간을 컷 전환 타이밍에 정밀 매칭하고, 공간을 인식해 지나가는 사물 뒤로 자막이 자연스럽게 숨는 딥컴포지팅.',
    tag: 'OMNICAST Studio',
  },
  {
    icon: 'Recycle',
    title: '스마트 에셋 리사이클링',
    desc: '과거에 생성·업로드한 고품질 소스를 벡터 DB로 자산화, 분위기가 맞으면 재렌더링 없이 재활용해 크레딧 소모를 0으로.',
    tag: 'Vector DB',
  },
  {
    icon: 'TrendingUp',
    title: '실시간 트렌드 인젝션',
    desc: '틱톡·릴스의 최신 밈과 전환 방식을 지속 스크래핑해 RAG에 반영, "요즘 유행하는 스타일로"를 즉시 구현합니다.',
    tag: 'Trend RAG',
  },
  {
    icon: 'Smartphone',
    title: '멀티플랫폼 숏폼 변환',
    desc: '가로형 롱폼을 완성하면 버튼 한 번으로 스피커 트래킹 세로 크롭 + 하이라이트 추출로 숏폼 3~5개를 추가 생성합니다.',
    tag: 'FlowCut Engine',
  },
  {
    icon: 'HardDriveDownload',
    title: '로컬-클라우드 하이브리드 에이전트',
    desc: '데스크톱 미니 에이전트가 저화질 프록시만 업로드, 완성된 프로젝트를 로컬 원본 고화질에 자동 Relink — 업로드 대기 0에 수렴.',
    tag: 'Desktop Agent',
  },
  {
    icon: 'FileOutput',
    title: 'OTIO 범용 브릿지',
    desc: '캡컷·프리미어 프로젝트 파일 구조에 직접 종속되지 않는 OpenTimelineIO 표준 채택. NLE가 업데이트돼도 어댑터 하나로 전체 무결성 유지.',
    tag: 'Pixar/Netflix OSS',
  },
];

export const architectureStack = [
  { name: 'PostgreSQL', role: '결제 · 계정 · 구독 (ACID)', group: 'data' },
  { name: 'MongoDB', role: '타임라인 · 스토리보드 · OTIO JSON', group: 'data' },
  { name: 'Milvus / Pinecone', role: '벡터 시맨틱 검색 · RAG', group: 'data' },
  { name: 'Redis', role: '세션 · Job Queue · Rate Limit', group: 'infra' },
  { name: 'RabbitMQ / Kafka', role: '분산 워커 메시지 브로커', group: 'infra' },
  { name: 'AWS S3 + CloudFront', role: '에셋 저장 · 글로벌 CDN', group: 'infra' },
  { name: 'Claude 3.5 Sonnet', role: '고급 추론 · 스토리보드', group: 'ai' },
  { name: 'Llama-3 / Groq', role: '단순 작업 초저가 처리', group: 'ai' },
  { name: 'Runway Gen-3 / Kling', role: '고사실주의 인물·모션 생성', group: 'ai' },
  { name: 'Stable Video Diffusion', role: '자체 호스팅 미드티어 생성', group: 'ai' },
  { name: 'OpenTimelineIO', role: 'NLE 범용 브릿지 표준', group: 'ai' },
  { name: 'FFmpeg + Depth AI', role: '딥컴포지팅 · 공간 인식 자막', group: 'ai' },
];

export const pricingPlans = [
  {
    name: 'Free · BYO-Key',
    price: '0',
    unit: '평생 무료',
    desc: 'Groq·OpenRouter·Pexels·Pixabay 등 본인의 무료 API 키를 연결해 구독료 없이 사용하는 모드.',
    features: ['본인 무료 API 키 연동 (Groq/OpenRouter/Pexels/Pixabay)', 'Edge TTS 무료 AI 음성 내레이션', '저작권 안전 센터 무제한 이용', 'SD 화질 다운로드 무제한'],
    cta: '무료로 연동하기',
    highlight: false,
  },
  {
    name: 'Starter',
    price: '0',
    unit: '무료',
    desc: '스토리보드 기획은 무제한 무료. 다운로드할 때만 과금.',
    features: ['스토리보드 무제한 생성/수정', '워터마크 프리뷰 렌더링', 'SD 화질 다운로드 3회/월', '커뮤니티 템플릿 열람'],
    cta: '무료로 시작하기',
    highlight: false,
  },
  {
    name: 'Creator',
    price: '39,000',
    unit: '/월',
    desc: 'Pay-per-Success 크레딧 번들 + 우선 렌더 큐.',
    features: ['풀 HD/4K 워터마크 없는 다운로드', '월 120 렌더 크레딧 포함', '스타일 클로닝 프로필 3개', '숏폼 자동 변환 무제한', 'OTIO/캡컷/프리미어 내보내기'],
    cta: '크리에이터 시작하기',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '화이트라벨',
    desc: '광고 대행사·쇼핑몰 플랫폼을 위한 API/SDK + 커스텀 대시보드.',
    features: ['화이트라벨 API/SDK 제공', '전용 GPU 렌더 파티션', 'RBAC · SSO · 감사 로그', '전담 솔루션 엔지니어', 'SLA 99.9% 보장'],
    cta: '영업팀 문의',
    highlight: false,
  },
];

export const dashboardStats = [
  { label: '이번 달 생성', value: '128', delta: '+18%', icon: 'Clapperboard' },
  { label: '렌더 크레딧 잔여', value: '2,340', delta: '-6%', icon: 'Gem' },
  { label: '평균 완성 시간', value: '3분 12초', delta: '-42%', icon: 'Timer' },
  { label: '재활용 절감 크레딧', value: '860', delta: '+31%', icon: 'Recycle' },
];

export type ProjectStatus = 'rendering' | 'ready' | 'draft' | 'queued';

export const dashboardProjects: {
  id: string;
  title: string;
  status: ProjectStatus;
  progress: number;
  platform: string;
  updated: string;
  duration: string;
  gradient: string;
}[] = [
  { id: 'p1', title: '신상 스니커즈 런칭 릴스', status: 'rendering', progress: 64, platform: 'Instagram Reels', updated: '2분 전', duration: '0:32', gradient: 'from-cyan-500/30 to-violet-500/30' },
  { id: 'p2', title: '7월 브이로그 — 제주도 촬영본', status: 'ready', progress: 100, platform: 'YouTube Long-form', updated: '18분 전', duration: '14:02', gradient: 'from-violet-500/30 to-magenta-500/30' },
  { id: 'p3', title: '뷰티 신제품 언박싱 숏폼 세트', status: 'queued', progress: 0, platform: 'TikTok / Shorts', updated: '41분 전', duration: '0:45 ×4', gradient: 'from-magenta-500/30 to-amber-500/30' },
  { id: 'p4', title: '카페 브랜드 무드필름', status: 'draft', progress: 12, platform: 'Instagram Feed', updated: '1시간 전', duration: '1:10', gradient: 'from-amber-500/30 to-cyan-500/30' },
  { id: 'p5', title: '가전제품 사용법 튜토리얼', status: 'ready', progress: 100, platform: 'YouTube Shorts', updated: '3시간 전', duration: '0:58', gradient: 'from-cyan-500/30 to-magenta-500/30' },
  { id: 'p6', title: '겨울 신메뉴 프로모션 티저', status: 'rendering', progress: 27, platform: 'Instagram Reels', updated: '5시간 전', duration: '0:20', gradient: 'from-violet-500/30 to-cyan-500/30' },
];

export const activityFeed = [
  { id: 1, text: '스타일 클로닝 프로필 "제주 브이로그체" 학습이 완료되었습니다.', time: '3분 전', icon: 'Fingerprint' },
  { id: 2, text: '"신상 스니커즈 런칭 릴스" 컷 12개가 Runway Gen-3로 라우팅되었습니다.', time: '9분 전', icon: 'Route' },
  { id: 3, text: '에셋 리사이클링으로 렌더 크레딧 40 절감했습니다.', time: '26분 전', icon: 'Recycle' },
  { id: 4, text: '"뷰티 신제품 언박싱" 숏폼 4개가 큐에 등록되었습니다.', time: '41분 전', icon: 'ListVideo' },
  { id: 5, text: '캡컷 내보내기(OTIO 어댑터) 변환이 완료되었습니다.', time: '1시간 전', icon: 'FileOutput' },
];

export const storyboardScenes = [
  {
    id: 's1',
    scene: 'Scene 01',
    title: '제품 클로즈업 — 조명 반사',
    shot: 'Macro / Slow Push-in',
    duration: '3.2s',
    model: 'Runway Gen-3',
    tier: 'High-tier',
    prompt: '스튜디오 조명 아래 스니커즈 표면의 소재 질감이 살아있는 매크로 클로즈업, 부드러운 카메라 푸시인',
  },
  {
    id: 's2',
    scene: 'Scene 02',
    title: '모델 워킹 — 도심 배경',
    shot: 'Tracking / Full-body',
    duration: '4.5s',
    model: 'Kling',
    tier: 'High-tier',
    prompt: '도심 크로스워크를 걷는 모델의 다이나믹한 트래킹 샷, 자연광, 실사 질감',
  },
  {
    id: 's3',
    scene: 'Scene 03',
    title: '제품 턴테이블 360°',
    shot: 'Turntable / Static BG',
    duration: '2.8s',
    model: 'Stable Video Diffusion',
    tier: 'Mid-tier',
    prompt: '깔끔한 그라디언트 배경 위 제품 360도 턴테이블 회전, 스튜디오 라이팅',
  },
  {
    id: 's4',
    scene: 'Scene 04',
    title: '브랜드 로고 아웃트로',
    shot: 'Motion Graphic',
    duration: '1.5s',
    model: 'Stable Video Diffusion',
    tier: 'Mid-tier',
    prompt: '미니멀 그라디언트 배경에 로고가 서서히 드러나는 모션 그래픽 아웃트로',
  },
  {
    id: 's5',
    scene: 'Scene 05',
    title: '착용 디테일 — 발걸음',
    shot: 'Low-angle / Handheld',
    duration: '3.0s',
    model: 'Runway Gen-3',
    tier: 'High-tier',
    prompt: '로우 앵글에서 포착한 신발 착용 디테일, 자연스러운 핸드헬드 흔들림',
  },
];

export const timelineTracks = [
  {
    id: 't-video',
    label: '비디오',
    type: 'video',
    clips: [
      { id: 'c1', start: 0, width: 18, label: 'Scene 01', color: 'from-cyan-500/70 to-cyan-500/40' },
      { id: 'c2', start: 18, width: 24, label: 'Scene 02', color: 'from-violet-500/70 to-violet-500/40' },
      { id: 'c3', start: 42, width: 15, label: 'Scene 03', color: 'from-magenta-500/70 to-magenta-500/40' },
      { id: 'c4', start: 57, width: 20, label: 'Scene 04', color: 'from-cyan-500/70 to-cyan-500/40' },
      { id: 'c5', start: 77, width: 20, label: 'Scene 05', color: 'from-amber-500/70 to-amber-500/40' },
    ],
  },
  {
    id: 't-caption',
    label: '공간인식 자막',
    type: 'caption',
    clips: [
      { id: 'cap1', start: 4, width: 12, label: '"완벽한 핏감"', color: 'from-emerald-400/60 to-emerald-400/30' },
      { id: 'cap2', start: 22, width: 16, label: '"도심 속으로"', color: 'from-emerald-400/60 to-emerald-400/30' },
      { id: 'cap3', start: 60, width: 14, label: '"NEW ARRIVAL"', color: 'from-emerald-400/60 to-emerald-400/30' },
    ],
  },
  {
    id: 't-audio',
    label: 'BGM · 드롭 싱크',
    type: 'audio',
    clips: [
      { id: 'a1', start: 0, width: 97, label: 'Synthwave Drive — Drop @ 0:42', color: 'from-fuchsia-400/50 to-fuchsia-400/20' },
    ],
  },
];

export const libraryAssets = [
  { id: 'a1', title: '제주 해안도로 드론샷', kind: 'B-roll', tags: ['자연', '드론', '여름'], score: 0.94, gradient: 'from-cyan-500/40 to-void-800' },
  { id: 'a2', title: '카페 라떼아트 클로즈업', kind: 'B-roll', tags: ['카페', '음식', '매크로'], score: 0.91, gradient: 'from-amber-500/40 to-void-800' },
  { id: 'a3', title: '스니커즈 스튜디오 컷 세트', kind: '생성 자산', tags: ['제품', '패션'], score: 0.97, gradient: 'from-violet-500/40 to-void-800' },
  { id: 'a4', title: '도심 야경 타임랩스', kind: 'B-roll', tags: ['도시', '야경', '타임랩스'], score: 0.88, gradient: 'from-magenta-500/40 to-void-800' },
  { id: 'a5', title: '손 제스처 UI 데모', kind: '업로드 원본', tags: ['테크', '제스처'], score: 0.85, gradient: 'from-cyan-500/40 to-void-800' },
  { id: 'a6', title: '가을 단풍 워크스루', kind: 'B-roll', tags: ['자연', '가을'], score: 0.9, gradient: 'from-amber-500/40 to-void-800' },
  { id: 'a7', title: '뷰티 언박싱 핸드샷', kind: '생성 자산', tags: ['뷰티', '언박싱'], score: 0.93, gradient: 'from-violet-500/40 to-void-800' },
  { id: 'a8', title: '헬스장 트레이닝 몽타주', kind: '업로드 원본', tags: ['피트니스', '모션'], score: 0.87, gradient: 'from-magenta-500/40 to-void-800' },
];

// 저작권 안전 센터 — 에셋별 출처/라이선스 메타데이터 (실제 배포 전 저작권 위험을 사전 검증)
export const assetLicenses: import('./types').AssetLicense[] = [
  { assetId: 'a1', assetKind: 'video', sourceName: 'Pexels', licenseType: 'Pexels License (무료 상업적 이용)', author: 'Taryn Elliott', sourceUrl: 'https://www.pexels.com/ko-kr/', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'a2', assetKind: 'video', sourceName: 'Pixabay', licenseType: 'Pixabay License (출처 표기 권장)', author: 'Community Creator', sourceUrl: 'https://pixabay.com/', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'a3', assetKind: 'video', sourceName: 'OMNICAST 생성 자산', licenseType: 'AI 생성물 — 플랫폼 라이선스 귀속', author: 'Stable Video Diffusion', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'a4', assetKind: 'video', sourceName: 'Pexels', licenseType: 'Pexels License (무료 상업적 이용)', author: 'Kelly Lacy', sourceUrl: 'https://www.pexels.com/ko-kr/', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'a5', assetKind: 'video', sourceName: '사용자 업로드', licenseType: '원본 소유권 확인 필요', author: '사용자 계정', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'caution' },
  { assetId: 'a6', assetKind: 'video', sourceName: 'Pixabay', licenseType: 'Pixabay License (출처 표기 권장)', author: 'Community Creator', sourceUrl: 'https://pixabay.com/', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'a7', assetKind: 'video', sourceName: 'OMNICAST 생성 자산', licenseType: 'AI 생성물 — 플랫폼 라이선스 귀속', author: 'Runway Gen-3', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'a8', assetKind: 'video', sourceName: '사용자 업로드', licenseType: '원본 소유권 확인 필요', author: '사용자 계정', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'caution' },
  { assetId: 'bgm1', assetKind: 'audio', sourceName: 'OMNICAST 로열티프리 라이브러리', licenseType: 'Royalty-Free (전 세계 상업적 이용)', author: 'Synthwave Drive', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'bgm2', assetKind: 'audio', sourceName: '외부 스트리밍 음원 (미검증)', licenseType: '저작권 등록곡 — 상업적 이용 시 라이선스 필요', author: 'Unknown Label', sourceUrl: '#', attributionRequired: true, commercialUseAllowed: false, risk: 'blocked' },
  { assetId: 'voice1', assetKind: 'voice', sourceName: 'Edge TTS', licenseType: 'Microsoft 무료 사용 정책', author: 'Neural Voice — Sun-Hi', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
  { assetId: 'voice2', assetKind: 'voice', sourceName: 'Supertonic (오픈소스)', licenseType: 'Apache 2.0', author: 'Neural Voice — Local', sourceUrl: '#', attributionRequired: false, commercialUseAllowed: true, risk: 'safe' },
];

export const marketplaceTemplates = [
  { id: 'm1', title: '틱톡 언박싱 훅 3초 컷', author: '@studio_kate', price: '4,900', sales: 1284, rating: 4.9, gradient: 'from-cyan-500/35 to-void-800' },
  { id: 'm2', title: '뷰티 Before/After 트랜지션', author: '@glow.editor', price: '6,900', sales: 963, rating: 4.8, gradient: 'from-magenta-500/35 to-void-800' },
  { id: 'm3', title: '브이로그 감성 색보정 프리셋', author: '@filmy.jun', price: '3,900', sales: 2110, rating: 5.0, gradient: 'from-amber-500/35 to-void-800' },
  { id: 'm4', title: '제품 런칭 카운트다운 템플릿', author: '@motion.lab', price: '8,900', sales: 742, rating: 4.7, gradient: 'from-violet-500/35 to-void-800' },
  { id: 'm5', title: '쇼핑몰 신상 릴스 스토리보드', author: '@ecom.creative', price: '5,900', sales: 1567, rating: 4.9, gradient: 'from-cyan-500/35 to-void-800' },
  { id: 'm6', title: '푸드 ASMR 사운드 싱크 팩', author: '@tastelab', price: '7,400', sales: 588, rating: 4.6, gradient: 'from-magenta-500/35 to-void-800' },
];

export const trustLogos = ['ZARA STUDIO', 'NEONMART', 'CAFE ORBIT', 'LUMEN BEAUTY', 'DRIFT SNEAKERS', 'HANA COMMERCE'];

export const heroStats = [
  { label: '평균 제작 시간 단축', value: '92%' },
  { label: 'API 처리 비용 절감', value: '80%' },
  { label: '월간 자동 생성 영상', value: '1.2M+' },
  { label: '동시 처리 워커', value: '60x' },
];

export const projectTimelines: Record<string, typeof timelineTracks> = {
  p1: timelineTracks, // 신상 스니커즈 런칭 릴스 (0:32)
  p2: [ // 7월 브이로그 — 제주도 촬영본 (14:02)
    {
      id: 't-video',
      label: '비디오',
      type: 'video',
      clips: [
        { id: 'c1', start: 0, width: 25, label: '제주공항 도착 및 렌터카 인수', color: 'from-cyan-500/70 to-cyan-500/40' },
        { id: 'c2', start: 25, width: 35, label: '함덕 해수욕장 드론 뷰', color: 'from-violet-500/70 to-violet-500/40' },
        { id: 'c3', start: 60, width: 20, label: '감성 에어비앤비 체크인', color: 'from-magenta-500/70 to-magenta-500/40' },
        { id: 'c4', start: 80, width: 20, label: '서귀포 흑돼지 저녁 식사', color: 'from-amber-500/70 to-amber-500/40' },
      ],
    },
    {
      id: 't-caption',
      label: '공간인식 자막',
      type: 'caption',
      clips: [
        { id: 'cap1', start: 5, width: 15, label: '"드디어 제주도 도착!"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap2', start: 30, width: 20, label: '"에메랄드빛 함덕 바다"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap3', start: 65, width: 12, label: '"취향 저격 숙소"', color: 'from-emerald-400/60 to-emerald-400/30' },
      ],
    },
    {
      id: 't-audio',
      label: 'BGM · 오디오',
      type: 'audio',
      clips: [
        { id: 'a1', start: 0, width: 100, label: 'Acoustic Island Folk Song (Looped)', color: 'from-fuchsia-400/50 to-fuchsia-400/20' },
      ],
    },
  ],
  p3: [ // 뷰티 신제품 언박싱 숏폼 세트 (0:45)
    {
      id: 't-video',
      label: '비디오',
      type: 'video',
      clips: [
        { id: 'c1', start: 0, width: 15, label: '패키지 오프닝 훅', color: 'from-magenta-500/70 to-magenta-500/40' },
        { id: 'c2', start: 15, width: 40, label: '제형 테스트 및 발색 샷', color: 'from-cyan-500/70 to-cyan-500/40' },
        { id: 'c3', start: 55, width: 30, label: '메이크업 적용 전후 비교', color: 'from-violet-500/70 to-violet-500/40' },
        { id: 'c4', start: 85, width: 15, label: '로고 아웃트로', color: 'from-amber-500/70 to-amber-500/40' },
      ],
    },
    {
      id: 't-caption',
      label: '공간인식 자막',
      type: 'caption',
      clips: [
        { id: 'cap1', start: 2, width: 10, label: '"이 조합 실화인가요?"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap2', start: 20, width: 25, label: '"끈적임 없는 워터리 텍스처"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap3', start: 58, width: 20, label: '"자연스러운 광채 완성!"', color: 'from-emerald-400/60 to-emerald-400/30' },
      ],
    },
    {
      id: 't-audio',
      label: 'BGM · 오디오',
      type: 'audio',
      clips: [
        { id: 'a1', start: 0, width: 100, label: 'Pop Bubblegum Dance - Beat Match', color: 'from-fuchsia-400/50 to-fuchsia-400/20' },
      ],
    },
  ],
  p4: [ // 카페 브랜드 무드필름 (1:10)
    {
      id: 't-video',
      label: '비디오',
      type: 'video',
      clips: [
        { id: 'c1', start: 0, width: 30, label: '원두 그라인딩 & 샷 추출 매크로', color: 'from-amber-500/70 to-amber-500/40' },
        { id: 'c2', start: 30, width: 40, label: '따뜻한 우유 스팀 및 라떼아트', color: 'from-cyan-500/70 to-cyan-500/40' },
        { id: 'c3', start: 70, width: 30, label: '매장 인테리어 슬로우 팬', color: 'from-violet-500/70 to-violet-500/40' },
      ],
    },
    {
      id: 't-caption',
      label: '공간인식 자막',
      type: 'caption',
      clips: [
        { id: 'cap1', start: 10, width: 15, label: '"신선한 원두의 깊은 향"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap2', start: 40, width: 20, label: '"마음을 녹이는 라떼아트"', color: 'from-emerald-400/60 to-emerald-400/30' },
      ],
    },
    {
      id: 't-audio',
      label: 'BGM · 오디오',
      type: 'audio',
      clips: [
        { id: 'a1', start: 0, width: 100, label: 'Warm Lo-Fi Jazz Cafe', color: 'from-fuchsia-400/50 to-fuchsia-400/20' },
      ],
    },
  ],
  p5: [ // 가전제품 사용법 튜토리얼 (0:58)
    {
      id: 't-video',
      label: '비디오',
      type: 'video',
      clips: [
        { id: 'c1', start: 0, width: 15, label: '가전 외관 및 스펙 오버뷰', color: 'from-cyan-500/70 to-cyan-500/40' },
        { id: 'c2', start: 15, width: 30, label: '핵심 스마트 필터 교체법', color: 'from-violet-500/70 to-violet-500/40' },
        { id: 'c3', start: 45, width: 35, label: '모바일 앱 동기화 및 IoT 제어', color: 'from-magenta-500/70 to-magenta-500/40' },
        { id: 'c4', start: 80, width: 20, label: '세척 및 주의사항 요약', color: 'from-amber-500/70 to-amber-500/40' },
      ],
    },
    {
      id: 't-caption',
      label: '공간인식 자막',
      type: 'caption',
      clips: [
        { id: 'cap1', start: 20, width: 20, label: '"원터치로 간편한 필터 세척"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap2', start: 50, width: 25, label: '"스마트폰으로 실시간 상태 확인"', color: 'from-emerald-400/60 to-emerald-400/30' },
      ],
    },
    {
      id: 't-audio',
      label: 'BGM · 오디오',
      type: 'audio',
      clips: [
        { id: 'a1', start: 0, width: 100, label: 'Corporate Tech Ambient', color: 'from-fuchsia-400/50 to-fuchsia-400/20' },
      ],
    },
  ],
  p6: [ // 겨울 신메뉴 프로모션 티저 (0:20)
    {
      id: 't-video',
      label: '비디오',
      type: 'video',
      clips: [
        { id: 'c1', start: 0, width: 30, label: '김이 모락모락 피어나는 신메뉴', color: 'from-violet-500/70 to-violet-500/40' },
        { id: 'c2', start: 30, width: 45, label: '치즈가 흘러내리는 익스트림 샷', color: 'from-magenta-500/70 to-magenta-500/40' },
        { id: 'c3', start: 75, width: 25, label: '1+1 겨울 한정 특가 안내', color: 'from-cyan-500/70 to-cyan-500/40' },
      ],
    },
    {
      id: 't-caption',
      label: '공간인식 자막',
      type: 'caption',
      clips: [
        { id: 'cap1', start: 2, width: 10, label: '"올 겨울 가장 따뜻하게"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap2', start: 32, width: 15, label: '"진한 풍미의 눈꽃 치즈"', color: 'from-emerald-400/60 to-emerald-400/30' },
        { id: 'cap3', start: 78, width: 15, label: '"단 10일간의 특별 혜택!"', color: 'from-emerald-400/60 to-emerald-400/30' },
      ],
    },
    {
      id: 't-audio',
      label: 'BGM · 오디오',
      type: 'audio',
      clips: [
        { id: 'a1', start: 0, width: 100, label: 'Dynamic Electro Beat drop', color: 'from-fuchsia-400/50 to-fuchsia-400/20' },
      ],
    },
  ],
  demo: timelineTracks, // 동적 생성 프로젝트 폴백용 기본 트랙
};

