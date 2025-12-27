
import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import { extractVideoContent } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const VideoExtractor: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'xhs' | 'douyin' | 'channels'>('xhs');
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 获取视频时长工具函数
   */
  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        alert('请上传有效的视频文件');
        return;
      }

      setIsLoading(true);
      try {
        // 校验时长：不得超过 10 分钟 (600秒)
        const duration = await getVideoDuration(file);
        if (duration > 600) {
          alert(`视频时长为 ${Math.floor(duration / 60)} 分 ${Math.floor(duration % 60)} 秒，超过了 10 分钟的限制，请上传较短的视频。`);
          setIsLoading(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
          return;
        }

        setVideoFile(file);
        const objectUrl = URL.createObjectURL(file);
        setVideoPreview(objectUrl);
        setResult(null);
        
        // 自动开始识别
        await handleExtract(file);
      } catch (err) {
        console.error("Video processing error:", err);
        alert('视频加载失败，请重试');
        setIsLoading(false);
      }
    }
  };

  const handleExtract = async (file: File) => {
    setIsLoading(true);
    try {
      const data = await extractVideoContent(file);
      setResult(data);
    } catch (err) {
      console.error("Extraction error:", err);
      alert('识别失败，视频内容可能过于复杂或网络超时，请重试。');
    } finally {
      setIsLoading(false);
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
          视频内容提取 <span className="text-xl not-italic opacity-50 ml-2 uppercase">SMART AI</span>
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
            className={`relative group rounded-[3rem] border-4 border-dashed transition-all flex flex-col items-center justify-center min-h-[400px] overflow-hidden ${
              videoPreview ? 'border-transparent' : 'border-gray-200 hover:border-black/20 hover:bg-black/5 cursor-pointer'
            } ${isNeoBrutalist ? 'border-black' : ''}`}
            onClick={() => !videoPreview && !isLoading && fileInputRef.current?.click()}
          >
            {/* 重新上传按钮 - 仅在有预览时显示 */}
            {videoPreview && !isLoading && (
              <button 
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="absolute top-6 right-6 z-30 bg-black/70 hover:bg-black text-white px-5 py-2 rounded-full text-[11px] font-black backdrop-blur-md transition-all active:scale-95 flex items-center gap-2 shadow-2xl"
              >
                🔄 重新上传
              </button>
            )}

            {videoPreview ? (
              <video 
                src={videoPreview} 
                controls 
                className="w-full h-full object-cover rounded-[2.8rem] bg-black"
              />
            ) : (
              <div className="text-center p-8">
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-500">🎬</div>
                <h3 className="text-xl font-black mb-2">点击上传视频</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  限 10 分钟内 · 大小无限制
                </p>
              </div>
            )}
            
            {isLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center z-40 text-white">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(59,130,246,0.5)]"></div>
                <p className="font-black text-2xl italic animate-pulse tracking-tight">AI 深度解析中...</p>
                <p className="text-[11px] mt-3 opacity-70 font-bold uppercase tracking-widest bg-white/10 px-4 py-1 rounded-full">
                  正在提取文字 • 识别BGM • 规划封面
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
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black opacity-40 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> 识别到的 BGM 信息
                </h4>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">AI DETECTED</span>
              </div>
              <p className="text-sm font-bold leading-relaxed">{result.bgmInfo}</p>
              <div className="pt-4 border-t border-black/5">
                <h4 className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-3">提取的文字内容 (Transcript)</h4>
                <div className="max-h-40 overflow-y-auto custom-scrollbar text-xs font-medium leading-relaxed italic text-gray-600 pr-2">
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
                  <div className="flex items-center gap-2">
                     <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                     <span className="text-[10px] font-black tracking-widest opacity-40 uppercase">
                        {activeTab.toUpperCase()} VIRAL STRATEGY
                     </span>
                  </div>
                  <button 
                    onClick={() => handleCopy(`${result.platforms[activeTab].title}\n\n${result.platforms[activeTab].content}\n\n${result.platforms[activeTab].hashtags.map((h:any) => '#'+h).join(' ')}`, activeTab)}
                    className={`text-[10px] font-black px-6 py-2 rounded-full transition-all ${copyFeedback === activeTab ? 'bg-green-500 text-white shadow-lg scale-95' : config.buttonClass}`}
                  >
                    {copyFeedback === activeTab ? '✨ 已复制全套' : '复制全套文案'}
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-7 pr-2">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">爆款标题</label>
                    <h3 className="text-2xl font-black leading-tight italic decoration-blue-500/30 underline-offset-4 underline">{result.platforms[activeTab].title}</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">推荐正文</label>
                    <div className="text-sm leading-relaxed font-medium text-gray-700 whitespace-pre-wrap bg-white/40 p-5 rounded-2xl border border-black/5">
                      {result.platforms[activeTab].content}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {result.platforms[activeTab].hashtags.map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] font-bold px-3 py-1.5 bg-black text-white rounded-lg shadow-sm">#{tag}</span>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-black/10 space-y-5">
                    <label className="text-[9px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md uppercase">爆款封面建议 · COVER STRATEGY</label>
                    <div className="grid grid-cols-1 gap-4">
                      {result.coverIdeas.map((idea: string, i: number) => (
                        <div key={i} className="p-5 bg-white/60 rounded-[1.5rem] border border-black/5 text-xs font-bold leading-relaxed flex items-start gap-4 hover:shadow-md transition-all group">
                          <span className="shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[10px] italic group-hover:scale-110 transition-transform">{i+1}</span>
                          <span className="opacity-80 group-hover:opacity-100">{idea}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                <div className="text-8xl mb-8 animate-bounce-slow">📽️</div>
                <p className="font-black text-sm uppercase tracking-[0.3em] mb-2">等待视频上传识别</p>
                <p className="text-[11px] font-bold opacity-50 px-10 leading-loose">
                  支持多格式视频解析 <br/> 
                  精准提取文案、识别旋律、智能生成多平台推文
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoExtractor;
