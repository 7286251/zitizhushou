
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
 * 优化：解决网络失败问题，增加超时处理与更健壮的 Prompt 指导
 */
export const extractVideoContent = async (file: File): Promise<any> => {
  const ai = getAiClient();
  const videoPart = await fileToGenerativePart(file);
  
  const systemInstruction = `你是一位顶尖的视频内容拆解与短视频运营专家。你的任务是深度分析上传的视频（包含视觉画面与音频轨道）：
  1. 准确提取视频中出现的所有台词、旁白、字幕或视觉文字（extractedText）。
  2. 识别背景音乐（BGM）的风格、节奏、曲风（bgmInfo）。
  3. 针对各平台，策划对应的爆款标题、正文及话题（platforms）。
  4. 构思三组具有视觉冲击力的爆款封面设计方案（coverIdeas）。
  请务必仅输出纯 JSON 格式，不要包含 Markdown 块符号或其他说明文字。`;

  const prompt = `深度解析视频并返回 JSON。结构必须包含 extractedText, bgmInfo, platforms (xhs, douyin, channels), coverIdeas。`;

  try {
    // 增加重试逻辑
    let response;
    let attempts = 0;
    while (attempts < 2) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3-pro-preview",
          contents: { parts: [videoPart, { text: prompt }] },
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            thinkingConfig: { thinkingBudget: 16384 } 
          }
        });
        break; // 成功则退出循环
      } catch (e) {
        attempts++;
        if (attempts >= 2) throw e;
        await new Promise(r => setTimeout(r, 2000)); // 等待2秒重试
      }
    }
    
    const text = response?.text;
    if (!text) throw new Error("API returned empty response");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Video content extraction failed:", error);
    throw error;
  }
};

/**
 * 百变边框智能体：生成游戏头像框提示词
 */
export const generateBorderPrompt = async (theme: string): Promise<any> => {
  const ai = getAiClient();
  const systemInstruction = `你是一位专业的游戏头像框生成助手。基于用户输入的主题，匹配并优化以下六组模板之一：
  T1: 公主风(皇冠/淡粉)
  T2: 音乐风(音符/紫色)
  T3: 自然风(叶子/藤蔓/绿色)
  T4: 音乐增强(音符/紫色)
  T5: 冰雪公主(皇冠/雪花/淡蓝)
  T6: 天使风(天使/翅膀/金黄白)
  
  必须包含核心特征：16k, 轮廓光, 英雄联盟涂风格, 圆形不对称, 黑色背景, 低饱和度胭脂色系渐变。
  请严格输出 JSON 格式。`;

  const prompt = `用户主题：${theme}。请根据技能要求生成结构化描述 JSON。`;

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
            decorations: { type: Type.STRING },
            colorPalette: { type: Type.STRING },
            dynamicEffects: { type: Type.STRING },
            fullPrompt_en: { type: Type.STRING, description: "生成的专业英文提示词包" }
          },
          required: ["templateId", "themeName", "coreFeatures", "decorations", "colorPalette", "dynamicEffects", "fullPrompt_en"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Border prompt generation failed:", error);
    throw error;
  }
};

/**
 * 生成艺术字提示词（中英双语）
 */
export const generateArtPrompt = async (text1: string, text2: string, text3: string, styleName: string, customStyle: string): Promise<{ zh: string, en: string }> => {
  const ai = getAiClient();
  const prompt = `你是一位顶尖的 AI 艺术字设计师。请基于以下信息生成高质量的 MJ/SD 提示词。
  主文字: "${text1}"，装饰: "${text2}", "${text3}"，风格: "${styleName}"，额外描述: "${customStyle}"
  请返回 JSON 格式，包含：
  "zh": 详细的中文艺术字提示词描述。
  "en": 对应的专业英文提示词（Midjourney 风格）。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            zh: { type: Type.STRING },
            en: { type: Type.STRING }
          },
          required: ["zh", "en"]
        }
      }
    });
    return JSON.parse(response.text || '{"zh": "", "en": ""}');
  } catch (error) {
    console.error("Art prompt generation failed:", error);
    return { zh: "生成失败", en: "Generation failed" };
  }
};

/**
 * 生成 15s 圣诞爆款导演脚本（支持氛围选择）
 */
export const generateChristmasProductScript = async (file: File, mood: string): Promise<UgcScriptItem[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `你是一位顶尖的短视频导演。基于上传的产品图，创建一个15秒“圣诞限定”脚本。设定氛围：${mood}。返回 JSON 数组。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              timeRange: { type: Type.STRING },
              title: { type: Type.STRING },
              visual: { type: Type.STRING },
              audio_zh: { type: Type.STRING },
              audio_en: { type: Type.STRING },
              emotion: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Christmas script generation failed:", error);
    return [];
  }
};

/**
 * 其他原有服务函数保持不变...
 */
export const generateUgcVideoScript = async (file: File, audience: string): Promise<UgcScriptItem[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `创建UGC脚本。目标受众：${audience}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const generateSoraClothingStoryboards = async (lighting: string): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const prompt = `生成Sora服装分镜。光影：${lighting}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const analyzeStoryAndDesignCharacters = async (story: string, genre: string): Promise<{ analysis: string, characters: CharacterDesign[] }> => {
  const ai = getAiClient();
  const prompt = `分析剧本设计角色。风格：${genre}。故事：${story}。返回 JSON。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"analysis": "", "characters": []}');
  } catch (error) { return { analysis: "失败", characters: [] }; }
};

export const generateFullDirectorStoryboard = async (story: string, characters: CharacterDesign[], sceneCount: number): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const prompt = `生成分镜。必须包含中英双语提示词。场景数：${sceneCount}。返回 JSON 数组。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) { return []; }
};

export const generateClothingPrompts = async (file: File, modelType: string, occasion: string, modelAge: string): Promise<{ imagePrompt: string, imagePrompt_en: string, videoPrompt: string, videoPrompt_en: string }> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `生成服装提示词。类型：${modelType}，场景：${occasion}。返回 JSON。`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
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
  const prompt = `基于主体描述：“${subject}”，为 9 个分镜景别生成提示词。景别：${shots.join(", ")}。返回中英双语 JSON。`;
  const response = await ai.models.generateContent({ model: "gemini-3-pro-preview", contents: prompt, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || '{"chinese": "", "english": ""}');
};

export const generatePublishContent = async (params: any): Promise<PublishContent> => {
  const ai = getAiClient();
  const prompt = `为平台 ${params.platform} 创作关于“${params.productName}”的推文。返回 JSON。`;
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: prompt, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || '{"title": "", "article": "", "hashtags": []}');
};

export const analyzeImageForPublishing = async (file: File): Promise<{ productName?: string, scene?: string }> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: { parts: [imagePart, { text: "识别产品名和场景 JSON。" }] }, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || "{}");
};

export const extractClothingImage = async (file: File, type: string, view: string, is3d: boolean, count: number): Promise<string[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-2.5-flash-image", contents: { parts: [imagePart, { text: `提取服装：${type}，视角：${view}，3D：${is3d}。` }] } });
  const urls: string[] = [];
  for (const part of response.candidates?.[0]?.content?.parts || []) { if (part.inlineData) urls.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`); }
  return urls;
};

export const replicateCoverImage = async (file: File, originalText: string, newText: string): Promise<string> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-2.5-flash-image", contents: { parts: [imagePart, { text: `复刻风格，原词“${originalText}”改为“${newText}”。` }] } });
  for (const part of response.candidates?.[0]?.content?.parts || []) { if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`; }
  return "";
};

export const analyzeCoverText = async (file: File): Promise<string> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const response = await ai.models.generateContent({ model: "gemini-3-flash-preview", contents: { parts: [imagePart, { text: "提取标题文字。" }] } });
  return response.text?.trim() || "";
};

export const generateStoryboardWorkflowPrompts = async (story: string, product: string): Promise<{ step1: string, step2: string, step3: string, step4: string }> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({ model: "gemini-3-pro-preview", contents: `生成工作流提示词 JSON：${product} | ${story}`, config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || '{"step1": "", "step2": "", "step3": "", "step4": ""}');
};

export const generateSK2ChristmasStories = async (): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({ model: "gemini-3-pro-preview", contents: "SK-II 圣诞故事分镜 JSON。", config: { responseMimeType: "application/json" } });
  return JSON.parse(response.text || "[]");
};
