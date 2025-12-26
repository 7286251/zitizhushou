
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
  const prompt = `你是一位顶尖的短视频导演。基于上传的产品图，创建一个15秒“圣诞限定”脚本。
设定氛围：${mood}。
脚本逻辑：
1. 0-3s：开场动态氛围。
2. 4-7s：产品可爱元素特写。
3. 8-11s：材质细节展示。
4. 12-15s：真诚推荐与转化。
要求：每个环节必须提供对应的 visual, audio_zh, audio_en (英文翻译), emotion。
返回 JSON 数组。`;

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
 * 生成 UGC 脚本（支持受众选择）
 */
export const generateUgcVideoScript = async (file: File, audience: string): Promise<UgcScriptItem[]> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `你是一位顶尖的抖音UGC内容策略师。针对目标受众：${audience}，根据产品图创建15秒脚本。
必须包含中英双语解说词 (audio_zh, audio_en)。
返回 JSON 数组。`;

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
    console.error("UGC Script generation failed:", error);
    return [];
  }
};

/**
 * Sora 导演分镜（支持光影选择）
 */
export const generateSoraClothingStoryboards = async (lighting: string): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const prompt = `你是一位顶尖的 Sora 视频导演。请生成 5 组服装展示分镜（JSON 格式）。
核心光影设定：${lighting}。
要求：每个分镜必须提供中英双语提示词（通过 videoPrompt_en 字段额外提供）。
返回 JSON 数组。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sequenceNumber: { type: Type.INTEGER },
              name: { type: Type.STRING },
              imagePrompt: { type: Type.STRING },
              videoPrompt: { type: Type.STRING },
              videoPrompt_en: { type: Type.STRING },
              duihua: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Sora story generation failed:", error);
    return [];
  }
};

/**
 * 电影分镜导演（支持电影风格）
 */
export const analyzeStoryAndDesignCharacters = async (story: string, genre: string): Promise<{ analysis: string, characters: CharacterDesign[] }> => {
  const ai = getAiClient();
  const prompt = `作为专业导演，分析以下剧本并设计角色。风格倾向：${genre}。
故事内容：${story}
要求返回 JSON 格式。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            characters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  roleName: { type: Type.STRING },
                  appearance: { type: Type.STRING },
                  castingPrompt: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"analysis": "", "characters": []}');
  } catch (error) {
    console.error("Story analysis failed:", error);
    return { analysis: "失败", characters: [] };
  }
};

export const generateFullDirectorStoryboard = async (story: string, characters: CharacterDesign[], sceneCount: number): Promise<StoryboardItem[]> => {
  const ai = getAiClient();
  const prompt = `基于剧本生成 ${sceneCount} 组导演分镜。必须包含中英双语提示词。
返回 JSON 数组，包含 imagePrompt, videoPrompt, videoPrompt_en (英文版)。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              sequenceNumber: { type: Type.INTEGER },
              name: { type: Type.STRING },
              imagePrompt: { type: Type.STRING },
              videoPrompt: { type: Type.STRING },
              videoPrompt_en: { type: Type.STRING },
              duihua: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Full storyboard generation failed:", error);
    return [];
  }
};

export const generateClothingPrompts = async (file: File, modelType: string, occasion: string, modelAge: string): Promise<{ imagePrompt: string, imagePrompt_en: string, videoPrompt: string, videoPrompt_en: string }> => {
  const ai = getAiClient();
  const imagePart = await fileToGenerativePart(file);
  const prompt = `作为时尚导演，分析此服装并为 ${modelType} (${modelAge}岁) 在 ${occasion} 场景生成提示词。
必须提供中英双语版本。
返回 JSON。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: { parts: [imagePart, { text: prompt }] },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            imagePrompt: { type: Type.STRING },
            imagePrompt_en: { type: Type.STRING },
            videoPrompt: { type: Type.STRING },
            videoPrompt_en: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{"imagePrompt": "", "imagePrompt_en": "", "videoPrompt": "", "videoPrompt_en": ""}');
  } catch (error) {
    console.error("Clothing prompts generation failed:", error);
    return { imagePrompt: "失败", imagePrompt_en: "", videoPrompt: "失败", videoPrompt_en: "" };
  }
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
