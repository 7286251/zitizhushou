import { GoogleGenAI, Content, Part } from "@google/genai";

const getAiClient = () => {
  // Lazy initialization to prevent "process is not defined" error during initial render in some environments
  const apiKey = process.env.API_KEY;
  return new GoogleGenAI({ apiKey: apiKey! });
};

const NEGATIVE_PROMPT_TEXT = "--no blur, no distortion, no artificial elements, no text, --无模糊，无扭曲，无渐变，无摄影元素，无真实纹理，无复杂背景，无阴影（除了轮廓所暗示的深度），无插画，无有机形状，无散景，无噪点";

export const generateArtPrompt = async (
  text1: string,
  text2: string,
  text3: string,
  styleName: string,
  customStyle: string
): Promise<string> => {
  const model = "gemini-2.5-flash";
  const ai = getAiClient();
  
  // Basic classification logic for specific keywords
  let additionalContext = "";
  if (text1.includes("双11") || text1.includes("领取") || text1.includes("下单")) {
    additionalContext += " 检测到电商关键词，请参考市面热门C4D大促风格，强调视觉冲击力和促销氛围。";
  }
  if (text1.includes("战队") || text1.includes("电竞") || styleName.includes("电竞")) {
    additionalContext += " 检测到电竞/战队关键词，请参考市面热门电竞LOGO风格，强调酷炫、锋利、对抗感。";
  }

  const prompt = `
  你是一位万能艺术字造字大师。请根据以下信息生成一个MJ/SD提示词。
  用户输入文字1 (Top Text): ${text1}
  用户输入文字2 (Bottom Text): ${text2}
  用户输入文字3 (Signature/Tag): ${text3}
  选择风格: ${styleName}
  自定义风格描述: ${customStyle}
  ${additionalContext}

  请严格按照以下格式输出一段提示词（无需解释，直接输出内容）：
  
  [主体描述 + 风格描述 + 材质描述 + 光影描述 + 配色方案 + 渲染参数]

  如果是"马年大吉"等竖版需求，请在提示词中强调竖排排版。
  确保提示词包含丰富的细节，如8K分辨率、C4D材质、OC渲染等专业术语。
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text?.trim() || "生成为空";
  } catch (error) {
    console.error("Error generating prompt:", error);
    return "生成失败，请检查网络或API Key。";
  }
};

export const analyzeImageForPrompt = async (imageFile: File): Promise<{ chinese: string, english: string }> => {
  const model = "gemini-2.5-flash";
  const ai = getAiClient();

  // Convert File to Base64
  const base64Data = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1]; 
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(imageFile);
  });

  const prompt = `
  你是一位专业的AI图像生成提示词工程师。请分析这张图片，反推文生图的提示词。
  
  请严格按照以下JSON格式返回结果，不要包含Markdown标记：
  {
    "chinese": "中文提示词内容...",
    "english": "English prompt content..."
  }

  要求：
  1. 越详细越好，越真实越好，还原度 100%。
  2. 如果图片包含文字，请提取文字内容。
  3. 英文提示词格式：主体描述, 环境背景, 风格参数, 技术细节 --no ...
  4. 绝对不要包含以下文字（如果自动生成了请删除）："${NEGATIVE_PROMPT_TEXT}"
  5. 不要输出"[已为您批量分析...]"等无关废话。
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: imageFile.type, data: base64Data } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    const jsonText = response.text?.trim() || "{}";
    const result = JSON.parse(jsonText);
    
    let eng = result.english || "";
    let chi = result.chinese || "";

    const clean = (str: string) => str.replace(NEGATIVE_PROMPT_TEXT, "").trim();

    return {
      chinese: clean(chi),
      english: clean(eng)
    };

  } catch (error) {
    console.error("Error analyzing image:", error);
    return { chinese: "反推失败", english: "Reverse engineering failed" };
  }
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const getSmartAgentResponse = async (history: ChatMessage[], newMessage: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  const ai = getAiClient();

  try {
    const chat = ai.chats.create({
      model: model,
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }] as Part[],
      })),
      config: {
        systemInstruction: "你是一个专业的AI绘画提示词智能体（Smart Agent）。\n你的核心任务是：帮助用户优化、生成或完善Midjourney/Stable Diffusion的提示词。\n你必须使用中文与用户交流，但生成的提示词部分应该是英文（因为AI绘画工具通常使用英文）。\n\n原则：\n1. 只做输出提示词为主，不要试图自己生成图片（你没有绘画能力）。\n2. 当用户描述一个画面时，帮他转化为结构化的Prompt：[主体] + [环境] + [风格] + [参数]。\n3. 语气专业、热情，带有艺术感。\n4. 如果用户需求模糊，请引导询问细节（如：风格、光影、构图）。"
      }
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text?.trim() || "智能体暂时无法回应";
  } catch (error) {
    console.error("Chat error:", error);
    return "智能体连接中断，请稍后再试。";
  }
};
