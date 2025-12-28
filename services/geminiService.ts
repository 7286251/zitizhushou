
import { GoogleGenAI, Type } from "@google/genai";
import { CharacterDesign, StoryboardItem, PublishContent, UgcScriptItem } from "../types";

// Helper to initialize the GenAI client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not configured");
  }
  return new GoogleGenAI({ apiKey });
};

// Helper to convert File object to a generative part for Gemini
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

/**
 * 视频内容深度提取与爆款策略生成
 * 优化点：使用 Flash 模型提升大文件处理稳定性，增加 3 次重试，强化 JSON 结构约束
 */
export const extractVideoContent = async (file: File): Promise<any> => {
  const ai = getAiClient();
  const videoPart = await fileToGenerativePart(file);
  
  const systemInstruction = `你是一位顶尖的短视频内容分析师。任务：深度拆解视频内容（视觉+音频）。
  要求：
  1. 准确提取所有文本/台词（extractedText）。
  2. 识别BGM风格（bgmInfo）。
  3. 为小红书、抖音、视频号提供独立运营方案。
  4. 构思3个爆款封面建议。
  注意：仅输出 JSON，禁止包含任何引导性文本（如 "Here is the JSON" 或 "Launch!"）。`;

  const prompt = `分析此视频。请严格按照以下 JSON 格式返回，不得有误：
  {
    "extractedText": "...",
    "bgmInfo": "...",
    "platforms": {
      "xhs": { "title": "...", "content": "...", "hashtags": [] },
      "douyin": { "title": "...", "content": "...", "hashtags": [] },
      "channels": { "title": "...", "content": "...", "hashtags": [] }
    },
    "coverIdeas": []
  }`;

  let lastError: any;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", 
        contents: { parts: [videoPart, { text: prompt }] },
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingBudget: 16384 } 
        }
      });
      
      const text = response?.text;
      if (!text) throw new Error("空响应");
      return JSON.parse(text);
    } catch (error) {
      console.warn(`第 ${attempt} 次视频识别尝试失败:`, error);
      lastError = error;
      if (attempt < 3) await new Promise(r => setTimeout(r, 1500 * attempt)); 
    }
  }
  throw lastError || new Error("视频识别最终失败，请检查网络或更换视频");
};

/**
 * 百变边框智能体：生成游戏头像框提示词
 * 扩展响应字段以支持中英文一键切换
 */
export const generateBorderPrompt = async (theme: string): Promise<any> => {
  const ai = getAiClient();
  const systemInstruction = `你是一位专业的游戏UI设计师，擅长《英雄联盟》风格的头像框设计。
  根据用户主题，匹配预设模板并输出结构化提示词。
  必须为以下字段同时提供中英文版本：核心特征(coreFeatures/coreFeatures_en)、主题装饰(decorations/decorations_en)、配色(colorPalette/colorPalette_en)、动态效果(dynamicEffects/dynamicEffects_en)。
  禁止在输出中包含 "Launch" 等词。`;

  const prompt = `主题：${theme}。生成对应的头像框设计 JSON。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            templateId: { type: Type.STRING },
            themeName: { type: Type.STRING },
            coreFeatures: { type: Type.STRING },
            coreFeatures_en: { type: Type.STRING },
            decorations: { type: Type.STRING },
            decorations_en: { type: Type.STRING },
            colorPalette: { type: Type.STRING },
            colorPalette_en: { type: Type.STRING },
            dynamicEffects: { type: Type.STRING },
            dynamicEffects_en: { type: Type.STRING },
            fullPrompt_en: { type: Type.STRING }
          },
          required: ["templateId", "themeName", "coreFeatures", "coreFeatures_en", "decorations", "decorations_en", "colorPalette", "colorPalette_en", "dynamicEffects", "dynamicEffects_en", "fullPrompt_en"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("边框生成失败:", error);
    throw error;
  }
};

/**
 * 其余服务函数保持不变...
 */
export const generateArtPrompt = async (text1: string, text2: string, text3: string, styleName: string, customStyle: string): Promise<{ zh: string, en: string }> => {
  const ai = getAiClient();
  const prompt = `你是一位 AI 艺术字设计师。主文字: "${text1}"，风格: "${styleName}"。返回 JSON 格式。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"zh": "", "en": ""}');
  } catch (error) { return { zh: "生成失败", en: "Generation failed" }; }
};

export const generateChristmasProductScript = async (file: File, mood: string): Promise<UgcScriptItem[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `生成圣诞脚本。氛围：${mood}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const generateUgcVideoScript = async (file: File, audience: string): Promise<UgcScriptItem[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `创建UGC脚本。目标：${audience}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const generateSoraClothingStoryboards = async (lighting: string): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const prompt = `生成分镜。光影：${lighting}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const analyzeStoryAndDesignCharacters = async (story: string, genre: string): Promise<{ analysis: string, characters: CharacterDesign[] }> => {
  const ai = getAiClient();
  const prompt = `分析剧本设计角色。风格：${genre}。返回 JSON。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"analysis": "", "characters": []}');
  } catch (error) { return { analysis: "失败", characters: [] }; }
};

export const generateFullDirectorStoryboard = async (story: string, characters: CharacterDesign[], sceneCount: number): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const prompt = `生成分镜指令流。场景数：${sceneCount}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const generateClothingPrompts = async (file: File, modelType: string, occasion: string, modelAge: string): Promise<{ imagePrompt: string, imagePrompt_en: string, videoPrompt: string, videoPrompt_en: string }> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `服装分析。场景：${occasion}。返回 JSON。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"imagePrompt": "", "imagePrompt_en": "", "videoPrompt": "", "videoPrompt_en": ""}');
  } catch (error) { return { imagePrompt: "失败", imagePrompt_en: "", videoPrompt: "失败", videoPrompt_en: "" }; }
};

export const analyzeImageForPrompt = async (file: File): Promise<{ chinese: string, english: string }> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: [imagePart, { text: "分析此图并返回中英双语绘图提示词 JSON。" }] },
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || '{"chinese": "", "english": ""}');
};

export const analyzeImageForStoryboard = async (file: File): Promise<string> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: { parts: [imagePart, { text: "描述图片主体及环境。" }] } });
  return response.text || "";
};

export const generateStoryboardPrompt = async (subject: string, shots: string[]): Promise<{ english: string, chinese: string }> => {
  const ai = getAiClient();
  const prompt = `生成九宫格分镜指令 JSON。`;
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: prompt, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || '{"chinese": "", "english": ""}');
};

export const generatePublishContent = async (params: any): Promise<PublishContent> => {
  const ai = getAiClient();
  const prompt = `创作推文 JSON。`;
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: prompt, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || '{"title": "", "article": "", "hashtags": []}');
};

export const analyzeImageForPublishing = async (file: File): Promise<{ productName?: string, scene?: string }> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: { parts: [imagePart, { text: "识别产品信息 JSON。" }] }, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || "{}");
};

export const extractClothingImage = async (file: File, type: string, view: string, is3d: boolean, count: number): Promise<string[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-2.5-flash-image", contents: { parts: [imagePart, { text: `提取服装：${type}。` }] } });
  const urls: string[] = [];
  for (const part of response.candidates?.[0]?.content?.parts || []) { if (part.inlineData) urls.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`); }
  return urls;
};

export const replicateCoverImage = async (file: File, originalText: string, newText: string): Promise<string> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-2.5-flash-image", contents: { parts: [imagePart, { text: `复刻原词“${originalText}”为“${newText}”。` }] } });
  for (const part of response.candidates?.[0]?.content?.parts || []) { if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`; }
  return "";
};

export const analyzeCoverText = async (file: File): Promise<string> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: { parts: [imagePart, { text: "识别文字。" }] } });
  return response.text?.trim() || "";
};

export const generateStoryboardWorkflowPrompts = async (story: string, product: string): Promise<{ step1: string, step2: string, step3: string, step4: string }> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: `工作流 JSON。`, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || '{"step1": "", "step2": "", "step3": "", "step4": ""}');
};

export const generateSK2ChristmasStories = async (): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: "SK-II 故事 JSON。", config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || "[]");
};
