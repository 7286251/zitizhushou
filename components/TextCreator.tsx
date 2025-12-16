import React, { useState, useMemo } from 'react';
import { STYLE_OPTIONS, THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { generateArtPrompt } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const TextCreator: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0].id);
  const [customStyle, setCustomStyle] = useState('');
  const [activeCategory, setActiveCategory] = useState('爆款封面'); // Default to new category
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const categories = useMemo(() => {
    // Priority order updated for new categories
    const priorityOrder = ['爆款封面', '马年限定', '热门', '游戏电竞', '商业封面', '趣味社交', '经典艺术'];
    
    // Get all unique categories from data
    const uniqueCats = Array.from(new Set(STYLE_OPTIONS.map(s => s.category)));
    
    // Sort based on priority order
    return uniqueCats.sort((a, b) => {
      const idxA = priorityOrder.indexOf(a);
      const idxB = priorityOrder.indexOf(b);
      // If both are in priority list, sort by index
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      // If only A is in list, A comes first
      if (idxA !== -1) return -1;
      // If only B is in list, B comes first
      if (idxB !== -1) return 1;
      // Otherwise alphabetical or default sort
      return a.localeCompare(b);
    });
  }, []);

  const filteredStyles = useMemo(() => {
    if (activeCategory === '全部') return STYLE_OPTIONS;
    return STYLE_OPTIONS.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const handleGenerate = async () => {
    if (!text1) {
      alert('请输入主文字');
      return;
    }
    setIsLoading(true);
    setResult('');
    const styleName = STYLE_OPTIONS.find(s => s.id === selectedStyle)?.name || '';
    const prompt = await generateArtPrompt(text1, text2, text3, styleName, customStyle);
    setResult(prompt);
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const getCategoryButtonClass = (cat: string) => {
    const isActive = activeCategory === cat;
    
    if (theme === AppTheme.NEW_YEAR_2026) {
      return isActive 
        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md border border-yellow-300' 
        : 'bg-red-50 text-red-900 hover:bg-red-100 border border-transparent';
    }
    if (theme === AppTheme.RETRO_DESKTOP) {
      return isActive 
        ? 'bg-blue-600 text-white border-2 border-blue-800 shadow-inner' 
        : 'bg-white text-blue-600 border-2 border-gray-300 hover:bg-blue-50';
    }
    if (theme === AppTheme.PINK_PLUSH) {
      return isActive 
        ? 'bg-pink-500 text-white shadow-lg transform scale-105' 
        : 'bg-white text-pink-400 hover:bg-pink-50 shadow-sm';
    }
    return '';
  };

  return (
    <div className={`p-6 ${config.cardClass} relative transition-all duration-300`}>
      <h2 className={`text-2xl font-bold mb-4 ${config.textClass} flex items-center`}>
        <span className="mr-2">✨</span> 艺术字创作模式
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-bold mb-1 ${config.textClass}`}>输入文字</label>
            <input 
              type="text" 
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="例如：马年大吉"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
            />
          </div>
          <div>
            <label className={`block text-sm font-bold mb-1 ${config.textClass}`}>第二行小字</label>
            <input 
              type="text" 
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="例如：HAPPY NEW YEAR"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className={`block text-sm font-bold mb-1 ${config.textClass}`}>签名字</label>
            <input 
              type="text" 
              value={text3}
              onChange={(e) => setText3(e.target.value)}
              placeholder="例如：小渝児设计 / 2026"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
             <label className={`block text-sm font-bold ${config.textClass}`}>选择风格</label>
             <span className="text-xs opacity-60">内置600+精品风格</span>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${getCategoryButtonClass(cat)}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
            {filteredStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-2 text-xs rounded-md border text-left transition-all ${
                  selectedStyle === style.id 
                    ? 'ring-2 ring-offset-1 ring-blue-500 bg-blue-50 border-blue-500 text-blue-700' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                <div className="font-bold flex items-center justify-between mb-1">
                  <span className="truncate">{style.name}</span>
                  {selectedStyle === style.id && <span className="text-blue-500 font-bold">✓</span>}
                </div>
                <div className="text-[10px] opacity-70 truncate" title={style.description}>
                  {style.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={`block text-sm font-bold mb-1 ${config.textClass}`}>自定义风格 (可选)</label>
          <textarea 
            value={customStyle}
            onChange={(e) => setCustomStyle(e.target.value)}
            placeholder="例如：长沙臭豆腐主题，黑色臭豆腐质感，加上绿色香菜点缀..."
            className="w-full p-3 border rounded-lg h-20 focus:ring-2 focus:ring-opacity-50 outline-none transition-all"
          />
        </div>

        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className={`w-full py-3 rounded-lg text-lg shadow-md transition-transform active:scale-95 ${config.buttonClass} disabled:opacity-50`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              大师思考中...
            </span>
          ) : '开始生成提示词'}
        </button>

        {result && (
          <div className="mt-6 relative animate-pop">
            <div className="bg-gray-800 text-gray-100 p-4 rounded-lg font-mono text-sm break-all leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
              {result}
            </div>
            <button 
              onClick={handleCopy}
              className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded text-xs backdrop-blur-sm transition-colors"
            >
              复制
            </button>
            {copySuccess && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl animate-pop z-10 font-bold flex items-center">
                 ✨ 复制成功！ ✨
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextCreator;