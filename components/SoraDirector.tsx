
import React, { useState } from 'react';
import { THEME_CONFIG, DIRECTOR_PRESETS } from '../constants';
import { AppTheme, StoryboardItem } from '../types';
import { generateSoraClothingStoryboards } from '../services/geminiService';

interface Props { theme: AppTheme; }

const SoraDirector: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<StoryboardItem[]>([]);
  const [lighting, setLighting] = useState(DIRECTOR_PRESETS.SORA_LIGHTING[0]);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const whiteBgPrompt = "把服装扣下下来一张多角度的服装展示白底图，不要人物，无模特，无杂物。纯白背景，材质清晰，超清8k。";

  const handleGenerate = async () => {
    setIsGenerating(true);
    const res = await generateSoraClothingStoryboards(lighting);
    setStories(res);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className={`p-6 md:p-10 h-full flex flex-col overflow-hidden ${config.cardClass} relative`}>
      <div className="mb-8 p-6 bg-red-600 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rotate-[-1deg] text-white">
        <h3 className="text-xl font-black flex items-center gap-3 italic"><span className="text-3xl">⚠️</span> Sora 2 核心指南</h3>
        <p className="mt-2 text-sm font-bold">1. 严禁上传真人头部图片。 2. 必须使用“纯服装白底图”作为 Reference。</p>
      </div>
      <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className={`text-3xl font-black ${config.textClass} italic`}>🎬 Sora 导演分镜</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIRECTOR_PRESETS.SORA_LIGHTING.map(l => (
              <button key={l} onClick={() => setLighting(l)} className={`px-3 py-1 rounded-full text-[10px] font-black border-2 transition-all ${lighting === l ? 'bg-black border-black text-white shadow-lg scale-105' : 'bg-white border-gray-100 text-gray-400'}`}>{l}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {stories.length > 0 && (
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button onClick={() => setDisplayLang('zh')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'zh' ? 'bg-black text-white' : 'text-gray-400'}`}>中文版</button>
              <button onClick={() => setDisplayLang('en')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'en' ? 'bg-black text-white' : 'text-gray-400'}`}>English</button>
            </div>
          )}
          <button onClick={handleGenerate} disabled={isGenerating} className={`px-12 py-5 rounded-full font-black text-xl shadow-2xl ${config.buttonClass}`}>{isGenerating ? '构思中...' : '爆发温馨分镜'}</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-10 pb-20">
        {stories.length === 0 && !isGenerating && <div className="h-full flex flex-col items-center justify-center opacity-10 py-20"><div className="text-[10rem]">🏘️</div><h3 className="text-2xl font-black italic">设定光影，开启分镜创作...</h3></div>}
        {isGenerating && <div className="space-y-10 animate-pulse">{[1, 2].map(i => <div key={i} className="h-64 bg-black/5 rounded-[4rem] border-4 border-dashed border-black/10"></div>)}</div>}
        {stories.map((story, idx) => (
          <div key={idx} className="bg-white border-8 border-black p-10 rounded-[4rem] shadow-[20px_20px_0px_#EE2C2C] relative animate-pop">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6"><span className="bg-black text-white px-8 py-2 rounded-full font-black text-sm italic">分镜 {idx + 1}</span><h3 className="text-3xl font-black italic">{story.name}</h3></div>
              <button onClick={() => handleCopy(displayLang === 'zh' ? story.videoPrompt : ((story as any).videoPrompt_en || story.videoPrompt), `v-${idx}`)} className="text-[10px] font-black uppercase tracking-widest bg-red-600 text-white px-6 py-2 rounded-full hover:bg-black transition-all shadow-xl">{copyFeedback === `v-${idx}` ? '已复制' : '复制视频词'}</button>
            </div>
            <div className="bg-red-50/20 p-8 rounded-[3rem] text-sm font-bold leading-relaxed text-red-900 border-2 border-[#EE2C2C]/10 shadow-inner italic">
              {displayLang === 'zh' ? story.videoPrompt : ((story as any).videoPrompt_en || story.videoPrompt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SoraDirector;
