
import React, { useState, useRef } from 'react';
import { THEME_CONFIG, DIRECTOR_PRESETS } from '../constants';
import { AppTheme, UgcScriptItem } from '../types';
import { generateUgcVideoScript } from '../services/geminiService';

interface Props { theme: AppTheme; }

const UgcStrategist: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [isGenerating, setIsGenerating] = useState(false);
  const [scripts, setScripts] = useState<UgcScriptItem[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [audience, setAudience] = useState(DIRECTOR_PRESETS.UGC_AUDIENCES[0]);
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
    const result = await generateUgcVideoScript(file, audience);
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
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 shrink-0 gap-6">
        <div>
          <h2 className={`text-4xl font-black ${config.textClass} flex items-center gap-4 italic`}><span className="text-5xl">📱</span> UGC 爆款策略</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIRECTOR_PRESETS.UGC_AUDIENCES.map(a => (
              <button key={a} onClick={() => setAudience(a)} className={`px-3 py-1 rounded-full text-[10px] font-black border-2 transition-all ${audience === a ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}>{a}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {scripts.length > 0 && (
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button onClick={() => setDisplayLang('zh')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'zh' ? 'bg-black text-white' : 'text-gray-400'}`}>中文</button>
              <button onClick={() => setDisplayLang('en')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'en' ? 'bg-black text-white' : 'text-gray-400'}`}>EN</button>
            </div>
          )}
          <button onClick={() => fileInputRef.current?.click()} className={`px-10 py-5 rounded-full font-black text-xl ${config.buttonClass}`}>{isGenerating ? '分析中...' : '生成脚本'}</button>
          <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-8 pb-20">
        {scripts.length === 0 && !isGenerating && <div className="h-full flex flex-col items-center justify-center opacity-20 text-center"><div className="text-[12rem] mb-6">📽️</div><h3 className="text-3xl font-black italic">上传产品图，定制爆款策略...</h3></div>}
        {isGenerating && <div className="space-y-10 animate-pulse">{[1, 2, 3].map(i => <div key={i} className="h-48 bg-black/5 rounded-[3rem] border-4 border-dashed border-black/10"></div>)}</div>}
        {scripts.map((script, idx) => (
          <div key={idx} className={`bg-white border-8 border-black p-8 rounded-[4rem] shadow-[15px_15px_0px_rgba(0,0,0,0.1)] relative overflow-hidden animate-pop`}>
            <div className="flex items-center justify-between mb-6">
              <span className="bg-black text-white px-8 py-2 rounded-full font-black text-xs italic">{script.timeRange}</span>
              <button onClick={() => handleCopy(`${script.visual}\n${displayLang === 'zh' ? script.audio_zh : (script.audio_en || script.audio_zh)}`, `u-${idx}`)} className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-6 py-2 rounded-full hover:opacity-80 transition-all">{copyFeedback === `u-${idx}` ? '已复制' : '复制脚本'}</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">视觉画面</label><div className="bg-blue-50/20 p-6 rounded-[2rem] text-sm font-bold text-blue-900 border-2 border-blue-100">{script.visual}</div></div>
              <div className="space-y-3"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">解说台词</label><div className="bg-gray-50 p-6 rounded-[2rem] text-sm font-bold text-gray-800 border-2 border-black/5 italic">{displayLang === 'zh' ? script.audio_zh : (script.audio_en || script.audio_zh)}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UgcStrategist;
