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
  url: string; // Web URL
  scheme?: string; // App Protocol Scheme
  tag?: string; // Status/Region tags
  isNew?: boolean; // New badge
}

export enum AppTheme {
  NEW_YEAR_2026 = 'new_year_2026',
  RETRO_DESKTOP = 'retro_desktop',
  PINK_PLUSH = 'pink_plush',
}

export type AppMode = 'creation' | 'reverse' | 'wallpaper' | 'painting' | 'smart_agent' | 'about';

export interface PromptResult {
  text: string;
  isImageAnalysis?: boolean;
}

export interface ImageAnalysisResult {
  fileName: string;
  chinesePrompt: string;
  englishPrompt: string;
}