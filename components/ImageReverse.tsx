import React, { useState } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme, ImageAnalysisResult } from '../types';
import { analyzeImageForPrompt } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const ImageReverse: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [results, setResults] = useState<ImageAnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // New state for global copy overlay effect
  const [showCopyEffect, setShowCopyEffect] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsAnalyzing(true);
    setResults([]); 
    
    const files = Array.from(e.target.files) as File[];
    const newResults: ImageAnalysisResult[] = [];

    // Process sequentially to maintain order and update UI progressively if needed
    for (const file of files) {
      const analysis = await analyzeImageForPrompt(file);
      newResults.push({
        fileName: file.name,
        chinesePrompt: analysis.chinese,
        englishPrompt: analysis.english
      });
    }

    setResults(newResults);
    setIsAnalyzing(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    triggerCopyEffect();
  };

  const triggerCopyEffect = () => {
    setShowCopyEffect(true);
    setTimeout(() => setShowCopyEffect(false), 2000);
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col`}>
      <h2 className={`text-2xl font-bold mb-4 ${config.textClass} flex items-center`}>
        <span className="mr-2">🖼️</span> 以图反推模式
      </h2>

      <div className="mb-6">
        <label className={`block w-full cursor-pointer ${config.buttonClass} p-4 rounded-lg text-center transition-all hover:opacity-90`}>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isAnalyzing}
          />
          {isAnalyzing ? '正在深度分析图片...' : '点击上传参考图 (支持多张)'}
        </label>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap pb-4 custom-scrollbar">
        {results.length === 0 && !isAnalyzing && (
          <div className="text-center opacity-50 py-10">
            暂无分析结果，请上传图片
          </div>
        )}

        <div className="flex space-x-6">
          {results.map((res, idx) => (
            <div key={idx} className="inline-block w-[350px] md:w-[450px] align-top whitespace-normal">
               <div className="bg-white/80 p-4 rounded-lg shadow-inner h-full flex flex-col border border-gray-200">
                  <h3 className="font-bold mb-2 text-gray-700 truncate" title={res.fileName}>图 {idx + 1}: {res.fileName}</h3>
                  
                  {/* English Prompt Box */}
                  <div className="mb-3 relative flex-1">
                    <div className="text-xs font-bold text-gray-500 mb-1">英文提示词 (English)</div>
                    <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs h-32 overflow-y-auto custom-scrollbar">
                      {res.englishPrompt}
                    </div>
                    <button 
                      onClick={() => handleCopy(res.englishPrompt)}
                      className="absolute top-6 right-2 bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[10px]"
                    >
                      复制
                    </button>
                  </div>

                  {/* Chinese Prompt Box */}
                  <div className="relative flex-1">
                    <div className="text-xs font-bold text-gray-500 mb-1">中文提示词 (Chinese)</div>
                    <div className="bg-gray-100 text-gray-800 p-3 rounded font-mono text-xs h-32 overflow-y-auto custom-scrollbar">
                      {res.chinesePrompt}
                    </div>
                    <button 
                       onClick={() => handleCopy(res.chinesePrompt)}
                       className="absolute top-6 right-2 bg-gray-300 hover:bg-gray-400 text-black px-2 py-0.5 rounded text-[10px]"
                    >
                      复制
                    </button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Copy Success Overlay */}
      {showCopyEffect && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-black/70 backdrop-blur-sm text-white px-8 py-4 rounded-full shadow-2xl animate-pop flex items-center gap-3 border border-white/20">
            <span className="text-2xl animate-bounce">✨</span>
            <span className="text-xl font-bold tracking-widest bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              复制成功
            </span>
            <span className="text-2xl animate-bounce delay-100">✨</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageReverse;