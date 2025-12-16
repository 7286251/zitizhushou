import React, { useState } from 'react';
import { THEME_CONFIG, WALLPAPER_PRESETS } from '../constants';
import { AppTheme } from '../types';

interface Props {
  theme: AppTheme;
}

const WallpaperGallery: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (prompt: string, id: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`p-6 ${config.cardClass} h-full overflow-hidden flex flex-col`}>
      <h2 className={`text-2xl font-bold mb-4 ${config.textClass} flex items-center`}>
        <span className="mr-2">🧧</span> 2026 新年壁纸库
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-20">
        {WALLPAPER_PRESETS.map((wp) => (
          <div 
            key={wp.id} 
            className="group relative bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded mb-3 flex items-center justify-center text-4xl shadow-inner">
              🐴
            </div>
            <h3 className="font-bold text-gray-800 mb-2">{wp.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-3 mb-8">{wp.prompt}</p>
            
            <button
              onClick={() => handleCopy(wp.prompt, wp.id)}
              className={`absolute bottom-4 left-4 right-4 py-2 rounded text-sm font-bold transition-colors ${config.buttonClass}`}
            >
              {copiedId === wp.id ? '复制成功 ✨' : '获取提示词'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WallpaperGallery;