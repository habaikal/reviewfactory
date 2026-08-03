export interface ProjectConfig {
  title: string;
  brief: string;
  tone: string;
  platforms: string[];
  mode: 'generate' | 'upload';
}

export interface EditorState {
  playing: boolean;
  currentTime: number;
  duration: number;
  ratio: '16:9' | '9:16';
  showCaption: boolean;
  silenceRemoval: boolean;
  bgmSync: boolean;
  title: string;
}

export type LicenseRisk = 'safe' | 'caution' | 'blocked';

export interface AssetLicense {
  assetId: string;
  assetKind: 'video' | 'audio' | 'voice' | 'image';
  sourceName: string;
  licenseType: string;
  author: string;
  sourceUrl: string;
  attributionRequired: boolean;
  commercialUseAllowed: boolean;
  risk: LicenseRisk;
}

export interface GeneratedScene {
  id: string;
  sceneTitle: string;
  shotType: string;
  durationSec: number;
  narration: string;
  caption: string;
  searchQuery: string;
  image: {
    url: string;
    photographer: string;
    photographerUrl: string;
    pexelsPageUrl: string;
    width: number;
    height: number;
  } | null;
}

export interface GeneratedTitleOption {
  text: string;
  hook: 'high' | 'medium' | 'low';
}

export interface GeneratedStoryboard {
  title: string;
  titleOptions: GeneratedTitleOption[];
  hashtags: string[];
  scenes: GeneratedScene[];
}
