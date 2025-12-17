import React from 'react';
import { AppTheme } from '../types';

interface Props {
  currentTheme: AppTheme;
  setTheme: (theme: AppTheme) => void;
}

const ThemeSwitcher: React.FC<Props> = ({ currentTheme, setTheme }) => {
  const themes = [
    { id: AppTheme.NEW_YEAR_2026, label: '🧨 新年', color: 'bg-red-500' },
    { id: AppTheme.RETRO_DESKTOP, label: '💾 复古', color: 'bg-blue-400' },
    { id: AppTheme.PINK_PLUSH, label: '🧸 软萌', color: 'bg-pink-400' },
    { id: AppTheme.DOPAMINE, label: '🌈 多巴胺', color: 'bg-purple-500' },
    { id: AppTheme.NEO_BRUTALISM, label: '◼️ 粗野', color: 'bg-black border border-white' },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-white/80 backdrop-blur p-2 rounded-lg shadow-lg">
      <div className="text-xs text-center font-bold text-gray-500 mb-1">主题切换</div>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          className={`px-3 py-2 rounded-md text-xs font-bold text-white transition-all transform hover:scale-105 ${t.color} ${currentTheme === t.id ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'opacity-70 hover:opacity-100'}`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;