
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { THEME_CONFIG, CLOTHING_SCENES, FITTING_ROOM_ITEMS } from '../constants';
import { AppTheme } from '../types';
import { generateClothingPrompts } from '../services/geminiService';

interface Props {
  theme: AppTheme;
}

const MODELS = ['女模特', '软萌幼童', '男模特', '男童', '宠物类'];
const QUANTITIES = [8, 10, 20];

const ClothingSales: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [productImage, setProductImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);
  const [modelType, setModelType] = useState('女模特');
  const [modelAge, setModelAge] = useState('');
  const [sceneType, setSceneType] = useState('简约艺术展厅');
  const [quantity, setQuantity] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompts, setPrompts] = useState<{ imagePrompt: string, videoPrompt: string } | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [fittingRoomCategory, setFittingRoomCategory] = useState('女模特');
  
  // 新增复制特效状态
  const [showCopySticker, setShowCopySticker] = useState(false);

  const productRef = useRef<HTMLInputElement>(null);
  const styleRef = useRef<HTMLInputElement>(null);

  const filteredFittingRoomItems = useMemo(() => {
    return FITTING_ROOM_ITEMS.filter(item => item.category === fittingRoomCategory);
  }, [fittingRoomCategory]);

  const handleProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProductImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStyleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setStyleImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!productImage) {
      alert('请先上传详情页产品图或从衣橱选择');
      return;
    }
    setIsGenerating(true);
    
    let fileToAnalyze: File | Blob;
    if (productRef.current?.files?.[0]) {
      fileToAnalyze = productRef.current.files[0];
    } else {
      const response = await fetch(productImage!);
      fileToAnalyze = await response.blob();
    }

    const res = await generateClothingPrompts(fileToAnalyze as File, modelType, sceneType, modelAge);
    
    if (res.imagePrompt) {
      res.imagePrompt += `\n\n帮我生成${quantity}张图片`;
    }

    setPrompts(res);
    setIsGenerating(false);
  };

  const handleSelectFromFittingRoom = (url: string) => {
    setProductImage(url);
    setIsWardrobeOpen(false);
    if (productRef.current) productRef.current.value = '';
    showToast('商品已同步到详情页');
  };

  const showToast = (msg: string) => {
    const toast = document.createElement('div');
    toast.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full text-xs font-bold z-[200] animate-pop";
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // 触发酷炫贴纸特效
    setShowCopySticker(true);
    setTimeout(() => setShowCopySticker(false), 2000);
  };

  const openDoubao = () => {
    window.open('https://www.doubao.com/', '_blank');
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      {/* 酷炫复制特效贴纸 */}
      {showCopySticker && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none">
          <div className="bg-yellow-400 text-black px-8 py-4 rounded-2xl shadow-[8px_8px_0px_rgba(0,0,0,1)] border-4 border-black rotate-[-5deg] animate-jelly">
            <div className="text-4xl font-black italic flex items-center gap-3">
              <span>✨</span> 复制成功！ <span>🚀</span>
            </div>
            <div className="text-xs font-bold text-center mt-2 uppercase tracking-widest">Prompt Copied to Clipboard</div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${config.textClass} flex items-center`}>
          <span className="mr-2">👗</span> 图文带货助手
        </h2>
        <div className="flex gap-2">
           <button 
            onClick={() => setIsWardrobeOpen(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-bold shadow-md hover:bg-purple-600 transition-all flex items-center gap-2"
          >
            🗄️ 我的衣橱
          </button>
          <button 
            onClick={() => setShowTutorial(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-bold shadow-md hover:bg-blue-600 transition-all"
          >
            📖 使用教程
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white/50 p-5 rounded-2xl border border-pink-100 shadow-sm">
            <h3 className="text-sm font-black text-pink-600 mb-4 uppercase tracking-wider flex justify-between">
              1. 上传详情页素材
              <span className="text-[10px] text-gray-400 font-normal">支持直接从衣橱导入</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => productRef.current?.click()}
                className="h-32 border-2 border-dashed border-pink-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 transition-all overflow-hidden relative"
              >
                {productImage ? <img src={productImage} className="w-full h-full object-contain" /> : <div className="text-center"><span className="text-2xl block">📸</span><span className="text-[10px] text-pink-400">上传产品详情图</span></div>}
                <input ref={productRef} type="file" className="hidden" accept="image/*" onChange={handleProductUpload} />
              </div>
              <div 
                onClick={() => styleRef.current?.click()}
                className="h-32 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-all overflow-hidden relative"
              >
                {styleImage ? <img src={styleImage} className="w-full h-full object-cover" /> : <div className="text-center"><span className="text-2xl block">🎨</span><span className="text-[10px] text-blue-400">上传风格参考图</span></div>}
                <input ref={styleRef} type="file" className="hidden" accept="image/*" onChange={handleStyleUpload} />
              </div>
            </div>
            {productImage && (
              <button onClick={() => setProductImage(null)} className="mt-2 text-[10px] text-red-400 hover:underline">删除并重新上传</button>
            )}
          </div>

          <div className="bg-white/50 p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-gray-500 mb-2 uppercase tracking-wider">2. 生成配置</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 mb-1 block">模特选择</label>
                <select 
                  value={modelType} 
                  onChange={(e) => setModelType(e.target.value)}
                  className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs font-bold focus:ring-2 focus:ring-pink-400 outline-none"
                >
                  {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 mb-1 block">模特年龄 (可选)</label>
                <input 
                  type="text" 
                  value={modelAge}
                  onChange={(e) => setModelAge(e.target.value)}
                  placeholder="如: 10, 25, 30..."
                  className="w-full p-2 bg-white border border-gray-100 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 mb-1 block">拍摄场景选择</label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                {CLOTHING_SCENES.map(s => (
                  <button 
                    key={s.id} 
                    onClick={() => setSceneType(s.name)} 
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border transition-all truncate ${sceneType === s.name ? 'bg-blue-500 border-transparent text-white' : 'bg-white border-gray-100 text-gray-500 hover:bg-gray-50'}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                value={sceneType}
                onChange={(e) => setSceneType(e.target.value)}
                placeholder="或在此手动输入自定义场景..."
                className="w-full mt-2 p-3 bg-white border border-blue-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 mb-1 block">生成张数</label>
              <div className="flex gap-2">
                {QUANTITIES.map(q => (
                  <button key={q} onClick={() => setQuantity(q)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${quantity === q ? 'bg-blue-500 border-transparent text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'}`}>{q} 张</button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={isGenerating}
              className={`w-full py-4 rounded-xl font-black text-lg shadow-xl transform transition-all active:scale-95 ${config.buttonClass} disabled:opacity-50`}
            >
              {isGenerating ? 'AI 正在分析细节...' : '✨ 开始生成全套提示词'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border border-pink-50 overflow-hidden flex flex-col h-full min-h-[400px]">
             <div className="p-4 bg-pink-50 border-b border-pink-100 flex items-center justify-between">
               <span className="text-xs font-black text-pink-600">生成结果 PREVIEW</span>
               {prompts && <button onClick={openDoubao} className="text-[10px] bg-white text-pink-500 px-3 py-1 rounded-full font-black border border-pink-200 animate-bounce">👉 跳转豆包</button>}
             </div>
             <div className="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
               {prompts ? (
                 <div className="animate-pop space-y-6">
                   <div>
                     <div className="flex justify-between items-center mb-2">
                       <h4 className="text-xs font-black text-gray-900 flex items-center"><span className="mr-1">📸</span> 图文创作提示词</h4>
                       <button onClick={() => handleCopy(prompts.imagePrompt)} className="text-[10px] text-blue-500 font-bold px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors">复制</button>
                     </div>
                     <div className="bg-pink-50/30 p-4 rounded-xl text-sm leading-relaxed text-gray-700 border border-pink-100 italic whitespace-pre-wrap relative group">
                       {prompts.imagePrompt}
                     </div>
                   </div>

                   <div className="h-px bg-gray-100"></div>

                   <div>
                     <div className="flex justify-between items-center mb-2">
                       <h4 className="text-xs font-black text-gray-900 flex items-center"><span className="mr-1">🎥</span> 视频动态提示词</h4>
                       <button onClick={() => handleCopy(prompts.videoPrompt)} className="text-[10px] text-blue-500 font-bold px-2 py-1 rounded bg-blue-50 hover:bg-blue-100 transition-colors">复制</button>
                     </div>
                     <div className="bg-blue-50/30 p-4 rounded-xl text-sm leading-relaxed text-gray-700 border border-blue-100 italic whitespace-pre-wrap relative group">
                       {prompts.videoPrompt}
                     </div>
                   </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-gray-200">
                   <div className="text-5xl mb-4">🎨</div>
                   <p className="font-bold">选择模特与场景并生成...</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>

      {/* 衣橱弹窗 */}
      {isWardrobeOpen && (
        <div className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-pop">
            <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center shrink-0">
               <div>
                 <h3 className="text-2xl font-black">精品衣橱</h3>
                 <p className="text-xs opacity-80 mt-1">内置海量热门商品素材，一键点击应用到详情页</p>
               </div>
               <button onClick={() => setIsWardrobeOpen(false)} className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-2xl transition-all">&times;</button>
            </div>
            
            <div className="flex border-b border-gray-100 shrink-0">
               {MODELS.map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setFittingRoomCategory(cat)}
                  className={`flex-1 py-4 text-sm font-bold transition-all relative ${fittingRoomCategory === cat ? 'text-purple-600 bg-purple-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                 >
                   {cat}
                   {fittingRoomCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600"></div>}
                 </button>
               ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-gray-50">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {filteredFittingRoomItems.map(item => (
                   <div 
                    key={item.id} 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-transparent hover:border-purple-300"
                    onClick={() => handleSelectFromFittingRoom(item.url)}
                   >
                     <div className="h-48 overflow-hidden relative bg-gray-100">
                        <img 
                          src={item.url} 
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 block"
                          onError={(e) => {
                             e.currentTarget.src = `https://via.placeholder.com/400x600?text=${encodeURIComponent(item.name)}`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                           <span className="bg-white text-purple-600 px-4 py-2 rounded-full text-xs font-black shadow-lg">从衣橱取出</span>
                        </div>
                     </div>
                     <div className="p-3 text-center">
                        <div className="text-xs font-bold text-gray-800 truncate">{item.name}</div>
                        <div className="text-[10px] text-gray-400 mt-1">分类：{item.category}</div>
                     </div>
                   </div>
                 ))}
                 {filteredFittingRoomItems.length === 0 && (
                   <div className="col-span-full py-20 text-center text-gray-300">
                      衣橱正在补货中...
                   </div>
                 )}
               </div>
            </div>
            
            <div className="p-4 bg-white border-t border-gray-100 text-center shrink-0">
               <p className="text-[10px] text-gray-400">目前衣橱已收录 300+ 真实穿搭素材，更多款式同步中...</p>
            </div>
          </div>
        </div>
      )}

      {showTutorial && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-pop">
            <div className="p-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white flex justify-between items-center">
              <h3 className="text-xl font-bold">保姆级带货教程</h3>
              <button onClick={() => setShowTutorial(false)} className="text-2xl">&times;</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black shrink-0">1</div>
                <p className="text-sm text-gray-600">从“衣橱”直接同步高质量穿搭素材。</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black shrink-0">2</div>
                <p className="text-sm text-gray-600">选择场景和模特类型。支持输入年龄（如：10岁）来精确控制人物特征。</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black shrink-0">3</div>
                <p className="text-sm text-gray-600">点击“生成”。AI 将产出电影级全套提示词。</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-black shrink-0">4</div>
                <p className="text-sm text-gray-600">跳转豆包“AI创作”，选择写真玩法，粘贴提示词即可。</p>
              </div>
              <button 
                onClick={() => {setShowTutorial(false); openDoubao();}}
                className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black shadow-lg hover:bg-pink-600 transition-all"
              >
                我知道了，立即开搞
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothingSales;
