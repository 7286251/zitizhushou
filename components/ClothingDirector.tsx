
import React, { useState } from 'react';
import { THEME_CONFIG, DIRECTOR_PRESETS } from '../constants';
import { AppTheme, StoryboardItem } from '../types';
import { generateSoraClothingStoryboards } from '../services/geminiService';

interface Props { theme: AppTheme; }

const ClothingDirector: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<StoryboardItem[]>([]);
  const [occasion, setOccasion] = useState(DIRECTOR_PRESETS.CLOTHING_OCCASIONS[0]);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // 这里借用 Sora 逻辑，实际可扩展为专门的服装分镜
    const result = await generateSoraClothingStoryboards(occasion);
    setStories(result);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className={`p-6 md:p-10 h-full flex flex-col overflow-hidden ${config.cardClass} relative`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 shrink-0 gap-4">
        <div>
          <h2 className={`text-4xl font-black ${config.textClass} flex items-center gap-4 italic`}><span className="text-5xl">👗</span> 服装导演·创作</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {DIRECTOR_PRESETS.CLOTHING_OCCASIONS.map(o => (
              <button key={o} onClick={() => setOccasion(o)} className={`px-3 py-1 rounded-full text-[10px] font-black border-2 transition-all ${occasion === o ? 'bg-black border-black text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400'}`}>{o}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {stories.length > 0 && (
            <div className="flex bg-gray-100 p-1 rounded-full">
              <button onClick={() => setDisplayLang('zh')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'zh' ? 'bg-black text-white' : 'text-gray-400'}`}>中文预览</button>
              <button onClick={() => setDisplayLang('en')} className={`px-4 py-1.5 rounded-full text-[10px] font-black ${displayLang === 'en' ? 'bg-black text-white' : 'text-gray-400'}`}>English</button>
            </div>
          )}
          <button onClick={handleGenerate} disabled={isGenerating} className={`px-12 py-5 rounded-full font-black text-xl shadow-2xl ${config.buttonClass}`}>
            {isGenerating ? '正在导演...' : '爆发 5 组服装分镜'}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-20 space-y-12">
        {stories.length === 0 && !isGenerating && <div className="h-full flex flex-col items-center justify-center opacity-20"><div className="text-[12rem] mb-6">👕</div><h3 className="text-3xl font-black italic">设定场合，爆发高级感分镜...</h3></div>}
        {stories.map((story, idx) => (
          <div key={idx} className="bg-white border-8 border-black p-10 rounded-[4rem] shadow-[20px_20px_0px_#EE2C2C] relative animate-pop">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6"><span className="bg-black text-white px-8 py-2 rounded-full font-black text-sm italic">分镜 {idx + 1}</span><h3 className="text-2xl font-black italic">{story.name}</h3></div>
              <button onClick={() => handleCopy(displayLang === 'zh' ? story.videoPrompt : ((story as any).videoPrompt_en || story.videoPrompt), `cd-${idx}`)} className="text-[10px] font-black uppercase tracking-widest bg-gray-100 px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all">{copyFeedback === `cd-${idx}` ? '已复制' : '复制导演视频词'}</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Prompt (白底展示词)</label><div className="bg-gray-50 p-6 rounded-[2.5rem] text-sm font-bold text-gray-800 border-2 border-black/5 italic h-32 overflow-y-auto custom-scrollbar">{story.imagePrompt}</div></div>
              <div className="space-y-4"><label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Video Prompt (温馨视频词)</label><div className="bg-red-50/20 p-6 rounded-[2.5rem] text-sm font-bold text-red-900 border-2 border-red-100 h-32 overflow-y-auto custom-scrollbar">{displayLang === 'zh' ? story.videoPrompt : ((story as any).videoPrompt_en || story.videoPrompt)}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ClothingDirector;
