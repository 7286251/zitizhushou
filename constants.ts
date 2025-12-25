
import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const APP_NOTICES = [
  "💎 [新拟态上线] 全站视觉升级为极简新拟态风格，光影流转，触手可及。",
  "🚀 [工具库补全] 已恢复 68+ 顶级 AI 工具节点，覆盖全球最前沿创作能力。",
  "🎨 [极速反推] 艺术字引擎支持最新的 Midjourney v7 提示词逻辑架构。",
  "🔥 [马年限定] 2026 纪元礼包已在“新年壁纸”模块开放领取。"
];

export const CLOTHING_SCENES = [
  { id: 'elevator', name: '金属感电梯', category: '室内' },
  { id: 'gallery', name: '艺术展厅', category: '室内' },
  { id: 'street', name: '外景商业街', category: '室外' }
];

export const PAINTING_TOOLS: PaintingTool[] = [
    // 1-10
    { id: 'mj_1', name: 'Midjourney', description: '全球最顶尖的 AI 艺术生成引擎。', icon: '⛵', url: 'https://www.midjourney.com/', tag: '国外 · 顶流', category: 'drawing' },
    { id: 'kl_app', name: '可灵 Kling AI', description: '目前最强的国产 AI 视频生成平台。', icon: '📱', url: 'https://app.klingai.com/cn/', tag: '国内 · 顶流', category: 'video' },
    { id: 'jm_1', name: '即梦 AI', description: '字节跳动出品的顶尖 AI 创作。', icon: '🌈', url: 'https://jimeng.jianying.com/', tag: '国内 · 顶流', category: 'domestic' },
    { id: 'heygen_ai', name: 'HeyGen', description: '全球领先的 AI 虚拟人视频生成平台。', icon: '👤', url: 'https://app.heygen.com/', tag: '国外 · 视频', category: 'video' },
    { id: 'runway_gen3', name: 'Runway Gen-3', description: '电影级 AI 视频生成工具。', icon: '🎬', url: 'https://runwayml.com/', tag: '国外 · 专业', category: 'video' },
    { id: 'luma_dream', name: 'Luma Dream', description: '高写实度的 3D 视频生成。', icon: '🕯️', url: 'https://lumalabs.ai/dream-machine', tag: '国外 · 3D', category: 'video' },
    { id: 'pika_art', name: 'Pika Art', description: '极具创意的 AI 视频动画生成。', icon: '🐰', url: 'https://pika.art/', tag: '国外 · 动画', category: 'video' },
    { id: 'krea_1', name: 'Krea AI', description: '最强实时 AI 生成与高清放大。', icon: '⚡', url: 'https://www.krea.ai/', tag: '国外 · 实时', category: 'video' },
    { id: 'hailuo_ai', name: '海螺 AI', description: 'MiniMax 出品的通用大模型助手。', icon: '🐚', url: 'https://hailuoai.com/', tag: '国内 · 全能', category: 'video' },
    { id: 'tencent_admuse', name: '腾讯 AdMuse', description: '腾讯专业级创意内容生产平台。', icon: '🏮', url: 'https://admuse.qq.com/', tag: '国内 · 腾讯', category: 'domestic' },
    // 11-20
    { id: 'pippit_ai', name: 'Pippit AI', description: '专业的电商产品图 AI 生成器。', icon: '🛍️', url: 'https://www.pippit.ai/', tag: '国外 · 电商', category: 'utility', isNew: true },
    { id: 'fengniao_ai', name: '蜂鸟 AI', description: '国产专业电商图像解决方案。', icon: '🐝', url: 'https://fengniaoai.com/', tag: '国内 · 推荐', category: 'domestic', isNew: true },
    { id: 'psai_cn', name: 'PS AI 助手', description: '适配 Photoshop 的 AI 创意插件。', icon: '🪄', url: 'https://psai.cn/', tag: '国内 · 设计', category: 'utility' },
    { id: 'chatglm_ai', name: '智谱清言', description: '智谱 AI 旗下的强大智能助手。', icon: '💬', url: 'https://chatglm.cn/', tag: '国内 · 智谱', category: 'model' },
    { id: 'whee_1', name: 'Whee 美图 AI', description: '美图出品的高端 AI 视觉创作平台。', icon: '✨', url: 'https://www.whee.com/', tag: '国内 · 推荐', category: 'drawing' },
    { id: 'sd_1', name: 'Stable Diffusion', description: '开源 AI 绘画领域的基石。', icon: '🎨', url: 'https://stabledifffusion.com/', tag: '国外 · 极客', category: 'drawing' },
    { id: 'cv_1', name: 'Civitai', description: '全球最大的 AI 绘画模型社区。', icon: '🕍', url: 'https://civitai.com/', tag: '国外 · 模型', category: 'drawing' },
    { id: 'ts_1', name: '吐司 TusiArt', description: '国内领先的模型分享平台。', icon: '🍞', url: 'https://tusiart.com/', tag: '国内 · 模型', category: 'drawing' },
    { id: 'ty_1', name: '通义万相', description: '阿里出品的 Sora 级视频生成。', icon: '🐘', url: 'https://tongyi.aliyun.com/wan', tag: '国内 · 阿里', category: 'domestic' },
    { id: 'baichuan_ai', name: '百川智能', description: '王小川创办的顶级中文大模型。', icon: '🌊', url: 'https://www.baichuan-ai.com/', tag: '国内 · 顶级', category: 'model' },
    // 21-40 (省略部分详细描述以保证 68 个展示)
    { id: 'flux_ai', name: 'FLUX.1', description: '目前最强的开源图像模型。', icon: '🔥', url: 'https://flux.ai/', tag: '国外 · 黑马', category: 'drawing' },
    { id: 'magnific_ai', name: 'Magnific AI', description: '极致细节的 AI 图像放大。', icon: '🔍', url: 'https://magnific.ai/', tag: '国外 · 收费', category: 'utility' },
    { id: 'framer_ai', name: 'Framer AI', description: 'AI 一键生成精美网页。', icon: '🖥️', url: 'https://www.framer.com/', tag: '国外 · 设计', category: 'utility' },
    { id: 'gamma_app', name: 'Gamma', description: 'AI 生成幻灯片 PPT 的神器。', icon: '📊', url: 'https://gamma.app/', tag: '国外 · 办公', category: 'utility' },
    { id: 'canva_ai', name: 'Canva AI', description: '在线设计平台的 AI 魔法套件。', icon: '🖌️', url: 'https://www.canva.com/', tag: '国外 · 全能', category: 'utility' },
    { id: 'leonardo_ai', name: 'Leonardo', description: '全能型 AI 艺术创作工作站。', icon: '🦁', url: 'https://leonardo.ai/', tag: '国外 · 推荐', category: 'drawing' },
    { id: 'perplexity', name: 'Perplexity', description: 'AI 驱动的新型搜索引擎。', icon: '🧠', url: 'https://www.perplexity.ai/', tag: '国外 · 搜索', category: 'utility' },
    { id: 'claude_ai', name: 'Claude 3.5', description: '地表最强逻辑推理大模型。', icon: '🤖', url: 'https://claude.ai/', tag: '国外 · 顶流', category: 'model' },
    { id: 'chatgpt_o1', name: 'ChatGPT o1', description: 'OpenAI 逻辑增强版模型。', icon: '🗨️', url: 'https://chatgpt.com/', tag: '国外 · 始祖', category: 'model' },
    { id: 'kimi_ai', name: 'Kimi 智能助手', description: '超长文本分析专家。', icon: '🌙', url: 'https://kimi.moonshot.cn/', tag: '国内 · 爆款', category: 'model' },
    { id: 'deepseek_ai', name: 'DeepSeek', description: '国产良心深度求索模型。', icon: '🐳', url: 'https://www.deepseek.com/', tag: '国内 · 极客', category: 'model' },
    { id: 'v0_dev', name: 'v0.dev', description: 'Vercel 出品的 AI 前端生成。', icon: '▲', url: 'https://v0.dev/', tag: '国外 · 编程', category: 'utility' },
    { id: 'cursor_ai', name: 'Cursor', description: 'AI 时代的编程编辑器。', icon: '⌨️', url: 'https://www.cursor.com/', tag: '国外 · 编程', category: 'utility' },
    { id: 'udio_ai', name: 'Udio', description: '目前最强的 AI 音乐生成。', icon: '🎵', url: 'https://www.udio.com/', tag: '国外 · 音乐', category: 'utility' },
    { id: 'suno_ai', name: 'Suno', description: 'AI 编曲与歌曲创作先驱。', icon: '🎸', url: 'https://suno.com/', tag: '国外 · 音乐', category: 'utility' },
    { id: 'elevenlabs', name: 'ElevenLabs', description: '最真实的 AI 语音合成。', icon: '🗣️', url: 'https://elevenlabs.io/', tag: '国外 · 语音', category: 'utility' },
    { id: 'viggle_ai', name: 'Viggle AI', description: '视频角色动作替换。', icon: '🕺', url: 'https://viggle.ai/', tag: '国外 · 爆款', category: 'video' },
    { id: 'vidnoz_ai', name: 'Vidnoz', description: '快速生成口播视频。', icon: '🎥', url: 'https://www.vidnoz.com/', tag: '国外 · 营销', category: 'video' },
    { id: 'domo_ai', name: 'Domo AI', description: '动漫风格视频转换。', icon: '⛩️', url: 'https://domoai.app/', tag: '国外 · 动漫', category: 'video' },
    { id: 'hedra_ai', name: 'Hedra', description: '极致的视频口型同步。', icon: '👄', url: 'https://www.hedra.com/', tag: '国外 · 新锐', category: 'video' },
    // 41-68
    { id: 'polotno', name: 'Polotno', description: '低门槛设计编辑器。', icon: '📐', url: 'https://studio.polotno.com/', tag: '国外 · 设计', category: 'utility' },
    { id: 'vectorizer_ai', name: 'Vectorizer AI', description: '位图转高清矢量图。', icon: '♾️', url: 'https://vectorizer.ai/', tag: '国外 · 实用', category: 'utility' },
    { id: 'upscale_media', name: 'Upscale.media', description: '免费的图片高清放大。', icon: '🖼️', url: 'https://www.upscale.media/', tag: '国外 · 免费', category: 'utility' },
    { id: 'remove_bg', name: 'Remove.bg', description: '老牌抠图神器。', icon: '✂️', url: 'https://www.remove.bg/', tag: '国外 · 经典', category: 'utility' },
    { id: 'clipdrop_ai', name: 'ClipDrop', description: '多功能图像处理套件。', icon: '🖇️', url: 'https://clipdrop.co/', tag: '国外 · 推荐', category: 'utility' },
    { id: 'insmind', name: 'Insmind', description: '电商设计的 AI 全能王。', icon: '💎', url: 'https://www.insmind.com/', tag: '国际 · 电商', category: 'utility' },
    { id: 'photoroom_ai', name: 'PhotoRoom', description: '手机端最强抠图与商拍。', icon: '📸', url: 'https://www.photoroom.com/', tag: '国际 · 移动', category: 'utility' },
    { id: 'midjourney_web', name: 'MJ Web 版', description: 'Midjourney 网页操作界面。', icon: '⛵', url: 'https://alpha.midjourney.com/', tag: '国外 · 顶流', category: 'drawing' },
    { id: 'recraft_ai', name: 'Recraft', description: '矢量图与插画专家。', icon: '✒️', url: 'https://www.recraft.ai/', tag: '国外 · 矢量', category: 'drawing' },
    { id: 'playground_ai', name: 'Playground', description: '海量免费生成额度。', icon: '🎡', url: 'https://playground.com/', tag: '国外 · 社区', category: 'drawing' },
    { id: 'tensor_art', name: 'Tensor.art', description: '国产全球化模型社区。', icon: '📡', url: 'https://tensor.art/', tag: '国内 · 出海', category: 'drawing' },
    { id: 'liblib_art', name: 'Liblib 哩布哩布', description: '国内最火的模型社区。', icon: '👺', url: 'https://www.liblib.art/', tag: '国内 · 顶流', category: 'drawing' },
    { id: 'zhinao_ai', name: '360 智脑', description: '360 出品的大模型。', icon: '⭕', url: 'https://zhinao.360.com/', tag: '国内 · 360', category: 'model' },
    { id: 'spark_ai', name: '讯飞星火', description: '科大讯飞旗舰大模型。', icon: '🔥', url: 'https://xinghuo.xfyun.cn/', tag: '国内 · 讯飞', category: 'model' },
    { id: 'ernie_bot', name: '文心一言', description: '百度老牌 AI 助手。', icon: '🐾', url: 'https://yiyan.baidu.com/', tag: '国内 · 百度', category: 'model' },
    { id: 'doubao_app', name: '豆包', description: '字节跳动全民 AI 助手。', icon: '📦', url: 'https://www.doubao.com/', tag: '国内 · 字节', category: 'model' },
    { id: 'metaso_ai', name: '秘塔 AI 搜索', description: '学术与深度搜索专家。', icon: '🔍', url: 'https://metaso.cn/', tag: '国内 · 爆款', category: 'utility' },
    { id: 'wolai_ai', name: 'Wolai AI', description: '协同办公与笔记专家。', icon: '📝', url: 'https://www.wolai.com/', tag: '国内 · 协同', category: 'utility' },
    { id: 'fliki_ai', name: 'Fliki', description: '文字转视频脚本利器。', icon: '🎙️', url: 'https://fliki.ai/', tag: '国外 · 自动化', category: 'video' },
    { id: 'invideo_ai', name: 'InVideo', description: '专业级在线视频编辑。', icon: '📼', url: 'https://invideo.io/', tag: '国外 · 专业', category: 'video' },
    { id: 'kaiber_ai', name: 'Kaiber', description: '视觉艺术级视频生成。', icon: '🎹', url: 'https://kaiber.ai/', tag: '国外 · 艺术', category: 'video' },
    { id: 'pixverse_ai', name: 'PixVerse', description: '高清动态视频生成。', icon: '🎞️', url: 'https://pixverse.ai/', tag: '国内 · 出海', category: 'video' },
    { id: 'mochi_1', name: 'Mochi 1', description: '极速、开源视频模型。', icon: '🍡', url: 'https://www.genmo.ai/', tag: '国外 · 开源', category: 'video' },
    { id: 'fal_ai', name: 'Fal.ai', description: '极速工作流部署。', icon: '🌩️', url: 'https://fal.ai/', tag: '国外 · 开发', category: 'utility' },
    { id: 'comfyui_cloud', name: 'ComfyUI 云端', description: '高度自由的工作流云端。', icon: '🧶', url: 'https://comfyanimate.com/', tag: '国外 · 极客', category: 'drawing' },
    { id: 'sky_box', name: 'Skybox AI', description: '生成 360 度全景空间。', icon: '🌐', url: 'https://blockadelabs.com/', tag: '国外 · 空间', category: 'drawing' },
    { id: 'magic_eraser', name: 'Magic Eraser', description: '一键擦除图片杂物。', icon: '🧽', url: 'https://www.magiceraser.io/', tag: '国外 · 免费', category: 'utility' },
    { id: 'watermark_rem', name: '去水印大师', description: '智能去除各类图像水印。', icon: '💧', url: 'https://watermarkremover.io/', tag: '国外 · 实用', category: 'utility' }
];

export const THEME_CONFIG: Record<AppTheme, {
  name: string;
  bgClass: string;
  cardClass: string;
  textClass: string;
  buttonClass: string;
  accentColor: string;
  titleEffect: string;
  icon: string;
}> = {
  [AppTheme.NEUMORPHISM]: {
    name: '极简新拟态',
    icon: '🔘',
    bgClass: 'bg-[#e0e5ec]',
    cardClass: 'bg-[#e0e5ec] border-none rounded-[3rem] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] relative',
    textClass: 'text-[#44474b] font-black tracking-tighter',
    buttonClass: 'bg-[#e0e5ec] text-[#44474b] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_4px_4px_8px_#bebebe,inset_-4px_-4px_8px_#ffffff] transition-all active:scale-95 border-none',
    accentColor: 'text-[#44474b]',
    titleEffect: 'drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]',
  },
  [AppTheme.NEW_YEAR_2026]: {
    name: '2026 马年赤金',
    icon: '🧨',
    bgClass: 'bg-[#0a0a0c]',
    cardClass: 'bg-[#121216]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 relative',
    textClass: 'text-white font-bold tracking-tight',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] border-none transition-all active:scale-95',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400',
    titleEffect: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]',
  },
  [AppTheme.CHRISTMAS_FESTIVAL]: {
    name: '圣诞奇幻夜',
    icon: '🎄',
    bgClass: 'bg-[#0a2e1f]',
    cardClass: 'bg-white/95 backdrop-blur-3xl border-[4px] border-[#c5a059] rounded-[2rem] shadow-[0_0_50px_rgba(197,160,89,0.3)] relative ring-0',
    textClass: 'text-[#5c0a0a] font-black',
    buttonClass: 'bg-gradient-to-r from-[#c5a059] via-[#f7e4b5] to-[#c5a059] text-[#4a3710] rounded-xl font-black border-2 border-[#4a3710]/20 hover:scale-105 transition-all shadow-[0_4px_15px_rgba(197,160,89,0.4)]',
    accentColor: 'text-[#2d5a27]',
    titleEffect: 'drop-shadow-[2px_2px_0px_#f7e4b5]',
  },
  [AppTheme.RETRO_DESKTOP]: {
    name: '复古工作站',
    icon: '💻',
    bgClass: 'bg-slate-100',
    cardClass: 'bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_rgba(0,0,0,1)] ring-0',
    textClass: 'text-black font-mono font-bold',
    buttonClass: 'bg-black text-white rounded-none hover:bg-gray-800 border-none transition-all',
    accentColor: 'text-black underline decoration-blue-500 decoration-4',
    titleEffect: 'uppercase italic',
  },
  [AppTheme.PINK_PLUSH]: {
    name: '粉红毛绒',
    icon: '🎀',
    bgClass: 'bg-pink-50',
    cardClass: 'bg-white/80 backdrop-blur-md border-4 border-pink-200 rounded-[3rem] shadow-[0_20px_40px_rgba(244,114,182,0.2)] ring-1 ring-white/50',
    textClass: 'text-pink-600 font-bold',
    buttonClass: 'bg-pink-500 text-white rounded-full hover:bg-pink-600 border-none shadow-md transition-all',
    accentColor: 'text-pink-400',
    titleEffect: 'drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]',
  },
  [AppTheme.DOPAMINE]: {
    name: '快乐多巴胺',
    icon: '🍭',
    bgClass: 'bg-yellow-400',
    cardClass: 'bg-white border-8 border-purple-500 rounded-[2.5rem] shadow-2xl transform rotate-1 ring-0',
    textClass: 'text-purple-600 font-black italic',
    buttonClass: 'bg-green-400 text-black rounded-xl hover:bg-green-500 border-4 border-black font-black transition-all',
    accentColor: 'text-blue-500',
    titleEffect: 'tracking-tighter',
  },
  [AppTheme.NEO_BRUTALISM]: {
    name: '新面孔主义',
    icon: '🗿',
    bgClass: 'bg-white',
    cardClass: 'bg-yellow-300 border-[6px] border-black rounded-none shadow-[12px_12px_0px_rgba(0,0,0,1)] ring-0',
    textClass: 'text-black font-black uppercase',
    buttonClass: 'bg-blue-500 text-white border-[4px] border-black rounded-none hover:-translate-y-1 hover:translate-x-1 transition-transform',
    accentColor: 'text-black bg-white px-2',
    titleEffect: 'skew-x-[-10deg]',
  },
  [AppTheme.DARK_GRADIENT]: {
    name: '深空渐变',
    icon: '🌌',
    bgClass: 'bg-slate-950',
    cardClass: 'bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl ring-1 ring-white/5',
    textClass: 'text-white font-light tracking-widest',
    buttonClass: 'bg-white text-black rounded-lg hover:bg-gray-200 transition-colors',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    titleEffect: 'drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]',
  },
  [AppTheme.CARTOON_HORSE_RED]: {
    name: '波普马年红',
    icon: '🐴',
    bgClass: 'bg-red-600',
    cardClass: 'bg-white border-[10px] border-black rounded-none shadow-[20px_20px_0px_rgba(0,0,0,1)] relative overflow-hidden ring-0',
    textClass: 'text-black font-black italic text-2xl',
    buttonClass: 'bg-yellow-400 text-black border-[5px] border-black rounded-none font-black hover:scale-105 transition-transform',
    accentColor: 'text-red-600',
    titleEffect: 'drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]',
  }
};

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'cover_red_1', name: '小红书-多巴胺', category: '爆款封面', description: '高饱和度配色，Y2K酸性风格' },
  { id: 'cover_red_2', name: '小红书-极简白', category: '爆款封面', description: '纯白背景，高级留白' },
  { id: 'horse_1', name: '马年-剪纸红', category: '马年限定', description: '中国传统剪纸，镂空窗花' },
  { id: 'horse_2', name: '马年-鎏金宝马', category: '马年限定', description: '纯金雕塑，富贵逼人' },
  { id: 'christmas_1', name: '圣诞-拐杖糖', category: '圣诞限定', description: '充满节日氛围，字形圆润可爱，带有拐杖糖条纹、雪花纹理、金色闪光粒子。' }
];

const generateItems = () => {
  const items = [];
  const idPools: Record<string, string[]> = {
    '女模特': ['1551488831-00ddcb6c6bd3', '1560362614489-0fa7741ad462'],
    '软萌幼童': ['1519278470623-f2479e950bc4', '1522771930-08731390f70b']
  };
  const categories = [{ name: '女模特', count: 50, prefix: 'F' }, { name: '软萌幼童', count: 30, prefix: 'C' }];
  categories.forEach(cat => {
    const ids = idPools[cat.name] || idPools['女模特'];
    for (let i = 1; i <= cat.count; i++) {
      const baseId = ids[i % ids.length];
      items.push({ id: `${cat.prefix}_${i}`, category: cat.name, name: `爆款系列 ${i}`, url: `https://images.unsplash.com/photo-${baseId}?auto=format&fit=crop&w=500&h=750&q=90` });
    }
  });
  return items;
};
export const FITTING_ROOM_ITEMS = generateItems();

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  { id: 'wp_horse_1', name: '2026 鎏金宝马', prompt: '2026 Year of the Horse, golden horse sculpture, red background, 8k --ar 9:16' }
];
