
import React, { useState } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface Props {
  theme: AppTheme;
}

const ClothingKeywords: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  
  const [s1, setS1] = useState({ scene: '通勤场景', body: '小个子身材', item: '白色衬衫 + 直筒牛仔裤', style: '简约高级风', detail: '利落剪裁，垂感面料，办公室光线，高清' });
  const [s2, setS2] = useState({ style: '法式温柔风', color: '奶油白 + 浅卡其撞色', combination: '针织开衫 + 碎花连衣裙', material: '软糯羊毛材质', atmosphere: '午后咖啡馆背景，暖光氛围，8k 高清' });
  const [s3, setS3] = useState({ demand: '显瘦遮胯', item: '高腰半身裙 + 修身 T 恤', target: '梨形身材', cut: 'A 字剪裁，长度到膝盖上方', avoid: '深色压胯，无多余装饰，正面全身视角' });

  // 存储生成结果的两种语言版本
  const [resultData, setResultData] = useState<{
    image_zh: string;
    image_en: string;
    video_zh: string;
    video_en: string;
  } | null>(null);

  const [isEnglish, setIsEnglish] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleMerge = () => {
    const p_zh = `【场景与主体】${s1.scene}，${s1.body}。
【核心单品】${s1.item}，融合${s2.style}与${s3.demand}需求。
【细节与材质】${s1.detail}，采用${s2.material}，${s2.color}。
【剪裁与视觉】${s3.cut}，针对${s3.target}精准适配，避开${s3.avoid}。
【整体氛围】${s2.atmosphere}，${s2.combination}呈现极致视觉张力。`;

    // 简易模拟翻译，实际建议还是走 API 获取更准确的英文版
    const p_en = `[Scene & Subject] ${s1.scene}, ${s1.body}. 
[Core Items] ${s1.item}, merging ${s2.style} with ${s3.demand} needs. 
[Details & Material] ${s1.detail}, using ${s2.material}, in ${s2.color}. 
[Cut & Vision] ${s3.cut}, tailored for ${s3.target}, avoiding ${s3.avoid}. 
[Atmosphere] ${s2.atmosphere}, ${s2.combination} presenting extreme visual tension.`;

    const v_zh = `镜头从脚部缓慢上摇，展示${s3.cut}的灵动感，模特在${s1.scene}中优雅转身，光线捕捉${s2.material}的细腻质感，定格在${s2.style}的自信笑容。`;
    const v_en = `The camera pans up slowly from the feet, showcasing the agility of the ${s3.cut}. The model turns gracefully in ${s1.scene}, lighting capturing the delicate texture of ${s2.material}, freezing on the confident smile of ${s2.style}.`;

    setResultData({
      image_zh: p_zh,
      image_en: p_en,
      video_zh: v_zh,
      video_en: v_en
    });
  };

  const handleRandom = async () => {
    setIsGenerating(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `你是一位顶尖服装 AI 绘画专家。请随机生成一组爆款服装穿搭方案，字数需在 500 字左右，包含：具体场景描述、模特身材特征、服装核心单品（包含色彩、面料、剪裁细节）、环境灯光、镜头语言及画面质感。
    同时，根据此方案生成一个 10 秒左右的短视频动态描述。
    
    请务必返回 JSON 格式，包含中英双语版本：
    { 
      "image_zh": "中文长篇绘画提示词...", 
      "image_en": "English detailed painting prompt...", 
      "video_zh": "中文视频动态描述...", 
      "video_en": "English video motion description..." 
    }`;
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              image_zh: { type: Type.STRING },
              image_en: { type: Type.STRING },
              video_zh: { type: Type.STRING },
              video_en: { type: Type.STRING }
            },
            required: ["image_zh", "image_en", "video_zh", "video_en"]
          }
        }
      });
      const data = JSON.parse(response.text || "{}");
      setResultData(data);
    } catch (error) {
      console.error("随机生成失败:", error);
      alert("AI 能量不足，请稍后重试。");
    }
    setIsGenerating(false);
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(type);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      {/* 酷炫动态教程框 */}
      <div className="mb-8 relative overflow-hidden bg-gradient-to-r from-blue-900/10 to-purple-900/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_3s_linear_infinite]"></div>
         <h3 className="text-sm font-black text-blue-500 mb-2 flex items-center gap-2">
           <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
           使用攻略 · TUTORIAL
         </h3>
         <div className="text-xs text-gray-500 leading-relaxed space-y-1 font-bold">
           <p className="hover:text-blue-400 transition-colors">1. 在下方填空区域输入您的穿搭灵感，或保持默认。</p>
           <p className="hover:text-blue-400 transition-colors">2. 点击“一键合并”即可生成逻辑完整的 100% 出图率咒语。</p>
           <p className="hover:text-blue-400 transition-colors">3. 点击“🎲 随机爆发”获取 500 字深度爆款方案，支持中英双语一键切换。</p>
         </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">🧥</span> 服装关键词合集
        </h2>
        <div className="flex flex-wrap gap-3">
          {resultData && (
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-gray-200">
               <span className={`text-[10px] font-black ${!isEnglish ? 'text-blue-600' : 'text-gray-400'}`}>中</span>
               <button 
                onClick={() => setIsEnglish(!isEnglish)}
                className={`w-10 h-5 rounded-full relative transition-all shadow-inner ${isEnglish ? 'bg-blue-600' : 'bg-gray-300'}`}
               >
                 <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${isEnglish ? 'right-0.5' : 'left-0.5'}`}></div>
               </button>
               <span className={`text-[10px] font-black ${isEnglish ? 'text-blue-600' : 'text-gray-400'}`}>EN</span>
            </div>
          )}
          <button onClick={handleMerge} className="px-5 py-2 bg-blue-600 text-white rounded-full text-xs font-black shadow-lg hover:bg-blue-700 transition-all active:scale-95">一键合并咒语</button>
          <button onClick={handleRandom} disabled={isGenerating} className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-black shadow-lg hover:opacity-90 transition-all active:scale-95 flex items-center gap-2">
            {isGenerating ? '正在占卜...' : '🎲 随机爆发'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="space-y-4 bg-white/40 p-4 rounded-2xl border border-blue-100 shadow-sm">
           <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-1">
             <span className="w-1 h-1 bg-blue-500 rounded-full"></span> 句式 1：基础框架
           </h4>
           <div className="space-y-2">
              <input value={s1.scene} onChange={e => setS1({...s1, scene: e.target.value})} placeholder="场景" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-blue-300 shadow-sm transition-all" />
              <input value={s1.body} onChange={e => setS1({...s1, body: e.target.value})} placeholder="身材" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-blue-300 shadow-sm transition-all" />
              <input value={s1.item} onChange={e => setS1({...s1, item: e.target.value})} placeholder="核心单品" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-blue-300 shadow-sm transition-all" />
           </div>
        </div>
        <div className="space-y-4 bg-white/40 p-4 rounded-2xl border border-pink-100 shadow-sm">
           <h4 className="text-[10px] font-black text-pink-500 uppercase tracking-widest flex items-center gap-1">
             <span className="w-1 h-1 bg-pink-500 rounded-full"></span> 句式 2：质感氛围
           </h4>
           <div className="space-y-2">
              <input value={s2.style} onChange={e => setS2({...s2, style: e.target.value})} placeholder="风格" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-pink-300 shadow-sm transition-all" />
              <input value={s2.material} onChange={e => setS2({...s2, material: e.target.value})} placeholder="材质" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-pink-300 shadow-sm transition-all" />
              <input value={s2.color} onChange={e => setS2({...s2, color: e.target.value})} placeholder="色彩搭配" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-pink-300 shadow-sm transition-all" />
           </div>
        </div>
        <div className="space-y-4 bg-white/40 p-4 rounded-2xl border border-purple-100 shadow-sm">
           <h4 className="text-[10px] font-black text-purple-500 uppercase tracking-widest flex items-center gap-1">
             <span className="w-1 h-1 bg-purple-500 rounded-full"></span> 句式 3：避坑裁剪
           </h4>
           <div className="space-y-2">
              <input value={s3.demand} onChange={e => setS3({...s3, demand: e.target.value})} placeholder="需求" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-purple-300 shadow-sm transition-all" />
              <input value={s3.target} onChange={e => setS3({...s3, target: e.target.value})} placeholder="适配人群" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-purple-300 shadow-sm transition-all" />
              <input value={s3.avoid} onChange={e => setS3({...s3, avoid: e.target.value})} placeholder="避坑点" className="w-full p-2.5 bg-white rounded-xl text-xs outline-none border border-transparent focus:border-purple-300 shadow-sm transition-all" />
           </div>
        </div>
      </div>

      {resultData && (
        <div className="space-y-8 animate-pop pb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-2xl p-6 border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-blue-400 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    爆款 AI 绘画全套提示词 ({isEnglish ? 'English' : '中文'})
                  </span>
                  <button 
                    onClick={() => handleCopy(isEnglish ? resultData.image_en : resultData.image_zh, 'image')} 
                    className="text-[10px] text-white bg-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-500 transition-all active:scale-95 font-black"
                  >
                    {copyFeedback === 'image' ? '✨ 已复制' : '复制图文词'}
                  </button>
               </div>
               <div className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto custom-scrollbar">
                 {isEnglish ? resultData.image_en : resultData.image_zh}
               </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gray-900 rounded-2xl p-6 border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-purple-400 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    配套视频动态描述 (Video Prompt)
                  </span>
                  <button 
                    onClick={() => handleCopy(isEnglish ? resultData.video_en : resultData.video_zh, 'video')} 
                    className="text-[10px] text-white bg-purple-600 px-4 py-1.5 rounded-full hover:bg-purple-500 transition-all active:scale-95 font-black"
                  >
                    {copyFeedback === 'video' ? '✨ 已复制' : '复制视频词'}
                  </button>
               </div>
               <div className="text-gray-300 font-mono text-sm leading-relaxed italic">
                 {isEnglish ? resultData.video_en : resultData.video_zh}
               </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-auto pt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">
        Fashion Keyword Engine v3.1 · Powered by 小渝児
      </div>
    </div>
  );
};

export default ClothingKeywords;
