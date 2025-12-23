
import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { replicateCoverImage, analyzeCoverText } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

interface ReplicationResult {
  id: string;
  originalName: string;
  originalUrl: string;
  resultUrl: string;
  originalText: string;
  newText: string;
}

const CoverReplica: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [originalText, setOriginalText] = useState('');
  const [newText, setNewText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<ReplicationResult[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const fileList = Array.from(files) as File[];
    setSelectedFiles(fileList);
    
    // 自动分析第一张图片的文字
    setIsAnalyzing(true);
    try {
      const detectedText = await analyzeCoverText(fileList[0]);
      if (detectedText) {
        setOriginalText(detectedText);
      }
    } catch (err) {
      console.error("Auto analysis failed:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartReplication = async () => {
    if (selectedFiles.length === 0) {
      alert('请先上传封面图片');
      return;
    }
    if (!originalText || !newText) {
      alert('请确保原文字和新文字均已填写');
      return;
    }

    setIsProcessing(true);
    const newResults: ReplicationResult[] = [];

    for (const file of selectedFiles) {
      try {
        const originalUrl = URL.createObjectURL(file);
        const resultUrl = await replicateCoverImage(file, originalText, newText);
        
        newResults.push({
          id: Date.now().toString() + Math.random(),
          originalName: file.name,
          originalUrl,
          resultUrl,
          originalText,
          newText
        });
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
        alert(`处理 ${file.name} 失败`);
      }
    }

    setResults(prev => [...newResults, ...prev]);
    setIsProcessing(false);
    setSelectedFiles([]); // 清空已选，准备下一波
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadImage = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `replica_${name}`;
    link.click();
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      {/* 动态教程框 */}
      <div className="mb-6 relative overflow-hidden bg-gradient-to-r from-orange-900/10 to-red-900/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_3s_linear_infinite]"></div>
         <h3 className="text-sm font-black text-red-500 mb-2 flex items-center gap-2">
           <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
           复刻指南 · REPLICA
         </h3>
         <div className="text-xs text-gray-500 leading-relaxed space-y-1 font-bold">
           <p className="hover:text-red-400 transition-colors">1. 上传爆款封面，AI 将自动识别图片中的文字内容。</p>
           <p className="hover:text-red-400 transition-colors">2. 在下方确认或修改识别到的“原文字”，并输入想要替换的“新文字”。</p>
           <p className="hover:text-red-400 transition-colors">3. 点击“开始一键复刻”，AI 将完美还原字体风格并生成新图。</p>
         </div>
      </div>

      <h2 className={`text-2xl font-bold mb-6 ${config.textClass} flex items-center`}>
        <span className="mr-2">📸</span> 爆款封面复刻
        <span className="ml-2 text-[10px] bg-red-600 text-white px-2 py-0.5 rounded animate-pulse">AI 文字识别</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 space-y-4">
          <div 
            onClick={() => !isProcessing && !isAnalyzing && fileInputRef.current?.click()}
            className={`w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${selectedFiles.length > 0 ? 'border-red-400 bg-red-50/30' : 'border-gray-200 hover:border-red-400 hover:bg-gray-50'}`}
          >
            {isAnalyzing ? (
              <div className="flex flex-col items-center animate-pulse">
                <span className="text-3xl mb-2">🔍</span>
                <span className="text-xs font-bold text-red-500">正在识别图片文字...</span>
              </div>
            ) : selectedFiles.length > 0 ? (
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">✅</span>
                <span className="text-xs font-bold text-green-600">已载入 {selectedFiles.length} 张封面</span>
                <span className="text-[9px] text-gray-400 mt-1">点击更换图片</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-300">
                <span className="text-4xl mb-2">📤</span>
                <span className="text-xs font-bold">点击上传爆款封面</span>
                <span className="text-[9px] mt-1">支持多图上传</span>
              </div>
            )}
            <input 
              ref={fileInputRef} 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileSelect} 
            />
          </div>

          <div className="bg-white/50 p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
             <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block flex justify-between">
                   原图片上的文字
                   {isAnalyzing && <span className="animate-spin text-red-500">⌛</span>}
                </label>
                <input 
                  type="text" 
                  value={originalText} 
                  onChange={(e) => setOriginalText(e.target.value)} 
                  placeholder={isAnalyzing ? "正在识别中..." : "AI 自动识别或手动输入"} 
                  className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-400 outline-none" 
                />
             </div>
             <div>
                <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">想要替换的文字</label>
                <input 
                  type="text" 
                  value={newText} 
                  onChange={(e) => setNewText(e.target.value)} 
                  placeholder="例如：加油！打工人" 
                  className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-400 outline-none" 
                />
             </div>
          </div>

          <button 
            onClick={handleStartReplication}
            disabled={isProcessing || isAnalyzing || selectedFiles.length === 0}
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2 ${config.buttonClass} disabled:opacity-50`}
          >
            {isProcessing ? '🔮 AI 复刻中...' : '🚀 开始一键复刻'}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
             <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
               <span className="text-xs font-black text-gray-500 uppercase tracking-widest">复刻结果 · Results</span>
               {results.length > 0 && <button onClick={() => setResults([])} className="text-[10px] text-red-500 font-bold">清空记录</button>}
             </div>
             
             <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-8">
               {results.length > 0 ? (
                 results.map(res => (
                   <div key={res.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm animate-pop">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-gray-400 truncate max-w-[200px]">{res.originalName}</span>
                        <div className="flex gap-2">
                          <button onClick={() => downloadImage(res.resultUrl, res.originalName)} className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-black border border-blue-100">保存结果</button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <p className="text-[9px] text-gray-400 font-bold uppercase text-center">原图</p>
                           <img src={res.originalUrl} className="w-full h-48 object-contain rounded-lg bg-gray-50" />
                         </div>
                         <div className="space-y-2">
                           <p className="text-[9px] text-red-400 font-bold uppercase text-center">复刻结果</p>
                           <img src={res.resultUrl} className="w-full h-48 object-contain rounded-lg bg-gray-50 border border-red-100" />
                         </div>
                      </div>
                      <div className="mt-4 flex justify-center gap-4 text-[11px] font-bold">
                         <span className="text-gray-400">“{res.originalText}”</span>
                         <span className="text-red-500">→</span>
                         <span className="text-red-600">“{res.newText}”</span>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-200">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="font-bold text-gray-400">请先上传图片，AI 将为您处理...</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em]">
        Cover Replica v1.1 · Powered by 小渝児
      </div>
    </div>
  );
};

export default CoverReplica;
