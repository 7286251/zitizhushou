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

  const categories = [
    { id: 'all', label: '全部' },
    { id: 'video', label: '✨ AI视频' },
    { id: 'drawing', label: '🎨 AI绘画' },
    { id: 'prompt', label: '📝 提示词' },
    { id: 'reverse', label: '🔍 图像反推' },
    { id: 'model', label: '🤖 大模型' },
    { id: 'utility', label: '🛠️ 实用工具' },
  ];

  const handleOpenTool = (url: string) => {
    window.open(url, '_blank');
  };

  const getTagStyle = (tag: string) => {
    // Special Cool Effect for Auto Detect
    if (tag.includes('自动识别') || tag.includes('Auto Detect')) {
       return 'bg-gray-900 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] animate-[pulse_2s_infinite]';
    }

    if (tag.includes('国内') || tag.includes('国产')) {
      return 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)] border border-green-400/30';
    }
    if (tag.includes('梯子') || tag.includes('VPN')) {
      return 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)] border border-red-400/30';
    }
    if (tag.includes('国外') || tag.includes('海外')) {
      return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_2px_8px_rgba(79,70,229,0.3)] border border-blue-400/30';
    }
    return 'bg-gray-100 text-gray-600 border border-gray-200';
  };

  const filteredTools = useMemo(() => {
    let tools = PAINTING_TOOLS;
    
    // Filter by Category
    if (activeCategory !== 'all') {
      tools = tools.filter(tool => tool.category === activeCategory);
    }

    // Filter by Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      tools = tools.filter(tool => 
        tool.name.toLowerCase().includes(lowerTerm) || 
        tool.description.toLowerCase().includes(lowerTerm)
      );
    }

    // Sort: Newest first, then by name
    return tools.sort((a, b) => {
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0; // Keep original order for same status
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className={`p-4 md:p-6 ${config.cardClass} relative h-full flex flex-col overflow-hidden`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">🛠️</span> 工具合集
          <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{filteredTools.length}个</span>
        </h2>
        
        {/* Search */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="搜索工具..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-full border border-gray-300 text-sm focus:ring-2 focus:ring-blue-400 outline-none w-full md:w-64 shadow-sm"
          />
          <svg className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md transform scale-105 border-blue-700'
                : 'bg-white/60 text-gray-600 hover:bg-white border-gray-200 hover:border-blue-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              onClick={() => handleOpenTool(tool.url)}
              className="bg-white hover:bg-blue-50/50 p-3 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-start group relative overflow-hidden h-26"
            >
              {/* Icon Section */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-3 shadow-inner transition-colors ${theme === AppTheme.NEW_YEAR_2026 ? 'bg-red-50 group-hover:bg-red-100' : 'bg-gray-50 group-hover:bg-blue-100'} relative shrink-0`}>
                {tool.icon}
              </div>
              
              <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
                {/* Content Section */}
                <div>
                  <h3 className="font-bold text-sm text-gray-800 truncate mb-0.5">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-tight h-8">{tool.description}</p>
                </div>
                
                {/* Footer Section: Tag then New Badge */}
                <div className="flex items-center mt-2 flex-wrap gap-2">
                   {tool.tag && (
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold tracking-wide ${getTagStyle(tool.tag)}`}>
                      {tool.tag}
                    </span>
                   )}
                   
                   {/* Cool Dynamic New Label (After Tag) */}
                   {tool.isNew && (
                      <div className="relative group/new">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-50 group-hover/new:opacity-100 transition duration-200 animate-pulse"></div>
                        <span className="relative flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase bg-gradient-to-r from-rose-500 to-orange-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                           <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-white opacity-75 right-0 -top-0.5"></span>
                           NEW
                        </span>
                      </div>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-20 opacity-50">
             <div className="text-4xl mb-2">🤷‍♂️</div>
             <p>没有找到相关工具</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaintingTools;