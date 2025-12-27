
import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { extractVideoContent } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const VideoExtractor: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'xhs' | 'douyin' | 'channels'>('xhs');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /**
   * 从视频中提取关键帧
   * 用于规避 API Payload 限制 (解除大小限制)
   */
  const captureFrames = async (videoUrl: string): Promise<string[]> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.play();

      const frames: string[] = [];
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      video.onloadedmetadata = () => {
        const duration = video.duration;
        const interval = Math.max(1, duration / 12); // 提取 12 帧左右
        let currentTime = 0;

        video.onseeked = () => {
          if (ctx) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            frames.push(canvas.toDataURL('image/jpeg', 0.8));
          }

          currentTime += interval;
          if (currentTime < duration && frames.length < 15) {
            video.currentTime = currentTime;
          } else {
            video.pause();
            resolve(frames);
          }
        };

        video.currentTime = 0.5; // 从第 0.5 秒开始第一帧
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('请上传视频文件');
        return;
      }
      
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setResult(null);
      setIsLoading(true);
      
      try {
        setLoadingStep('正在提取视觉关键帧...');
        const frames = await captureFrames(url);
        
        setLoadingStep('AI 深度内容拆解中...');
        const data = await extractVideoContent(frames);
        setResult(data);
      } catch (err) {
        console.error(err);
        alert('识别失败，视频内容可能由于过大或编码问题无法解析。');
      } finally {
        setIsLoading(false);
        setLoadingStep('');
      }
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(id);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  const isNeoBrutalist = theme === AppTheme.NEO_BRUTALISM;

  return (
    <div className={`p-6 md:p-10 h-full overflow-y-auto custom-scrollbar flex flex-col gap-8`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className={`text-4xl font-black italic tracking-tighter ${config.textClass}`}>
          视频内容提取 <span className="text-xl not-italic opacity-50 ml-2 uppercase">SMART AI 2026</span>
        </h2>
        <div className="flex gap-2">
          {['xhs', 'douyin', 'channels'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              disabled={!result}
              className={`px-6 py-2 rounded-full text-xs font-black transition-all ${
                activeTab === tab && result
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white/50 text-gray-400 border border-gray-100'
              } disabled:opacity-30`}
            >
              {tab === 'xhs' ? '小红书' : tab === 'douyin' ? '抖音' : '视频号'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 flex-1">
        {/* 左侧：上传与视频预览 */}
        <div className="space-y-6">
          <div 
            onClick={() => !isLoading && fileInputRef.current?.click()}
            className={`relative group rounded-[3rem] border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer min-h-[400px] overflow-hidden ${
              videoPreview ? 'border-transparent' : 'border-gray-200 hover:border-black/20 hover:bg-black/5'
            } ${isNeoBrutalist ? 'border-black' : ''}`}
          >
            {videoPreview ? (
              <video 
                ref={videoRef}
                src={videoPreview} 
                controls 
                className="w-full h-full object-cover rounded-[2.8rem]"
              />
            ) : (
              <div className="text-center p-8">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">🎬</div>
                <h3 className="text-xl font-black mb-2">点击上传视频</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">不限大小 · 本地帧解析模式已开启</p>
              </div>
            )}
            
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-10 text-white p-10 text-center">
                <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="font-black text-2xl italic animate-pulse mb-2">{loadingStep}</p>
                <p className="text-[10px] opacity-60 uppercase tracking-widest">
                  正在通过 2026 旗舰级 4K 工作流 处理海量数据
                </p>
              </div>
            )}
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="video/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </div>

          {result && (
            <div className={`p-8 rounded-[3rem] space-y-4 ${isNeoBrutalist ? 'border-4 border-black bg-white shadow-[8px_8px_0px_black]' : 'bg-black/5'}`}>
              <h4 className="text-[10px] font-black opacity-40 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 识别到的 BGM 信息
              </h4>
              <p className="text-sm font-bold leading-relaxed">{result.bgmInfo}</p>
              <div className="pt-4 border-t border-black/5">
                <h4 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3">画面文字提取 (Optical Text)</h4>
                <div className="max-h-32 overflow-y-auto custom-scrollbar text-xs font-medium leading-relaxed italic text-gray-600">
                  {result.extractedText}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右侧：分析结果与爆款策略 */}
        <div className="flex flex-col gap-6">
          <div className={`flex-1 p-8 rounded-[3rem] relative flex flex-col min-h-[500px] ${isNeoBrutalist ? 'border-4 border-black bg-white shadow-[10px_10px_0px_black]' : 'bg-black/5'}`}>
            {result ? (
              <div className="animate-pop space-y-8 h-full flex flex-col">
                <div className="flex justify-between items-center shrink-0">
                  <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                    {activeTab.toUpperCase()} VIRAL STRATEGY
                  </span>
                  <button 
                    onClick={() => handleCopy(`${result.platforms[activeTab].title}\n\n${result.platforms[activeTab].content}\n\n${result.platforms[activeTab].hashtags.map((h:any) => '#'+h).join(' ')}`, activeTab)}
                    className={`text-[10px] font-black px-5 py-2 rounded-full transition-all ${copyFeedback === activeTab ? 'bg-green-500 text-white shadow-lg scale-95' : config.buttonClass}`}
                  >
                    {copyFeedback === activeTab ? '✨ 已复制全套' : '复制全套文案'}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-blue-600 uppercase">爆款标题</label>
                    <h3 className="text-2xl font-black leading-tight italic">{result.platforms[activeTab].title}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-blue-600 uppercase">推荐正文</label>
                    <div className="text-sm leading-relaxed font-medium text-gray-700 whitespace-pre-wrap">
                      {result.platforms[activeTab].content}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {result.platforms[activeTab].hashtags.map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold px-3 py-1 bg-black/5 rounded-full text-gray-500">#{tag}</span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-black/5 space-y-4">
                    <label className="text-[9px] font-black text-purple-600 uppercase">爆款封面设计方案</label>
                    <div className="grid grid-cols-1 gap-3">
                      {result.coverIdeas.map((idea: string, i: number) => (
                        <div key={i} className="p-4 bg-white/50 rounded-2xl border border-black/5 text-xs font-bold leading-relaxed flex items-start gap-3">
                          <span className="shrink-0 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-[10px] italic">{i+1}</span>
                          {idea}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                <div className="text-7xl mb-6 animate-pulse">📦</div>
                <p className="font-black text-xs uppercase tracking-[0.2em]">等待上传识别</p>
                <p className="text-[10px] mt-2 opacity-50">本地帧解析技术已解除 API 上传限制</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoExtractor;
