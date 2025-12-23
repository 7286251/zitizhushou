
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
import CoverReplica from './components/CoverReplica';
import Typewriter from './components/Typewriter';

const themes = Object.values(AppTheme);

const App: React.FC = () => {
  // 默认主题设置为手绘卡通马红底皮肤
  const [theme, setTheme] = useState<AppTheme>(AppTheme.CARTOON_HORSE_RED);
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
    if (theme === AppTheme.DARK_GRADIENT) {
      return {
        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        backgroundColor: '#0f172a'
      };
    }
    if (theme === AppTheme.CARTOON_HORSE_RED) {
      return {
        backgroundColor: '#e60012'
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
    const isDark = theme === AppTheme.DARK_GRADIENT;
    const isHorseRed = theme === AppTheme.CARTOON_HORSE_RED;
    
    const labelBg = isNewYear 
      ? "bg-gradient-to-r from-red-600 to-red-800 text-yellow-300" 
      : isDark 
        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
        : isHorseRed
          ? "bg-black text-white italic"
          : "bg-blue-600 text-white";
          
    const barBg = isNewYear 
      ? "bg-yellow-50/95 border-y border-yellow-200 shadow-sm" 
      : isDark 
        ? "bg-slate-800/90 border-y border-slate-700 shadow-lg" 
        : isHorseRed
          ? "bg-white border-y-4 border-black"
          : "bg-white/90 border-y border-gray-100 shadow-sm";
          
    const textColor = isNewYear 
      ? "text-red-900" 
      : isDark 
        ? "text-slate-300" 
        : isHorseRed
          ? "text-black font-black italic"
          : "text-gray-600";

    return (
      <div className={`w-full relative flex items-center h-10 overflow-hidden z-20 ${barBg} backdrop-blur-md`}>
        <div className={`absolute left-0 top-0 bottom-0 px-4 md:px-6 flex items-center gap-2 z-30 font-black text-xs md:text-sm tracking-widest shadow-[10px_0_15px_rgba(0,0,0,0.05)] ${labelBg}`}>
          <span className="animate-pulse">{isNewYear ? "🧨" : isDark ? "🛰️" : isHorseRed ? "🐴" : "📢"}</span>
          最新公告
          {!isHorseRed && <div className="absolute right-[-10px] top-0 bottom-0 w-[10px] bg-inherit [clip-path:polygon(0%_0%,100%_50%,0%_100%)]"></div>}
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

  const isLightText = theme === AppTheme.NEW_YEAR_2026 || theme === AppTheme.DARK_GRADIENT || theme === AppTheme.CARTOON_HORSE_RED;

  return (
    <div className={`min-h-screen transition-colors duration-500 ${config.bgClass} flex flex-col overflow-hidden`} style={getBgStyle()}>
      {/* Cartoon Horse Red Theme Extra Decoration */}
      {theme === AppTheme.CARTOON_HORSE_RED && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute -left-20 -bottom-20 md:left-10 md:bottom-10 opacity-40 rotate-12 scale-150 md:scale-100">
             <svg width="400" height="400" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="4" />
                <circle cx="70" cy="80" r="25" fill="white" stroke="black" strokeWidth="4" />
                <circle cx="130" cy="80" r="25" fill="white" stroke="black" strokeWidth="4" />
                <circle cx="70" cy="80" r="8" fill="black" className="animate-ping" />
                <circle cx="130" cy="80" r="8" fill="black" className="animate-ping" />
                <path d="M60 20 L80 40 M90 15 L100 45 M110 10 L120 40 M140 25 L130 50" stroke="white" strokeWidth="6" strokeLinecap="round" />
                <ellipse cx="100" cy="140" rx="30" ry="20" fill="white" stroke="black" strokeWidth="4" />
                <circle cx="90" cy="140" r="4" fill="black" />
                <circle cx="110" cy="140" r="4" fill="black" />
             </svg>
           </div>
           <div className="absolute top-[20%] right-[5%] md:right-[15%] flex flex-col items-center rotate-[10deg] animate-jelly">
              <div className="text-6xl md:text-9xl font-black text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] tracking-tighter italic">看啥！</div>
              <div className="text-5xl md:text-8xl font-black text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)] tracking-tighter italic ml-20 -mt-4">去搞钱</div>
           </div>
           <div className="absolute top-1/2 left-1/4 text-white text-4xl opacity-50 animate-bounce">💰</div>
           <div className="absolute top-1/3 left-1/3 text-white text-2xl opacity-50 animate-pulse">🔥</div>
           <div className="absolute bottom-1/4 right-1/4 text-white text-5xl opacity-50 animate-bounce-slow">🚀</div>
        </div>
      )}

      <header className="pt-8 pb-2 text-center z-10 relative">
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <button 
            onClick={cycleTheme}
            className={`group relative px-4 py-2 backdrop-blur-md border border-white/30 rounded-full text-xs font-black text-white transition-all flex items-center gap-2 shadow-lg active:scale-95 ${theme === AppTheme.CARTOON_HORSE_RED ? 'bg-black border-4 border-white' : 'bg-white/20'}`}
          >
            🎨 切换主题
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
          </button>
        </div>
        <h1 className={`text-4xl md:text-5xl font-black tracking-wider mb-2 ${config.accentColor} ${config.titleEffect}`}>
          小渝児创作工场
        </h1>
        <div className={`text-lg md:text-xl font-mono opacity-90 ${isLightText ? 'text-[#fffcf5]' : 'text-gray-600'} h-8 mb-2`}>
          <Typewriter texts={typewriterTexts} typeSpeed={100} deleteSpeed={30} pauseDuration={2500} />
        </div>
      </header>

      <NoticeBar />

      <nav className="flex justify-center gap-2 md:gap-4 px-4 mb-2 z-10 flex-wrap overflow-x-auto no-scrollbar pt-4">
        {[
          { id: 'cover_replica', label: '📸 封面复刻' },
          { id: 'clothing_keywords', label: '🧥 服装关键词' },
          { id: 'extract_clothes', label: '✂️ 提取衣服' },
          { id: 'clothing_sales', label: '👗 图文带货' },
          { id: 'publisher', label: '🚀 图文发布' },
          { id: 'creation', label: '✍️ 艺术字' },
          { id: 'storyboard', label: '🎬 分镜生成' },
          { id: 'grid_splitter', label: '🧩 九宫格切图' },
          { id: 'reverse', label: '🔍 反推' },
          { id: 'painting', label: '🛠️ 工具' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as AppMode)}
            className={`px-4 md:px-6 py-2 rounded-t-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${
              mode === item.id 
                ? `${config.cardClass} border-b-0 translate-y-2 pb-4 ${theme === AppTheme.DARK_GRADIENT ? 'text-blue-400' : ''} ${theme === AppTheme.CARTOON_HORSE_RED ? 'border-b-0 -translate-y-1' : ''}` 
                : `${theme === AppTheme.DARK_GRADIENT ? 'bg-slate-800/50 text-slate-400' : theme === AppTheme.CARTOON_HORSE_RED ? 'bg-black/20 text-white/50' : 'bg-white/50 text-gray-600'} hover:bg-white/80`
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-hidden flex justify-center px-4 pb-20">
        <div className="w-full h-full relative max-w-6xl">
           {mode === 'cover_replica' && <CoverReplica theme={theme} />}
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
