
export interface StyleOption {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface WallpaperOption {
  id: string;
  name: string;
  prompt: string;
}

export interface PaintingTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string; 
  tag?: string; 
  isNew?: boolean; 
  category: 'image' | 'video' | 'office' | 'agent' | 'chat' | 'coding' | 'design' | 'audio' | 'search' | 'dev' | 'study' | 'train' | 'eval' | 'detect' | 'prompt'; 
}

export enum AppTheme {
  NEUMORPHISM = 'neumorphism',
  NEO_BRUTALISM = 'neo_brutalism',
  INFLATABLE = 'inflatable',
  CUTE = 'cute',
  STICKER = 'sticker'
}

export type AppMode = 'art_text' | 'christmas_product_director' | 'ugc_strategist' | 'sora_director' | 'clothing_director' | 'reverse' | 'wallpaper' | 'painting' | 'smart_agent' | 'storyboard' | 'grid_splitter' | 'publisher' | 'clothing_keywords' | 'cover_replica' | 'video_director' | 'storyboard_workflow' | 'sk2_director';

export interface StoryboardItem {
  sequenceNumber: number;
  name: string;
  imagePrompt: string;
  videoPrompt: string;
  duihua?: string;
}

export interface UgcScriptItem {
  timeRange: string;
  title: string;
  visual: string;
  audio_zh: string;
  audio_en?: string;
  emotion: string;
}

export interface CharacterDesign {
  roleName: string;
  appearance: string;
  castingPrompt: string;
}

export interface PromptResult {
  text: string;
  isImageAnalysis?: boolean;
}

export interface ImageAnalysisResult {
  fileName: string;
  chinesePrompt: string;
  englishPrompt: string;
}

export type PlatformType = 'xhs' | 'douyin' | 'kuaishou' | 'channels';

export interface PublishContent {
  title: string;
  article: string;
  hashtags: string[];
}
