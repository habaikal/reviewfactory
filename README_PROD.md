# ReviewFactory OS v2.0 - PRODUCTION 배포 가이드

## 1. Cloudflare R2 설정 (MinIO 대체)

왜 R2? 
- MinIO는 로컬에서 S3 egress 비용이 0원이지만, 운영시에는 R2가 egress 무료라서 영상 전송비가 0원
- 1TB 영상 전송해도 $0

### R2 버킷 생성

1. Cloudflare Dashboard > R2 > Create Bucket
   - Bucket Name: `reviewfactory-prod`
   - Location: APAC (서울 근처)

2. R2 API Token 생성
   - R2 > Manage R2 API Tokens > Create API Token
   - Permissions: Object Read & Write
   - TTL: 영구

3. Public URL 활성화
   - Bucket > Settings > Public Access > Allow
   - Custom Domain 연결 권장: `video.reviewfactory.com` -> R2 버킷 연결
   - 이렇게 하면 `https://video.reviewfactory.com/xxx.mp4` 로 바로 접근 가능

4. CORS 설정 (R2 > Settings > CORS)
```json
[
  {
    "AllowedOrigins": ["https://reviewfactory.com", "http://localhost:3000"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedHeaders": ["*"]
  }
]
```

`.env.prod`에 값 입력:
```
R2_ACCOUNT_ID=abc123
R2_ENDPOINT=https://abc123.r2.cloudflarestorage.com
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_BUCKET=reviewfactory-prod
R2_PUBLIC_DOMAIN=video.reviewfactory.com
```

---

## 2. 프로덕션 배포 - 2가지 방법

### 방법 A: 로컬 서버 / 자체 GPU 서버 (docker-compose.prod.yml)

가장 간단. GPU 1대 있는 서버에서:

```bash
cp .env.prod.example .env.prod
# .env.prod 값 입력

docker compose -f docker-compose.prod.yml --env-file .env.prod up --build -d

# 로그 확인
docker compose -f docker-compose.prod.yml logs -f backend
```

장점: 완전 제어, 비용 최저
단점: 서버 관리 필요

### 방법 B: RunPod Pod 배포 (추천 - 1분만에 GPU 확보)

RunPod는 GPU를 시간당 $0.8에 빌려주는 서비스. 우리 공장은 GPU가 필요하므로 RunPod이 가성비 최강.

**Step 1: All-in-One 이미지 빌드 & 푸시**

```bash
# DockerHub 로그인
docker login

# All-in-One 빌드 (20분 소요, 모델 제외 10GB)
docker build -f Dockerfile.all-in-one -t yourhub/reviewfactory-allinone:v2.0 .
docker push yourhub/reviewfactory-allinone:v2.0
```

**Step 2: RunPod Network Volume 생성 (모델 저장용)**

- RunPod Dashboard > Network Volumes > Create
- Name: `reviewfactory-models`
- Size: 80GB
- Region: US (A100 저렴) 또는 EU

Pod 내부에서 최초 1회 모델 다운로드:

```bash
# Pod 접속 후
mkdir -p /runpod-volume/models/diffusion_models
wget -O /runpod-volume/models/diffusion_models/flux1-dev.safetensors https://huggingface.co/black-forest-labs/FLUX.1-dev/resolve/main/flux1-dev.safetensors
```

**Step 3: RunPod Template 생성**

- RunPod Dashboard > Templates > Create Template
- Container Image: `yourhub/reviewfactory-allinone:v2.0`
- Container Disk: 30GB
- Volume: `reviewfactory-models` -> `/runpod-volume`
- Ports: 8000, 8188, 3000, 8001
- Env: `.env.prod` 내용 붙여넣기
- `runpod.toml` 파일 참고 (이 파일이 템플릿 정의서)

**Step 4: Pod 배포**

- Pods > Deploy > 선택한 템플릿 > A100 40GB 선택 > Deploy
- 2분 후 `https://your-pod-id-8000.proxy.runpod.net/docs` 에서 API 확인

**Step 5: 도메인 연결 (선택)**

- RunPod Pod는 proxy URL이 매번 바뀜. 운영시에는 Cloudflare Tunnel로 고정 도메인 연결:
```bash
cloudflared tunnel --url http://localhost:8000
# -> https://api.reviewfactory.com 으로 고정
```

---

## 3. 비용 시뮬레이션 (프로덕션)

| 항목 | 스펙 | 비용 |
|------|------|------|
| RunPod A100 40GB Spot | 24시간 가동 | $0.8/h * 720h = $576/월 |
| Cloudflare R2 | 1TB 저장 + 10TB 전송 | 저장 $15 + 전송 $0 (무료) = $15/월 |
| Neon Postgres | 10GB | $19/월 |
| **합계** | 하루 200개 영상 공장 | **약 $610/월** |

영상 1개 원가: $610 / (200개*30일) = **$0.10**

SaaS로 19,900원에 50개 팔면: 50개 * 400명 = 2,000만원 매출 / 원가 80만원 = 마진 96%

---

## 4. 운영 체크리스트

- [ ] R2 Public URL에서 MP4 바로 재생되는지 확인
- [ ] vLLM prefix caching 켜져 있는지 (속도 2배)
- [ ] ComfyUI 모델이 Network Volume에 캐시되어 재부팅시에도 유지되는지
- [ ] Backend Sentry 연동 (에러 트래킹)
- [ ] Remotion 렌더 완료 후 R2 업로드 확인

이제 `docker compose -f docker-compose.prod.yml --env-file .env.prod up -d` 하면 진짜 공장이 돌아갑니다.
