
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
    { id: 'all', label: '📡 全部工具' },
    { id: 'image', label: '🖼️ 图像工具' },
    { id: 'video', label: '🎬 视频工具' },
    { id: 'office', label: '📊 办公工具' },
    { id: 'agent', label: '🤖 智能体' },
    { id: 'chat', label: '💬 聊天工具' },
    { id: 'coding', label: '💻 编程工具' },
    { id: 'design', label: '🎨 设计工具' },
    { id: 'audio', label: '🎵 音频工具' },
    { id: 'search', label: '🔍 搜索引擎' },
    { id: 'dev', label: '⚙️ 开发平台' },
    { id: 'study', label: '📚 学习网站' },
    { id: 'train', label: '🏋️ 训练模型' },
    { id: 'eval', label: '📏 模型评测' },
    { id: 'detect', label: '🛡️ 内容检测' },
    { id: 'prompt', label: '✍️ 提示指令' },
  ];

  const handleOpenTool = (url: string) => {
    window.open(url, '_blank');
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
    return tools.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }, [activeCategory, searchTerm]);

  const displayedTools = allFilteredTools.slice(0, visibleCount);

  return (
    <div className={`p-6 md:p-10 relative h-full flex flex-col overflow-hidden bg-transparent`}>
      
      {/* 顶部搜索与标题 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 shrink-0 relative z-20">
        <h2 className={`text-3xl font-black ${config.textClass} flex items-center`}>
          <span className="mr-3">🚀</span> 工具合集
          <span className="ml-4 text-[10px] px-3 py-1 rounded-full font-black animate-pulse uppercase tracking-widest bg-blue-600 text-white shadow-lg">
            {allFilteredTools.length} nodes active
          </span>
        </h2>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="搜索工具、平台或功能..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="pl-12 pr-6 py-3.5 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-80 transition-all bg-white border border-gray-200 text-gray-900 placeholder-gray-400" 
          />
          <svg className="absolute left-4 top-4 text-blue-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      {/* 分类过滤 */}
      <div className="flex flex-wrap gap-2 mb-8 shrink-0 overflow-x-auto no-scrollbar relative z-20 pb-2">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.id)} 
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat.id 
                  ? 'bg-black text-white shadow-xl' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-gray-300 hover:text-gray-900'
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
              className="group relative rounded-[2.2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-[280px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
              <div className="relative p-8 flex flex-col h-full z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 bg-gray-50 border border-gray-100">
                    {tool.icon}
                  </div>
                  {tool.isNew && (
                    <span className="text-[10px] px-3 py-1 rounded-full font-black italic animate-pulse bg-blue-600 text-white shadow-lg">
                      NEW
                    </span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-xl mb-2 transition-colors text-gray-900 group-hover:text-blue-600">
                    {tool.name}
                  </h3>
                  <p className="text-xs line-clamp-2 leading-relaxed font-medium text-gray-500">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                   <span className="text-[9px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                    {tool.tag}
                   </span>
                   <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-gray-900 text-white group-hover:bg-blue-600 shadow-md">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allFilteredTools.length > visibleCount && (
            <div className="flex justify-center mt-12 mb-20">
                <button 
                    onClick={() => setVisibleCount(prev => prev + 24)}
                    className="px-14 py-4 rounded-2xl font-black text-xs tracking-widest transition-all active:scale-95 bg-white border border-gray-200 text-gray-900 hover:border-gray-400 shadow-md"
                >
                    同步更多工具数据 ({allFilteredTools.length - visibleCount}+)
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default PaintingTools;
