
import React, { useState, useMemo } from 'react';
import { THEME_CONFIG, PAINTING_TOOLS } from '../constants';
import { AppTheme, PaintingTool } from '../types';

interface Props {
  theme: AppTheme;
}

const PaintingTools: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'video', label: '✨ AI视频' },
    { id: 'drawing', label: '🎨 AI绘画' },
    { id: 'dubbing', label: '🎙️ 配音秀' }, 
    { id: 'watermark', label: '💧 去水印' },
    { id: 'prompt', label: '📝 提示词' },
    { id: 'reverse', label: '🔍 图像反推' },
    { id: 'model', label: '🤖 大模型' },
    { id: 'utility', label: '🛠️ 实用工具' },
  ];

  const handleOpenTool = (url: string) => {
    window.open(url, '_blank');
  };

  const getTagStyle = (tag: string) => {
    if (tag.includes('国外') || tag.includes('梯子')) {
        return 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse border border-white/40 font-black';
    }
    if (tag.includes('国内') || tag.includes('国产')) {
      return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] border border-green-400/30 font-black';
    }
    if (tag.includes('纯净')) {
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)] border border-blue-400/30 font-black';
    }
    return 'bg-gray-100 text-gray-600 border border-gray-200 font-bold';
  };

  const filteredTools = useMemo(() => {
    let tools = [...PAINTING_TOOLS];
    if (activeCategory !== 'all') {
      tools = tools.filter(tool => tool.category === activeCategory);
    }
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(lowerTerm) || 
        tool.description.toLowerCase().includes(lowerTerm)
      );
    }
    return tools.sort((a, b) => (a.isNew ? -1 : 1));
  }, [activeCategory, searchTerm]);

  const activeGuide = useMemo(() => {
    return PAINTING_TOOLS.find(t => t.id === selectedGuideId);
  }, [selectedGuideId]);

  return (
    <div className={`p-4 md:p-6 ${config.cardClass} relative h-full flex flex-col overflow-hidden`}>
      {/* 酷炫动态教程框 */}
      <div className="mb-6 relative overflow-hidden bg-gradient-to-r from-emerald-900/10 to-blue-900/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm shadow-inner">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_3s_linear_infinite]"></div>
         <h3 className="text-sm font-black text-emerald-500 mb-2 flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
           导航指南 · GUIDE
         </h3>
         <div className="text-xs text-gray-500 leading-relaxed space-y-1 font-bold">
           <p className="hover:text-emerald-400 transition-colors">1. 点击分类标签快速定位您需要的 AI 工具领域。</p>
           <p className="hover:text-emerald-400 transition-colors">2. 点击卡片上的 📖 小图标即可查看专属于该工具的使用攻略。</p>
           <p className="hover:text-emerald-400 transition-colors">3. 标红标签工具需自备网络环境，绿色标签工具国内直连。</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">🛠️</span> 工具合集
          <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-black">{filteredTools.length}个</span>
        </h2>
        <div className="relative">
          <input type="text" placeholder="搜索工具..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-64 shadow-sm" />
          <svg className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-full text-xs font-black transition-all duration-200 border whitespace-nowrap shadow-sm ${activeCategory === cat.id ? 'bg-blue-600 text-white border-blue-600 scale-105' : 'bg-white/60 text-gray-600 hover:bg-white border-gray-200'}`}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool, index) => {
            const spinDuration = (index % 5 + 6) + 's';
            const spinDirection = index % 2 === 0 ? 'normal' : 'reverse';
            return (
              <div key={tool.id} className="bg-white hover:bg-blue-50/50 p-4 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col group relative overflow-hidden h-40">
                <div className="flex items-start mb-3">
                  <div 
                    onClick={() => handleOpenTool(tool.url)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-3xl mr-3 shadow-inner shrink-0 cursor-pointer ${theme === AppTheme.NEW_YEAR_2026 ? 'bg-red-50' : 'bg-gray-50'}`} 
                    style={{ animation: `spin ${spinDuration} linear infinite ${spinDirection}` }}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{tool.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0" onClick={() => handleOpenTool(tool.url)}>
                    <h3 className="font-black text-sm text-gray-800 truncate mb-0.5 group-hover:text-blue-600 transition-colors cursor-pointer">{tool.name}</h3>
                    <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight h-8">{tool.description}</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedGuideId(tool.id); }}
                    className="p-1.5 rounded-lg bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600 transition-all ml-1 group/guide"
                    title="查看使用攻略"
                  >
                    <span className="text-sm font-bold group-hover/guide:animate-bounce block">📖</span>
                  </button>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 overflow-hidden">
                     {tool.tag && <span className={`text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap ${getTagStyle(tool.tag)}`}>{tool.tag}</span>}
                     {tool.isNew && <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-[9px] font-black animate-pulse shadow-sm">NEW</span>}
                  </div>
                  <button 
                    onClick={() => handleOpenTool(tool.url)}
                    className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all"
                  >
                    GO官网 →
                  </button>
                </div>
                
                {(tool.tag?.includes('国外')) && <div className="absolute -right-2 -top-2 text-5xl opacity-[0.03] rotate-12 pointer-events-none group-hover:opacity-[0.08] transition-opacity">🌐</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 攻略弹窗 (酷炫动态特效) */}
      {selectedGuideId && activeGuide && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-pop" onClick={() => setSelectedGuideId(null)}></div>
           <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 animate-pop">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-700 -skew-y-3 -translate-y-8"></div>
              
              <div className="relative pt-10 px-8 pb-10 flex flex-col items-center text-center">
                 <div className="w-20 h-20 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-5xl mb-6 transform rotate-3 hover:rotate-0 transition-transform">
                    {activeGuide.icon}
                 </div>
                 
                 <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-widest">{activeGuide.name}</h3>
                 <div className={`text-[10px] px-4 py-1 rounded-full mb-6 font-black uppercase tracking-[0.2em] ${getTagStyle(activeGuide.tag || '')}`}>
                    {activeGuide.tag}
                 </div>
                 
                 <div className="w-full bg-gray-50 rounded-3xl p-6 border border-gray-100 relative group overflow-hidden">
                    <div className="absolute -left-10 -top-10 w-20 h-20 bg-blue-500/5 rounded-full animate-ping"></div>
                    <div className="absolute right-2 top-2 text-xs font-black text-gray-200 italic">STEP BY STEP</div>
                    <h4 className="text-xs font-black text-blue-500 mb-3 flex items-center gap-2">
                       <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">!</span>
                       使用攻略教程
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed text-left font-bold italic">
                       {activeGuide.guide || "该工具暂未收录详细攻略，请直接访问官网探索。"}
                    </p>
                 </div>
                 
                 <div className="flex gap-4 w-full mt-8">
                    <button 
                       onClick={() => setSelectedGuideId(null)}
                       className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all active:scale-95"
                    >
                       我了解了
                    </button>
                    <button 
                       onClick={() => { handleOpenTool(activeGuide.url); setSelectedGuideId(null); }}
                       className="flex-[2] py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl hover:opacity-90 transition-all active:scale-95"
                    >
                       立即前往创作 →
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` }} />
    </div>
  );
};

export default PaintingTools;
