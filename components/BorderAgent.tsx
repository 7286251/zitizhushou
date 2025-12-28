
import React, { useState } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { generateBorderPrompt } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const BorderAgent: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [userInput, setUserInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      alert('请输入你想设计的主题，例如“冰雪女王”或“赛博朋克音乐”');
      return;
    }
    setIsGenerating(true);
    try {
      const data = await generateBorderPrompt(userInput);
      setResult(data);
    } catch (error) {
      alert('生成失败，请检查网络后重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const isNeoBrutalist = theme === AppTheme.NEO_BRUTALISM;

  return (
    <div className={`p-6 md:p-10 h-full overflow-y-auto custom-scrollbar flex flex-col gap-8`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className={`text-4xl font-black italic tracking-tighter ${config.textClass}`}>
          百变边框 <span className="text-xl not-italic opacity-50 ml-2 uppercase">AVATAR FRAME</span>
        </h2>
        <div className="flex gap-2">
           <span className="bg-black/5 text-gray-500 text-[10px] font-black px-3 py-1 rounded-full border border-black/5">基于 6 组旗舰级 UI 模板引擎</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
        {/* 左侧：输入区域 */}
        <div className="space-y-6">
          <div className={`p-8 rounded-[3rem] space-y-6 ${isNeoBrutalist ? 'border-4 border-black bg-white shadow-[8px_8px_0px_black]' : 'bg-black/5 shadow-inner'}`}>
             <label className="text-[10px] font-black opacity-40 uppercase tracking-widest block">输入你的创意主题</label>
             <textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="例如：森林精灵、复古电音、暗黑骑士、梦幻独角兽..."
                className={`w-full h-40 p-6 rounded-3xl text-lg font-bold outline-none resize-none transition-all ${isNeoBrutalist ? 'border-4 border-black' : 'bg-white border border-black/5 focus:border-blue-500 shadow-sm'}`}
             />
             <div className="grid grid-cols-2 gap-3">
                {['精灵公主', '重金属音乐', '秋日枫林', '极地冰雪'].map(tag => (
                   <button 
                    key={tag}
                    onClick={() => setUserInput(tag)}
                    className="py-2.5 rounded-xl text-[10px] font-black bg-white/50 border border-black/5 hover:bg-white hover:border-black/20 transition-all"
                   >
                     {tag}
                   </button>
                ))}
             </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`w-full py-6 rounded-[2.5rem] text-xl font-black tracking-widest transition-all active:scale-95 shadow-2xl ${config.buttonClass} disabled:opacity-50`}
          >
            {isGenerating ? '正在匹配 UI 引擎...' : '爆发边框指令流'}
          </button>
        </div>

        {/* 右侧：结果展示 */}
        <div className="flex flex-col gap-6">
          <div className={`flex-1 p-8 rounded-[3rem] relative flex flex-col min-h-[500px] ${isNeoBrutalist ? 'border-4 border-black bg-white shadow-[10px_10px_0px_black]' : 'bg-black/5'}`}>
            {result ? (
              <div className="animate-pop space-y-6 h-full flex flex-col">
                <div className="flex justify-between items-center shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-black/5 p-1 rounded-full">
                      <button 
                        onClick={() => setDisplayLang('zh')} 
                        className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${displayLang === 'zh' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
                      >
                        中
                      </button>
                      <button 
                        onClick={() => setDisplayLang('en')} 
                        className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${displayLang === 'en' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}
                      >
                        EN
                      </button>
                    </div>
                    <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full italic">{result.templateId}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(result.fullPrompt_en, 'main')}
                    className={`text-[10px] font-black px-5 py-2 rounded-full transition-all ${copyFeedback === 'main' ? 'bg-green-500 text-white shadow-lg' : config.buttonClass}`}
                  >
                    {copyFeedback === 'main' ? '✨ 已复制词包' : '复制词包'}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-5">
                   <div className="group relative space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black text-blue-600 uppercase">基础特征 · CORE</label>
                        <button onClick={() => handleCopy(displayLang === 'zh' ? result.coreFeatures : result.coreFeatures_en, 'c1')} className="text-[9px] font-black opacity-30 hover:opacity-100 transition-opacity">
                          {copyFeedback === 'c1' ? '已复制' : '复制'}
                        </button>
                      </div>
                      <p className="text-xs font-bold leading-relaxed opacity-80">{displayLang === 'zh' ? result.coreFeatures : result.coreFeatures_en}</p>
                   </div>
                   <div className="group relative space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black text-purple-600 uppercase">主题装饰 · DECOR</label>
                        <button onClick={() => handleCopy(displayLang === 'zh' ? result.decorations : result.decorations_en, 'c2')} className="text-[9px] font-black opacity-30 hover:opacity-100 transition-opacity">
                          {copyFeedback === 'c2' ? '已复制' : '复制'}
                        </button>
                      </div>
                      <p className="text-xs font-bold leading-relaxed opacity-80">{displayLang === 'zh' ? result.decorations : result.decorations_en}</p>
                   </div>
                   <div className="group relative space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] font-black text-pink-600 uppercase">配色与动态 · STYLE</label>
                        <button onClick={() => handleCopy(`${displayLang === 'zh' ? result.colorPalette : result.colorPalette_en} / ${displayLang === 'zh' ? result.dynamicEffects : result.dynamicEffects_en}`, 'c3')} className="text-[9px] font-black opacity-30 hover:opacity-100 transition-opacity">
                          {copyFeedback === 'c3' ? '已复制' : '复制'}
                        </button>
                      </div>
                      <p className="text-xs font-bold leading-relaxed opacity-80">
                        {displayLang === 'zh' ? result.colorPalette : result.colorPalette_en} / {displayLang === 'zh' ? result.dynamicEffects : result.dynamicEffects_en}
                      </p>
                   </div>
                   <div className="pt-4 border-t border-black/5">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[9px] font-black text-gray-400 uppercase">MJ/SD 最终英文指令 (专业增强版)</label>
                        <button onClick={() => handleCopy(result.fullPrompt_en, 'c4')} className="text-[9px] font-black opacity-30 hover:opacity-100 transition-opacity">
                          {copyFeedback === 'c4' ? '已复制' : '复制指令'}
                        </button>
                      </div>
                      <div className="p-4 bg-gray-900 text-gray-300 rounded-2xl text-[11px] font-mono leading-relaxed italic whitespace-pre-wrap">
                         {result.fullPrompt_en}
                      </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                <div className="text-7xl mb-6">💍</div>
                <p className="font-black text-sm uppercase tracking-[0.2em]">等待主题输入</p>
                <p className="text-[10px] mt-2 opacity-50 px-10 leading-loose">
                  输入任意主题，我们将基于 LOL 旗舰级 UI 风格<br/>
                  为你全自动化生成 16K 超高清梦幻边框指令
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorderAgent;
