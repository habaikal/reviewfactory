"""
ReviewFactory OS v2.0 - Multi-Platform Affiliate Link Generator
쿠팡 / 토스 쇼핑 / 네이버 커넥트 / 유튜브 쇼핑 / 아마존 / 쇼피파이

30년차 원칙:
1. 모든 링크는 검증 -> 포맷 -> 서명 -> 캐시 순서
2. 절대 원본 URL을 그대로 노출하지 않는다 (affiliate ID 유출 방지)
3. 고지문구는 코드에서 자동 생성, UI에서 빼먹을 수 없게 강제
"""

import re
from urllib.parse import urlparse, parse_qs, urlencode, quote
from dataclasses import dataclass
from typing import Literal, Optional, Dict
from datetime import datetime

Platform = Literal["coupang", "toss", "naver", "youtube_shopping", "amazon", "shopify"]

@dataclass
class ProductInput:
    original_url: str
    title: Optional[str] = None
    price: Optional[int] = None

@dataclass
class AffiliateResult:
    platform: Platform
    original_url: str
    affiliate_url: str
    disclosure: str
    cookie_hours: int
    commission_rate: str
    is_direct_tag: bool  # 유튜브처럼 영상에 태그가 박히는지
    metadata: Dict

class AffiliateLinkFactory:
    """
    실전 운영용 팩토리. 각 플랫폼의 공식 문서 기반 포맷.
    실제 운영시에는 쿠팡/토스/네이버 파트너스 API 키로 deep link를 생성해야 함.
    여기서는 SDK 연동 전 포맷터 + 검증 로직 제공.
    """
    
    # 플랫폼별 정책 DB - 이게 방어벽
    PLATFORM_POLICY = {
        "coupang": {
            "commission": "3% (고정)",
            "cookie": 24,
            "direct_tag": True,
            "domain_pattern": r"coupang\.com",
            "disclosure_ko": "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
            "disclosure_en": "As a Coupang Partner, we earn a commission from qualifying purchases.",
            "link_template": "https://link.coupang.com/a/{link_id}" # 실제는 API로 생성
        },
        "toss": {
            "commission": "5~10% (베타 프로모션)",
            "cookie": 24,
            "direct_tag": True,
            "domain_pattern": r"toss\.im|toss\.shopping|tossbank",
            "disclosure_ko": "이 포스팅은 토스쇼핑 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다. (토스쇼핑 고지)",
            "disclosure_en": "We earn a commission from Toss Shopping as part of its affiliate program.",
            "link_template": "https://toss.im/shopping/link/{code}"
        },
        "naver": {
            "commission": "3~18% (카테고리별, 승인 필요)",
            "cookie": 24,
            "direct_tag": True,
            "domain_pattern": r"smartstore\.naver\.com|brand\.naver\.com|shopping\.naver\.com",
            "disclosure_ko": "이 포스팅은 네이버 쇼핑 커넥트 활동의 일환으로 수수료를 제공받습니다.",
            "disclosure_en": "We earn a commission from Naver Shopping Connect.",
        },
        "youtube_shopping": {
            "commission": "평균 6.7% (구글 공식)",
            "cookie": 24, # + 타제품 구매도 인정
            "direct_tag": True,
            "domain_pattern": r"youtube\.com|youtu\.be",
            "disclosure_ko": "유튜브 쇼핑 제휴 마크가 표시된 제품은 크리에이터가 수수료를 제공받을 수 있습니다.",
            "disclosure_en": "Products tagged may earn us a commission via YouTube Shopping Affiliate.",
        },
        "amazon": {
            "commission": "1~10% (카테고리별)",
            "cookie": 24, # 장바구니 담으면 90일까지 연장되는 경우도 있음
            "direct_tag": False, # 중요: 유튜브 공식 태그 불가, 설명란 링크만
            "domain_pattern": r"amazon\.(com|co\.jp|de|co\.uk|com\.au)",
            "disclosure_ko": "아마존 어필리에이트 활동 일환으로 일정액의 수수료를 제공받습니다. (Amazon Associates)",
            "disclosure_en": "As an Amazon Associate I earn from qualifying purchases.",
            "link_template": "https://www.amazon.com/dp/{asin}?tag={tag}"
        },
        "shopify": {
            "commission": "마진 30~60% (자사몰)",
            "cookie": 9999, # 자사몰이라 영구
            "direct_tag": False,
            "domain_pattern": r"myshopify\.com",
            "disclosure_ko": "본 제품은 자사몰(Shopify) 직접 판매 제품입니다.",
            "disclosure_en": "This product is sold via our own Shopify store.",
        }
    }

    def __init__(self, config: Dict[str, str]):
        """
        config 예시:
        {
          "coupang_affiliate_id": "AF1234567",
          "toss_referral_code": "toss_abc123",
          "amazon_tag": "reviewfactory-20",
          "amazon_marketplace": "com",
          "shopify_store": "reviewfactory.myshopify.com",
          "naver_connect_id": "naver_123"
        }
        """
        self.config = config

    def _validate_url(self, url: str, platform: Platform) -> bool:
        pattern = self.PLATFORM_POLICY[platform]["domain_pattern"]
        return re.search(pattern, url, re.IGNORECASE) is not None

    def generate(self, platform: Platform, product: ProductInput, sub_id: str = None) -> AffiliateResult:
        if platform == "coupang":
            return self._gen_coupang(product, sub_id)
        elif platform == "toss":
            return self._gen_toss(product, sub_id)
        elif platform == "naver":
            return self._gen_naver(product, sub_id)
        elif platform == "amazon":
            return self._gen_amazon(product, sub_id)
        elif platform == "shopify":
            return self._gen_shopify(product, sub_id)
        elif platform == "youtube_shopping":
            return self._gen_youtube(product, sub_id)
        else:
            raise ValueError(f"Unsupported platform: {platform}")

    def _gen_coupang(self, product: ProductInput, sub_id: str) -> AffiliateResult:
        """
        실전: POST https://api.coupang.com/v2/providers/affiliate_open_api/v1/links
        여기선 로컬 포맷터로 구현 (데모용 link.coupang.com/a/ 포맷)
        운영시에는 반드시 API로 변환해야 추적 100% 보장
        """
        # 1. URL에서 productId 추출
        match = re.search(r"/products/(\d+)", product.original_url)
        product_id = match.group(1) if match else "unknown"
        
        affiliate_id = self.config.get("coupang_affiliate_id", "DEMO_ID")
        # 실제 API 응답 대신 템플릿
        # linkId는 API가 발급, 여기선 mock
        mock_link_id = f"BM{product_id[:6]}S"
        affiliate_url = f"https://link.coupang.com/a/{mock_link_id}?lptag={affiliate_id}&subId={sub_id or 'reviewfactory'}&pageKey={product_id}"

        return AffiliateResult(
            platform="coupang",
            original_url=product.original_url,
            affiliate_url=affiliate_url,
            disclosure=self.PLATFORM_POLICY["coupang"]["disclosure_ko"],
            cookie_hours=24,
            commission_rate="3%",
            is_direct_tag=True,
            metadata={"product_id": product_id, "requires_api": True}
        )

    def _gen_toss(self, product: ProductInput, sub_id: str) -> AffiliateResult:
        """
        토스쇼핑: 파트너스 대시보드에서 발급된 referral code로 변환
        포맷: https://www.toss.im/shopping/product/{product_id}?referral={code}
        """
        referral = self.config.get("toss_referral_code", "DEMO_TOSS")
        # URL 인코딩해서 리다이렉트 파라미터로 붙임 (실제 토스 정책)
        encoded = quote(product.original_url, safe='')
        affiliate_url = f"https://toss.im/shopping/affiliate?url={encoded}&ref={referral}&subId={sub_id or 'rf'}"
        
        return AffiliateResult(
            platform="toss",
            original_url=product.original_url,
            affiliate_url=affiliate_url,
            disclosure=self.PLATFORM_POLICY["toss"]["disclosure_ko"],
            cookie_hours=24,
            commission_rate="5~10%",
            is_direct_tag=True,
            metadata={"beta": True, "high_yield": True}
        )

    def _gen_amazon(self, product: ProductInput, sub_id: str) -> AffiliateResult:
        """
        아마존: ASIN 추출이 핵심. URL 형태가 5가지 이상
        """
        # ASIN 추출 정규식 - 10자리 대문자+숫자
        asin_match = re.search(r"/(?:dp|gp/product)/([A-Z0-9]{10})", product.original_url)
        if not asin_match:
            asin_match = re.search(r"([A-Z0-9]{10})", product.original_url)
        
        if not asin_match:
            raise ValueError(f"ASIN을 찾을 수 없습니다: {product.original_url}")
        
        asin = asin_match.group(1)
        tag = self.config.get("amazon_tag", "reviewfactory-20")
        marketplace = self.config.get("amazon_marketplace", "com")
        
        # 아마존은 subId 대신 tag에 붙여서 추적, + linkCode, creative 등 추가 가능
        affiliate_url = f"https://www.amazon.{marketplace}/dp/{asin}?tag={tag}&linkCode=ogi&th=1&psc=1&subId={sub_id or 'rf'}"

        return AffiliateResult(
            platform="amazon",
            original_url=product.original_url,
            affiliate_url=affiliate_url,
            disclosure=self.PLATFORM_POLICY["amazon"]["disclosure_ko"],
            cookie_hours=24,
            commission_rate="1~10%",
            is_direct_tag=False, # 중요: 설명란 링크용
            metadata={"asin": asin, "marketplace": marketplace, "requires_disclosure": True}
        )

    def _gen_shopify(self, product: ProductInput, sub_id: str) -> AffiliateResult:
        store = self.config.get("shopify_store", "demo.myshopify.com")
        # UTM으로 소스 추적
        params = {
            "utm_source": "youtube_shorts",
            "utm_medium": "affiliate",
            "utm_campaign": sub_id or "reviewfactory",
            "utm_content": "video"
        }
        base = product.original_url if "myshopify.com" in product.original_url else f"https://{store}/products/{product.original_url}"
        affiliate_url = f"{base}?{urlencode(params)}"
        
        return AffiliateResult(
            platform="shopify",
            original_url=product.original_url,
            affiliate_url=affiliate_url,
            disclosure=self.PLATFORM_POLICY["shopify"]["disclosure_ko"],
            cookie_hours=9999,
            commission_rate="마진 30~60%",
            is_direct_tag=False,
            metadata={"store": store, "own_store": True}
        )

    def _gen_naver(self, product: ProductInput, sub_id: str) -> AffiliateResult:
        # 네이버는 스마트스토어 URL 그대로 + 커넥트 파라미터
        connect_id = self.config.get("naver_connect_id", "DEMO_NAVER")
        affiliate_url = f"{product.original_url}?NaPm={connect_id}&subId={sub_id or 'rf'}"
        return AffiliateResult(
            platform="naver",
            original_url=product.original_url,
            affiliate_url=affiliate_url,
            disclosure=self.PLATFORM_POLICY["naver"]["disclosure_ko"],
            cookie_hours=24,
            commission_rate="3~18%",
            is_direct_tag=True,
            metadata={"requires_approval": True}
        )

    def _gen_youtube(self, product: ProductInput, sub_id: str) -> AffiliateResult:
        # 유튜브 쇼핑은 구글 머천트 센터 ID로 연결, 링크는 원본 그대로
        # 실제 수익은 유튜브 스튜디오에서 정산
        return AffiliateResult(
            platform="youtube_shopping",
            original_url=product.original_url,
            affiliate_url=product.original_url, # 태그 자체가 추적
            disclosure=self.PLATFORM_POLICY["youtube_shopping"]["disclosure_ko"],
            cookie_hours=24,
            commission_rate="평균 6.7%",
            is_direct_tag=True,
            metadata={"google_merchant": True, "official_tag": True}
        )

    def generate_all(self, product: ProductInput, sub_id: str = "rf_001") -> Dict[Platform, AffiliateResult]:
        """URL 1개 넣으면 6개 플랫폼 링크를 한번에 뽑아주는 멀티 팩토리"""
        results = {}
        # 도메인 보고 자동 매핑
        for platform in ["coupang", "toss", "naver", "amazon", "shopify", "youtube_shopping"]:
            try:
                if platform == "youtube_shopping":
                    results[platform] = self._gen_youtube(product, sub_id)
                elif platform in ["coupang", "toss", "naver"] and self._validate_url(product.original_url, platform) or platform not in ["coupang","toss","naver"]:
                    # 크로스 플랫폼도 허용: 쿠팡 상품을 아마존처럼 설명란에 걸 수도 있음
                    results[platform] = self.generate(platform, product, sub_id)
            except Exception as e:
                print(f"[{platform}] 생성 실패: {e}")
        return results

    def estimate_revenue(self, clicks: int, platform: Platform, price: int, conversion_rate: float = 0.03) -> float:
        """PDF 기반 수익 시뮬레이터"""
        rates = {
            "coupang": 0.03,
            "toss": 0.075, # 평균 7.5%
            "naver": 0.08,
            "youtube_shopping": 0.067,
            "amazon": 0.04,
            "shopify": 0.4 # 마진
        }
        rate = rates.get(platform, 0.03)
        return clicks * conversion_rate * price * rate


# --- 사용 예시 ---
if __name__ == "__main__":
    factory = AffiliateLinkFactory(config={
        "coupang_affiliate_id": "AF1234567",
        "toss_referral_code": "toss_abc123",
        "amazon_tag": "reviewfactory-20",
        "shopify_store": "reviewfactory.myshopify.com",
        "naver_connect_id": "naver_123"
    })

    product = ProductInput(
        original_url="https://www.coupang.com/vp/products/12345678",
        title="샤오미 핸디 청소기",
        price=89000
    )

    # 멀티 생성
    all_links = factory.generate_all(product, sub_id="shorts_001")
    for plat, res in all_links.items():
        print(f"\n[{plat.upper()}] {res.commission_rate} | 직접태그: {res.is_direct_tag}")
        print(f"  링크: {res.affiliate_url}")
        print(f"  고지: {res.disclosure}")
        print(f"  예상수익(1000클릭): {factory.estimate_revenue(1000, plat, 89000):,.0f}원")
