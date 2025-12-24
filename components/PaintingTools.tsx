
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
    if (tag.includes('国外') || tag.includes('需梯子') || tag.includes('国际')) {
        return 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30';
    }
    return 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30';
  };

  const allFilteredTools = useMemo(() => {
    let tools = [...PAINTING_TOOLS];
    if (activeCategory !== 'all') {
      tools = tools.filter(tool => {
        if (activeCategory === 'domestic') return tool.tag?.includes('国内') || tool.tag?.includes('阿里') || tool.tag?.includes('腾讯') || tool.tag?.includes('字节') || tool.tag?.includes('百度');
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

  return (
    <div className="p-6 md:p-10 relative h-full flex flex-col overflow-hidden bg-transparent">
      
      {/* 顶部搜索与标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 shrink-0 relative z-20">
        <h2 className={`text-3xl font-black ${config.textClass} flex items-center`}>
          <span className="mr-3">🚀</span> AI 工具合集
          <span className="ml-4 text-[10px] bg-blue-600/20 text-blue-400 border border-blue-400/30 px-3 py-1 rounded-full font-black animate-pulse uppercase tracking-widest">
            {allFilteredTools.length} nodes active
          </span>
        </h2>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="搜索节点、平台或功能..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-12 pr-6 py-3.5 rounded-2xl border border-white/10 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 transition-all bg-white/5 text-white placeholder-white/20 shadow-inner ring-1 ring-white/10" 
          />
          <svg className="absolute left-4 top-4 text-blue-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* 分类过滤 */}
      <div className="flex flex-wrap gap-2 mb-8 shrink-0 overflow-x-auto no-scrollbar relative z-20">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)} 
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                activeCategory === cat.id 
                ? 'bg-blue-600 text-white border-blue-400 shadow-[0_4px_20px_rgba(37,99,235,0.4)]' 
                : 'bg-white/5 text-white/40 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 工具列表 */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayedTools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => handleOpenTool(tool.url)}
              className="group relative bg-[#1c1c24]/30 backdrop-blur-2xl rounded-[2.2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-blue-600/20 ring-1 ring-white/10 hover:ring-blue-500/50 flex flex-col h-[320px]"
            >
              {/* 可视化背景大图 (模拟 2026 高端视觉) */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                 <img 
                    src={`https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80&sig=${tool.id}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    alt="bg"
                 />
              </div>

              {/* 内容层 */}
              <div className="relative p-8 flex flex-col h-full z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-3xl flex items-center justify-center text-4xl shadow-inner border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    {tool.icon}
                  </div>
                  {tool.isNew && (
                    <span className="text-[10px] bg-blue-500 text-white px-3 py-1 rounded-full font-black italic shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse">
                      NEW
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-3 leading-relaxed font-medium">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                   <span className={`text-[9px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest ${getTagStyle(tool.tag || '')}`}>
                    {tool.tag}
                   </span>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg ring-1 ring-white/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                   </div>
                </div>
              </div>

              {/* 装饰性高光与光感 */}
              <div className="absolute inset-0 pointer-events-none rounded-[2.2rem] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-600/10 blur-[40px] rounded-full group-hover:bg-blue-600/20 transition-all"></div>
            </div>
          ))}
        </div>

        {allFilteredTools.length > visibleCount && (
            <div className="flex justify-center mt-12 mb-20">
                <button 
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    className="px-14 py-4 bg-white/5 border border-white/10 hover:border-blue-500/50 rounded-2xl font-black text-xs tracking-widest text-white/60 hover:text-white transition-all shadow-xl active:scale-95"
                >
                    同步更多节点数据 ({allFilteredTools.length - visibleCount}+)
                </button>
            </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.2); }
      ` }} />
    </div>
  );
};

export default PaintingTools;
