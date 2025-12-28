
import React, { useState, useEffect } from 'react';
import { AppTheme, AppMode } from './types';
import { THEME_CONFIG, APP_NOTICES } from './constants';
import ImageReverse from './components/ImageReverse';
import WallpaperGallery from './components/WallpaperGallery';
import PaintingTools from './components/PaintingTools';
import SmartAgent from './components/SmartAgent';
import StoryboardCreator from './components/StoryboardCreator';
import GridSplitter from './components/GridSplitter';
import Publisher from './components/Publisher';
import ClothingKeywords from './components/ClothingKeywords';
import CoverReplica from './components/CoverReplica';
import ThemeSwitcher from './components/ThemeSwitcher';
import DirectorAgent from './components/DirectorAgent';
import StoryboardWorkflow from './components/StoryboardWorkflow';
import SK2Director from './components/SK2Director';
import ClothingDirector from './components/ClothingDirector';
import SoraDirector from './components/SoraDirector';
import UgcStrategist from './components/UgcStrategist';
import ChristmasProductDirector from './components/ChristmasProductDirector';
import TextCreator from './components/TextCreator';
import TimeDisplay from './components/TimeDisplay';
import VideoExtractor from './components/VideoExtractor';
import BorderAgent from './components/BorderAgent';

const App: React.FC = () => {
  const [theme, setTheme] = useState<AppTheme>(AppTheme.NEUMORPHISM);
  const [mode, setMode] = useState<AppMode>('art_text');

  const config = THEME_CONFIG[theme];

  const marqueeTexts = [
    "🐎 2026 丙午马年 · 祝您龙马精神，万象更新",
    "✨ 艺术字智能体：深度优化 2026 贺岁提示词引擎",
    "🚀 网站升级：已全面适配 2026 旗舰级 4K 视觉工作流",
    "🎨 让创意如骏马奔腾，在 2026 绽放无限美学灵感",
    ...APP_NOTICES
  ];

  const renderContent = () => {
    switch (mode) {
      case 'art_text': return <TextCreator theme={theme} />;
      case 'border_agent': return <BorderAgent theme={theme} />;
      case 'video_extractor': return <VideoExtractor theme={theme} />;
      case 'christmas_product_director': return <ChristmasProductDirector theme={theme} />;
      case 'ugc_strategist': return <UgcStrategist theme={theme} />;
      case 'sora_director': return <SoraDirector theme={theme} />;
      case 'clothing_director': return <ClothingDirector theme={theme} />;
      case 'sk2_director': return <SK2Director theme={theme} />;
      case 'storyboard_workflow': return <StoryboardWorkflow theme={theme} />;
      case 'video_director': return <DirectorAgent theme={theme} />;
      case 'painting': return <PaintingTools theme={theme} />;
      case 'clothing_keywords': return <ClothingKeywords theme={theme} />;
      case 'publisher': return <Publisher theme={theme} />;
      case 'storyboard': return <StoryboardCreator theme={theme} />;
      case 'grid_splitter': return <GridSplitter theme={theme} />;
      case 'cover_replica': return <CoverReplica theme={theme} />;
      case 'reverse': return <ImageReverse theme={theme} />;
      case 'wallpaper': return <WallpaperGallery theme={theme} />;
      case 'smart_agent': return <SmartAgent theme={theme} />;
      default: return <TextCreator theme={theme} />;
    }
  };

  const navItems = [
    { id: 'art_text', label: '🎨 艺术造字', icon: '✍️' },
    { id: 'border_agent', label: '💍 百变边框', icon: '🎨' },
    { id: 'video_extractor', label: '🎬 视频提取', icon: '📽️' },
    { id: 'christmas_product_director', label: '🎄 圣诞爆款', icon: '🎁' },
    { id: 'video_director', label: '🎬 电影分镜', icon: '📽️' },
    { id: 'storyboard', label: '🧩 九宫分镜', icon: '📦' },
    { id: 'ugc_strategist', label: '📱 UGC 策略', icon: '📽️' },
    { id: 'sora_director', label: '🎥 Sora 导演', icon: '🎬' },
    { id: 'clothing_director', label: '👗 服装中心', icon: '👕' },
    { id: 'sk2_director', label: '🎄 SK-II 导演', icon: '🎀' },
    { id: 'clothing_keywords', label: '🧥 服装咒语', icon: '🧵' },
    { id: 'publisher', label: '🚀 图文发布', icon: '📱' },
    { id: 'painting', label: '🛠️ 工具合集', icon: '🔧' },
    { id: 'reverse', label: '🔍 以图反推', icon: '🧐' }
  ];

  const isNeoBrutalist = theme === AppTheme.NEO_BRUTALISM;

  return (
    <div className={`flex min-h-screen transition-all duration-700 ${config.bgClass} overflow-hidden font-sans`}>
      
      {/* 侧边栏 */}
      <aside className={`relative flex flex-col w-72 md:w-80 shrink-0 z-50 ${isNeoBrutalist ? 'border-r-8 border-black bg-white shadow-[10px_0_0_black]' : 'bg-white/40 backdrop-blur-2xl border-r border-white/20'}`}>
        
        {/* Logo */}
        <div className={`p-10 ${isNeoBrutalist ? 'border-b-8 border-black' : ''}`}>
          <h1 className={`text-4xl font-black italic tracking-tighter ${config.textClass}`}>
            小渝児 AI
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 rounded italic">2026 EDITION</span>
          </div>
        </div>

        {/* 导航 */}
        <nav className="flex-1 overflow-y-auto no-scrollbar py-6 px-6 space-y-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setMode(item.id as AppMode)}
              className={`w-full px-5 py-4 font-black transition-all text-sm flex items-center gap-4 ${
                mode === item.id 
                ? (isNeoBrutalist ? 'bg-black text-white' : 'bg-white shadow-xl scale-105 rounded-3xl') 
                : 'text-gray-500 hover:bg-white/50 rounded-2xl'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* 主题切换 */}
        <div className={`p-10 ${isNeoBrutalist ? 'border-t-8 border-black' : 'border-t border-black/5'} flex justify-center`}>
          <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Header Section */}
        <header className="px-6 md:px-10 py-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 overflow-hidden shrink-0">
          <div className="flex-1 flex flex-col gap-3">
             {/* 公告栏：确保黑色字体在所有皮肤下清晰 */}
             <div className={`flex items-center h-12 overflow-hidden border-2 rounded-2xl px-4 transition-all duration-500 ${isNeoBrutalist ? 'border-black bg-white shadow-[6px_6px_0px_black]' : 'bg-white/60 border-white/20 backdrop-blur-xl shadow-sm'}`}>
                <div className="shrink-0 flex items-center gap-2 mr-6 border-r border-black/10 pr-5">
                   <span className="text-lg animate-wiggle">📢</span>
                   <span className="font-black text-[11px] text-black whitespace-nowrap tracking-widest uppercase italic">公告</span>
                </div>
                <div className="flex-1 overflow-hidden relative flex items-center">
                   <div className="flex animate-marquee whitespace-nowrap items-center">
                      {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
                        <span key={i} className="px-10 text-[12px] font-bold text-black tracking-tight hover:text-blue-600 transition-colors cursor-default">
                          {text}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
             <p className={`text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-2 ${config.textClass}`}>
               Creative Intelligence Factory · 创意智能工厂
             </p>
          </div>
          <div className="shrink-0 w-full xl:w-auto flex justify-center xl:justify-end">
            <TimeDisplay theme={theme} />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-10 overflow-hidden flex justify-center">
          <div className={`w-full h-full ${config.cardClass} transition-all duration-700 overflow-hidden flex flex-col shadow-2xl`}>
            {renderContent()}
          </div>
        </main>

        <footer className="h-16 flex items-center justify-center shrink-0">
           <p className={`text-[9px] font-black uppercase tracking-[0.5em] italic opacity-30 ${config.textClass}`}>
             小渝児 AI 创作工厂 • 2026 旗舰皮肤版
           </p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />
    </div>
  );
};

export default App;
