
import React, { useState } from 'react';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';

interface ThemeSwitcherProps {
  currentTheme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const themes = Object.entries(THEME_CONFIG) as [AppTheme, typeof THEME_CONFIG[AppTheme]][];

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 悬浮主题选项列表 */}
      <div className={`absolute bottom-full mb-4 flex flex-col items-center gap-3 transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-50 pointer-events-none'}`}>
        {themes.map(([key, config]) => (
          <button
            key={key}
            onClick={() => {
              onThemeChange(key);
              setIsOpen(false);
            }}
            title={config.name}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-90 border-4 border-black shadow-xl bg-white ${currentTheme === key ? 'ring-4 ring-offset-2 ring-blue-500' : 'opacity-80'}`}
          >
            {config.icon}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full border-4 border-black flex items-center justify-center text-3xl transition-all shadow-[6px_6px_0px_black] active:translate-x-1 active:translate-y-1 active:shadow-none bg-white text-black ${isOpen ? 'rotate-45' : ''}`}
      >
        {isOpen ? '✕' : THEME_CONFIG[currentTheme].icon}
      </button>
      
      <span className="mt-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 select-none">
        {THEME_CONFIG[currentTheme].name}
      </span>
    </div>
  );
};

export default ThemeSwitcher;
