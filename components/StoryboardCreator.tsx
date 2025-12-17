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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
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
    alert('已复制到剪贴板');
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      <h2 className={`text-2xl font-bold mb-6 ${config.textClass} flex items-center`}>
        <span className="mr-2">🎬</span> 分镜提示词生成器
        <span className="ml-2 text-xs bg-black/10 px-2 py-1 rounded-full text-gray-600 font-normal">Based on Reference</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Input & Configuration */}
        <div className="space-y-6">
          
          {/* 1. Reference Image */}
          <div className="bg-white/50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3 flex justify-between">
              <span>1. 上传参考图 (反推场景)</span>
              {isAnalyzing && <span className="text-blue-500 animate-pulse text-xs">AI 正在分析画面...</span>}
            </h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden"
            >
              {previewImage ? (
                <img src={previewImage} className="w-full h-full object-cover opacity-80" alt="Preview" />
              ) : (
                <div className="text-center text-gray-400">
                  <span className="text-3xl block mb-2">+</span>
                  <span className="text-sm">点击上传图片</span>
                </div>
              )}
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>

          {/* 2. Subject Description */}
          <div className="bg-white/50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-2">2. 主体/环境描述 (Based on...)</h3>
            <textarea
              value={subjectDesc}
              onChange={(e) => setSubjectDesc(e.target.value)}
              placeholder="上传图片后自动生成，也可手动修改..."
              className="w-full p-3 border rounded-lg h-24 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* 3. Shot Configuration */}
          <div className="bg-white/50 p-4 rounded-xl border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3">3. 3x3 分镜景别设置</h3>
            <div className="grid grid-cols-3 gap-2">
              {shots.map((shot, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute top-1 left-2 text-[9px] text-gray-400 font-bold z-10">SHOT {idx + 1}</span>
                  <select
                    value={shot}
                    onChange={(e) => updateShot(idx, e.target.value)}
                    className="w-full pt-4 pb-1 px-1 text-xs border rounded bg-white focus:ring-2 focus:ring-blue-400 outline-none appearance-none text-center font-medium truncate"
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
            disabled={isGenerating}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all active:scale-95 ${config.buttonClass} disabled:opacity-50`}
          >
            {isGenerating ? '正在生成分镜 Prompt...' : '生成分镜提示词'}
          </button>
        </div>

        {/* Right Column: Result */}
        <div className="flex flex-col h-full min-h-[500px]">
           <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 flex-1 flex flex-col overflow-hidden relative">
              
              {/* Toolbar */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
                 <div className="flex bg-gray-200 rounded-lg p-1">
                    <button 
                      onClick={() => setDisplayLang('english')}
                      className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${displayLang === 'english' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                      English
                    </button>
                    <button 
                      onClick={() => setDisplayLang('chinese')}
                      className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${displayLang === 'chinese' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                      中文
                    </button>
                 </div>
                 <button onClick={handleCopy} className="text-xs bg-gray-800 text-white px-3 py-1.5 rounded hover:bg-black transition-colors">
                    复制内容
                 </button>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed text-gray-800">
                {result ? (
                  <div className="animate-pop whitespace-pre-wrap">
                    {result[displayLang]}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                    <span className="text-6xl mb-4">📝</span>
                    <p>等待生成...</p>
                    <p className="text-xs mt-2">请配置左侧选项并点击生成</p>
                  </div>
                )}
              </div>

              {/* Grid Overlay Hint */}
              {result && (
                <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
                   <div className="grid grid-cols-3 gap-1 w-24 h-24">
                      {Array(9).fill(0).map((_, i) => <div key={i} className="bg-black/50 rounded-sm"></div>)}
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default StoryboardCreator;