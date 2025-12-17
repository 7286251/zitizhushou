import React, { useState } from 'react';
import { AppTheme, AppMode } from './types';
import { THEME_CONFIG } from './constants';
import TextCreator from './components/TextCreator';
import ImageReverse from './components/ImageReverse';
import WallpaperGallery from './components/WallpaperGallery';
import PaintingTools from './components/PaintingTools';
import SmartAgent from './components/SmartAgent';
import StoryboardCreator from './components/StoryboardCreator';
import GridSplitter from './components/GridSplitter'; // Added import
import ThemeSwitcher from './components/ThemeSwitcher';
import Typewriter from './components/Typewriter';

const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.NEW_YEAR_2026);
  const [mode, setMode] = useState<AppMode>('creation');

  const config = THEME_CONFIG[theme];

  // Logic to handle specific retro background style
  const getBgStyle = () => {
    if (theme === AppTheme.RETRO_DESKTOP) {
      return {
        backgroundImage: 'radial-gradient(#ff8a80 1px, transparent 1px), radial-gradient(#ff8a80 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 10px 10px',
        backgroundColor: '#fef2f2'
      };
    }
    if (theme === AppTheme.PINK_PLUSH) {
      return {
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E"), linear-gradient(to bottom right, #fce7f3, #fbcfe8)`,
      };
    }
    return {}; 
  };

  const typewriterTexts = [
    "提示词智能体写词大师",
    "本站专注AI艺术字提示词生成",
    "作者：小渝児 | 2026马年大吉",
    "支持以图反推 | 精选500+壁纸"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${config.bgClass} flex flex-col overflow-hidden`} style={getBgStyle()}>
      
      {/* 2026 New Year Special Decorations */}
      {theme === AppTheme.NEW_YEAR_2026 && (
        <>
           {/* Lantern Left */}
           <div className="fixed top-0 left-4 md:left-24 z-20 animate-[swing_3s_ease-in-out_infinite] origin-top">
              <div className="w-1 h-12 bg-yellow-600 mx-auto"></div>
              <div className="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-xl border-2 border-yellow-400 flex items-center justify-center relative">
                 <div className="absolute -inset-1 border border-yellow-500/50 rounded-lg"></div>
                 <div className="flex flex-col items-center justify-center leading-none gap-0.5 text-yellow-300 font-serif font-bold drop-shadow-md py-1">
                    <span className="text-sm md:text-base">马</span>
                    <span className="text-sm md:text-base">到</span>
                 </div>
                 {/* Tassel */}
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-1 h-3 bg-yellow-600"></div>
                    <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                    <div className="w-4 h-8 bg-red-600/80 rounded-b-full blur-[1px]"></div>
                 </div>
              </div>
           </div>

           {/* Lantern Right */}
           <div className="fixed top-0 right-4 md:right-24 z-20 animate-[swing_3s_ease-in-out_infinite_1s] origin-top">
              <div className="w-1 h-8 bg-yellow-600 mx-auto"></div>
              <div className="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-xl border-2 border-yellow-400 flex items-center justify-center relative">
                 <div className="absolute -inset-1 border border-yellow-500/50 rounded-lg"></div>
                 <div className="flex flex-col items-center justify-center leading-none gap-0.5 text-yellow-300 font-serif font-bold drop-shadow-md py-1">
                    <span className="text-sm md:text-base">成</span>
                    <span className="text-sm md:text-base">功</span>
                 </div>
                 {/* Tassel */}
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-1 h-3 bg-yellow-600"></div>
                    <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                    <div className="w-4 h-8 bg-red-600/80 rounded-b-full blur-[1px]"></div>
                 </div>
              </div>
           </div>

           {/* Vertical Couplets (Desktop Only) */}
           {/* Left Couplet: Golden horse gallops to welcome wealth */}
           <div className="hidden xl:flex fixed top-1/2 left-8 -translate-y-1/2 z-10 flex-col gap-4">
              <div className="bg-[#b30000] border-2 border-[#FFD700] p-3 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-300">
                 <div className="flex flex-col items-center gap-2 text-[#FFD700] font-serif font-bold text-2xl" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                    <span>金</span><span>马</span><span>奔</span><span>腾</span><span>迎</span><span>富</span><span>贵</span>
                 </div>
              </div>
           </div>

           {/* Right Couplet: Wealth rolls into the home */}
           <div className="hidden xl:flex fixed top-1/2 right-8 -translate-y-1/2 z-10 flex-col gap-4">
              <div className="bg-[#b30000] border-2 border-[#FFD700] p-3 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-300">
                 <div className="flex flex-col items-center gap-2 text-[#FFD700] font-serif font-bold text-2xl" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>
                     <span>财</span><span>源</span><span>滚</span><span>滚</span><span>进</span><span>家</span><span>门</span>
                 </div>
              </div>
           </div>
        </>
      )}

      {/* Header */}
      <header className="pt-8 pb-4 text-center z-10 relative">
        {/* Banner for New Year */}
        {theme === AppTheme.NEW_YEAR_2026 && (
          <div className="flex justify-center mb-4 animate-pop px-4">
            <div className="bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-[#FFD700] px-8 py-2 rounded-full border-2 border-[#FFD700] shadow-[0_4px_15px_rgba(255,0,0,0.4)] flex items-center gap-3 transform hover:scale-105 transition-transform cursor-default">
               <span className="text-2xl filter drop-shadow animate-pulse">🐴</span>
               <span className="font-bold tracking-widest text-sm md:text-lg text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
                 ✨ 2026 丙午马年 · 瑞马迎春 ✨
               </span>
               <span className="text-2xl filter drop-shadow animate-pulse">💰</span>
            </div>
          </div>
        )}

        <h1 className={`text-4xl md:text-5xl font-black tracking-wider mb-2 ${config.accentColor} ${config.titleEffect}`}>
          {/* Q-Bounce Animation Staggered */}
          <span className="inline-block animate-jelly cursor-default">小</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.1s]">渝</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.2s]">児</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.3s]">艺</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.4s]">术</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.5s]">字</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.6s]">生</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.7s]">成</span>
          <span className="inline-block animate-jelly cursor-default [animation-delay:0.8s]">器</span>
        </h1>
        <div className={`text-lg md:text-xl font-mono opacity-90 ${theme === AppTheme.NEW_YEAR_2026 ? 'text-[#fffcf5]' : 'text-gray-600'} h-8`}>
          <Typewriter texts={typewriterTexts} typeSpeed={100} deleteSpeed={30} pauseDuration={2500} />
        </div>
      </header>

      {/* Navigation (Window Tabs) */}
      <nav className="flex justify-center gap-2 md:gap-4 px-4 mb-2 z-10 flex-wrap">
        <button
          onClick={() => setMode('creation')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'creation' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          ✍️ 艺术字创作
        </button>
        <button
          onClick={() => setMode('storyboard')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'storyboard' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🎬 分镜生成
        </button>
        <button
          onClick={() => setMode('grid_splitter')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'grid_splitter' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🧩 九宫格切图
        </button>
        <button
          onClick={() => setMode('reverse')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'reverse' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🔍 以图反推
        </button>
        <button
          onClick={() => setMode('wallpaper')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'wallpaper' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🖼️ 2026壁纸
        </button>
        <button
          onClick={() => setMode('painting')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'painting' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🛠️ 工具合集
        </button>
        {/* Smart Agent Button */}
        <button
          onClick={() => setMode('smart_agent')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base ${mode === 'smart_agent' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🤖 智能体
        </button>
      </nav>

      {/* Main Content Window */}
      <main className="flex-1 overflow-hidden flex justify-center px-4 pb-20">
        <div className="w-full h-full relative max-w-5xl">
           {mode === 'creation' && <TextCreator theme={theme} />}
           {mode === 'reverse' && <ImageReverse theme={theme} />}
           {mode === 'wallpaper' && <WallpaperGallery theme={theme} />}
           {mode === 'painting' && <PaintingTools theme={theme} />}
           {mode === 'smart_agent' && <SmartAgent theme={theme} />}
           {mode === 'storyboard' && <StoryboardCreator theme={theme} />}
           {mode === 'grid_splitter' && <GridSplitter theme={theme} />}
        </div>
      </main>

      {/* Floating Buttons */}
      <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />

      {/* Background Decor (Only for New Year Theme) */}
      {theme === AppTheme.NEW_YEAR_2026 && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/chinese-new-year.png")'}}></div>
      )}

    </div>
  );
};

export default App;