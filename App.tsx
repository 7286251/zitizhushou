
import React, { useState, useEffect } from 'react';
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
  // 默认主题升级为新拟态
  const [theme, setTheme] = useState<AppTheme>(AppTheme.NEUMORPHISM);
  const [mode, setMode] = useState<AppMode>('creation');
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);

  const config = THEME_CONFIG[theme];

  const getBgStyle = () => {
    if (theme === AppTheme.NEUMORPHISM) {
      return { backgroundColor: '#e0e5ec' };
    }
    if (theme === AppTheme.NEW_YEAR_2026) {
      return { backgroundColor: '#0a0a0c' };
    }
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
      return { backgroundColor: '#e60012' };
    }
    if (theme === AppTheme.CHRISTMAS_FESTIVAL) {
      return {
        backgroundColor: '#0a2e1f',
        backgroundImage: 'radial-gradient(circle at center, #144d35 0%, #0a2e1f 100%)'
      };
    }
    return {}; 
  };

  const typewriterTexts = [
    "提示词智能体写词大师",
    "新拟态视觉纪元开启",
    "已恢复 68 个顶级创作节点",
    "作者：小渝児 | 2026马年大吉"
  ];

  const isLightText = theme === AppTheme.NEW_YEAR_2026 || theme === AppTheme.DARK_GRADIENT || theme === AppTheme.CARTOON_HORSE_RED || theme === AppTheme.CHRISTMAS_FESTIVAL;
  const isNeumorphism = theme === AppTheme.NEUMORPHISM;

  return (
    <div className={`min-h-screen transition-all duration-700 ${config.bgClass} flex flex-col overflow-hidden`} style={getBgStyle()}>
      
      {/* 圣诞雪花粒子动效 */}
      {theme === AppTheme.CHRISTMAS_FESTIVAL && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           {[...Array(30)].map((_, i) => (
             <div 
               key={i} 
               className="absolute text-white/20 text-xl animate-[bounce_15s_infinite]"
               style={{ 
                 left: `${Math.random() * 100}%`, 
                 top: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 8}s`,
                 fontSize: `${Math.random() * 20 + 10}px`
               }}
             >
               ❄️
             </div>
           ))}
        </div>
      )}

      {/* 主标题栏 */}
      <header className="pt-10 pb-4 text-center z-10 relative">
        <div className="absolute top-6 right-6">
          <button 
            onClick={() => setIsThemePanelOpen(true)}
            className={`group flex items-center gap-3 px-6 py-3 rounded-full font-black shadow-2xl transition-all active:scale-90 border-2 ${
              isNeumorphism 
                ? 'bg-[#e0e5ec] text-[#44474b] border-none shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]' 
                : theme === AppTheme.CHRISTMAS_FESTIVAL 
                  ? 'bg-[#5c0a0a] text-[#f7e4b5] border-[#c5a059]' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            <span className="text-lg">{config.icon}</span>
            <span className="text-sm tracking-widest">皮肤中心</span>
          </button>
        </div>
        <h1 className={`text-4xl md:text-6xl font-black tracking-tighter mb-2 ${config.accentColor} ${config.titleEffect}`}>
          小渝児 AI 创作工场
        </h1>
        <div className={`text-lg md:text-xl font-bold opacity-80 ${isLightText ? 'text-white/60' : 'text-[#44474b]/60'} h-8 mb-2`}>
          <Typewriter texts={typewriterTexts} typeSpeed={100} deleteSpeed={40} pauseDuration={2500} />
        </div>
      </header>

      {/* 公告栏 */}
      <div className={`w-full relative flex items-center h-12 overflow-hidden z-20 ${isNeumorphism ? 'bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]' : theme === AppTheme.CHRISTMAS_FESTIVAL ? 'bg-[#5c0a0a]/30 border-y border-[#c5a059]/20' : 'bg-white/5 border-y border-white/5'} backdrop-blur-3xl`}>
        <div className={`absolute left-0 top-0 bottom-0 px-6 flex items-center gap-2 z-30 font-black text-xs md:text-sm tracking-widest ${isNeumorphism ? 'bg-[#e0e5ec] text-[#44474b] shadow-[4px_0px_8px_#bebebe]' : 'bg-blue-600 text-white'}`}>
           <span className="animate-bounce">⚡</span> 实时动态
        </div>
        <div className="flex-1 ml-[120px] h-full flex items-center overflow-hidden">
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap items-center h-full">
            {APP_NOTICES.concat(APP_NOTICES).map((notice, i) => (
              <span key={i} className={`px-12 text-xs font-bold flex items-center h-full ${isLightText ? 'text-white/60' : 'text-[#44474b]/60'}`}>
                {notice}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 侧边主题中心 (抽屉模式) */}
      {isThemePanelOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-end animate-[fadeIn_0.3s_ease-out]">
           <div className="absolute inset-0" onClick={() => setIsThemePanelOpen(false)}></div>
           <div className={`w-full max-w-sm h-full shadow-2xl p-8 flex flex-col relative animate-[slideIn_0.4s_cubic-bezier(0.16,1,0.3,1)] ${isNeumorphism ? 'bg-[#e0e5ec]' : 'bg-[#1a1a20]'}`}>
              <div className={`flex justify-between items-center mb-10 border-b pb-6 ${isNeumorphism ? 'border-gray-300' : 'border-white/5'}`}>
                 <div>
                   <h3 className={`text-2xl font-black italic tracking-tighter ${isNeumorphism ? 'text-[#44474b]' : 'text-white'}`}>THEME HUB</h3>
                   <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isNeumorphism ? 'text-[#44474b]/40' : 'text-white/30'}`}>视觉风格切换中心</p>
                 </div>
                 <button onClick={() => setIsThemePanelOpen(false)} className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${isNeumorphism ? 'bg-[#e0e5ec] shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] text-[#44474b]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}>&times;</button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                 {themes.map(t => {
                   const tConf = THEME_CONFIG[t];
                   const isActive = theme === t;
                   return (
                     <button 
                       key={t}
                       onClick={() => { setTheme(t); setIsThemePanelOpen(false); }}
                       className={`w-full group p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                         isActive 
                          ? isNeumorphism 
                            ? 'bg-[#e0e5ec] border-none shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]' 
                            : 'bg-blue-600 border-blue-400 shadow-[0_0_30px_rgba(37,99,235,0.3)] scale-[1.02]' 
                          : isNeumorphism 
                            ? 'bg-[#e0e5ec] border-none shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:scale-[1.01]' 
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                       }`}
                     >
                       <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shadow-inner ${isActive ? 'bg-white/10' : 'bg-black/10 group-hover:bg-black/20'}`}>
                         {tConf.icon}
                       </div>
                       <div className="text-left flex-1">
                          <div className={`text-sm font-black ${isActive ? (isNeumorphism ? 'text-blue-600' : 'text-white') : (isNeumorphism ? 'text-[#44474b]' : 'text-white/60')}`}>{tConf.name}</div>
                          <div className={`text-[10px] font-bold ${isActive ? (isNeumorphism ? 'text-blue-600/40' : 'text-white/50') : (isNeumorphism ? 'text-[#44474b]/30' : 'text-white/20')}`}>MODE: {t.toUpperCase()}</div>
                       </div>
                       {isActive && <div className={`w-2 h-2 rounded-full animate-ping ${isNeumorphism ? 'bg-blue-600' : 'bg-white'}`}></div>}
                     </button>
                   );
                 })}
              </div>
           </div>
        </div>
      )}

      {/* 主导航 */}
      <nav className="flex justify-center gap-2 md:gap-4 px-6 mb-4 z-10 flex-wrap pt-8 pb-2 overflow-x-auto no-scrollbar scroll-smooth">
        {[
          { id: 'creation', label: '✍️ 艺术造字' },
          { id: 'painting', label: '🛠️ 工具合集' },
          { id: 'publisher', label: '🚀 图文发布' },
          { id: 'storyboard', label: '🎬 电影分镜' },
          { id: 'clothing_keywords', label: '🧥 服装咒语' },
          { id: 'grid_splitter', label: '🧩 智能切图' },
          { id: 'cover_replica', label: '📸 封面复刻' },
          { id: 'extract_clothes', label: '✂️ 提取衣服' },
          { id: 'reverse', label: '🔍 以图反推' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setMode(item.id as AppMode)}
            className={`px-5 py-2.5 rounded-2xl font-black transition-all text-xs md:text-sm whitespace-nowrap relative group ${
              mode === item.id 
                ? isNeumorphism 
                    ? 'text-blue-600 shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]' 
                    : (isLightText ? 'text-white bg-white/10' : 'text-slate-900 bg-white shadow-xl') 
                : isNeumorphism 
                    ? 'text-[#44474b]/60 shadow-[4px_4px_8px_#bebebe,-4px_-4px_8px_#ffffff] hover:text-[#44474b]' 
                    : (isLightText ? 'text-white/30 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-600')
            }`}
          >
            {item.label}
            {mode === item.id && !isNeumorphism && (
              <div className={`absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full ${isLightText ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]' : 'bg-slate-900'}`}></div>
            )}
          </button>
        ))}
      </nav>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-hidden flex justify-center px-4 pb-12">
        <div className="w-full h-full relative max-w-7xl">
           <div className={`w-full h-full ${config.cardClass} overflow-hidden shadow-2xl transition-all duration-700`}>
             {mode === 'painting' && <PaintingTools theme={theme} />}
             {mode === 'creation' && <TextCreator theme={theme} />}
             {mode === 'clothing_keywords' && <ClothingKeywords theme={theme} />}
             {mode === 'publisher' && <Publisher theme={theme} />}
             {mode === 'storyboard' && <StoryboardCreator theme={theme} />}
             {mode === 'grid_splitter' && <GridSplitter theme={theme} />}
             {mode === 'cover_replica' && <CoverReplica theme={theme} />}
             {mode === 'extract_clothes' && <ExtractClothes theme={theme} />}
             {mode === 'reverse' && <ImageReverse theme={theme} />}
             {mode === 'wallpaper' && <WallpaperGallery theme={theme} />}
             {mode === 'smart_agent' && <SmartAgent theme={theme} />}
           </div>
        </div>
      </main>

      <footer className={`h-12 border-t flex items-center justify-center z-10 ${isLightText ? 'bg-black/20 border-white/5' : isNeumorphism ? 'bg-[#e0e5ec] border-gray-300 shadow-[inset_0px_10px_10px_-10px_#bebebe]' : 'bg-white border-slate-100'} backdrop-blur-md`}>
         <p className={`text-[10px] font-black uppercase tracking-[0.5em] ${isLightText ? 'text-white/20' : 'text-[#44474b]/20'}`}>Future Terminal · Alpha v4.0 · 小渝児 · 版权所有</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.1); }
      ` }} />
    </div>
  );
};

export default App;
