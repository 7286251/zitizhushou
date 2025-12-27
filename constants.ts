
import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const APP_NOTICES = [
  "✨ [视觉 2026] 全新皮肤：新拟态、新粗野、膨胀风、可爱风、贴纸风已上线。",
  "🎨 [专注灵感] 艺术字智能体：深度优化提示词工程，不做废图，只做创意。",
  "🚀 [导演更新] 圣诞/电影/UGC/Sora 各模块已全面支持中英双语切换与预设选择。",
  "🔥 [极速检索] 工具合集已更新，内置 68 款全球顶级 AI 生产力工具。"
];

export const THEME_CONFIG: Record<AppTheme, {
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  buttonClass: string;
  accentColor: string;
  icon: string;
}> = {
  [AppTheme.NEUMORPHISM]: {
    name: '新拟态',
    icon: '🔘',
    bgClass: 'bg-[#E0E5EC]',
    cardClass: 'bg-[#E0E5EC] rounded-[3rem] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border-none',
    textClass: 'text-gray-600 font-bold',
    buttonClass: 'bg-[#E0E5EC] text-gray-700 shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] rounded-full transition-all font-bold',
    accentColor: 'text-blue-500',
  },
  [AppTheme.NEO_BRUTALISM]: {
    name: '新粗野',
    icon: '⬛',
    bgClass: 'bg-[#FFEB3B]',
    cardClass: 'bg-white border-[6px] border-black rounded-none shadow-[12px_12px_0px_black]',
    textClass: 'text-black font-black uppercase italic',
    buttonClass: 'bg-[#FF5722] text-white border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black',
    accentColor: 'text-black',
  },
  [AppTheme.INFLATABLE]: {
    name: '膨胀风',
    icon: '🎈',
    bgClass: 'bg-gradient-to-br from-pink-300 to-purple-400',
    cardClass: 'bg-white/80 backdrop-blur-md rounded-[4rem] border-8 border-white/50 shadow-[0_30px_50px_rgba(0,0,0,0.1)]',
    textClass: 'text-purple-900 font-black tracking-tight',
    buttonClass: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-2xl hover:scale-105 transition-transform font-black',
    accentColor: 'text-white',
  },
  [AppTheme.CUTE]: {
    name: '可爱风',
    icon: '🌸',
    bgClass: 'bg-[#FFF0F5]',
    cardClass: 'bg-white rounded-[4rem] border-8 border-pink-100 shadow-[0_15px_30px_rgba(255,182,193,0.3)]',
    textClass: 'text-pink-500 font-bold',
    buttonClass: 'bg-pink-400 text-white rounded-full hover:bg-pink-300 transition-colors font-bold shadow-lg',
    accentColor: 'text-pink-400',
  },
  [AppTheme.STICKER]: {
    name: '贴纸风',
    icon: '🏷️',
    bgClass: 'bg-[#FDFD96]',
    cardClass: 'bg-white rounded-3xl border-4 border-gray-100 shadow-[8px_8px_0px_white,12px_12px_0px_rgba(0,0,0,0.05)] rotate-1',
    textClass: 'text-gray-800 font-bold font-serif',
    buttonClass: 'bg-white text-black border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-xl hover:-rotate-2 transition-transform font-black',
    accentColor: 'text-blue-600',
  }
};

export const DIRECTOR_PRESETS = {
  FILM_GENRES: ['科幻赛博', '王家卫港风', '宫崎骏治愈', '黑色电影', '好莱坞商业', '法式浪漫', '纪录片写实'],
  XMAS_MOODS: ['温馨壁炉', '户外飘雪', '节日派对', '孤独治愈', '奢侈礼赠', '梦幻童话'],
  UGC_AUDIENCES: ['Z世代弄潮儿', '精致职场白领', '宝妈带娃党', '潮流极客', '退休生活家', '小镇青年'],
  SORA_LIGHTING: ['电影级全局光', '赛博霓虹', '清晨柔光', '黄金时刻', '朋克高反差', '梦幻焦外'],
  CLOTHING_OCCASIONS: ['职场通勤', '周末约会', '派对聚会', '户外运动', '居家舒适', '正式晚宴']
};

export const PAINTING_TOOLS: PaintingTool[] = [
  // 新收录置顶工具
  { id: 'digen_ai', name: 'Digen AI', description: '下一代 AI 视频生成，支持 Sora 级物理特性与超长 15s+ 连贯生成。', icon: '⚡', url: 'https://digen.ai/sora?replicate=1766758415386391147_493ecb63-c4d1-4e1a-8f86-9dfa4a720539&seconds=15', tag: '2026 · 旗舰', category: 'video', isNew: true, isLatest: true },

  // 图像工具 (12)
  { id: 'mj_1', name: 'Midjourney', description: '全球顶尖 AI 艺术生成引擎，5.0 质感。', icon: '⛵', url: 'https://www.midjourney.com/', tag: '国外 · 顶流', category: 'image', isNew: true },
  { id: 'jm_1', name: '即梦 AI', description: '字节出品，国内最强 AI 绘画与视频生成。', icon: '🌈', url: 'https://jimeng.jianying.com/', tag: '国内 · 顶流', category: 'image', isNew: true },
  { id: 'sd_1', name: 'Stable Diffusion', description: '开源 AI 绘画基石，支持深度自定义。', icon: '🎨', url: 'https://stablediffusionweb.com/', tag: '开源 · 极客', category: 'image' },
  { id: 'flux_1', name: 'FLUX.1', description: '黑马级开源模型，文字生成能力极强。', icon: '🔥', url: 'https://fluxai.com/', tag: '国外 · 黑马', category: 'image', isNew: true },
  { id: 'dalle_3', name: 'DALL-E 3', description: 'OpenAI 出品，语义理解极其精准。', icon: '🖼️', url: 'https://openai.com/dall-e-3', tag: '国外 · 顶流', category: 'image' },
  { id: 'leo_ai', name: 'Leonardo.ai', description: '功能全能的 AI 创作平台，模型库丰富。', icon: '🦁', url: 'https://leonardo.ai/', tag: '国外 · 推荐', category: 'image' },
  { id: 'krea_ai', name: 'Krea.ai', description: '实时生成 AI，设计灵感捕捉利器。', icon: '🖌️', url: 'https://www.krea.ai/', tag: '国外 · 实时', category: 'image' },
  { id: 'ideo_1', name: 'Ideogram', description: '平面设计与文字排版 AI 专家。', icon: '🅰️', url: 'https://ideogram.ai/', tag: '国外 · 设计', category: 'image' },
  { id: 'mag_ai', name: 'Magnific.ai', description: '目前最强的 AI 图像高清放大与细节重构。', icon: '🔍', url: 'https://magnific.ai/', tag: '国外 · 神器', category: 'image' },
  { id: 'clip_drop', name: 'ClipDrop', description: 'Adobe 收购的 AI 设计工具集。', icon: '✂️', url: 'https://clipdrop.co/', tag: '国外 · 全能', category: 'image' },
  { id: 'firefly', name: 'Adobe Firefly', description: 'Adobe 原生 AI，无缝衔接 PS。', icon: '🧚', url: 'https://www.adobe.com/firefly', tag: '国外 · 商业', category: 'image' },
  { id: 'canva_ai', name: 'Canva AI', description: '小白也能用的在线设计 AI 工具。', icon: '🎨', url: 'https://www.canva.com/ai-image-generator/', tag: '国外 · 易用', category: 'image' },

  // 视频工具 (10)
  { id: 'sora_1', name: 'OpenAI Sora', description: '划时代的视频生成大模型，分钟级长视频。', icon: '🎥', url: 'https://openai.com/sora', tag: '国外 · 顶流', category: 'video', isNew: true },
  { id: 'kling_1', name: '可灵 AI', description: '快手出品，国内视频生成巅峰之作。', icon: '🎬', url: 'https://klingai.kuaishou.com/', tag: '国内 · 顶流', category: 'video', isNew: true },
  { id: 'luma_1', name: 'Luma Dream', description: '好莱坞级写实视频生成，动态极其自然。', icon: '🌟', url: 'https://lumalabs.ai/dream-machine', tag: '国外 · 爆款', category: 'video', isNew: true },
  { id: 'runway_3', name: 'Runway Gen-3', description: '视频 AI 领跑者，极其强大的控制力。', icon: '🎭', url: 'https://runwayml.com/', tag: '国外 · 专业', category: 'video' },
  { id: 'pika_1', name: 'Pika Art', description: '动画级视频生成，风格化处理神器。', icon: '🦊', url: 'https://pika.art/', tag: '国外 · 推荐', category: 'video' },
  { id: 'heygen', name: 'HeyGen', description: '数字人分身，视频翻译与口型对齐。', icon: '👤', url: 'https://www.heygen.com/', tag: '国外 · 数字人', category: 'video' },
  { id: 'hailuo', name: '海螺 AI', description: 'MiniMax 出品，视频动态极富戏剧性。', icon: '🐚', url: 'https://www.hailuo.ai/', tag: '国内 · 黑马', category: 'video', isNew: true },
  { id: 'vidu_1', name: 'Vidu', description: '生数科技出品，原生视频大模型。', icon: '📺', url: 'https://www.vidu.ai/', tag: '国内 · 实力', category: 'video' },
  { id: 'synthesia', name: 'Synthesia', description: '企业级 AI 视频生成，一键做课程。', icon: '🎙️', url: 'https://www.synthesia.io/', tag: '国外 · 商务', category: 'video' },
  { id: 'sora_pro', name: 'Sora 2.0', description: '下一代视频交互，支持物理世界模拟。', icon: '🚀', url: 'https://openai.com/sora', tag: '2026 · 旗舰', category: 'video', isNew: true },

  // 聊天与大模型 (10)
  { id: 'gpt_4', name: 'ChatGPT-5', description: 'OpenAI 旗舰模型，全能逻辑王者。', icon: '🤖', url: 'https://chatgpt.com/', tag: '国外 · 巅峰', category: 'chat', isNew: true },
  { id: 'claude_3', name: 'Claude 3.5', description: '极其接近人类思维，代码与写作首选。', icon: '🧠', url: 'https://claude.ai/', tag: '国外 · 推荐', category: 'chat', isNew: true },
  { id: 'gemini_2', name: 'Gemini 2.0', description: '谷歌原生多模态，超长上下文支持。', icon: '♊', url: 'https://gemini.google.com/', tag: '国外 · 谷歌', category: 'chat', isNew: true },
  { id: 'deep_seek', name: 'DeepSeek R1', description: '国产之光，推理能力对标 GPT-4o。', icon: '🐋', url: 'https://www.deepseek.com/', tag: '国内 · 顶流', category: 'chat', isNew: true },
  { id: 'kimi_1', name: 'Kimi 智能助手', description: '超长文档分析神器，支持 200w 字输入。', icon: '🌙', url: 'https://kimi.moonshot.cn/', tag: '国内 · 商务', category: 'chat' },
  { id: 'wenxin', name: '文心一言 5.0', description: '百度出品，最懂中国文化的 AI。', icon: '🐻', url: 'https://yiyan.baidu.com/', tag: '国内 · 百度', category: 'chat' },
  { id: 'tongyi', name: '通义千问', description: '阿里出品，办公与开发全能助手。', icon: '☁️', url: 'https://tongyi.aliyun.com/', tag: '国内 · 阿里', category: 'chat' },
  { id: 'perplexity', name: 'Perplexity', description: 'AI 搜索之王，提供精准来源。', icon: '🌐', url: 'https://www.perplexity.ai/', tag: '国外 · 搜索', category: 'chat' },
  { id: 'grok_1', name: 'Grok-2', description: '马斯克出品，主打真实与幽默。', icon: '✖️', url: 'https://x.ai/', tag: '国外 · 社交', category: 'chat' },
  { id: 'mistral', name: 'Mistral Large', description: '欧洲最强开源大模型。', icon: '🥨', url: 'https://mistral.ai/', tag: '开源 · 欧洲', category: 'chat' },

  // 编程工具 (8)
  { id: 'cursor', name: 'Cursor', description: '2026 程序员人手一个的 AI 编辑器。', icon: '🖱️', url: 'https://cursor.com/', tag: '国外 · 顶流', category: 'coding', isNew: true },
  { id: 'github_copilot', name: 'GitHub Copilot', description: '老牌编程助手，极其稳定。', icon: '🐙', url: 'https://github.com/features/copilot', tag: '国外 · 标配', category: 'coding' },
  { id: 'replit', name: 'Replit Agent', description: '一句话完成全栈开发与部署。', icon: '🌀', url: 'https://replit.com/', tag: '国外 · 神器', category: 'coding', isNew: true },
  { id: 'marscode', name: 'MarsCode', description: '字节出品，云端编程 AI 专家。', icon: '🔴', url: 'https://www.marscode.cn/', tag: '国内 · 顶流', category: 'coding' },
  { id: 'windsurf', name: 'Windsurf', description: '下一代 AI 协作编程引擎。', icon: '🏄', url: 'https://codeium.com/windsurf', tag: '国外 · 黑马', category: 'coding', isNew: true },
  { id: 'codeium', name: 'Codeium', description: '永久免费的个人编程助手。', icon: '⚡', url: 'https://codeium.com/', tag: '国外 · 免费', category: 'coding' },
  { id: 'baichuan_code', name: '百川代码', description: '国产高性能编程专用模型。', icon: '🌊', url: 'https://www.baichuan-ai.com/', tag: '国内 · 推荐', category: 'coding' },
  { id: 'v0_dev', name: 'V0.dev', description: 'Vercel 出品，一句话生成前端 UI。', icon: '0️⃣', url: 'https://v0.dev/', tag: '国外 · UI', category: 'coding' },

  // 办公与设计 (10)
  { id: 'gamma', name: 'Gamma', description: 'PPT 终结者，一键生成幻灯片。', icon: '📐', url: 'https://gamma.app/', tag: '国外 · 办公', category: 'office' },
  { id: 'notion_ai', name: 'Notion AI', description: '笔记与协作的 AI 终极形态。', icon: '📓', url: 'https://www.notion.so/', tag: '国外 · 办公', category: 'office' },
  { id: 'tome_app', name: 'Tome', description: '生成式演示文稿，视觉效果惊艳。', icon: '📖', url: 'https://tome.app/', tag: '国外 · 创意', category: 'office' },
  { id: 'wps_ai', name: 'WPS AI', description: '国产办公软件的 AI 觉醒。', icon: '📝', url: 'https://ai.wps.cn/', tag: '国内 · 办公', category: 'office' },
  { id: 'figma_ai', name: 'Figma AI', description: '设计师的 AI 助手，自动生成 UI。', icon: '🎨', url: 'https://www.figma.com/ai/', tag: '国外 · 设计', category: 'design' },
  { id: 'framer_ai', name: 'Framer AI', description: '一句话生成完整响应式网站。', icon: '🖼️', url: 'https://www.framer.com/', tag: '国外 · 网站', category: 'design' },
  { id: 'chat_pdf', name: 'ChatPDF', description: '与任何 PDF 文档进行对话。', icon: '📄', url: 'https://www.chatpdf.com/', tag: '国外 · 工具', category: 'office' },
  { id: 'monica_ai', name: 'Monica', description: '浏览器全能侧边栏 AI 插件。', icon: '👩', url: 'https://monica.im/', tag: '国外 · 插件', category: 'office' },
  { id: 'galilio', name: 'Galilio AI', description: '文本生成可交互的 UI 设计图。', icon: '🌌', url: 'https://www.usegalileo.ai/', tag: '国外 · 设计', category: 'design' },
  { id: 'uizard', name: 'UIzard', description: '手绘草图秒变高保真 UI。', icon: '🧙', url: 'https://uizard.io/', tag: '国外 · 设计', category: 'design' },

  // 音频与搜索 (8)
  { id: 'suno_3', name: 'Suno V4', description: 'AI 音乐巅峰，320kbps 录音室音质。', icon: '🎵', url: 'https://suno.com/', tag: '国外 · 音乐', category: 'audio', isNew: true },
  { id: 'udio_1', name: 'Udio', description: '极其写实的 AI 编曲与演唱。', icon: '🎹', url: 'https://www.udio.com/', tag: '国外 · 音乐', category: 'audio', isNew: true },
  { id: 'elevenlabs', name: 'ElevenLabs', description: '目前全球最像真人的语音合成。', icon: '🗣️', url: 'https://elevenlabs.io/', tag: '国外 · 配音', category: 'audio' },
  { id: 'adobe_podcast', name: 'Adobe Podcast', description: '手机录音秒变专业电台效果。', icon: '🎙️', url: 'https://podcast.adobe.com/', tag: '国外 · 修音', category: 'audio' },
  { id: 'genspark', name: 'Genspark', description: '自动生成定制化的 AI 搜索引擎。', icon: '⚡', url: 'https://www.genspark.ai/', tag: '国外 · 搜索', category: 'search' },
  { id: 'felo_search', name: 'Felo 搜索', description: '跨语言 AI 搜索，支持多国文献。', icon: '🔍', url: 'https://felo.ai/', tag: '国内 · 搜索', category: 'search' },
  { id: 'search_gpt', name: 'SearchGPT', description: 'OpenAI 原生 AI 搜索。', icon: '🔎', url: 'https://openai.com/index/searchgpt/', tag: '国外 · 搜索', category: 'search', isNew: true },
  { id: 'music_lm', name: 'MusicLM', description: '谷歌出品，文字描述生成环境音乐。', icon: '🎶', url: 'https://aitestkitchen.withgoogle.com/', tag: '国外 · 谷歌', category: 'audio' },

  // 学习、开发与平台 (10)
  { id: 'hf_hub', name: 'Hugging Face', description: 'AI 界的 GitHub，模型与数据集宝库。', icon: '🤗', url: 'https://huggingface.co/', tag: '国外 · 平台', category: 'dev' },
  { id: 'civ_ai', name: 'Civitai', description: 'SD 模型下载与交流首选社区。', icon: '💠', url: 'https://civitai.com/', tag: '国外 · 社区', category: 'dev' },
  { id: 'dify_ai', name: 'Dify', description: '最流行的 LLM 应用开发平台。', icon: '🚀', url: 'https://dify.ai/', tag: '开源 · 开发', category: 'dev' },
  { id: 'coze_cn', name: 'Coze 扣子', description: '字节出品，低代码构建 AI 智能体。', icon: '🧶', url: 'https://www.coze.cn/', tag: '国内 · 顶流', category: 'agent' },
  { id: 'gpts_store', name: 'GPTs Store', description: 'OpenAI 官方插件商店。', icon: '🏬', url: 'https://chatgpt.com/gpts', tag: '国外 · 商店', category: 'agent' },
  { id: 'quizlet_ai', name: 'Quizlet AI', description: 'AI 驱动的学习卡片与备考工具。', icon: '🎓', url: 'https://quizlet.com/', tag: '国外 · 学习', category: 'study' },
  { id: 'khanmigo', name: 'Khanmigo', description: '可汗学院出品，一对一 AI 导师。', icon: '🏫', url: 'https://www.khanacademy.org/khanmigo', tag: '国外 · 学习', category: 'study' },
  { id: 'open_compass', name: 'OpenCompass', description: '国产大模型权威评测榜单。', icon: '🧭', url: 'https://opencompass.org.cn/', tag: '国内 · 评测', category: 'eval' },
  { id: 'gpt_zero', name: 'GPTZero', description: '权威的 AI 生成内容检测工具。', icon: '🛡️', url: 'https://gptzero.me/', tag: '国外 · 检测', category: 'detect' },
  { id: 'prompt_hero', name: 'PromptHero', description: '全球最大的 AI 绘图指令搜索站。', icon: '🦸', url: 'https://prompthero.com/', tag: '国外 · 提示词', category: 'prompt' }
];

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'cover_red_1', name: '小红书-多巴胺', category: '爆款封面', description: '高饱和度配色，Y2K酸性风格' },
  { id: 'cover_red_2', name: '小红书-极简白', category: '爆款封面', description: '纯白背景，高级留白' },
  { id: 'horse_1', name: '马年-剪纸红', category: '马年限定', description: '中国传统剪纸，镂空窗花' },
  { id: 'christmas_full', name: '圣诞-全家桶', category: '圣诞限定', description: '节日氛围，圆润可爱。' }
];

export const CLOTHING_SCENES = [
  { id: 'elevator', name: '金属感电梯', category: '室内' },
  { id: 'gallery', name: '艺术展厅', category: '室内' },
  { id: 'street', name: '外景商业街', category: '室外' },
  { id: 'cafe', name: '北欧风咖啡馆', category: '室内' },
  { id: 'library', name: '复古图书馆', category: '室内' }
];

const generateItems = () => {
  const items = [];
  for (let i = 1; i <= 20; i++) {
    items.push({ id: `F_${i}`, category: '女模特', name: `爆款系列 ${i}`, url: `https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=500&h=750&q=90` });
  }
  return items;
};
export const FITTING_ROOM_ITEMS = generateItems();

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  { id: 'wp_horse_1', name: '2026 灵动马', prompt: '2026 Year of the Horse, majestic spirit horse running, red background, hyper-realistic, 8k --ar 9:16' }
];
