
import React, { useState } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { generateStoryboardWorkflowPrompts } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const StoryboardWorkflow: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [activeStep, setActiveStep] = useState(1);
  const [story, setStory] = useState('神秘触手不断尝试抢夺女孩手中的粉色咖啡杯，女孩在真实的对抗中逐渐觉醒并反击，最终成功保护咖啡杯并取得压制性胜利');
  const [product, setProduct] = useState('粉色咖啡杯');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompts, setPrompts] = useState<{ step1: string, step2: string, step3: string, step4: string } | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const res = await generateStoryboardWorkflowPrompts(story, product);
    if (res) {
      setPrompts(res);
      setActiveStep(2); // Jump to result preview
    }
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('已复制到剪贴板！');
  };

  return (
    <div className={`p-6 md:p-10 h-full flex flex-col overflow-hidden ${config.cardClass}`}>
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className={`text-2xl font-black ${config.textClass} flex items-center gap-3`}>
          <span className="text-3xl">🧩</span> 九宫格分镜指令流
        </h2>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${activeStep >= s ? 'bg-black text-white border-2 border-black' : 'bg-gray-100 text-gray-400 border-2 border-transparent'}`}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
        {activeStep === 1 ? (
          <div className="max-w-3xl mx-auto space-y-8 animate-pop">
            <div className="bg-black/5 p-8 rounded-[3rem] border border-black/5">
              <h3 className="text-xl font-black mb-6">步骤 1: 创意核心设定</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">产品 / 主体描述</label>
                  <input 
                    type="text" 
                    value={product} 
                    onChange={e => setProduct(e.target.value)}
                    placeholder="例如：粉色咖啡杯、XC特写"
                    className="w-full p-4 rounded-2xl border-2 border-black/10 focus:border-black outline-none transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 block">故事情节 (可替换)</label>
                  <textarea 
                    value={story}
                    onChange={e => setStory(e.target.value)}
                    placeholder="输入完整的故事线描述..."
                    className="w-full h-40 p-4 rounded-2xl border-2 border-black/10 focus:border-black outline-none transition-all font-medium resize-none"
                  />
                </div>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`mt-8 w-full py-5 rounded-[2rem] font-black text-xl shadow-2xl transition-all active:scale-95 ${config.buttonClass} disabled:opacity-50`}
              >
                {isGenerating ? '总导演思考中...' : '生成全套分镜指令流'}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pop pb-10">
            {/* Step 1: Single Image */}
            <div className="bg-white border-2 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Step 1: 生成单图</span>
                <button onClick={() => prompts && copyToClipboard(prompts.step1)} className="text-[10px] font-black text-blue-600 hover:underline">复制指令</button>
              </div>
              <div className="flex-1 text-xs font-bold text-gray-700 leading-relaxed italic bg-gray-50 p-4 rounded-xl border border-black/5">
                {prompts?.step1}
              </div>
            </div>

            {/* Step 2: 9-Grid Storyboard */}
            <div className="bg-white border-2 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Step 2: 生成九宫格</span>
                <button onClick={() => prompts && copyToClipboard(prompts.step2)} className="text-[10px] font-black text-purple-600 hover:underline">复制指令</button>
              </div>
              <div className="flex-1 text-xs font-bold text-gray-700 leading-relaxed italic bg-gray-50 p-4 rounded-xl border border-black/5">
                {prompts?.step2}
              </div>
            </div>

            {/* Step 3: Line Draft */}
            <div className="bg-white border-2 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Step 3: 转线稿分镜</span>
                <button onClick={() => prompts && copyToClipboard(prompts.step3)} className="text-[10px] font-black text-orange-600 hover:underline">复制指令</button>
              </div>
              <div className="flex-1 text-xs font-bold text-gray-700 leading-relaxed italic bg-gray-50 p-4 rounded-xl border border-black/5">
                {prompts?.step3}
              </div>
            </div>

            {/* Step 4: SORA Video */}
            <div className="bg-white border-2 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">Step 4: SORA 终极生成</span>
                <button onClick={() => prompts && copyToClipboard(prompts.step4)} className="text-[10px] font-black text-red-600 hover:underline">复制指令</button>
              </div>
              <div className="flex-1 text-xs font-bold text-gray-700 leading-relaxed italic bg-gray-50 p-4 rounded-xl border border-black/5">
                {prompts?.step4}
              </div>
            </div>
            
            <div className="col-span-full flex justify-center pt-6">
                <button onClick={() => setActiveStep(1)} className="px-10 py-3 bg-black text-white rounded-full font-black text-sm active:scale-95 transition-all">重新设计</button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6 border-t border-black/5 flex items-center justify-between shrink-0">
         <span className="text-[10px] font-black text-gray-400 tracking-[0.3em] uppercase">Storyboard Workflow Agent • 2026 Reset Edition</span>
      </div>
    </div>
  );
};

export default StoryboardWorkflow;
