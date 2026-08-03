import { NextRequest, NextResponse } from 'next/server';
import { generateStoryboard } from '@/lib/ai';
import { searchPexelsPhotos } from '@/lib/stock';
import type { GeneratedStoryboard, GeneratedScene } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: { brief?: string; tone?: string; platforms?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '요청 본문이 올바르지 않습니다.' }, { status: 400 });
  }

  const brief = (body.brief || '').trim();
  if (!brief) {
    return NextResponse.json({ error: '브리프를 입력해주세요.' }, { status: 400 });
  }

  let raw;
  try {
    raw = await generateStoryboard({
      brief,
      tone: body.tone || '시네마틱',
      platforms: body.platforms || [],
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : '스크립트 생성 중 오류가 발생했습니다.' },
      { status: 502 }
    );
  }

  const candidateLists = await Promise.all(
    raw.scenes.map((scene) => searchPexelsPhotos(scene.searchQuery, 5).catch(() => []))
  );

  const usedPhotoIds = new Set<number>();
  const scenes: GeneratedScene[] = raw.scenes.map((scene, i) => {
    const candidates = candidateLists[i];
    const pick = candidates.find((c) => !usedPhotoIds.has(c.id)) || candidates[0] || null;
    if (pick) usedPhotoIds.add(pick.id);

    return {
      id: `gs-${i + 1}`,
      sceneTitle: scene.sceneTitle,
      shotType: scene.shotType,
      durationSec: scene.durationSec,
      narration: scene.narration,
      caption: scene.caption,
      searchQuery: scene.searchQuery,
      image: pick
        ? {
            url: pick.url,
            photographer: pick.photographer,
            photographerUrl: pick.photographerUrl,
            pexelsPageUrl: pick.pexelsPageUrl,
            width: pick.width,
            height: pick.height,
          }
        : null,
    };
  });

  const result: GeneratedStoryboard = {
    title: raw.title,
    titleOptions: raw.titleOptions || [],
    hashtags: raw.hashtags || [],
    scenes,
  };

  return NextResponse.json(result);
}
