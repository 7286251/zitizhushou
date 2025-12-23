
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
import ClothingSales from './components/ClothingSales'; 
import ExtractClothes from './components/ExtractClothes';
import ClothingKeywords from './components/ClothingKeywords';
import Typewriter from './components/Typewriter';

const themes = Object.values(AppTheme);

const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.NEW_YEAR_2026);
  const [mode, setMode] = useState<AppMode>('clothing_keywords');

  const config = THEME_CONFIG[theme];

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

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
    "专注图文带货与分镜设计",
    "作者：小渝児 | 2026马年大吉",
    "爆款文案生成 | 一键同步发布"
  ];

  const NoticeBar = () => {
    const isNewYear = theme === AppTheme.NEW_YEAR_2026;
    const labelBg = isNewYear ? "bg-gradient-to-r from-red-600 to-red-800 text-yellow-300" : "bg-blue-600 text-white";
    const barBg = isNewYear ? "bg-yellow-50/95 border-y border-yellow-200 shadow-sm" : "bg-white/90 border-y border-gray-100 shadow-sm";
    const textColor = isNewYear ? "text-red-900" : "text-gray-600";

    return (
      <div className={`w-full relative flex items-center h-10 overflow-hidden z-20 ${barBg} backdrop-blur-md`}>
        <div className={`absolute left-0 top-0 bottom-0 px-4 md:px-6 flex items-center gap-2 z-30 font-black text-xs md:text-sm tracking-widest shadow-[10px_0_15px_rgba(0,0,0,0.05)] ${labelBg}`}>
          <span className="animate-pulse">{isNewYear ? "🧨" : "📢"}</span>
          最新公告
          <div className="absolute right-[-10px] top-0 bottom-0 w-[10px] bg-inherit [clip-path:polygon(0%_0%,100%_50%,0%_100%)]"></div>
        </div>
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
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-inherit to-transparent pointer-events-none z-10"></div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${config.bgClass} flex flex-col overflow-hidden`} style={getBgStyle()}>
      <header className="pt-8 pb-2 text-center z-10 relative">
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <button 
            onClick={cycleTheme}
            className="group relative px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-black text-white hover:bg-white/40 transition-all flex items-center gap-2 shadow-lg active:scale-95"
          >
            🎨 切换主题
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          </button>
        </div>
        <h1 className={`text-4xl md:text-5xl font-black tracking-wider mb-2 ${config.accentColor} ${config.titleEffect}`}>
          小渝児创作工场
        </h1>
        <div className={`text-lg md:text-xl font-mono opacity-90 ${theme === AppTheme.NEW_YEAR_2026 ? 'text-[#fffcf5]' : 'text-gray-600'} h-8 mb-2`}>
          <Typewriter texts={typewriterTexts} typeSpeed={100} deleteSpeed={30} pauseDuration={2500} />
        </div>
      </header>

      <NoticeBar />

      <nav className="flex justify-center gap-2 md:gap-4 px-4 mb-2 z-10 flex-wrap overflow-x-auto no-scrollbar pt-4">
        <button
          onClick={() => setMode('clothing_keywords')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'clothing_keywords' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          🧥 服装关键词
        </button>
        <button
          onClick={() => setMode('extract_clothes')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'extract_clothes' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          ✂️ 提取衣服
        </button>
        <button
          onClick={() => setMode('clothing_sales')}
          className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${mode === 'clothing_sales' ? `${config.cardClass} border-b-0 translate-y-2 pb-4` : 'bg-white/50 hover:bg-white/80'}`}
        >
          👗 图文带货
        </button>
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
          🧩 九宫格切图
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
           {mode === 'clothing_keywords' && <ClothingKeywords theme={theme} />}
           {mode === 'extract_clothes' && <ExtractClothes theme={theme} />}
           {mode === 'clothing_sales' && <ClothingSales theme={theme} />}
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
    </div>
  );
};

export default App;
