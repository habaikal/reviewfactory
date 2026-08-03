'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { PreviewPanel } from '@/components/editor/PreviewPanel';
import { Timeline } from '@/components/editor/Timeline';
import { ToolsPanel } from '@/components/editor/ToolsPanel';
import { dashboardProjects, projectTimelines } from '@/lib/mock-data';

interface EditorContainerProps {
  id: string;
}

export function EditorContainer({ id }: EditorContainerProps) {
  const searchParams = useSearchParams();
  const queryTitle = searchParams.get('title');
  const project = dashboardProjects.find((p) => p.id === id);
  const displayTitle = queryTitle || project?.title || '신상 스니커즈 런칭 릴스';

  const durationMap: Record<string, number> = {
    p1: 32,
    p2: 180,
    p3: 45,
    p4: 70,
    p5: 58,
    p6: 20,
    demo: 15,
  };
  const duration = durationMap[id] || 15;

  const searchPlatform = searchParams.get('platform');
  const isVertical = searchPlatform
    ? (searchPlatform.includes('reels') || searchPlatform.includes('shorts') || searchPlatform.includes('tiktok'))
    : (project ? (project.platform.includes('Reels') || project.platform.includes('Shorts') || project.platform.includes('TikTok')) : true);
  const initialRatio = isVertical ? '9:16' : '16:9';

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [ratio, setRatio] = useState<'16:9' | '9:16'>(initialRatio);

  const [silenceRemoval, setSilenceRemoval] = useState(true);
  const [showCaption, setShowCaption] = useState(true);
  const [bgmSync, setBgmSync] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= duration) {
            setPlaying(false);
            return 0;
          }
          return Math.min(duration, t + 0.1);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playing, duration]);

  const tracks = projectTimelines[id] || projectTimelines.demo;

  return (
    <div className="flex flex-col gap-5">
      <EditorHeader title={displayTitle} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-5">
          <PreviewPanel
            playing={playing}
            setPlaying={setPlaying}
            ratio={ratio}
            setRatio={setRatio}
            currentTime={currentTime}
            duration={duration}
            showCaption={showCaption}
          />
          <Timeline
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            duration={duration}
            tracks={tracks}
            playing={playing}
          />
        </div>
        <ToolsPanel
          silence={silenceRemoval}
          setSilence={setSilenceRemoval}
          caption={showCaption}
          setCaption={setShowCaption}
          bgm={bgmSync}
          setBgm={setBgmSync}
        />
      </div>
    </div>
  );
}
