import React from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';

interface Props {
  theme: AppTheme;
}

const SmartAgent: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col`}>
      <h2 className={`text-2xl font-bold mb-6 ${config.textClass} flex items-center`}>
        <span className="mr-2">🤖</span> 智能体合集
        <span className="ml-3 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full animate-pulse">
           Coming Soon
        </span>
      </h2>

      {/* Placeholder container for future Tool Collection content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10 flex flex-col items-center justify-center">
        <div className="text-center p-8 bg-white/50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4 animate-bounce">🚧</div>
          <h3 className={`text-xl font-bold mb-2 ${config.textClass}`}>智能体资源库升级中</h3>
          <p className="text-gray-500">即将上线更多实用的AI智能体工具...</p>
        </div>
      </div>
    </div>
  );
};

export default SmartAgent;