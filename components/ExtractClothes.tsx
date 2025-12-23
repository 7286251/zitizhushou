
import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { extractClothingImage } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const CLOTHING_TYPES = [
  '套装', '外套', '上装', '裙装', '裤装', '家居装', '泳装', '内衣', '运动装', '礼服', '旗袍', '羽绒服', '卫衣', '针织衫', '自定义'
];

const VIEWS = ['正面', '侧面'];

const ExtractClothes: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedType, setSelectedType] = useState('上装');
  const [customType, setCustomType] = useState('');
  const [selectedView, setSelectedView] = useState('正面');
  const [generateCount, setGenerateCount] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [is3dMode, setIs3dMode] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(1);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSourceImage(ev.target?.result as string);
        setActiveStep(2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExtract = async (mode: 'normal' | '3d') => {
    if (!selectedFile || !sourceImage) {
      alert('请先上传图片');
      return;
    }
    const finalType = selectedType === '自定义' ? customType : selectedType;
    setIsProcessing(true);
    setIs3dMode(mode === '3d');
    try {
      const images = await extractClothingImage(selectedFile, finalType, selectedView, mode === '3d', generateCount);
      if (images && images.length > 0) {
        setResults(images);
        setActiveStep(3);
      } else {
        alert('模型未能成功提取到衣服，请尝试更换图片或调整参数');
      }
    } catch (err) {
      alert('提取失败，请检查网络连接或稍后重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `extracted_${selectedType}_${Date.now()}.png`;
    link.click();
  };

  const handleReset = () => {
    setSourceImage(null);
    setSelectedFile(null);
    setResults([]);
    setActiveStep(1);
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      {/* 酷炫动态教程框 */}
      <div className="mb-6 relative overflow-hidden bg-gradient-to-r from-blue-900/10 to-indigo-900/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[marquee_3s_linear_infinite]"></div>
         <h3 className="text-sm font-black text-blue-500 mb-2 flex items-center gap-2">
           <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
           剥离指南 · PROCESS
         </h3>
         <div className="text-xs text-gray-500 leading-relaxed space-y-1 font-bold">
           <p className="hover:text-blue-400 transition-colors">1. 上传模特实拍图，背景越纯净识别精度越高。</p>
           <p className="hover:text-blue-400 transition-colors">2. “立体图提取”会自动补充隐形模特效果，“平铺图”则适合详情页展示。</p>
           <p className="hover:text-blue-400 transition-colors">3. 提取完成后可点击预览图直接下载透明 PNG 背景图。</p>
         </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">✂️</span> 精准提取衣服
        </h2>
        <div className="flex gap-2">
           <div className="bg-gray-100 rounded-full px-4 py-1 flex items-center gap-4 text-xs font-bold text-gray-500">
             <span className={activeStep >= 1 ? 'text-blue-500' : ''}>1.上传</span>
             <span className={activeStep >= 2 ? 'text-blue-500' : ''}>2.配置</span>
             <span className={activeStep >= 3 ? 'text-blue-500' : ''}>3.结果</span>
           </div>
           {sourceImage && <button onClick={handleReset} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold hover:bg-red-200">重置</button>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-6">
          <div className="bg-white/50 p-5 rounded-2xl border border-blue-100 shadow-sm">
            <h3 className="text-sm font-black text-blue-600 mb-4 uppercase">1. 上传模特照片</h3>
            <div onClick={() => fileInputRef.current?.click()} className={`h-64 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group ${sourceImage ? 'border-blue-400' : 'border-gray-300'}`}>
              {sourceImage ? <img src={sourceImage} className="w-full h-full object-contain" /> : <div className="text-center"><span className="text-5xl block mb-4">📸</span><span className="text-sm text-gray-400 font-bold">点击上传图片</span></div>}
              <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              {isProcessing && <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-10 font-black animate-pulse text-blue-600">AI 剥离中...</div>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
             <button onClick={() => handleExtract('normal')} disabled={isProcessing || !sourceImage} className="py-4 rounded-xl font-black shadow-lg bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:opacity-50">👔 提取平铺图</button>
             <button onClick={() => handleExtract('3d')} disabled={isProcessing || !sourceImage} className="py-4 rounded-xl font-black shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:opacity-90 disabled:opacity-50">✨ 立体图提取</button>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex-1 p-6 overflow-y-auto custom-scrollbar">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {results.map((url, i) => (
                <div key={i} className="group relative bg-[#f9f9f9] rounded-2xl overflow-hidden border border-gray-100 animate-pop">
                  <img src={url} className="w-full object-contain mix-blend-multiply" />
                  <button onClick={() => downloadImage(url)} className="absolute bottom-4 right-4 bg-white text-black w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all">⬇️</button>
                </div>
              ))}
            </div>
          ) : <div className="h-full flex flex-col items-center justify-center text-gray-200"><div className="text-8xl mb-6 opacity-20">👗</div><p className="font-black text-gray-300">等待提取指令...</p></div>}
        </div>
      </div>
    </div>
  );
};

export default ExtractClothes;
