
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
  const [activeCategory, setActiveCategory] = useState('爆款封面');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const categories = useMemo(() => {
    const priorityOrder = ['爆款封面', '马年限定', '热门', '游戏电竞', '商业封面', '趣味社交', '经典艺术'];
    const uniqueCats = Array.from(new Set(STYLE_OPTIONS.map(s => s.category)));
    return uniqueCats.sort((a, b) => {
      const idxA = priorityOrder.indexOf(a);
      const idxB = priorityOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
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
        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md border border-yellow-300 scale-105' 
        : 'bg-red-50 text-red-900 hover:bg-red-100 border border-transparent';
    }
    return isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600';
  };

  return (
    <div className={`p-6 ${config.cardClass} relative transition-all duration-300 h-full overflow-y-auto custom-scrollbar flex flex-col`}>
      {/* 酷炫动态教程框 */}
      <div className="mb-6 relative overflow-hidden bg-gradient-to-r from-red-900/10 to-orange-900/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm shadow-inner">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_3s_linear_infinite]"></div>
         <h3 className="text-sm font-black text-red-500 mb-2 flex items-center gap-2">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
           造字工坊说明 · TIPS
         </h3>
         <div className="text-xs text-gray-500 leading-relaxed space-y-1 font-bold">
           <p className="hover:text-red-400 transition-colors">1. 智能体专注输出高质量绘画提示词，不支持直接生成图片。</p>
           <p className="hover:text-red-400 transition-colors">2. 选择内置爆款风格或在“自定义”中输入您想要的画面意境。</p>
           <p className="hover:text-red-400 transition-colors">3. 生成后点击复制，前往 MJ/SD/豆包 等绘图工具粘贴即可。</p>
         </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">✍️</span> 艺术字提示词智能体
          <span className="ml-3 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded font-black animate-pulse">2026 限定版</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-6">
          <div className="bg-white/50 p-5 rounded-2xl border border-red-100 shadow-sm space-y-4">
             <div className="grid grid-cols-1 gap-4">
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">核心主文字</label>
                  <input 
                    type="text" 
                    value={text1} 
                    onChange={(e) => setText1(e.target.value)} 
                    placeholder="输入您要生成的文字，如：马到成功" 
                    className="w-full p-3 bg-white border border-red-50 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-400 outline-none shadow-sm transition-all" 
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">装饰小字 (第一行)</label>
                    <input type="text" value={text2} onChange={(e) => setText2(e.target.value)} placeholder="如：NEW YEAR" className="w-full p-3 bg-white border border-red-50 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-400 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">装饰小字 (第二行)</label>
                    <input type="text" value={text3} onChange={(e) => setText3(e.target.value)} placeholder="如：2026" className="w-full p-3 bg-white border border-red-50 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-400 outline-none" />
                  </div>
               </div>
             </div>

             <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-2 block">自定义意境/风格</label>
                <textarea 
                  value={customStyle} 
                  onChange={(e) => setCustomStyle(e.target.value)} 
                  placeholder="在此输入您的个性化风格描述，如：冰晶质感、霓虹灯效、3D充气..."
                  className="w-full p-3 bg-white border border-red-50 rounded-xl text-xs font-bold h-20 focus:ring-2 focus:ring-red-400 outline-none shadow-sm resize-none"
                />
             </div>
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transform transition-all active:scale-95 ${config.buttonClass} disabled:opacity-50 flex items-center justify-center gap-2`}
          >
            {isLoading ? '🔮 AI 正在构思意境...' : '🚀 立即生成专业提示词'}
          </button>
        </div>

        <div className="flex flex-col space-y-4">
           <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all duration-200 ${getCategoryButtonClass(cat)}`}>
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar bg-white/30 p-2 rounded-xl border border-gray-100 shadow-inner">
                {filteredStyles.map((style) => (
                  <button 
                    key={style.id} 
                    onClick={() => setSelectedStyle(style.id)} 
                    className={`p-2 text-[10px] rounded-lg border text-left transition-all ${selectedStyle === style.id ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105' : 'bg-white hover:bg-red-50 text-gray-700 border-gray-100'}`}
                  >
                    <div className="font-black truncate">{style.name}</div>
                    <div className="text-[8px] opacity-70 truncate mt-1">{style.description}</div>
                  </button>
                ))}
              </div>
           </div>

           <div className="flex-1 bg-gray-900 rounded-3xl p-6 relative overflow-hidden shadow-2xl border border-white/10 min-h-[250px] flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                 <span className="text-[10px] font-black text-red-500 tracking-widest uppercase flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                   AI 绘画提示词 (PROMPT RESULT)
                 </span>
                 {result && (
                   <button 
                    onClick={handleCopy}
                    className="bg-white/10 hover:bg-white/20 text-white text-[10px] px-3 py-1 rounded-full backdrop-blur-md transition-all font-black border border-white/10"
                   >
                     {copySuccess ? '✨ 已复制' : '复制词条'}
                   </button>
                 )}
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                 {result ? (
                   <div className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap italic animate-pop">
                      {result}
                   </div>
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center text-gray-700 space-y-4">
                      <div className="text-6xl opacity-20">✍️</div>
                      <p className="font-black text-xs tracking-widest uppercase opacity-40">等待您的灵感输入...</p>
                   </div>
                 )}
              </div>
              {copySuccess && (
                <div className="absolute inset-0 bg-red-600/90 flex flex-col items-center justify-center animate-pop z-10">
                   <div className="text-5xl mb-2 animate-bounce">🧧</div>
                   <div className="text-white text-xl font-black italic tracking-widest">复制成功！</div>
                   <div className="text-white/70 text-[10px] mt-1 font-bold">提示词已就绪，立即前往 AI 画图</div>
                </div>
              )}
           </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-100 text-center text-[9px] text-gray-400 font-bold uppercase tracking-[0.5em]">
        Prompt Intelligent Agent v3.5 · Designed by 小渝児
      </div>
    </div>
  );
};

export default TextCreator;
