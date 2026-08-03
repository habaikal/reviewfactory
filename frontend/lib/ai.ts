interface RawScene {
  sceneTitle: string;
  shotType: string;
  durationSec: number;
  narration: string;
  caption: string;
  searchQuery: string;
}

interface RawStoryboard {
  title: string;
  titleOptions: { text: string; hook: 'high' | 'medium' | 'low' }[];
  hashtags: string[];
  scenes: RawScene[];
}

const SYSTEM_PROMPT = `당신은 숏폼(릴스/쇼츠/틱톡) 마케팅 영상 전문 카피라이터 겸 스토리보드 디렉터입니다.
사용자의 브리프를 받아 실제로 촬영·편집 가능한 고품질 숏폼 스토리보드를 설계합니다.

가장 중요한 원칙: 브리프에 등장하는 구체적인 업종·제품·서비스·타겟을 정확히 파악하고, 모든 씬은 반드시 그 구체적 대상과 직접 관련된 장면이어야 합니다.
"할인", "구매하기", "쇼핑백", "쿠폰 버튼"처럼 업종과 무관한 뻔한 이커머스 클리셰 장면을 절대 넣지 마세요.
예를 들어 브리프가 "필라테스 센터 신규 회원 할인"이라면, 씬은 필라테스 동작(리포머, 스트레칭, 체형 교정 자세), 트레이너와 회원의 1:1 코칭, 밝고 깨끗한 스튜디오 인테리어처럼 그 업종을 실제로 보여주는 장면이어야 하고, 할인이라는 정보는 자막·내레이션의 문구로만 전달합니다.
브리프가 "여름 신상 스니커즈"라면 스니커즈 클로즈업, 착화 워킹샷, 도심 배경처럼 실제 제품/상황을 보여주세요.

searchQuery는 Pexels 스톡 사진 검색에 실제로 결과가 나올 법한 영어 키워드 2~4단어이며, 반드시 그 업종/제품/상황을 구체적으로 나타내야 합니다 (예: "pilates reformer studio", "sneaker close up urban").

매우 중요: title, titleOptions, hashtags, sceneTitle, narration, caption은 searchQuery를 제외하고 전부 100% 자연스러운 한국어로만 작성하세요. 중국어 한자, 베트남어, 일본어, 영어 단어를 단 한 글자도 섞지 마세요. 모든 단어는 한글이어야 합니다.

절대 금지: 사용자가 브리프에서 언급한 업종·제품과 다른 업종·제품으로 바꿔치기하지 마세요. 브리프에 "필라테스"가 있으면 반드시 필라테스 이야기만 하고, 스킨케어·화장품·쇼핑 등 관련 없는 주제로 절대 이탈하지 마세요. 브리프에 없는 내용을 지어내지 말고, 브리프에 실제로 적힌 단어와 맥락에서만 확장하세요.

반드시 아래 JSON 스키마와 정확히 일치하는 JSON만 출력하세요. 설명, 마크다운, 코드블록 없이 순수 JSON만 반환합니다.

{
  "title": "string (영상 제목, 후킹력 있게, 브리프의 구체적 대상을 반영)",
  "titleOptions": [ { "text": "string", "hook": "high|medium|low" } ] (제목 후보 4개, 서로 다른 각도),
  "hashtags": ["string", ...] (관련 해시태그 5개, # 없이),
  "scenes": [
    {
      "sceneTitle": "string (씬 이름, 예: '리포머 필라테스 동작 클로즈업')",
      "shotType": "string (예: 'Macro / Slow Push-in')",
      "durationSec": number (2~5 사이),
      "narration": "string (실제 내레이션 대사, 한국어, 자연스럽고 설득력 있게, 해당 업종/제품 맥락에 맞게)",
      "caption": "string (화면에 노출될 짧은 자막 문구, 10자 내외)",
      "searchQuery": "string (브리프의 구체적 업종/제품을 반영한 영어 키워드 2~4단어)"
    }
  ] (5개 씬)
}`;

export async function generateStoryboard(input: {
  brief: string;
  tone: string;
  platforms: string[];
}): Promise<RawStoryboard> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY가 설정되지 않았습니다.');
  }

  const userPrompt = `브리프: ${input.brief}\n톤앤매너: ${input.tone}\n배포 플랫폼: ${input.platforms.join(', ') || '지정 안 함'}`;

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Groq API 오류 (${res.status}): ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Groq 응답에 콘텐츠가 없습니다.');
  }

  let parsed: RawStoryboard;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('Groq 응답을 JSON으로 파싱하지 못했습니다.');
  }

  if (!parsed.scenes || !Array.isArray(parsed.scenes) || parsed.scenes.length === 0) {
    throw new Error('Groq 응답에 scenes가 없습니다.');
  }

  return parsed;
}
