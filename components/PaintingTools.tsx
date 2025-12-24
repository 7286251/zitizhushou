
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
  const [visibleCount, setVisibleCount] = useState(24); 
  
  const categories = [
    { id: 'all', label: '📡 全部资源' },
    { id: 'domestic', label: '🏮 国内精品' },
    { id: 'video', label: '✨ 视频创作' },
    { id: 'drawing', label: '🎨 绘图中心' },
    { id: 'utility', label: '🛠️ 生产力工具' },
  ];

  const handleOpenTool = (url: string) => {
    window.open(url, '_blank');
  };

  const getTagStyle = (tag: string) => {
    if (tag.includes('国外') || tag.includes('需梯子')) {
        return 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]';
    }
    if (tag.includes('国内') || tag.includes('国产') || tag.includes('阿里') || tag.includes('字节')) {
      return 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]';
    }
    return 'bg-white/10 text-gray-400 border border-white/10';
  };

  const allFilteredTools = useMemo(() => {
    let tools = [...PAINTING_TOOLS];
    if (activeCategory !== 'all') {
      tools = tools.filter(tool => {
        if (activeCategory === 'domestic') return tool.tag?.includes('国内') || tool.tag?.includes('阿里') || tool.tag?.includes('字节');
        return tool.category === activeCategory;
      });
    }
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(lowerTerm) || 
        tool.description.toLowerCase().includes(lowerTerm)
      );
    }
    return tools.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }, [activeCategory, searchTerm]);

  const displayedTools = allFilteredTools.slice(0, visibleCount);
  const activeGuide = useMemo(() => PAINTING_TOOLS.find(t => t.id === selectedGuideId), [selectedGuideId]);

  return (
    <div className={`p-6 md:p-10 relative h-full flex flex-col overflow-hidden`}>
      
      {/* 顶部搜索与标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 shrink-0">
        <h2 className={`text-3xl font-black ${config.textClass} flex items-center`}>
          <span className="mr-3">🚀</span> AI 生产力终端
          <span className="ml-4 text-[10px] bg-cyan-600/20 text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded-full font-black animate-pulse uppercase tracking-widest">
            {allFilteredTools.length} nodes active
          </span>
        </h2>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="搜索节点名称或功能..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-12 pr-6 py-4 rounded-3xl border border-white/10 text-sm focus:ring-2 focus:ring-cyan-500 outline-none w-full md:w-80 transition-all bg-white/5 text-white placeholder-gray-500 shadow-inner" 
          />
          <svg className="absolute left-4 top-4 text-cyan-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* 分类过滤 */}
      <div className="flex flex-wrap gap-2 mb-8 shrink-0 overflow-x-auto no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)} 
            className={`px-6 py-3 rounded-2xl text-xs font-black transition-all border ${
                activeCategory === cat.id 
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                : 'bg-white/5 text-gray-500 border-white/5 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 工具列表 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedTools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => handleOpenTool(tool.url)}
              className="group relative bg-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-3 cursor-pointer shadow-2xl flex flex-col h-[380px] ring-1 ring-white/10 hover:ring-cyan-500/50"
            >
              {/* 可视化背景大图 (模拟 2026 高端视觉) */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                 <img 
                    src={`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80&sig=${tool.id}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt="bg"
                 />
              </div>

              {/* 内容层 */}
              <div className="relative p-8 flex flex-col h-full z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-3xl bg-black/40 backdrop-blur-xl flex items-center justify-center text-4xl shadow-2xl ring-1 ring-white/20 group-hover:rotate-6 transition-transform">
                    {tool.icon}
                  </div>
                  {tool.isNew && (
                    <span className="text-[10px] bg-yellow-400 text-black px-3 py-1 rounded-full font-black italic shadow-[0_0_15px_rgba(250,204,21,0.5)]">
                      NEW
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                   <span className={`text-[10px] px-4 py-1.5 rounded-full font-black uppercase tracking-widest ${getTagStyle(tool.tag || '')}`}>
                    {tool.tag}
                   </span>
                   <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedGuideId(tool.id); }}
                      className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-cyan-500 hover:text-white transition-all shadow-xl"
                   >
                      📖
                   </button>
                </div>
              </div>

              {/* 装饰性内阴影与光效 */}
              <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)] group-hover:shadow-[inset_0_0_40px_rgba(6,182,212,0.1)] transition-all"></div>
            </div>
          ))}
        </div>

        {allFilteredTools.length > visibleCount && (
            <div className="flex justify-center mt-12 mb-20">
                <button 
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    className="px-14 py-5 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl font-black text-sm tracking-widest text-white shadow-2xl hover:shadow-cyan-500/40 hover:scale-105 transition-all active:scale-95"
                >
                    同步更多节点数据 ({allFilteredTools.length - visibleCount}+)
                </button>
            </div>
        )}
      </div>

      {/* 攻略弹窗 */}
      {selectedGuideId && activeGuide && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setSelectedGuideId(null)}></div>
           <div className="relative w-full max-w-xl bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10 animate-pop">
              <div className="p-12">
                  <div className="flex items-center gap-6 mb-8">
                     <div className="w-20 h-20 rounded-3xl bg-black/40 flex items-center justify-center text-5xl shadow-2xl ring-1 ring-white/20">
                        {activeGuide.icon}
                     </div>
                     <div>
                        <h3 className="text-3xl font-black text-white mb-2">{activeGuide.name}</h3>
                        <span className={`text-[10px] px-4 py-1.5 rounded-full font-black ${getTagStyle(activeGuide.tag || '')}`}>
                            {activeGuide.tag}
                        </span>
                     </div>
                  </div>
                  <div className="bg-white/5 rounded-3xl p-8 mb-10 ring-1 ring-white/10">
                     <h4 className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        PRO NODE GUIDE
                     </h4>
                     <p className="text-lg text-gray-300 leading-relaxed font-bold italic">
                        “ {activeGuide.guide || "该节点功能强大，支持多种 AI 创作工作流，建议直接访问官网深度体验。"} ”
                     </p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setSelectedGuideId(null)} className="flex-1 py-5 bg-white/5 text-gray-400 rounded-2xl font-black hover:bg-white/10 transition-all">关闭</button>
                    <button onClick={() => { handleOpenTool(activeGuide.url); setSelectedGuideId(null); }} className="flex-[2] py-5 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-2xl font-black shadow-xl hover:shadow-cyan-500/40 transition-all active:scale-95">前往官网深挖功能</button>
                  </div>
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.2); }
      ` }} />
    </div>
  );
};

export default PaintingTools;
