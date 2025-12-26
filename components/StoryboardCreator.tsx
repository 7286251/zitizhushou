
import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { analyzeImageForStoryboard, generateStoryboardPrompt } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const SHOT_TYPES = [
  'Auto',
  'Extreme Close-up (特写)',
  'Close-up (近景)',
  'Medium Shot (中景)',
  'Cowboy Shot (七分身)',
  'Full Body (全身)',
  'Wide Shot (远景)',
  'Overhead View (顶视)',
  'Low Angle (仰视)',
  'Dutch Angle (倾斜)',
  'Back View (背面)',
  'Side Profile (侧面)'
];

const StoryboardCreator: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [subjectDesc, setSubjectDesc] = useState('');
  const [shots, setShots] = useState<string[]>(Array(9).fill('Auto'));
  const [result, setResult] = useState<{ english: string, chinese: string } | null>(null);
  const [displayLang, setDisplayLang] = useState<'english' | 'chinese'>('english');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);

    setIsAnalyzing(true);
    const analysis = await analyzeImageForStoryboard(file);
    setSubjectDesc(analysis);
    setIsAnalyzing(false);
  };

  const handleGenerate = async () => {
    if (!subjectDesc) {
      alert('请先上传参考图或输入主体描述');
      return;
    }
    setIsGenerating(true);
    const res = await generateStoryboardPrompt(subjectDesc, shots);
    setResult(res);
    setIsGenerating(false);
  };

  const updateShot = (index: number, value: string) => {
    const newShots = [...shots];
    newShots[index] = value;
    setShots(newShots);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result[displayLang]);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const isNeoBrutalist = theme === AppTheme.NEO_BRUTALISM;

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-black italic tracking-tighter ${config.textClass} flex items-center`}>
          <span className="mr-3">🎬</span> 九宫格分镜指令 <span className="text-xs ml-3 opacity-40 uppercase tracking-widest font-sans">Visual Storyboard</span>
        </h2>
        {result && (
          <div className="flex items-center gap-2 bg-black/5 p-1 rounded-full">
            <button 
              onClick={() => setDisplayLang('chinese')} 
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${displayLang === 'chinese' ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}
            >
              中文
            </button>
            <button 
              onClick={() => setDisplayLang('english')} 
              className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${displayLang === 'english' ? 'bg-black text-white shadow-lg' : 'text-gray-400'}`}
            >
              EN
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-6">
          <div className={`p-6 rounded-[2.5rem] ${isNeoBrutalist ? 'border-4 border-black' : 'bg-black/5'} space-y-6`}>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`h-40 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/50 transition-all overflow-hidden relative ${isAnalyzing ? 'animate-pulse' : ''}`}
            >
              {previewImage ? (
                <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <div className="text-center text-gray-400">
                  <span className="text-3xl block mb-2">📸</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">点击上传参考图</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>

            <textarea
              value={subjectDesc}
              onChange={(e) => setSubjectDesc(e.target.value)}
              placeholder="主体描述（上传图片自动反推）..."
              className="w-full p-4 bg-white border-2 border-black/5 rounded-2xl h-24 text-xs font-bold outline-none focus:border-black transition-all resize-none"
            />

            <div className="grid grid-cols-3 gap-2">
              {shots.map((shot, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute top-1 left-2 text-[8px] font-black text-gray-400 z-10">#{idx + 1}</span>
                  <select
                    value={shot}
                    onChange={(e) => updateShot(idx, e.target.value)}
                    className="w-full pt-4 pb-1.5 px-1 text-[10px] border-2 border-black/5 rounded-xl bg-white font-black truncate focus:border-black outline-none appearance-none text-center cursor-pointer"
                  >
                    {SHOT_TYPES.map(t => (
                      <option key={t} value={t.split(' (')[0]}>{t}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || isAnalyzing}
            className={`w-full py-5 rounded-3xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${config.buttonClass} disabled:opacity-50`}
          >
            {isGenerating ? '正在演算分镜逻辑...' : '生成九宫格分镜指令'}
          </button>
        </div>

        <div className="flex flex-col h-full min-h-[400px]">
           <div className={`flex-1 p-8 rounded-[3rem] relative flex flex-col ${isNeoBrutalist ? 'border-4 border-black bg-white shadow-[10px_10px_0px_black]' : 'bg-black/5'}`}>
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                   {displayLang.toUpperCase()} OUTPUT
                 </span>
                 {result && (
                   <button 
                     onClick={handleCopy} 
                     className={`text-[10px] font-black px-5 py-2 rounded-full transition-all ${copyFeedback ? 'bg-green-500 text-white' : config.buttonClass}`}
                   >
                     {copyFeedback ? '✨ 已复制' : '复制全套指令'}
                   </button>
                 )}
              </div>
              <div className={`flex-1 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed italic ${config.textClass} opacity-80 whitespace-pre-wrap`}>
                {result ? result[displayLang] : (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                    <div className="text-6xl mb-4">🧩</div>
                    <p className="font-black text-xs uppercase tracking-[0.2em]">等待灵感载入</p>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StoryboardCreator;
