import React from 'react';
import { THEME_CONFIG, PAINTING_TOOLS } from '../constants';
import { AppTheme } from '../types';

interface Props {
  theme: AppTheme;
}

const PaintingTools: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];

  const handleOpenTool = (url: string) => {
    window.open(url, '_blank');
  };

  const getTagStyle = (tag: string) => {
    if (tag.includes('国内')) {
      return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-pulse';
    }
    if (tag.includes('梯子')) {
      return 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-[0_0_8px_rgba(248,113,113,0.5)] animate-pulse';
    }
    if (tag.includes('国外')) {
      return 'bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-[0_0_8px_rgba(99,102,241,0.5)] animate-pulse';
    }
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col`}>
      <h2 className={`text-2xl font-bold mb-6 ${config.textClass} flex items-center`}>
        <span className="mr-2">🛠️</span> 工具合集
      </h2>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
        <div className="space-y-4">
          {PAINTING_TOOLS.map((tool) => (
            <div 
              key={tool.id}
              onClick={() => handleOpenTool(tool.url)}
              className="bg-white hover:bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center group relative overflow-hidden"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl mr-5 shadow-inner transition-colors ${theme === AppTheme.NEW_YEAR_2026 ? 'bg-red-50 group-hover:bg-red-100' : 'bg-blue-50 group-hover:bg-blue-100'} relative`}>
                {tool.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    {tool.name}
                  </h3>
                  {tool.tag && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide transform transition-transform hover:scale-105 ${getTagStyle(tool.tag)}`}>
                      {tool.tag}
                    </span>
                  )}
                  {/* Dynamic New Badge moved here */}
                  {tool.isNew && (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm animate-bounce border border-white whitespace-nowrap">
                      2026 New
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{tool.description}</p>
              </div>

              <div className="text-gray-300 group-hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaintingTools;