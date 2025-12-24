
import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const APP_NOTICES = [
  "🌟 [库容爆炸] 工具箱已完成 1000+ 真实工具补完，涵盖所有主流与小众 AI 领域！",
  "🎙️ [配音秀] 实时更新 100+ 顶级配音/变声/音效处理工具，创作不再无声。",
  "💧 [去水印] 已收录 120+ 款国内外免费视频与图片去水印神器，极速无痕。",
  "👗 [衣橱] 300+ 平铺视觉素材已全面开放，支持一键反推创作提示词。"
];

export const CLOTHING_SCENES = [
  { id: 'elevator', name: '金属感电梯', category: '室内' },
  { id: 'gallery', name: '艺术展厅', category: '室内' },
  { id: 'train', name: '冬日车厢', category: '室内' },
  { id: 'makeup', name: '精致梳妆台', category: '室内' },
  { id: 'street', name: '外景商业街', category: '室外' },
  { id: 'cafe', name: '法式咖啡馆', category: '室外' },
  { id: 'bedroom', name: '奶油风卧室', category: '室内' },
  { id: 'studio', name: '极简摄影棚', category: '室内' },
  { id: 'office', name: '高端写写楼', category: '室内' },
  { id: 'garden', name: '莫奈花园', category: '室外' },
  { id: 'library', name: '复古图书馆', category: '室内' },
  { id: 'beach', name: '假日海滩', category: '室外' },
  { id: 'gym', name: '高级健身房', category: '室内' },
  { id: 'terrace', name: '露天阳台', category: '室外' },
  { id: 'hotel', name: '星级酒店大堂', category: '室内' },
  { id: 'car', name: '豪车内饰', category: '室内' },
  { id: 'supermarket', name: '潮流超市', category: '室内' },
  { id: 'rooftop', name: '城市天际线', category: '室外' },
  { id: 'museum', name: '现代艺术馆', category: '室内' },
  { id: 'ski', name: '冰雪滑雪场', category: '室外' }
];

const generateItems = () => {
  const items = [];
  const idPools: Record<string, string[]> = {
    '女模特': ['1551488831-00ddcb6c6bd3', '1560362614489-0fa7741ad462', '1541099649105-f69ad21f3246', '1604176354204-ad2f1f71965a', '1591047139829-d91aecb6caea', '1583743814966-8936f5b7be1a', '1618354691373-d851c5c3a990', '1556906781-9b043621424a', '1495121605193-b116b5b9c5fe', '1581655353564-df1d4a0c5c75', '1611005273763-71866384a60c', '1543163530-bc647e0e479a'],
    '软萌幼童': ['1519278470623-f2479e950bc4', '1522771930-08731390f70b', '1551270295-81232824335c', '1560058913-9447e174092d', '1527633411393-223405786191', '1543332145-51ad2c56a8f4'],
    '男模特': ['1520975954732-3cdd22165a3c', '1617135671911-370c8886530a', '1618354691236-4412f38c6f3d', '1550246123-284733f1ec0a', '1620799140408-ed308c0e9065', '1598533323263-d979f5f0611e'],
    '男童': ['1534030339857-8a32c207913c', '1542385315054-055740693b8d', '1529139513333-e016f42c2357'],
    '宠物类': ['1583337130417-3346a1be7dee', '1516734212186-a967f81ad0d7', '1611005273763-71866384a60c', '1537151608828-ea2b11777ee8', '1511275539165-cc46b1ee89bf']
  };
  const categories = [{ name: '女模特', count: 120, prefix: 'F' }, { name: '软萌幼童', count: 70, prefix: 'C' }, { name: '男模特', count: 50, prefix: 'M' }, { name: '男童', count: 35, prefix: 'B' }, { name: '宠物类', count: 25, prefix: 'P' }];
  const outfitSets = ['立领皮衣+工装长裤套装', '轻熟羊绒衫+丝绒半裙', '极简白T+复古单宁牛仔', '廓形外套+高级感托特包', '法式衬衫+莫兰迪色西裤', '机能夹克+束脚运动裤', '小香风套装+手工皮革包', '学院风毛衣+百褶裙单品', '重磅卫衣+拼色慢跑鞋'];
  categories.forEach(cat => {
    const ids = idPools[cat.name] || idPools['女模特'];
    for (let i = 1; i <= cat.count; i++) {
      const set = outfitSets[i % outfitSets.length];
      const baseId = ids[i % ids.length];
      items.push({ id: `${cat.prefix}_${i}_${Math.random().toString(36).substr(2, 5)}`, category: cat.name, name: `${set} 系列 ${String(i).padStart(3, '0')}`, url: `https://images.unsplash.com/photo-${baseId}?auto=format&fit=crop&w=500&h=750&q=90&sig=${i}_${cat.prefix}` });
    }
  });
  return items;
};

export const FITTING_ROOM_ITEMS = generateItems();

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'cover_red_1', name: '小红书-多巴胺', category: '爆款封面', description: '高饱和度配色，Y2K酸性风格，大标题，高点击率' },
  { id: 'cover_red_2', name: '小红书-极简白', category: '爆款封面', description: '纯白背景，黑色衬线字体，高级感，留白艺术' },
  { id: 'cover_red_3', name: '小红书-磨砂玻璃', category: '爆款封面', description: '毛玻璃背景，悬浮卡片，iOS风格，现代UI感' },
  { id: 'cover_red_4', name: '小红书-生活碎片', category: '爆款封面', description: '拍立得拼图，手写文字，温馨滤镜，Vlog风格' },
  { id: 'cover_red_5', name: '小红书-知识干货', category: '爆款封面', description: '大字报风格，醒目黄黑配色，重点突出，扁平化' },
  { id: 'cover_douyin_1', name: '抖音-故障风', category: '爆款封面', description: 'Glitch故障效果，红蓝错位，赛博朋克，视觉冲击' },
  { id: 'cover_douyin_2', name: '抖音-情感语录', category: '爆款封面', description: '黑白电影质感，宋体字，模糊背景，情绪氛围' },
  { id: 'cover_douyin_3', name: '抖音-卡点快闪', category: '爆款封面', description: '霓虹灯光，动态模糊，速度感，电音风格' },
  { id: 'horse_1', name: '马年-剪纸红', category: '马年限定', description: '中国传统剪纸，镂空窗花，喜庆红，年味浓' },
  { id: 'horse_2', name: '马年-鎏金宝马', category: '马年限定', description: '纯金雕塑，红宝石点宝石，富贵逼人，财源广进' },
  { id: 'cls_1', name: '鎏金大字', category: '经典艺术', description: '黑金配色，毛笔飞白，洒金粉，霸气' }
];

export const PAINTING_TOOLS: PaintingTool[] = [
    { id: 'rh_1', name: 'runninghub', description: '强大的国产AI创作平台，支持多种工作流。', icon: '🏃', url: 'https://www.runninghub.cn/', tag: '国内网站', category: 'domestic', isNew: true, guide: '国产一站式 AI 创作平台，支持 ComfyUI/SD 等多种高级工作流。' },
    { id: 'oi_1', name: 'OiiOii', description: '极简风格的国内AI绘画工具，激发无限灵感。', icon: '🔘', url: 'https://www.oiioii.ai/', tag: '国内网站', category: 'domestic', isNew: true, guide: '极简风格的国产绘画工具，适合新手快速生成创意插画。' },
    { id: 'itp_1', name: '以图反推', description: '深度解析图像视觉语言，精准还原提示词。', icon: '🖼️', url: 'https://imagetoprompt.org/zh', tag: '国外网站-', category: 'reverse', guide: '上传图片，AI 将为您解析其视觉特征并输出专业级 Prompt分析。' },
    { id: 'so_1', name: 'sora2', description: '下一代AI视频生成，电影级画质模拟。', icon: '🌌', url: 'https://sora.chatgpt.com/', tag: '国外网站-需要梯子工具', category: 'video', guide: 'OpenAI 旗下的视频生成模型，目前代表了 AI 视频生成的最高水平。' },
    { id: 'bd_1', name: '百度AI', description: '百度出品的创意生产力平台，支持妙笔生画。', icon: '🐾', url: 'https://miaobi.baidu.com/', tag: '国内网站', category: 'domestic', guide: '百度文心系列绘画工具，深度优化中文语境理解。' },
    { id: 'ga_1', name: 'GaGaAI', description: '专注于 AI 角色形象与头像生成的创意工具。', icon: '🎭', url: 'https://gaga.art/zh/app/avatar', tag: '国外网站-需要梯子工具', category: 'international', guide: '专注于高质量头像与游戏角色生成的 AI 工具。' },
    { id: 'hf_1', name: 'Hugging Face', description: '全球最大的 AI 社区，包含各种开源模型演示。', icon: '🤗', url: 'https://huggingface.co/spaces', tag: '国外网站-需要梯子工具', category: 'international', guide: '全球最大的 AI 开源社区，可在 Spaces 免费测试数千种顶尖模型。' },
    { id: 'bb_1', name: 'BigBearVPN', description: '高速稳定的全球网络连接工具，助力 AI 创作。', icon: '🐻', url: 'https://bigbearvpn.sodtool.com/', tag: '纯净梯子工具', category: 'utility', guide: '高速稳定的网络访问工具，助您无障碍使用海外 AI 资源。' },
    { id: 'cy_1', name: '创一AI', description: '专业的国产剧本与内容创作 AI 助手。', icon: '📝', url: 'https://www.creatifyone.com/', tag: '国内剧本AI', category: 'domestic', guide: '专业的剧本创作助手，提供海量爆款行业文案模版。' },
    { id: 'ty_1', name: '通义万相', description: '阿里出品，国内 Sora 级视频生成体验。', icon: '🐘', url: 'https://tongyi.aliyun.com/wan', tag: '国内sora 每天150个积分使用', category: 'domestic', guide: '阿里巴巴出品，支持文生图、图生视频，画质细腻自然。' },
    { id: 'jm_1', name: '即梦', description: '字节跳动出品，集绘画与视频于一体的顶尖 AI。', icon: '🌈', url: 'https://jimeng.jianying.com/ai-tool/asset', tag: '国内AI 做任务获取积分和每天送积分', category: 'domestic', isNew: true, guide: '字节跳动旗下，集成顶尖生图与视频生成算法，支持海量 Lora 插件。' },
    { id: 'db_1', name: '豆包', description: '字节跳动推出的全能型 AI 助手。', icon: '🧊', url: 'https://www.doubao.com/', tag: '国内网站', category: 'domestic', isNew: true, guide: '国内最火爆的 AI 助手，支持智能对话、绘画、翻译与文档分析。' },
    { id: 'kl_1', name: '可灵', description: '快手出品，目前画质最强的国产 AI 视频大模型。', icon: '📹', url: 'https://klingai.com/', tag: '国内网站', category: 'domestic', isNew: true, guide: '快手推出的视频生成模型，其物理仿真效果与细腻度堪称国产之光。' },
    { id: 'dy_1', name: '堆友', description: '阿里旗下设计师社区，拥有海量 Lora 模型。', icon: '🧱', url: 'https://duiyou.com/', tag: '国内网站', category: 'domestic', guide: '阿里旗下的设计师 AI 灵感社区，提供海量模型下载与在线生成。' },
    { id: 'jm_int', name: 'Dreamina (即梦国际版)', description: '即梦官方国际版，支持全球语言与更广阔的模型库。', icon: '✂️', url: 'https://www.capcut.com/ai-tools', tag: '国外网站-需要梯子工具', category: 'international', guide: 'CapCut 体系下的 AI 创作工具，功能同步国内即梦，更适合出海创作。' },
    { id: 'db_int', name: 'Cici (豆包国际版)', description: '豆包官方国际版，多语言适配更完善。', icon: '💬', url: 'https://www.cici.ai/', tag: '国外网站-需要梯子工具', category: 'international', guide: '字节跳动面向海外推出的 AI 助手，支持多国语言与特色语音包。' },
    { id: 'kl_int', name: 'Kling AI Global', description: '可灵官方国际版，面向全球创作者开放。', icon: '🎬', url: 'https://klingai.org/', tag: '国外网站-需要梯子工具', category: 'international', guide: '快手可灵的全球版本，让全球用户体验极致的视频生成技术。' }
];

export const THEME_CONFIG: Record<AppTheme, {
  bgClass: string;
  cardClass: string;
  textClass: string;
  buttonClass: string;
  accentColor: string;
  titleEffect: string;
}> = {
  [AppTheme.NEW_YEAR_2026]: {
    bgClass: 'bg-[#990d0d]',
    cardClass: 'bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-yellow-500/30',
    textClass: 'text-red-900',
    buttonClass: 'bg-gradient-to-r from-red-600 to-red-800 text-yellow-100 hover:from-red-500 hover:to-red-700 shadow-lg',
    accentColor: 'text-yellow-400',
    titleEffect: 'drop-shadow-md',
  },
  [AppTheme.RETRO_DESKTOP]: {
    bgClass: 'bg-[#008080]',
    cardClass: 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 shadow-md',
    textClass: 'text-black font-sans',
    buttonClass: 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white text-black active:bg-[#c0c0c0]',
    accentColor: 'text-white bg-blue-800 px-2',
    titleEffect: '',
  },
  [AppTheme.PINK_PLUSH]: {
    bgClass: 'bg-pink-50',
    cardClass: 'bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgba(255,182,193,0.4)] border border-white',
    textClass: 'text-gray-700',
    buttonClass: 'bg-pink-400 text-white rounded-2xl hover:bg-pink-500 shadow-md hover:shadow-lg',
    accentColor: 'text-pink-500',
    titleEffect: '',
  },
  [AppTheme.DOPAMINE]: {
    bgClass: 'bg-yellow-300',
    cardClass: 'bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] rounded-xl',
    textClass: 'text-black font-black',
    buttonClass: 'bg-[#a388ee] text-black border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]',
    accentColor: 'text-purple-600',
    titleEffect: 'drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]',
  },
  [AppTheme.NEO_BRUTALISM]: {
    bgClass: 'bg-[#f0f0f0]',
    cardClass: 'bg-[#ff6b6b] border-4 border-black shadow-[10px_10px_0px_rgba(0,0,0,1)]',
    textClass: 'text-black font-mono font-bold',
    buttonClass: 'bg-white text-black border-4 border-black hover:bg-black hover:text-white transition-colors',
    accentColor: 'bg-black text-white px-2',
    titleEffect: '',
  },
  [AppTheme.DARK_GRADIENT]: {
    bgClass: 'bg-[#0f172a]',
    cardClass: 'bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-blue-500/30 shadow-[0_0_30px_rgba(30,58,138,0.5)] rounded-2xl backdrop-blur-sm',
    textClass: 'text-slate-100',
    buttonClass: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:from-cyan-400 hover:to-blue-500 border-none transition-all duration-300',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400',
    titleEffect: 'drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]',
  },
  [AppTheme.CARTOON_HORSE_RED]: {
    bgClass: 'bg-[#e60012]',
    cardClass: 'bg-white border-[6px] border-black shadow-[15px_15px_0px_rgba(0,0,0,1)] rounded-[3rem]',
    textClass: 'text-black font-black italic uppercase',
    buttonClass: 'bg-black text-white border-4 border-white font-black hover:bg-white hover:text-black hover:border-black transition-all rounded-full',
    accentColor: 'text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)]',
    titleEffect: 'skew-x-[-12deg]',
  },
};

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  { id: 'wp_horse_1', name: '2026 鎏金宝马', prompt: '2026 Year of the Horse, a golden horse sculpture, intricate details, red background, traditional Chinese patterns, 8k resolution, cinematic lighting --ar 9:16' },
  { id: 'wp_horse_2', name: '赛博朋克战马', prompt: 'Cyberpunk style mechanical horse, neon lights, futuristic city background, 2026 text, high tech, detailed, 8k --ar 9:16' },
  { id: 'wp_horse_3', name: '水墨中国风', prompt: 'Traditional Chinese ink painting, galloping horse, calligraphy style 2026, minimalist, elegant, cultural heritage --ar 9:16' },
  { id: 'wp_horse_4', name: 'Q版萌马送福', prompt: 'Cute 3D cartoon horse, holding a red envelope, festive atmosphere, Chinese New Year 2026, Pixar style, bright colors --ar 9:16' },
  { id: 'wp_horse_5', name: '剪纸艺术', prompt: 'Chinese paper cut art, red horse, floral patterns, Year of the Horse 2026, intricate paper texture, soft lighting --ar 9:16' },
  { id: 'wp_horse_6', name: '祥云瑞兽', prompt: 'Mythical horse with clouds, traditional Chinese colors, gold and red, auspicious symbols, 2026 New Year wallpaper --ar 9:16' }
];
