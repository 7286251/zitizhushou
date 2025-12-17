import React, { useState, useRef, useCallback } from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';
import JSZip from 'jszip';
import saveAs from 'file-saver';

interface Props {
  theme: AppTheme;
}

interface SplitResult {
  originalName: string;
  parts: string[]; // Data URLs
}

const GridSplitter: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File, r: number, c: number): Promise<SplitResult> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const partWidth = img.width / c;
        const partHeight = img.height / r;
        const parts: string[] = [];

        // Determine the order: usually left-to-right, then top-to-bottom
        for (let i = 0; i < r; i++) {
          for (let j = 0; j < c; j++) {
            const canvas = document.createElement('canvas');
            canvas.width = partWidth;
            canvas.height = partHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(
                img,
                j * partWidth, i * partHeight, partWidth, partHeight, // Source
                0, 0, partWidth, partHeight // Destination
              );
              parts.push(canvas.toDataURL('image/png'));
            }
          }
        }
        URL.revokeObjectURL(img.src);
        resolve({
          originalName: file.name.replace(/\.[^/.]+$/, ""),
          parts
        });
      };
    });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsProcessing(true);
    setSplitResults([]);

    const files = Array.from(e.target.files);
    const results: SplitResult[] = [];

    // Process all files
    for (const file of files) {
      const res = await processFile(file, rows, cols);
      results.push(res);
    }

    setSplitResults(results);
    setIsProcessing(false);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadZip = async () => {
    if (splitResults.length === 0) return;
    
    const zip = new JSZip();

    splitResults.forEach((res, index) => {
      const folder = zip.folder(res.originalName) || zip;
      res.parts.forEach((partDataUrl, partIndex) => {
        // Remove "data:image/png;base64," prefix
        const base64Data = partDataUrl.split(',')[1];
        // Naming: name_01.png, name_02.png...
        folder.file(`${res.originalName}_${String(partIndex + 1).padStart(2, '0')}.png`, base64Data, { base64: true });
      });
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `split_images_${Date.now()}.zip`);
  };

  return (
    <div className={`p-6 ${config.cardClass} relative h-full flex flex-col overflow-y-auto custom-scrollbar`}>
      <h2 className={`text-2xl font-bold mb-6 ${config.textClass} flex items-center`}>
        <span className="mr-2">🧩</span> 九宫格切图工具
        <span className="ml-2 text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-normal">Grid Splitter</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/50 p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center">1. 切分设置</h3>
            
            <div className="flex gap-4 items-center justify-between mb-4">
               <div className="flex-1">
                 <label className="text-xs text-gray-500 block mb-1 font-bold">行数 (Rows)</label>
                 <input 
                   type="number" 
                   min="1" max="10" 
                   value={rows} 
                   onChange={(e) => setRows(Number(e.target.value))}
                   className="w-full p-2 border rounded-lg text-center font-mono font-bold text-lg"
                 />
               </div>
               <span className="text-gray-400 font-bold">X</span>
               <div className="flex-1">
                 <label className="text-xs text-gray-500 block mb-1 font-bold">列数 (Cols)</label>
                 <input 
                   type="number" 
                   min="1" max="10" 
                   value={cols} 
                   onChange={(e) => setCols(Number(e.target.value))}
                   className="w-full p-2 border rounded-lg text-center font-mono font-bold text-lg"
                 />
               </div>
            </div>

            <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
              预设模式: 
              <button onClick={() => {setRows(3); setCols(3)}} className="ml-2 text-blue-500 hover:underline font-bold">九宫格 (3x3)</button>
              <button onClick={() => {setRows(2); setCols(2)}} className="ml-2 text-blue-500 hover:underline font-bold">四宫格 (2x2)</button>
              <button onClick={() => {setRows(1); setCols(3)}} className="ml-2 text-blue-500 hover:underline font-bold">长图三切 (1x3)</button>
            </div>
          </div>

          <div 
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            className={`bg-white/50 p-5 rounded-xl border-2 border-dashed ${isProcessing ? 'border-gray-300 cursor-wait' : 'border-blue-300 hover:border-blue-500 cursor-pointer hover:bg-blue-50'} shadow-sm transition-all h-48 flex flex-col items-center justify-center text-center`}
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload} 
              disabled={isProcessing}
            />
            {isProcessing ? (
               <div className="animate-pulse flex flex-col items-center">
                 <span className="text-4xl mb-2">✂️</span>
                 <span className="text-gray-500 font-bold">正在极速切割中...</span>
               </div>
            ) : (
               <>
                 <span className="text-5xl mb-3 text-blue-400">📤</span>
                 <span className="text-gray-700 font-bold text-lg">点击上传图片</span>
                 <span className="text-xs text-gray-400 mt-2">支持多张批量上传 / JPG, PNG, WEBP</span>
               </>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 flex flex-col h-full min-h-[400px]">
           <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 flex-1 flex flex-col overflow-hidden">
              
              {/* Toolbar */}
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white/50">
                 <div className="font-bold text-gray-700">
                    处理结果 ({splitResults.length})
                 </div>
                 {splitResults.length > 0 && (
                   <button 
                     onClick={downloadZip}
                     className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-bold shadow hover:shadow-lg transition-transform active:scale-95 text-sm"
                   >
                      <span>📦</span> 打包下载全部 (ZIP)
                   </button>
                 )}
              </div>

              {/* Grid List */}
              <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                {splitResults.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                    <div className="grid grid-cols-3 gap-1 mb-4 opacity-50">
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-blue-400 rounded-sm animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
                    </div>
                    <p>等待上传...</p>
                    <p className="text-xs mt-2">上传后可预览切片结果</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                     {splitResults.map((res, idx) => (
                       <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
                             <h4 className="font-bold text-gray-800 text-sm truncate max-w-[200px]" title={res.originalName}>{res.originalName}</h4>
                             <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                               {rows}x{cols} = {res.parts.length} 片
                             </span>
                          </div>
                          
                          {/* Grid Preview */}
                          <div 
                            className="grid gap-1 w-full max-w-[300px] mx-auto"
                            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
                          >
                             {res.parts.map((part, pIdx) => (
                               <div key={pIdx} className="relative group aspect-square bg-gray-100 rounded overflow-hidden">
                                  <img src={part} className="w-full h-full object-cover" alt={`part-${pIdx}`} />
                                  <a 
                                    href={part} 
                                    download={`${res.originalName}_${String(pIdx + 1).padStart(2, '0')}.png`}
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                  >
                                     <span className="text-white text-xs font-bold border border-white/50 px-2 py-1 rounded hover:bg-white hover:text-black transition-colors">⬇️</span>
                                  </a>
                               </div>
                             ))}
                          </div>
                       </div>
                     ))}
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GridSplitter;