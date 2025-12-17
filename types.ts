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
  category: 'video' | 'drawing' | 'prompt' | 'reverse' | 'model' | 'utility'; // New Category field
}

export enum AppTheme {
  NEW_YEAR_2026 = 'new_year_2026',
  RETRO_DESKTOP = 'retro_desktop',
  PINK_PLUSH = 'pink_plush',
  DOPAMINE = 'dopamine',
  NEO_BRUTALISM = 'neo_brutalism',
}

export type AppMode = 'creation' | 'reverse' | 'wallpaper' | 'painting' | 'smart_agent' | 'storyboard' | 'grid_splitter'; // Added grid_splitter

export interface PromptResult {
  text: string;
  isImageAnalysis?: boolean;
}

export interface ImageAnalysisResult {
  fileName: string;
  chinesePrompt: string;
  englishPrompt: string;
}

export interface StoryboardConfig {
  shots: string[]; // Array of 9 shot types
}