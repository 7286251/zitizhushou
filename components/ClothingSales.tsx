
import React, { useState, useRef, useMemo } from 'react';
import { THEME_CONFIG, CLOTHING_SCENES, FITTING_ROOM_ITEMS, DIRECTOR_PRESETS } from '../constants';
import { AppTheme } from '../types';
import { generateClothingPrompts } from '../services/geminiService';

interface Props { theme: AppTheme; }

const ClothingSales: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [productImage, setProductImage] = useState<string | null>(null);
  const [modelType, setModelType] = useState('女模特');
  const [modelAge, setModelAge] = useState('25');
  const [occasion, setOccasion] = useState(DIRECTOR_PRESETS.CLOTHING_OCCASIONS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompts, setPrompts] = useState<{ imagePrompt: string, imagePrompt_en: string, videoPrompt: string, videoPrompt_en: string } | null>(null);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [showCopySticker, setShowCopySticker] = useState(false);
  
  const productRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!productImage) return alert('请先上传产品图');
    setIsGenerating(true);
    let fileToAnalyze: File | Blob;
    if (productRef.current?.files?.[0]) { fileToAnalyze = productRef.current.files[0]; } else {
      const response = await fetch(productImage!);
      fileToAnalyze = await response.blob();
    }
    const res = await generateClothingPrompts(fileToAnalyze as File, modelType, occasion, modelAge);
    setPrompts(res);
    setIsGenerating(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowCopySticker(true);
    setTimeout(() => setShowCopySticker(false), 2000);
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      {showCopySticker && <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"><div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black animate-jelly text-2xl font-black italic">✨ 复制成功！ 🚀</div></div>}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}><span className="mr-2">👗</span> 图文带货助手</h2>
        {prompts && (
          <div className="flex bg-gray-100 p-1 rounded-full">
            <button onClick={() => setDisplayLang('zh')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'zh' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}>中文词</button>
            <button onClick={() => setDisplayLang('en')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'en' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}>English</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/50 p-5 rounded-2xl border border-pink-100 shadow-sm">
            <h3 className="text-sm font-black text-pink-600 mb-4 uppercase tracking-wider">1. 素材与场景设定</h3>
            <div onClick={() => productRef.current?.click()} className="h-40 border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative">
              {productImage ? <img src={productImage} className="w-full h-full object-contain" /> : <div className="text-center"><span className="text-4xl block">📸</span><span className="text-[10px] text-pink-400">点击上传产品详情图</span></div>}
              <input ref={productRef} type="file" className="hidden" accept="image/*" onChange={(e) => {const f=e.target.files?.[0]; if(f){const r=new FileReader(); r.onload=(ev)=>setProductImage(ev.target?.result as string); r.readAsDataURL(f);}}} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div><label className="text-[10px] font-bold text-gray-400 mb-1 block">场合选择</label><select value={occasion} onChange={(e) => setOccasion(e.target.value)} className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs font-bold focus:ring-2 focus:ring-pink-400 outline-none">{DIRECTOR_PRESETS.CLOTHING_OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}</select></div>
              <div><label className="text-[10px] font-bold text-gray-400 mb-1 block">年龄设定</label><input type="number" value={modelAge} onChange={(e) => setModelAge(e.target.value)} className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs font-bold outline-none" /></div>
            </div>
            <button onClick={handleGenerate} disabled={isGenerating} className={`w-full mt-6 py-4 rounded-xl font-black text-lg shadow-xl ${config.buttonClass}`}>{isGenerating ? '分析中...' : '生成全套咒语'}</button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border border-pink-50 overflow-hidden flex flex-col h-full min-h-[400px]">
             <div className="p-4 bg-pink-50 border-b border-pink-100 flex items-center justify-between"><span className="text-xs font-black text-pink-600">灵感咒语箱</span></div>
             <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
               {prompts ? (
                 <div className="animate-pop space-y-6">
                   <div>
                     <h4 className="text-xs font-black text-gray-900 mb-2 flex items-center justify-between"><span>📸 图文创作提示词</span><button onClick={() => handleCopy(displayLang === 'zh' ? prompts.imagePrompt : prompts.imagePrompt_en)} className="text-[10px] text-blue-500 font-bold">复制</button></h4>
                     <div className="bg-pink-50/30 p-4 rounded-xl text-sm leading-relaxed text-gray-700 border border-pink-100 italic whitespace-pre-wrap">{displayLang === 'zh' ? prompts.imagePrompt : prompts.imagePrompt_en}</div>
                   </div>
                   <div>
                     <h4 className="text-xs font-black text-gray-900 mb-2 flex items-center justify-between"><span>🎥 视频动态提示词</span><button onClick={() => handleCopy(displayLang === 'zh' ? prompts.videoPrompt : prompts.videoPrompt_en)} className="text-[10px] text-blue-500 font-bold">复制</button></h4>
                     <div className="bg-blue-50/30 p-4 rounded-xl text-sm leading-relaxed text-gray-700 border border-blue-100 italic whitespace-pre-wrap">{displayLang === 'zh' ? prompts.videoPrompt : prompts.videoPrompt_en}</div>
                   </div>
                 </div>
               ) : <div className="h-full flex flex-col items-center justify-center opacity-20"><div className="text-5xl mb-4">🎨</div><p className="font-bold">等待灵感生成...</p></div>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClothingSales;
