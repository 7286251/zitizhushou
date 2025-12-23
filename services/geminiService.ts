
import { GoogleGenAI, Content, Part } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not configured");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeCoverText = async (imageFile: File): Promise<string> => {
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const model = "gemini-3-flash-preview";
  const prompt = "请识别并提取这张图片中最显眼的主标题或核心文字内容。只返回文字本身，不要有任何其他解释。如果包含多个文本块，请提取最具代表性的那个。";

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Data } },
          { text: prompt }
        ]
      }
    });

    return response.text?.trim() || "";
  } catch (error) {
    console.error("Text analysis failed:", error);
    return "";
  }
};

export const replicateCoverImage = async (
  imageFile: File,
  originalText: string,
  newText: string
): Promise<string> => {
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const modelName = 'gemini-2.5-flash-image';
  const prompt = `Task: Modify the text on this viral cover.
1. Find the text "${originalText}" in the image.
2. Replace it with the new text: "${newText}".
3. IMPORTANT: Maintain the exact same font style, color, size, orientation, and artistic effects (like glow, shadows, or textures) as the original text.
4. Keep the background and all other elements of the image completely unchanged.
5. Output the high-quality modified image.`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Data } },
          { text: prompt }
        ]
      }
    });

    let imageUrl = "";
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data returned from model");
    }
    
    return imageUrl;
  } catch (error) {
    console.error("Cover replication error:", error);
    throw error;
  }
};

export const extractClothingImage = async (
  imageFile: File,
  type: string,
  view: string,
  is3d: boolean,
  count: number
): Promise<string[]> => {
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const modelName = 'gemini-2.5-flash-image';
  const prompt = `Task: Extract the specific clothing item [${type}] from the provided image.
Requirements:
1. Isolated item: Remove the person and background completely. Show only the clothing.
2. Background: Pure white background.
3. View: [${view}] view.
4. Presentation: ${is3d ? "3D Ghost mannequin effect (3D form without the model)." : "Flat lay effect (spread flat on a surface)."}
5. Fidelity: Match the colors, patterns, textures, and details of the original clothing exactly.
6. Quality: High-resolution product photography style with professional lighting.
Generate ${count} image(s).`;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Data } },
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4"
        }
      }
    });

    const imageUrls: string[] = [];
    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrls.push(`data:image/png;base64,${part.inlineData.data}`);
        }
      }
    }

    if (imageUrls.length === 0) {
      console.warn("No image data returned in response");
    }
    
    return imageUrls;
  } catch (error) {
    console.error("Clothing extraction API error:", error);
    throw error;
  }
};

export const generateClothingPrompts = async (
  imageFile: File, 
  modelType: string,
  sceneName: string,
  age?: string
): Promise<{ imagePrompt: string, videoPrompt: string }> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(imageFile);
  });

  const ageInfo = age ? `一位${age}岁的` : "";

  const prompt = `你是一个专业的电商带货文案与绘画提示词专家。
  任务：分析这张服装图片，并结合用户选择的模特类型 [${modelType}]、年龄 [${age || "未指定"}] 和 场景 [${sceneName}]，生成一段精美的提示词。

  ### 提示词生成规则与模板范例（必须严格参考以下话术风格）：

  1. **如果模特是 [软萌幼童]：**
     - 话术1：利落短发衬着圆嫩脸蛋，黑亮眼眸澄澈明亮，嘴角轻抿自带乖巧气场。${ageInfo}幼童身着图中同款羽绒服，站在座椅旁，右手轻搭礼盒，身体微侧面向镜头，姿态松弛又藏着孩童的天真憨态。
     - 话术2：乌发束成俏皮丸子头，缀着珍珠发饰，圆脸蛋透着粉润，杏眼澄澈明亮。${ageInfo}幼童站在座椅旁，右手轻搭礼盒，姿态松弛又藏着孩童的天真灵动。

  2. **如果模特是 [女模特] 或 [长发女性]：**
     - 描述1：黑长直发垂顺优雅，侧身望向展示画，姿态轻熟又舒展。${ageInfo}模特身着图中同款[描述衣服细节]，领口精致，搭配细节。
     - 描述2：黑长卷发自然垂落，侧身望向展示图，姿态优雅又带柔媚感。${ageInfo}女性身着图中同款[描述衣服细节]，搭配同色系靴子。

  3. **场景描述规则：**
     - [冬日车厢内]：浅白真皮座椅衬出温柔质感，窗边摆着浅蓝玫瑰束，礼盒以米白缎带装饰，车窗外是冰雪城堡与雪人。
     - [简约艺术展厅]：浅灰墙面衬着光洁的水泥地面，左侧挂着古典人像油画，古典大屏投影着同款穿搭画面。

  ### 输出要求：
  - 请识别图中衣服的颜色、材质、款式（如：酒红丝绒、奶白露肩针织等）。
  - 将衣服细节自然融入上述对应的模特（含年龄 [${age || ""}]）与场景描述中。
  - 视频动态提示词：主体持手机遮脸自拍或侧身观察，前后缓步移动，动作自然流畅。
  
  请以 JSON 格式返回: {"imagePrompt": "...", "videoPrompt": "..."}`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ inlineData: { mimeType: imageFile.type, data: base64Data } }, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"imagePrompt": "", "videoPrompt": ""}');
  } catch (error) {
    console.error("Clothing analysis failed:", error);
    return { imagePrompt: "生成失败", videoPrompt: "生成失败" };
  }
};

export const analyzeImageForPublishing = async (imageFile: File): Promise<{ productName: string, scene: string }> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(imageFile);
  });
  const prompt = `分析这张图片，为图文发布系统提取两个关键信息。1. productName: 简短的产品名称。2. scene: 适合的推广场景。以 JSON 格式返回: {"productName": "...", "scene": "..."}`;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ inlineData: { mimeType: imageFile.type, data: base64Data } }, { text: prompt }] },
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || '{"productName": "", "scene": ""}');
  } catch (error) {
    return { productName: "", scene: "" };
  }
};

export const analyzeImageForStoryboard = async (imageFile: File): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(imageFile);
  });
  const prompt = `分析这张图片，为分镜设计提供详细的主体 and 场景描述。请用中文回答。`;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [{ inlineData: { mimeType: imageFile.type, data: base64Data } }, { text: prompt }] },
    });
    return response.text || "无法识别画面内容";
  } catch (error) {
    return "分析失败";
  }
};

export const generateArtPrompt = async (text1: string, text2: string, text3: string, styleName: string, customStyle: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  const prompt = `你是一位万能艺术字造字大师。文字1: ${text1}, 文字2: ${text2}, 文字3: ${text3}, 风格: ${styleName}, 自定义: ${customStyle}。请生成用于 Midjourney 或 Stable Diffusion 的英文提示词。`;
  try {
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text?.trim() || "生成为空";
  } catch (error) {
    return "生成失败";
  }
};

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
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { chinese: "分析失败", english: "Analysis Failed" };
  }
};

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
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { english: "Error generating storyboard", chinese: "分镜生成错误" };
  }
};

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
    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { title: "生成失败", article: "生成失败", hashtags: [] };
  }
};

export interface ChatMessage { role: 'user' | 'model'; text: string; }
export const getSmartAgentResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const ai = getAiClient();
  try {
    const chat = ai.chats.create({ 
      model, 
      history: history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] as Part[] })) 
    });
    const response = await chat.sendMessage({ message: newMessage });
    return response.text?.trim() || "智能体暂时无法回应";
  } catch (error) {
    return "智能体连接中断";
  }
};
