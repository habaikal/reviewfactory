"""
ReviewFactory Backend - main.py
vLLM + ComfyUI + Remotion 오케스트레이터
"""

from fastapi import FastAPI, BackgroundTasks, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import httpx
import uuid
import json
import boto3
from botocore.client import Config

# 우리가 만든 멀티 플랫폼 링크 생성기 임포트
from affiliate_link_generator import AffiliateLinkFactory, ProductInput

app = FastAPI(title="ReviewFactory OS v2.0 - Factory API", version="2.0")

# 설정
VLLM_URL = os.getenv("VLLM_API_URL", "http://vllm:8000/v1")
COMFYUI_URL = os.getenv("COMFYUI_URL", "http://comfyui:8188")
S3_ENDPOINT = os.getenv("S3_ENDPOINT")
S3_BUCKET = os.getenv("S3_BUCKET", "reviewfactory")

s3_client = boto3.client('s3',
    endpoint_url=S3_ENDPOINT,
    aws_access_key_id=os.getenv("S3_ACCESS_KEY"),
    aws_secret_access_key=os.getenv("S3_SECRET_KEY"),
    config=Config(signature_version='s3v4'),
    region_name='us-east-1'
)

factory = AffiliateLinkFactory(config={
    "coupang_affiliate_id": os.getenv("COUPANG_AFFILIATE_ID", "DEMO"),
    "toss_referral_code": os.getenv("TOSS_REFERRAL_CODE", "DEMO"),
    "amazon_tag": os.getenv("AMAZON_TAG", "reviewfactory-20"),
    "shopify_store": os.getenv("SHOPIFY_STORE", "demo.myshopify.com"),
})

class GenerateRequest(BaseModel):
    product_url: str
    platform: str = "all"  # all | coupang | toss | amazon | etc
    template: str = "hook"  # hook | comparison | ugc
    sub_id: str = "rf_001"

class GenerateResponse(BaseModel):
    job_id: str
    status: str
    affiliate_links: dict
    estimated_revenue: dict

@app.get("/health")
def health():
    return {"status": "ok", "vllm": VLLM_URL, "comfyui": COMFYUI_URL}

@app.post("/api/generate", response_model=GenerateResponse)
async def generate_video(req: GenerateRequest, bg: BackgroundTasks):
    """
    URL 1개 넣으면 -> 리뷰 분석(vLLM) -> 이미지 생성(ComfyUI) -> 링크 생성 -> Remotion 렌더 큐에 넣기
    """
    job_id = str(uuid.uuid4())
    
    # 1. 링크 생성 (동기, 빠름)
    product = ProductInput(original_url=req.product_url)
    try:
        if req.platform == "all":
            links = factory.generate_all(product, sub_id=req.sub_id)
        else:
            links = {req.platform: factory.generate(req.platform, product, req.sub_id)}
    except Exception as e:
        raise HTTPException(400, f"링크 생성 실패: {e}")

    affiliate_urls = {k: v.affiliate_url for k, v in links.items()}
    disclosures = {k: v.disclosure for k, v in links.items()}
    revenue = {k: factory.estimate_revenue(1000, k, 89000) for k in links}

    # 2. 백그라운드에서 무거운 작업: 리뷰 분석 + 영상 생성
    bg.add_task(process_video_job, job_id, req, links)

    return GenerateResponse(
        job_id=job_id,
        status="queued",
        affiliate_links=affiliate_urls,
        estimated_revenue=revenue
    )

async def process_video_job(job_id: str, req: GenerateRequest, links: dict):
    """
    실제 공장 라인
    """
    print(f"[{job_id}] 시작: {req.product_url}")
    
    # Step 1: vLLM으로 리뷰 분석 (여기서는 Mock, 실제로는 크롤링 + LLM 호출)
    # async with httpx.AsyncClient() as client:
    #     resp = await client.post(f"{VLLM_URL}/chat/completions", json={...})
    
    insights = {
        "pros": [
            {"aspect": "흡입력", "summary": "머리카락까지 싹 빨림", "count": 47},
            {"aspect": "무게", "summary": "1.2kg 한손 청소", "count": 38},
            {"aspect": "가성비", "summary": "이 가격에 미쳤다", "count": 52},
        ],
        "cons": [{"aspect": "소음", "summary": "새벽엔 못 쓸 정도", "count": 21}],
        "verdict": "자취생 가성비 끝판"
    }

    # Step 2: ComfyUI로 이미지 생성 (Flux)
    # await trigger_comfyui_workflow(product_url)

    # Step 3: Remotion 렌더러에 요청
    async with httpx.AsyncClient(timeout=300) as client:
        try:
            # 가장 수익 높은 플랫폼 선택
            best_platform = max(links.items(), key=lambda x: factory.estimate_revenue(1000, x[0], 89000))[0]
            best = links[best_platform]
            
            payload = {
                "job_id": job_id,
                "platform": best_platform,
                "product": {
                    "title": "샤오미 핸디 청소기",
                    "price": 89000,
                    "rating": 4.7,
                    "reviewCount": 2847,
                    "images": ["https://image6.coupangcdn.com/image/1.jpg"]
                },
                "insights": insights,
                "affiliateUrl": best.affiliate_url,
                "disclosure": best.disclosure,
                "isDirectTag": best.is_direct_tag
            }
            # Remotion 서비스로 전달
            await client.post("http://remotion:3001/render", json=payload)
            print(f"[{job_id}] Remotion 큐 전달 완료")
        except Exception as e:
            print(f"[{job_id}] 렌더 실패: {e}")

@app.get("/api/jobs/{job_id}")
def get_job(job_id: str):
    # 실제로는 Redis나 DB에서 조회
    return {"job_id": job_id, "status": "rendering", "progress": 65}

# 크롤링 엔드포인트 (Playwright)
@app.post("/api/scrape")
async def scrape_product(url: str):
    # 운영시에는 별도 worker로 분리
    # from playwright.async_api import async_playwright
    # async with async_playwright() as p: ...
    return {"url": url, "title": "Mock Product", "price": 89000, "reviews": 100}
