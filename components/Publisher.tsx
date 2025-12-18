import React, { useState, useRef } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme, PlatformType, PublishContent } from '../types';
import { generatePublishContent, analyzeImageForPublishing } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const PLATFORMS = [
  { id: 'xhs' as PlatformType, name: '小红书', icon: '📕', color: 'bg-[#ff2442]', url: 'https://www.xiaohongshu.com/publish' },
  { id: 'douyin' as PlatformType, name: '抖音', icon: '🎵', color: 'bg-[#000000]', url: 'https://creator.douyin.com/content/upload' },
  { id: 'kuaishou' as PlatformType, name: '快手', icon: '🧡', color: 'bg-[#ff5000]', url: 'https://cp.kuaishou.com/article/publish/video' },
  { id: 'channels' as PlatformType, name: '视频号', icon: '📺', color: 'bg-[#07c160]', url: 'https://channels.weixin.qq.com/platform/post/create' },
];

const MODES = ['对标图文', '产品', '爆款制作', '爆款克隆'];
const STYLES = ['多巴胺风', '极简干货', '温情走心', '专业评测', '反转爽文'];
const WORD_COUNTS = [100, 200, 500, 1000];

const Publisher: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [platform, setPlatform] = useState<PlatformType>('xhs');
  const [mode, setMode] = useState('对标图文');
  const [productName, setProductName] = useState('');
  const [style, setStyle] = useState('极简干货');
  const [scene, setScene] = useState('');
  const [wordCount, setWordCount] = useState(500);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<PublishContent | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 预览图
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
      reader.readAsDataURL(file);

      // AI 自动识别并填充
      setIsAnalyzingImage(true);
      const info = await analyzeImageForPublishing(file);
      if (info.productName) setProductName(info.productName);
      if (info.scene) setScene(info.scene);
      setIsAnalyzingImage(false);
    }
  };

  const handleGenerate = async () => {
    if (!productName || !scene) {
      alert('请填写产品名称和关联场景');
      return;
    }
    setIsGenerating(true);
    const res = await generatePublishContent({
      platform,
      mode,
      productName,
      style,
      scene,
      wordCount
    });
    setResult(res);
    setIsGenerating(false);
  };

  const handlePublish = () => {
    if (!result) return;
    const pInfo = PLATFORMS.find(p => p.id === platform);
    if (pInfo) {
      const fullText = `${result.title}\n\n${result.article}\n\n${result.hashtags.map(h => '#' + h).join(' ')}`;
      navigator.clipboard.writeText(fullText).then(() => {
        alert(`✨ 文案已复制到剪贴板！\n🚀 即将自动跳转至 ${pInfo.name} 发布中心...`);
        window.open(pInfo.url, '_blank');
      });
    }
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2 text-3xl">🚀</span> 图文发布中心
        </h2>
        <div className="flex flex-wrap gap-2">
          {PLATFORMS.map(p => (
            <button
              key={p.id}
              onClick={() => {setPlatform(p.id); setResult(null);}}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border-2 ${
                platform === p.id 
                  ? `${p.color} text-white border-transparent scale-105 shadow-lg` 
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 shadow-sm'
              }`}
            >
              <span className="text-sm">{p.icon}</span> {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">功能模式</label>
              <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-400 outline-none shadow-sm">
                {MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">文案风格</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-400 outline-none shadow-sm">
                {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
             <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block flex justify-between">
               上传参考图
               {isAnalyzingImage && <span className="text-blue-500 animate-pulse text-[9px]">AI 识别产品中...</span>}
             </label>
             <div onClick={() => fileInputRef.current?.click()} className="h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-blue-400 transition-all overflow-hidden relative">
                {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="Upload" /> : <span className="text-xs text-gray-400 font-bold">+ 点击上传图片（AI自动识别）</span>}
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                {isAnalyzingImage && (
                  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
             </div>
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">产品名称</label>
            <input type="text" placeholder="AI 识别后自动填充..." value={productName} onChange={(e) => setProductName(e.target.value)} className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-400 outline-none shadow-sm" />
          </div>

          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">关联场景</label>
            <textarea placeholder="AI 识别后自动生成建议..." value={scene} onChange={(e) => setScene(e.target.value)} className="w-full p-3 bg-white border border-gray-100 rounded-xl text-sm font-bold h-20 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm resize-none" />
          </div>

          <div>
             <label className="text-[10px] font-black text-gray-400 uppercase mb-1 block">字数限定</label>
             <div className="grid grid-cols-4 gap-2">
                {WORD_COUNTS.map(count => (
                  <button key={count} onClick={() => setWordCount(count)} className={`py-2 rounded-lg text-xs font-black transition-all border-2 ${wordCount === count ? 'bg-blue-600 border-transparent text-white shadow-md' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}>{count} 字</button>
                ))}
             </div>
          </div>

          <button onClick={handleGenerate} disabled={isGenerating || isAnalyzingImage} className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transform transition-all active:scale-95 flex items-center justify-center gap-2 ${config.buttonClass} disabled:opacity-50`}>
            {isGenerating ? '正在生成文案...' : '生成爆款文案'}
          </button>
        </div>

        <div className="flex flex-col h-full min-h-[450px]">
           <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                 <span className="text-xs font-black text-gray-400 uppercase tracking-widest">预览预览 · Preview</span>
                 {result && <button onClick={handlePublish} className="bg-black text-white px-5 py-2 rounded-full text-xs font-black hover:scale-105 transition-all shadow-lg active:scale-95 flex items-center gap-2">🚀 一键发布</button>}
              </div>
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                {result ? (
                  <div className="animate-pop space-y-6">
                     <h3 className="text-2xl font-black text-gray-900 leading-tight">{result.title}</h3>
                     <div className="h-px bg-gray-100"></div>
                     <div className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">{result.article}</div>
                     <div className="flex flex-wrap gap-2 pt-4">
                        {result.hashtags.map((tag, i) => <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">#{tag}</span>)}
                     </div>
                  </div>
                ) : <div className="h-full flex flex-col items-center justify-center text-gray-200 text-center"><div className="text-6xl mb-4">✍️</div><p className="font-black text-lg">等待灵感爆发...</p></div>}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Publisher;
