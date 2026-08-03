const CANVAS_W = 1080;
const CANVAS_H = 1920;
const KOREAN_FONT_STACK = '"Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", "Pretendard", sans-serif';

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('이미지를 불러오지 못했습니다.'));
    img.src = url;
  });
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateThumbnailDataUrl(opts: { imageUrl: string; title: string }): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('캔버스 컨텍스트를 생성할 수 없습니다.');

  ctx.fillStyle = '#0a0a12';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  const img = await loadImage(opts.imageUrl);
  const scale = Math.max(CANVAS_W / img.width, CANVAS_H / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (CANVAS_W - w) / 2, (CANVAS_H - h) / 2, w, h);

  const gradient = ctx.createLinearGradient(0, CANVAS_H * 0.45, 0, CANVAS_H);
  gradient.addColorStop(0, 'rgba(5,5,10,0.05)');
  gradient.addColorStop(0.55, 'rgba(5,5,10,0.55)');
  gradient.addColorStop(1, 'rgba(5,5,10,0.95)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  // OMNICAST AI 배지
  ctx.font = `700 34px ${KOREAN_FONT_STACK}`;
  const badgeText = 'OMNICAST AI';
  const badgeTextWidth = ctx.measureText(badgeText).width;
  const badgePadX = 26;
  const badgeW = badgeTextWidth + badgePadX * 2 + 30;
  const badgeH = 64;
  const badgeX = 56;
  const badgeY = 56;
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 999);
  ctx.fill();
  ctx.stroke();

  const dotGrad = ctx.createLinearGradient(badgeX + 24, badgeY, badgeX + 40, badgeY + badgeH);
  dotGrad.addColorStop(0, '#12d6e8');
  dotGrad.addColorStop(1, '#8b4fff');
  ctx.fillStyle = dotGrad;
  ctx.beginPath();
  ctx.arc(badgeX + 32, badgeY + badgeH / 2, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, badgeX + 54, badgeY + badgeH / 2 + 2);

  // 제목
  ctx.font = `800 66px ${KOREAN_FONT_STACK}`;
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'alphabetic';
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 24;
  const maxTitleWidth = CANVAS_W - 128;
  const lines = wrapText(ctx, opts.title, maxTitleWidth).slice(0, 3);
  const lineHeight = 82;
  let titleY = CANVAS_H - 96 - (lines.length - 1) * lineHeight - 70;
  for (const line of lines) {
    ctx.fillText(line, 64, titleY);
    titleY += lineHeight;
  }
  ctx.shadowBlur = 0;

  // 하단 태그
  ctx.font = `700 28px ${KOREAN_FONT_STACK}`;
  const tagText = 'AI 생성 스토리보드';
  const tagWidth = ctx.measureText(tagText).width;
  const tagPadX = 24;
  const tagW = tagWidth + tagPadX * 2;
  const tagH = 54;
  const tagX = 64;
  const tagY = CANVAS_H - 96;
  const tagGrad = ctx.createLinearGradient(tagX, tagY, tagX + tagW, tagY + tagH);
  tagGrad.addColorStop(0, '#12d6e8');
  tagGrad.addColorStop(1, '#8b4fff');
  ctx.fillStyle = tagGrad;
  roundRect(ctx, tagX, tagY, tagW, tagH, 999);
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.fillText(tagText, tagX + tagPadX, tagY + tagH / 2 + 2);

  return canvas.toDataURL('image/png');
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
