
import React, { useState } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme, StoryboardItem } from '../types';
import { generateSK2ChristmasStories } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const SK2Director: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [isGenerating, setIsGenerating] = useState(false);
  const [stories, setStories] = useState<StoryboardItem[]>([]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const res = await generateSK2ChristmasStories();
    setStories(res);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已成功复制到剪贴板！可以直接粘贴到 Banana Pro 或 Sora 2 使用。');
  };

  return (
    <div className={`p-6 md:p-10 h-full flex flex-col overflow-hidden ${config.cardClass}`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 shrink-0 gap-4">
        <div>
          <h2 className={`text-3xl font-black ${config.textClass} flex items-center gap-3`}>
            <span className="text-4xl">🎄</span> SK-II 圣诞温情导演中心
          </h2>
          <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Powered by Banana Pro & Sora 2 Workflow</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`px-10 py-4 rounded-full font-black text-lg transition-all active:scale-95 shadow-2xl ${config.buttonClass} disabled:opacity-50`}
        >
          {isGenerating ? 'AI 导演正在构思 5 组故事...' : '🎲 爆发 5 组圣诞灵感'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 pb-20 space-y-12">
        {stories.length === 0 && !isGenerating && (
          <div className="h-full flex flex-col items-center justify-center text-center py-20">
            <div className="text-8xl mb-6 opacity-20">🥛</div>
            <h3 className="text-2xl font-black text-gray-300">点击按钮，开启晶莹剔透的圣诞奇旅</h3>
            <p className="text-gray-400 mt-2 text-sm font-bold">我们将为您生成 5 组符合九宫格逻辑的完整指令流</p>
          </div>
        )}

        {isGenerating && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 bg-gray-50 rounded-[3rem] animate-pulse border-2 border-dashed border-gray-200"></div>
            ))}
          </div>
        )}

        {stories.map((story, idx) => (
          <div key={idx} className="bg-white border-x-0 md:border-x-8 border-y-8 border-black p-8 rounded-none md:rounded-[3rem] shadow-[15px_15px_0px_rgba(238,44,44,0.3)] group animate-pop">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-[#EE2C2C] text-white px-6 py-2 rounded-full font-black text-sm italic">STORY {idx + 1}</span>
              <h3 className="text-2xl font-black text-black">{story.name}</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Column */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                       九宫格分镜指令 (Banana Pro)
                    </label>
                    <button onClick={() => copyToClipboard(story.imagePrompt)} className="text-[10px] font-black text-red-500 hover:underline">复制指令</button>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-3xl text-sm font-medium leading-relaxed text-gray-800 border-2 border-black/5 h-64 overflow-y-auto custom-scrollbar italic">
                   {story.imagePrompt}
                 </div>
              </div>

              {/* Video Column */}
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                       SORA 2 视频生成指令
                    </label>
                    <button onClick={() => copyToClipboard(story.videoPrompt)} className="text-[10px] font-black text-blue-500 hover:underline">复制指令</button>
                 </div>
                 <div className="bg-blue-50/30 p-6 rounded-3xl text-sm font-medium leading-relaxed text-blue-900 border-2 border-blue-100 h-64 overflow-y-auto custom-scrollbar">
                   {story.videoPrompt}
                 </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
               <button 
                onClick={() => copyToClipboard(JSON.stringify(story, null, 2))}
                className="px-6 py-2 bg-black text-white rounded-full text-xs font-black transition-all active:scale-95 shadow-lg"
               >
                 导出 JSON 源代码
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between shrink-0">
         <span className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">SK-II Christmas Director • 2026 Reset Edition</span>
      </div>
    </div>
  );
};

export default SK2Director;
