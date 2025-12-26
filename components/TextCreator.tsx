
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
  const [result, setResult] = useState<{ zh: string, en: string } | null>(null);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerate = async () => {
    if (!text1) {
      alert('请输入主文字');
      return;
    }
    setIsLoading(true);
    const styleName = STYLE_OPTIONS.find(s => s.id === selectedStyle)?.name || '';
    const prompts = await generateArtPrompt(text1, text2, text3, styleName, customStyle);
    setResult(prompts);
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = displayLang === 'zh' ? result.zh : result.en;
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const isNeumorphism = theme === AppTheme.NEUMORPHISM;

  return (
    <div className={`p-8 h-full overflow-y-auto custom-scrollbar flex flex-col gap-8`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-4xl font-black italic tracking-tighter ${config.textClass}`}>
          艺术造字 <span className="text-xl not-italic opacity-50 ml-2 uppercase">PRO</span>
        </h2>
        {result && (
          <div className="flex bg-black/5 p-1 rounded-full">
            <button 
              onClick={() => setDisplayLang('zh')} 
              className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${displayLang === 'zh' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
            >
              中文
            </button>
            <button 
              onClick={() => setDisplayLang('en')} 
              className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${displayLang === 'en' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
            >
              EN
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
        <div className="space-y-6">
          <div className={`p-8 rounded-[3rem] space-y-6 ${isNeumorphism ? 'shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]' : 'bg-black/5'}`}>
             <div className="space-y-4">
                <label className="text-[10px] font-black opacity-40 uppercase tracking-widest block">核心文字</label>
                <input 
                  type="text" 
                  value={text1} 
                  onChange={(e) => setText1(e.target.value)} 
                  placeholder="如：马到成功" 
                  className={`w-full p-5 rounded-2xl text-xl font-black outline-none transition-all ${isNeumorphism ? 'bg-transparent shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]' : 'bg-white text-black border-2 border-black/10 focus:border-black'}`} 
                />
             </div>
             <div className="grid grid-cols-2 gap-4">
                <input type="text" value={text2} onChange={(e) => setText2(e.target.value)} placeholder="装饰 1" className={`w-full p-4 rounded-xl text-xs font-bold outline-none ${isNeumorphism ? 'bg-transparent shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]' : 'bg-white/50 border border-black/5'}`} />
                <input type="text" value={text3} onChange={(e) => setText3(e.target.value)} placeholder="装饰 2" className={`w-full p-4 rounded-xl text-xs font-bold outline-none ${isNeumorphism ? 'bg-transparent shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff]' : 'bg-white/50 border border-black/5'}`} />
             </div>
             <textarea 
                value={customStyle} 
                onChange={(e) => setCustomStyle(e.target.value)} 
                placeholder="在此输入自定义风格描述..."
                className={`w-full h-32 p-4 rounded-2xl text-sm font-bold outline-none resize-none ${isNeumorphism ? 'bg-transparent shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff]' : 'bg-white/50 border border-black/5'}`}
              />
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={isLoading}
            className={`w-full py-6 rounded-[2.5rem] text-xl tracking-widest flex items-center justify-center gap-4 ${config.buttonClass} disabled:opacity-50 active:scale-95`}
          >
            {isLoading ? '正在解析美学...' : '爆发艺术字指令'}
          </button>
        </div>

        <div className="flex flex-col gap-6">
           <div className={`flex-1 p-8 rounded-[3rem] relative flex flex-col ${isNeumorphism ? 'shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]' : 'bg-black/5'}`}>
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">{displayLang.toUpperCase()} PROMPT</span>
                 {result && (
                   <button onClick={handleCopy} className={`text-[10px] font-black px-4 py-1.5 rounded-full ${config.buttonClass}`}>
                     {copySuccess ? '✨ 已复制' : '复制词包'}
                   </button>
                 )}
              </div>
              <div className={`flex-1 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed italic ${config.textClass} opacity-80 whitespace-pre-wrap`}>
                {result ? (displayLang === 'zh' ? result.zh : result.en) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                    <div className="text-6xl mb-4">✍️</div>
                    <p className="font-black text-xs uppercase tracking-[0.2em]">等待灵感载入</p>
                  </div>
                )}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
             {STYLE_OPTIONS.map(style => (
               <button 
                key={style.id} 
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${selectedStyle === style.id ? 'bg-black text-white' : 'bg-white/50 hover:bg-white'}`}
               >
                 <div className="text-xs font-black">{style.name}</div>
                 <div className="text-[9px] opacity-50 mt-1">{style.description}</div>
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default TextCreator;
