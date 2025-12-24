
import React, { useState, useMemo, useEffect } from 'react';
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
  const [visibleCount, setVisibleCount] = useState(24); // 初始加载 24 个，优化性能
  
  const categories = [
    { id: 'all', label: '全部' },
    { id: 'domestic', label: '🏮 国内AI' },
    { id: 'international', label: '🌐 国际视野' },
    { id: 'video', label: '✨ AI视频' },
    { id: 'drawing', label: '🎨 AI绘画' },
    { id: 'dubbing', label: '🎙️ 配音秀' }, 
    { id: 'watermark', label: '💧 去水印' },
    { id: 'prompt', label: '📝 提示词' },
    { id: 'reverse', label: '🔍 图像反推' },
    { id: 'model', label: '🤖 大模型' },
    { id: 'utility', label: '🛠️ 实用工具' },
  ];

  // 每次分类或搜索变化时，重置显示数量
  useEffect(() => {
    setVisibleCount(24);
  }, [activeCategory, searchTerm]);

  const handleOpenTool = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCopyUrl = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    showToast('链接已复制到剪贴板');
  };

  const showToast = (msg: string) => {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full text-xs font-bold z-[300] animate-pop backdrop-blur-md border border-white/10";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const getTagStyle = (tag: string) => {
    if (tag.includes('国外') || tag.includes('梯子')) {
        return 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse border border-white/40 font-black';
    }
    if (tag.includes('国内') || tag.includes('国产') || tag.includes('国内AI')) {
      return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.2)] border border-green-400/30 font-black';
    }
    if (tag.includes('积分') || tag.includes('任务')) {
        return 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-[0_4px_12px_rgba(236,72,153,0.3)] border border-pink-300/40 font-black';
    }
    return 'bg-gray-100 text-gray-600 border border-gray-200 font-bold';
  };

  const allFilteredTools = useMemo(() => {
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
    // 让带有 isNew 或是 topTools (前20个左右) 的靠前
    return tools.sort((a, b) => {
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
    });
  }, [activeCategory, searchTerm]);

  const displayedTools = allFilteredTools.slice(0, visibleCount);

  const activeGuide = useMemo(() => {
    return PAINTING_TOOLS.find(t => t.id === selectedGuideId);
  }, [selectedGuideId]);

  return (
    <div className={`p-4 md:p-6 ${config.cardClass} relative h-full flex flex-col overflow-hidden`}>
      {/* 酷炫动态教程框 */}
      <div className="mb-6 relative overflow-hidden bg-gradient-to-r from-emerald-900/10 to-blue-900/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm shadow-inner shrink-0">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_3s_linear_infinite]"></div>
         <h3 className="text-sm font-black text-emerald-500 mb-2 flex items-center gap-2">
           <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
           导航指南 · NAVIGATION
         </h3>
         <div className="text-xs text-gray-500 leading-relaxed space-y-1 font-bold">
           <p className="hover:text-emerald-400 transition-colors">1. 我们已收录系列精选热门 AI 工具，涵盖几乎所有主流与垂直领域。</p>
           <p className="hover:text-emerald-400 transition-colors">2. 点击卡片右上角 📖 查看独家攻略，点击 📋 可快速复制工具官网地址。</p>
           <p className="hover:text-emerald-400 transition-colors">3. 国内用户请优先选择绿色标签工具，海外资源可能需要特殊网络环境。</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4 shrink-0">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">🛠️</span> 顶尖 AI 工具库
          <span className="ml-2 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse">
            共 {allFilteredTools.length} 款
          </span>
        </h2>
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索核心 AI 工具..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-9 pr-4 py-2.5 rounded-2xl border-2 border-gray-100 text-sm focus:ring-2 focus:ring-emerald-400 outline-none w-full md:w-72 shadow-inner transition-all bg-white/80" 
          />
          <svg className="absolute left-3 top-3 text-gray-400 w-4.5 h-4.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto no-scrollbar pb-2 shrink-0">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)} 
            className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 border-2 whitespace-nowrap shadow-sm ${
                activeCategory === cat.id 
                ? 'bg-emerald-600 text-white border-emerald-500 scale-105 shadow-[0_5px_15px_rgba(16,185,129,0.3)]' 
                : 'bg-white/60 text-gray-500 hover:bg-white border-gray-100 hover:border-emerald-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedTools.map((tool, index) => {
            const displayUrl = new URL(tool.url).hostname.replace(/^www\./, '').replace(/\.com/g, '');
            const isTopTool = true; // 现在全都是真实的核心工具
            
            return (
              <div 
                key={tool.id} 
                onClick={() => handleOpenTool(tool.url)}
                className={`group bg-white rounded-3xl p-5 border-2 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col relative overflow-hidden h-48 cursor-pointer border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30`}
              >
                {/* 悬浮背景发光效果 */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-400/5 rounded-full blur-2xl group-hover:bg-emerald-400/20 transition-all"></div>

                <div className="flex items-start mb-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-4xl mr-4 shadow-inner shrink-0 bg-white border border-gray-50 transition-transform duration-500 group-hover:rotate-12`}>
                    <span>{tool.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="font-black text-sm text-gray-900 truncate group-hover:text-emerald-600 transition-colors">{tool.name}</h3>
                        {tool.isNew && <span className="text-[9px] text-emerald-500 font-black italic">HOT</span>}
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-snug h-8 font-medium">{tool.description}</p>
                  </div>
                </div>
                
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-center gap-2 overflow-hidden">
                     {tool.tag && <span className={`text-[9px] px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm ${getTagStyle(tool.tag)}`}>{tool.tag}</span>}
                     {tool.isNew && <span className="bg-rose-500 text-white px-2.5 py-1 rounded-full text-[9px] font-black animate-pulse shadow-sm">NEW</span>}
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                    <span className="text-[9px] text-gray-300 font-black tracking-widest uppercase">{displayUrl}</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedGuideId(tool.id); }}
                            className="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 flex items-center justify-center transition-all"
                            title="查看攻略"
                        >
                            <span className="text-sm">📖</span>
                        </button>
                        <button 
                            onClick={(e) => handleCopyUrl(e, tool.url)}
                            className="w-8 h-8 rounded-xl bg-gray-50 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 flex items-center justify-center transition-all"
                            title="复制链接"
                        >
                            <span className="text-xs">📋</span>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 加载更多按钮 - 现在工具较少，仅在必要时显示 */}
        {allFilteredTools.length > visibleCount && (
            <div className="flex justify-center mt-12 mb-20">
                <button 
                    onClick={() => setVisibleCount(prev => prev + 48)}
                    className={`px-10 py-4 rounded-3xl font-black text-sm tracking-widest transition-all active:scale-95 shadow-xl ${
                        theme === AppTheme.CARTOON_HORSE_RED ? 'bg-black text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'
                    }`}
                >
                    向下挖掘更多工具 ({allFilteredTools.length - visibleCount}+)
                </button>
            </div>
        )}

        {displayedTools.length === 0 && (
            <div className="py-20 flex flex-col items-center text-gray-300">
                <div className="text-6xl mb-4 grayscale opacity-30">🔍</div>
                <p className="font-black tracking-widest">未能发现匹配的 AI 神器...</p>
                <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}} className="mt-4 text-emerald-500 text-xs font-bold underline">重置搜索</button>
            </div>
        )}
      </div>

      {/* 攻略弹窗 */}
      {selectedGuideId && activeGuide && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/70 backdrop-blur-xl animate-pop" onClick={() => setSelectedGuideId(null)}></div>
           <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden border border-white/20 animate-pop">
              <div className="h-32 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-700 relative">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-3xl bg-white shadow-2xl flex items-center justify-center text-5xl transform rotate-6 hover:rotate-0 transition-transform border-4 border-emerald-50">
                    {activeGuide.icon}
                  </div>
              </div>
              
              <div className="pt-14 px-8 pb-10 flex flex-col items-center text-center">
                 <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">{activeGuide.name}</h3>
                 <div className={`text-[10px] px-5 py-1.5 rounded-full mb-8 font-black uppercase tracking-[0.2em] shadow-sm ${getTagStyle(activeGuide.tag || '')}`}>
                    {activeGuide.tag}
                 </div>
                 
                 <div className="w-full bg-emerald-50/50 rounded-[2rem] p-8 border-2 border-emerald-100 relative group overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
                    <div className="absolute left-6 top-6 text-[10px] font-black text-emerald-300 italic uppercase">Special Tutorial</div>
                    <h4 className="text-xs font-black text-emerald-600 mb-4 flex items-center justify-center gap-2">
                       <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-lg shadow-emerald-500/40 font-serif">i</span>
                       AI 创作官推荐玩法
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-bold italic">
                       “ {activeGuide.guide || "该工具的功能极其强大，建议直接访问官网探索其最新推出的 AI 创作工作流。"} ”
                    </p>
                 </div>
                 
                 <div className="flex gap-4 w-full mt-10">
                    <button 
                       onClick={() => setSelectedGuideId(null)}
                       className="flex-1 py-4.5 bg-gray-100 text-gray-500 rounded-2xl font-black text-xs hover:bg-gray-200 transition-all active:scale-95"
                    >
                       朕知道了
                    </button>
                    <button 
                       onClick={() => { handleOpenTool(activeGuide.url); setSelectedGuideId(null); }}
                       className="flex-[2] py-4.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-black text-xs shadow-[0_10px_20px_rgba(16,185,129,0.3)] hover:opacity-90 transition-all active:scale-95 border-b-4 border-emerald-800"
                    >
                       立即穿越到官网 →
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      ` }} />
    </div>
  );
};

export default PaintingTools;
