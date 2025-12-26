
import React, { useState } from 'react';
import { THEME_CONFIG, DIRECTOR_PRESETS } from '../constants';
import { AppTheme, CharacterDesign, StoryboardItem } from '../types';
import { analyzeStoryAndDesignCharacters, generateFullDirectorStoryboard } from '../services/geminiService';

interface Props { theme: AppTheme; }

const DirectorAgent: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [story, setStory] = useState('');
  const [genre, setGenre] = useState(DIRECTOR_PRESETS.FILM_GENRES[0]);
  const [sceneCount, setSceneCount] = useState(6);
  const [analysis, setAnalysis] = useState('');
  const [characters, setCharacters] = useState<CharacterDesign[]>([]);
  const [storyboard, setStoryboard] = useState<StoryboardItem[]>([]);
  const [displayLang, setDisplayLang] = useState<'zh' | 'en'>('zh');
  const [loading, setLoading] = useState(false);

  const handleAnalyzeStory = async () => {
    if (!story) return alert('请先输入故事大纲');
    setLoading(true);
    try {
      const result = await analyzeStoryAndDesignCharacters(story, genre);
      setAnalysis(result.analysis);
      setCharacters(result.characters);
      setStep(2);
    } catch (e) { alert('分析失败'); } finally { setLoading(false); }
  };

  const handleConfirmCharacters = async () => {
    setLoading(true);
    try {
      const result = await generateFullDirectorStoryboard(story, characters, sceneCount);
      setStoryboard(result);
      setStep(3);
    } catch (e) { alert('生成失败'); } finally { setLoading(false); }
  };

  return (
    <div className={`p-6 md:p-10 h-full flex flex-col overflow-hidden ${config.cardClass}`}>
      <div className="flex items-center justify-center gap-4 mb-10 shrink-0">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs border-2 ${step >= s ? 'bg-black text-white' : 'bg-white text-gray-300'}`}>{s}</div>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-black' : 'bg-gray-100'}`}></div>}
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {step === 1 && (
          <div className="max-w-3xl mx-auto space-y-8 animate-pop">
            <div className="bg-black/5 p-8 rounded-[3rem]">
              <h3 className="text-xl font-black mb-6">🎬 故事导演模式</h3>
              <div className="mb-6 flex flex-wrap gap-2">
                {DIRECTOR_PRESETS.FILM_GENRES.map(g => (
                  <button key={g} onClick={() => setGenre(g)} className={`px-4 py-1.5 rounded-full text-[10px] font-black border-2 transition-all ${genre === g ? 'bg-black border-black text-white' : 'bg-white border-gray-100 text-gray-400'}`}>{g}</button>
                ))}
              </div>
              <textarea value={story} onChange={e => setStory(e.target.value)} placeholder="输入故事剧本..." className="w-full h-48 p-6 rounded-[2rem] border-2 border-black/10 focus:border-black outline-none font-medium resize-none" />
              <div className="mt-6 flex items-center justify-between">
                <input type="number" value={sceneCount} onChange={e => setSceneCount(Number(e.target.value))} className="w-16 p-2 rounded-xl border border-black/10 text-center font-bold" />
                <button onClick={handleAnalyzeStory} disabled={loading} className={`px-10 py-4 rounded-2xl font-black ${config.buttonClass}`}>{loading ? '分析中...' : '下一步：试镜'}</button>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="animate-pop space-y-8">
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100"><h4 className="text-sm font-black text-blue-600 mb-2">导演建议</h4><p className="text-sm text-gray-700">{analysis}</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {characters.map((char, i) => (
                <div key={i} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">
                  <h4 className="text-lg font-black mb-4 bg-black text-white px-3 py-1 inline-block">{char.roleName}</h4>
                  <textarea value={char.appearance} onChange={e => {const n=[...characters]; n[i].appearance=e.target.value; setCharacters(n);}} className="w-full p-3 bg-gray-50 rounded-xl text-xs font-bold outline-none h-24" />
                </div>
              ))}
            </div>
            <div className="flex justify-center"><button onClick={handleConfirmCharacters} disabled={loading} className={`px-16 py-5 rounded-[2rem] font-black text-xl ${config.buttonClass}`}>{loading ? '创作中...' : '生成全套分镜'}</button></div>
          </div>
        )}
        {step === 3 && (
          <div className="animate-pop space-y-12 pb-20">
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 p-1 rounded-full">
                <button onClick={() => setDisplayLang('zh')} className={`px-6 py-2 rounded-full text-xs font-black ${displayLang === 'zh' ? 'bg-black text-white' : 'text-gray-400'}`}>中文提示词</button>
                <button onClick={() => setDisplayLang('en')} className={`px-6 py-2 rounded-full text-xs font-black ${displayLang === 'en' ? 'bg-black text-white' : 'text-gray-400'}`}>English Prompts</button>
              </div>
            </div>
            {storyboard.map(item => (
              <div key={item.sequenceNumber} className="bg-white border-2 border-black/5 p-8 rounded-[3rem] hover:border-black/10 transition-all flex flex-col md:flex-row gap-8">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-2xl font-black italic shadow-lg shrink-0">{item.sequenceNumber}</div>
                <div className="flex-1 space-y-4">
                  <h4 className="text-xl font-black">{item.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-2xl text-xs border border-black/5 italic">
                      <span className="block text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Image Prompt</span>
                      {displayLang === 'zh' ? item.imagePrompt : item.imagePrompt} {/* 绘图提示词暂保持统一英文，Gemini输出即英文 */}
                    </div>
                    <div className="bg-blue-50/30 p-4 rounded-2xl text-xs border border-blue-100">
                      <span className="block text-[10px] text-gray-400 mb-2 uppercase tracking-widest">Video Prompt</span>
                      {(item as any)[displayLang === 'zh' ? 'videoPrompt' : 'videoPrompt_en'] || item.videoPrompt}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default DirectorAgent;
