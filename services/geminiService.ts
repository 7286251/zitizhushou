import { GoogleGenAI, Content, Part } from "@google/genai";

// Always create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey! });
};

// analyzeImageForPublishing: Extracts product info and scene suggestions from an image for the publishing system.
export const analyzeImageForPublishing = async (imageFile: File): Promise<{ productName: string, scene: string }> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(imageFile);
  });
  
  const prompt = `分析这张图片，为图文发布系统提取两个关键信息。
  1. productName: 简短的产品名称（例如：2026马年纯金摆件）。
  2. scene: 适合的推广场景或用户痛点描述（例如：春节送礼首选，提升家居格调）。
  以 JSON 格式返回: {"productName": "...", "scene": "..."}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ inlineData: { mimeType: imageFile.type, data: base64Data } }, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    // Access the text property directly (not as a method).
    return JSON.parse(response.text || '{"productName": "", "scene": ""}');
  } catch (error) {
    console.error("Image analysis failed:", error);
    return { productName: "", scene: "" };
  }
};

// analyzeImageForStoryboard: Analyzes visual content to provide a detailed scene description for storyboard generation.
// This fix addresses the missing member error in StoryboardCreator.tsx.
export const analyzeImageForStoryboard = async (imageFile: File): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(imageFile);
  });
  
  const prompt = `分析这张图片，为分镜设计提供详细的主体和场景描述。请用中文回答，尽量详细但精炼，描述画面中的主要元素、光影、构图和氛围。`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ inlineData: { mimeType: imageFile.type, data: base64Data } }, { text: prompt }] },
    });
    // Access the text property directly (not as a method).
    return response.text || "无法识别画面内容";
  } catch (error) {
    console.error("Storyboard image analysis failed:", error);
    return "分析失败";
  }
};

// generateArtPrompt: Generates MJ/SD artistic text prompts based on provided text and styles.
export const generateArtPrompt = async (
  text1: string,
  text2: string,
  text3: string,
  styleName: string,
  customStyle: string
): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const prompt = `你是一位万能艺术字造字大师。文字1: ${text1}, 文字2: ${text2}, 文字3: ${text3}, 风格: ${styleName}, 自定义: ${customStyle}。请生成用于 Midjourney 或 Stable Diffusion 的英文提示词。`;
  try {
    const response = await ai.models.generateContent({ model, contents: prompt });
    // Access the text property directly (not as a method).
    return response.text?.trim() || "生成为空";
  } catch (error) {
    return "生成失败";
  }
};

// analyzeImageForPrompt: Performs reverse image-to-prompt analysis, returning descriptions in Chinese and English.
export const analyzeImageForPrompt = async (imageFile: File): Promise<{ chinese: string, english: string }> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(imageFile);
  });
  const prompt = `分析图片，反推描述其视觉特征的提示词。请以 JSON 格式返回: {"chinese": "...", "english": "..."}`;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ inlineData: { mimeType: imageFile.type, data: base64Data } }, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    // Access the text property directly (not as a method).
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { chinese: "分析失败", english: "Analysis Failed" };
  }
};

// generateStoryboardPrompt: Creates structured storyboard prompts based on subject descriptions and specific shot types.
export const generateStoryboardPrompt = async (subjectDescription: string, shotTypes: string[]): Promise<{ english: string, chinese: string }> => {
  const model = "gemini-3-pro-preview";
  const ai = getAiClient();
  const prompt = `根据主体描述: "${subjectDescription}"，以及分镜景别设置: ${shotTypes.join(', ')}，生成一套 3x3 网格分镜提示词。请以 JSON 格式返回: {"english": "...", "chinese": "..."}`;
  try {
    const response = await ai.models.generateContent({ 
      model, 
      contents: prompt, 
      config: { responseMimeType: "application/json" } 
    });
    // Access the text property directly (not as a method).
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { english: "Error generating storyboard", chinese: "分镜生成错误" };
  }
};

// generatePublishContent: Generates marketing articles and titles tailored for social media platforms.
export const generatePublishContent = async (params: {
  platform: string;
  mode: string;
  productName: string;
  style: string;
  scene: string;
  wordCount: number;
}): Promise<{ title: string; article: string; hashtags: string[] }> => {
  const model = "gemini-3-pro-preview";
  const ai = getAiClient();
  const prompt = `你是一位全平台营销专家。目标平台: ${params.platform}, 创作模式: ${params.mode}, 产品名称: ${params.productName}, 写作风格: ${params.style}, 使用场景: ${params.scene}, 期望字数: ${params.wordCount}。请返回 JSON: {"title": "...", "article": "...", "hashtags": ["...", "..."]}`;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    // Access the text property directly (not as a method).
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { title: "生成失败", article: "生成失败", hashtags: [] };
  }
};

export interface ChatMessage { role: 'user' | 'model'; text: string; }
// getSmartAgentResponse: Manages a conversational session with a smart assistant using the chat history.
export const getSmartAgentResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  try {
    const chat = ai.chats.create({ 
      model, 
      history: history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] as Part[] })) 
    });
    const response = await chat.sendMessage({ message: newMessage });
    // Access the text property directly (not as a method).
    return response.text?.trim() || "智能体暂时无法回应";
  } catch (error) {
    return "智能体连接中断";
  }
};