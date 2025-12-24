
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
  // 默认主题恢复为 2026 新年红
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
      
      {/* Cartoon Horse Red Theme Extra Decoration - 手绘重绘皮肤 */}
      {theme === AppTheme.CARTOON_HORSE_RED && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           {/* SVG Filter for Hand-drawn effect */}
           <svg className="hidden">
             <filter id="handDrawn">
               <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
               <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
             </filter>
           </svg>

           {/* 潮流动感文字 - 错落排版 */}
           <div className="absolute top-[12%] left-[5%] md:left-[10%] rotate-[-8deg] z-10 group">
              <div className="text-8xl md:text-[12rem] font-black text-white drop-shadow-[15px_15px_0px_rgba(0,0,0,1)] tracking-tighter italic leading-none animate-wiggle">看啥！</div>
           </div>
           <div className="absolute top-[25%] right-[5%] md:right-[15%] rotate-[5deg] z-10">
              <div className="text-7xl md:text-[10rem] font-black text-white drop-shadow-[15px_15px_0px_rgba(0,0,0,1)] tracking-tighter italic animate-bounce-slow">去搞钱</div>
           </div>

           {/* 夸张手绘马 - 表情重绘 */}
           <div className="absolute -left-24 -bottom-24 md:left-4 md:bottom-4 opacity-40 md:opacity-100 scale-150 md:scale-100 transition-transform hover:scale-110" style={{ filter: 'url(#handDrawn)' }}>
             <svg width="500" height="500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 潦草毛发背景 */}
                <path d="M40 80 Q20 50 50 30 T100 20 T150 40 T170 100" stroke="white" strokeWidth="8" strokeLinecap="round" className="animate-pulse" />
                
                {/* 巨大圆睁的眼睛 */}
                <circle cx="70" cy="85" r="30" fill="white" stroke="black" strokeWidth="6" />
                <circle cx="135" cy="85" r="30" fill="white" stroke="black" strokeWidth="6" />
                
                {/* 瞳孔 - 动态圆睁感 */}
                <circle cx="70" cy="85" r="12" fill="black" className="animate-ping" />
                <circle cx="135" cy="85" r="12" fill="black" className="animate-ping" />
                
                {/* 凌乱睫毛/眉毛 */}
                <path d="M50 45 L65 60 M75 40 L80 65 M125 45 L115 65 M145 40 L130 65" stroke="black" strokeWidth="4" strokeLinecap="round" />
                
                {/* 夸张的大嘴巴/口鼻 */}
                <path d="M60 140 Q100 170 145 135" stroke="white" strokeWidth="10" strokeLinecap="round" fill="none" />
                <ellipse cx="102" cy="145" rx="35" ry="25" fill="white" stroke="black" strokeWidth="5" />
                <circle cx="90" cy="145" r="5" fill="black" />
                <circle cx="114" cy="145" r="5" fill="black" />
                
                {/* 潦草胡须 */}
                <path d="M30 130 L55 135 M25 150 L50 145 M170 130 L145 135 M175 150 L150 145" stroke="white" strokeWidth="4" strokeLinecap="round" />
             </svg>
           </div>
           
           {/* 街头潮流背景元素 */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 font-black text-[20vw] italic pointer-events-none select-none">GET MONEY</div>
           <div className="absolute top-[60%] left-1/4 text-white text-6xl opacity-30 animate-bounce">🧧</div>
           <div className="absolute top-1/3 left-1/2 text-white text-5xl opacity-20 animate-wiggle">💰</div>
           <div className="absolute bottom-[15%] right-[10%] text-white text-[120px] opacity-10 font-black italic">2026</div>
        </div>
      )}

      <header className="pt-8 pb-2 text-center z-10 relative">
        <div className="absolute top-4 right-4">
          <button 
            onClick={cycleTheme}
            className={`group relative px-6 py-3 backdrop-blur-md border border-white/30 rounded-full text-sm font-black text-white transition-all flex items-center gap-3 shadow-2xl active:scale-90 ${theme === AppTheme.CARTOON_HORSE_RED ? 'bg-black border-4 border-white animate-pulse' : 'bg-white/20 hover:bg-white/40'}`}
          >
            🎨 潮流皮肤
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
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
            className={`px-4 md:px-6 py-2.5 rounded-t-2xl font-black transition-all text-sm md:text-base whitespace-nowrap ${
              mode === item.id 
                ? `bg-white ${theme === AppTheme.CARTOON_HORSE_RED ? 'border-[6px] border-black border-b-0 -translate-y-2' : 'border-b-0 translate-y-2 pb-5'} ${theme === AppTheme.DARK_GRADIENT ? 'text-blue-400' : ''}` 
                : `${theme === AppTheme.DARK_GRADIENT ? 'bg-slate-800/50 text-slate-400' : theme === AppTheme.CARTOON_HORSE_RED ? 'bg-black/30 text-white/60' : 'bg-white/40 text-gray-600'} hover:bg-white/80`
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="flex-1 overflow-hidden flex justify-center px-4 pb-20">
        <div className="w-full h-full relative max-w-6xl">
           <div className={`w-full h-full ${config.cardClass} overflow-hidden`}>
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
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wiggle { 0%, 100% { transform: rotate(-8deg) scale(1); } 50% { transform: rotate(-5deg) scale(1.05); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />
    </div>
  );
};

export default App;
