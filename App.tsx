import React, { useState } from 'react';
import { AppTheme, AppMode } from './types';
import { THEME_CONFIG, APP_NOTICES } from './constants';
import TextCreator from './components/TextCreator';
import ImageReverse from './components/ImageReverse';
import WallpaperGallery from './components/WallpaperGallery';
import PaintingTools from './components/PaintingTools';
import SmartAgent from './components/SmartAgent';
import StoryboardCreator from './components/StoryboardCreator';
import GridSplitter from './components/GridSplitter';
import Publisher from './components/Publisher';
import ThemeSwitcher from './components/ThemeSwitcher';
import Typewriter from './components/Typewriter';

const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.NEW_YEAR_2026);
  const [mode, setMode] = useState<AppMode>('creation');

  const config = THEME_CONFIG[theme];

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
    "本站专注AI创作与分镜设计",
    "作者：小渝児 | 2026马年大吉",
    "爆款文案生成 | 一键同步发布"
  ];

  const NoticeBar = () => {
    const isNewYear = theme === AppTheme.NEW_YEAR_2026;
    
    // Label styles
    const labelBg = isNewYear 
      ? "bg-gradient-to-r from-red-600 to-red-800 text-yellow-300" 
      : "bg-blue-600 text-white";
    
    // Bar container styles
    const barBg = isNewYear
      ? "bg-yellow-50/95 border-y border-yellow-200 shadow-sm"
      : "bg-white/90 border-y border-gray-100 shadow-sm";

    const textColor = isNewYear ? "text-red-900" : "text-gray-600";

    return (
      <div className={`w-full relative flex items-center h-10 overflow-hidden z-20 ${barBg} backdrop-blur-md`}>
        {/* Fixed Independent Label */}
        <div className={`absolute left-0 top-0 bottom-0 px-4 md:px-6 flex items-center gap-2 z-30 font-black text-xs md:text-sm tracking-widest shadow-[10px_0_15px_rgba(0,0,0,0.05)] ${labelBg}`}>
          <span className="animate-pulse">{isNewYear ? "🧨" : "📢"}</span>
          最新公告
          <div className="absolute right-[-10px] top-0 bottom-0 w-[10px] bg-inherit [clip-path:polygon(0%_0%,100%_50%,0%_100%)]"></div>
        </div>

        {/* Scrolling Content - Start after label area */}
        <div className="flex-1 ml-[110px] md:ml-[140px] h-full flex items-center overflow-hidden">
          <div className="flex animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] whitespace-nowrap items-center h-full">
            {APP_NOTICES.concat(APP_NOTICES).map((notice, i) => (
              <span key={i} className={`px-12 text-xs md:text-sm font-bold flex items-center h-full ${textColor}`}>
                <span className="mr-2 text-blue-500 opacity-30">/ /</span>
                {notice}
              </span>
            ))}
          </div>
        </div>
        
        {/* Right side fade effect */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-inherit to-transparent pointer-events-none z-10"></div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${config.bgClass} flex flex-col overflow-hidden`} style={getBgStyle()}>
      
      {theme === AppTheme.NEW_YEAR_2026 && (
        <>
           <div className="fixed top-0 left-4 md:left-24 z-20 animate-[swing_3s_ease-in-out_infinite] origin-top">
              <div className="w-1 h-12 bg-yellow-600 mx-auto"></div>
              <div className="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-xl border-2 border-yellow-400 flex items-center justify-center relative">
                 <div className="flex flex-col items-center justify-center leading-none gap-0.5 text-yellow-300 font-serif font-bold py-1">
                    <span className="text-sm md:text-base">马</span>
                    <span className="text-sm md:text-base">到</span>
                 </div>
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-1 h-3 bg-yellow-600"></div>
                    <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                 </div>
              </div>
           </div>
           <div className="fixed top-0 right-4 md:right-24 z-20 animate-[swing_3s_ease-in-out_infinite_1s] origin-top">
              <div className="w-1 h-8 bg-yellow-600 mx-auto"></div>
              <div className="w-12 md:w-16 h-16 md:h-20 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-xl border-2 border-yellow-400 flex items-center justify-center relative">
                 <div className="flex flex-col items-center justify-center leading-none gap-0.5 text-yellow-300 font-serif font-bold py-1">
                    <span className="text-sm md:text-base">成</span>
                    <span className="text-sm md:text-base">功</span>
                 </div>
                 <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-1 h-3 bg-yellow-600"></div>
                    <div className="w-2 h-2 bg-red-700 rounded-full"></div>
                 </div>
              </div>
           </div>
        </>
      )}

      <header className="pt-8 pb-2 text-center z-10 relative">
        <h1 className={`text-4xl md:text-5xl font-black tracking-wider mb-2 ${config.accentColor} ${config.titleEffect}`}>
          <span className="inline-block animate-jelly">小</span>
          <span className="inline-block animate-jelly">渝</span>
          <span className="inline-block animate-jelly">児</span>
          <span className="inline-block animate-jelly">创</span>
          <span className="inline-block animate-jelly">作</span>
          <span className="inline-block animate-jelly">工</span>
          <span className="inline-block animate-jelly">场</span>
        </h1>
        <div className={`text-lg md:text-xl font-mono opacity-90 ${theme === AppTheme.NEW_YEAR_2026 ? 'text-[#fffcf5]' : 'text-gray-600'} h-8 mb-2`}>
          <Typewriter texts={typewriterTexts} typeSpeed={100} deleteSpeed={30} pauseDuration={2500} />
        </div>
      </header>

      <NoticeBar />

      <nav className="flex justify-center gap-2 md:gap-4 px-4 mb-2 z-10 flex-wrap overflow-x-auto no-scrollbar pt-4">
        <button
          onClick={() => setMode('publisher')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'publisher' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🚀 图文发布
        </button>
        <button
          onClick={() => setMode('creation')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'creation' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          ✍️ 艺术字
        </button>
        <button
          onClick={() => setMode('storyboard')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'storyboard' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🎬 分镜生成
        </button>
        <button
          onClick={() => setMode('grid_splitter')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'grid_splitter' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🧩 切图
        </button>
        <button
          onClick={() => setMode('reverse')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'reverse' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🔍 反推
        </button>
        <button
          onClick={() => setMode('painting')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'painting' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🛠️ 工具
        </button>
      </nav>

      <main className="flex-1 overflow-hidden flex justify-center px-4 pb-20">
        <div className="w-full h-full relative max-w-6xl">
           {mode === 'publisher' && <Publisher theme={theme} />}
           {mode === 'creation' && <TextCreator theme={theme} />}
           {mode === 'reverse' && <ImageReverse theme={theme} />}
           {mode === 'wallpaper' && <WallpaperGallery theme={theme} />}
           {mode === 'painting' && <PaintingTools theme={theme} />}
           {mode === 'smart_agent' && <SmartAgent theme={theme} />}
           {mode === 'storyboard' && <StoryboardCreator theme={theme} />}
           {mode === 'grid_splitter' && <GridSplitter theme={theme} />}
        </div>
      </main>

      <ThemeSwitcher currentTheme={theme} setTheme={setTheme} />

      {theme === AppTheme.NEW_YEAR_2026 && (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/chinese-new-year.png")'}}></div>
      )}
    </div>
  );
};

export default App;