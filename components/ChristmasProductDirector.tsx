
import React, { useState, useRef } from 'react';
import { THEME_CONFIG, DIRECTOR_PRESETS } from '../constants';
import { AppTheme, UgcScriptItem } from '../types';
import { generateChristmasProductScript } from '../services/geminiService';

interface Props { theme: AppTheme; }

const ChristmasProductDirector: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [isGenerating, setIsGenerating] = useState(false);
  const [scripts, setScripts] = useState<UgcScriptItem[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mood, setMood] = useState(DIRECTOR_PRESETS.XMAS_MOODS[0]);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
    setIsGenerating(true);
    const result = await generateChristmasProductScript(file, mood);
    setScripts(result);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className={`p-6 md:p-10 h-full flex flex-col overflow-hidden ${config.cardClass} relative`}>
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-green-600 to-red-600"></div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 shrink-0 gap-6">
        <div>
          <h2 className={`text-4xl font-black ${config.textClass} flex items-center gap-4 italic`}>
            <span className="text-5xl animate-bounce">🎄</span> 圣诞爆款导演
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIRECTOR_PRESETS.XMAS_MOODS.map(m => (
              <button key={m} onClick={() => setMood(m)} className={`px-3 py-1 rounded-full text-[10px] font-black border-2 transition-all ${mood === m ? 'bg-red-600 border-red-600 text-white shadow-lg scale-105' : 'bg-white border-gray-100 text-gray-400'}`}>{m}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {scripts.length > 0 && (
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button onClick={() => setDisplayLang('zh')} className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${displayLang === 'zh' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}>中文</button>
              <button onClick={() => setDisplayLang('en')} className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${displayLang === 'en' ? 'bg-black text-white shadow-md' : 'text-gray-400'}`}>EN</button>
            </div>
          )}
          <button onClick={() => fileInputRef.current?.click()} disabled={isGenerating} className={`px-10 py-5 rounded-full font-black text-xl transition-all active:scale-95 shadow-2xl ${config.buttonClass} disabled:opacity-50`}>
            {isGenerating ? '正在构思中...' : '爆发圣诞脚本'}
          </button>
          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-8 pb-20">
        {scripts.length === 0 && !isGenerating && (
          <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-20"><div className="text-[12rem] mb-6">🎁</div><h3 className="text-3xl font-black italic">上传产品图，爆发圣诞魔法...</h3></div>
        )}
        {isGenerating && <div className="space-y-10 animate-pulse">{[1, 2, 3].map(i => <div key={i} className="h-48 bg-black/5 rounded-[3rem] border-4 border-dashed border-black/10"></div>)}</div>}
        {scripts.map((script, idx) => (
          <div key={idx} className={`bg-white border-8 border-black p-8 rounded-[4rem] shadow-[15px_15px_0px_rgba(238,44,44,0.1)] relative overflow-hidden animate-pop`}>
            <div className="flex items-center justify-between mb-6">
              <span className="bg-[#EE2C2C] text-white px-8 py-2 rounded-full font-black text-xs italic">{script.timeRange}</span>
              <button onClick={() => handleCopy(`${script.visual}\n${displayLang === 'zh' ? script.audio_zh : script.audio_en}`, `s-${idx}`)} className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-6 py-2 rounded-full hover:bg-black transition-all shadow-xl">{copyFeedback === `s-${idx}` ? '已复制' : '复制咒语'}</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><span className="w-2 h-2 bg-red-600 rounded-full"></span> 导演运镜 (Visual)</label><div className="bg-red-50/20 p-6 rounded-[2rem] text-sm font-bold text-red-900 border-2 border-red-100">{script.visual}</div></div>
              <div className="space-y-3"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full"></span> 脚本对白 (Audio)</label><div className="bg-green-50/20 p-6 rounded-[2rem] text-sm font-bold text-green-900 border-2 border-green-100 italic">{displayLang === 'zh' ? script.audio_zh : script.audio_en}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChristmasProductDirector;
