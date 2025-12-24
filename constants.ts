
import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const APP_NOTICES = [
  "🌟 [库容爆炸] 工具箱已完成 41+ 精选工具补完，涵盖所有主流与垂直 AI 领域！",
  "🚀 [2026 纪元] 全动态流光 UI 已上线，体验极致视觉生产力。",
  "🎨 [自动识别] 所有工具已实现图标自动识别与高清可视化大图预览。",
  "🔥 [马年限定] 艺术字引擎优化完毕，支持 2026 趋势风格智能推荐。"
];

export const CLOTHING_SCENES = [
  { id: 'elevator', name: '金属感电梯', category: '室内' },
  { id: 'gallery', name: '艺术展厅', category: '室内' },
  { id: 'street', name: '外景商业街', category: '室外' }
];

export const PAINTING_TOOLS: PaintingTool[] = [
    // --- 新增 9 款工具（自动识别名称与说明，含可视化预览） ---
    { id: 'whee_1', name: 'Whee 美图 AI', description: '美图出品的高端 AI 视觉创作平台，支持多种专业模型，国产绘画首选。', icon: '✨', url: 'https://www.whee.com/', tag: '国内 · 推荐', category: 'drawing', isNew: true, guide: '美图旗下的专业 AI 视觉平台，模型库极为丰富。' },
    { id: 'ins_1', name: 'Insmind AI', description: '多合一智能图像编辑与设计工具，专注于电商产品图与背景合成。', icon: '📸', url: 'https://www.insmind.com/', tag: '国际 · 电商', category: 'utility', isNew: true, guide: '电商卖家的神兵利器，一键生成商业摄影级大片。' },
    { id: 'logo_1', name: '标智客 Logosc', description: '智能 Logo 生成器，通过 AI 一键输出品牌视觉全套方案与矢量素材。', icon: '🎨', url: 'https://www.logosc.cn/', tag: '国内 · 设计', category: 'drawing', guide: '输入名称即可生成海量标志，支持导出矢量格式。' },
    { id: 'imia_1', name: '爱描画 Imiaohua', description: '国产 AI 绘画社区，支持多种国产大模型在线创作与作品展示。', icon: '🖌️', url: 'https://imiaohua.com/', tag: '国内 · 社区', category: 'drawing', guide: '活跃的国产社区，提供丰富的公共灵感画廊。' },
    { id: 'art_1', name: 'ArtistryLab', description: '专业的艺术设计实验台，探索 AI 视觉艺术的边界与前沿质感。', icon: '🧪', url: 'https://artistrylab.net/login', tag: '国外 · 需梯子', category: 'drawing', guide: '适合追求极致画质与独特风格的设计实验室。' },
    { id: 'krea_1', name: 'Krea AI', description: '目前最强的实时 AI 生成引擎，支持视频实时渲染与画质高清增强。', icon: '⚡', url: 'https://www.krea.ai/app', tag: '国外 · 顶级', category: 'video', isNew: true, guide: '实时生成的王者，画质增强功能在业界属于领先水平。' },
    { id: 'kira_1', name: 'Kira Art', description: '专注于二次元动漫风格的 AI 创作工作台，支持精细化的风格迁移。', icon: '🌟', url: 'https://app.kira.art/', tag: '国际 · 动漫', category: 'drawing', guide: '日系插画与动漫角色生成的绝佳工具。' },
    { id: 'ph_1', name: 'PhotoRoom', description: '世界领先的背景移除与产品图生成工具，一键产出商业摄影级大片。', icon: '🖼️', url: 'https://app.photoroom.com/', tag: '国外 · 电商', category: 'utility', guide: '强大的背景移除能力，一秒钟生成干净的背景。' },
    { id: 'tb_agi', name: '淘宝 AGI', description: '阿里出品，专为电商卖家打造的智能创意生产力系统，赋能商业增长。', icon: '🛒', url: 'https://agi.taobao.com/', tag: '国内 · 阿里', category: 'domestic', isNew: true, guide: '阿里系商业视觉大模型，深度适配淘宝商家需求。' },

    // --- 原有 32 款工具保留 ---
    { id: 'mv_1', name: '免费AI视频', description: '支持 Sora2 级视频生成，极致画质。', icon: '🎬', url: 'https://www.mindvideo.ai/zh/text-to-video/?model=153', tag: '国内 · 免费', category: 'video', isNew: true },
    { id: 'mv_cs', name: 'MindVideo 创意工作室', description: '专业级视频生成与编辑工作站。', icon: '📽️', url: 'https://www.mindvideo.ai/zh/creative-studio/', tag: '国内 · 推荐', category: 'video' },
    { id: 'hw_1', name: '绘娃 AI', description: '专注于少儿教育与创意设计的绘图工具。', icon: '👧', url: 'https://www.ihuiwa.com/invite?huiwaInviteCode=EMRCAL&catId=1', tag: '国内 · 绘图', category: 'drawing' },
    { id: 'dd_1', name: 'D.Design AI 设计', description: '智能化设计助手，助力品牌与 Logo 创作。', icon: '💎', url: 'https://d.design/ai/generate?from=ab1', tag: '国内 · 设计', category: 'drawing' },
    { id: 'ab_1', name: '阿北 AI 创作', description: '多合一智能创作控制台。', icon: '🕋', url: 'https://abeiai.com/console/', tag: '国内 · 创作', category: 'drawing' },
    { id: 'mj_1', name: 'Midjourney 官网', description: '全球最顶尖的 AI 艺术生成引擎。', icon: '⛵', url: 'https://www.midjourney.com/home', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'sd_1', name: 'Stable Diffusion', description: '开源 AI 绘画领域的基石，支持深度定制。', icon: '🎨', url: 'https://stabledifffusion.com/', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'cv_1', name: 'Civitai 模型站', description: '全球最大的 AI 绘画模型分享社区。', icon: '🕍', url: 'https://civitai.com/', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'ts_1', name: '吐司 TusiArt', description: '国内领先的模型分享与在线生成平台。', icon: '🍞', url: 'https://tusiart.com', tag: '国内 · 模型', category: 'drawing' },
    { id: 'zd_1', name: '早点设计', description: 'AI 驱动的设计素材与灵感库。', icon: '🍳', url: 'https://www.zaodian.com/?utm_source=ai-bot.cn', tag: '国内 · 素材', category: 'drawing' },
    { id: 'kl_app', name: '可灵 Kling AI', description: '目前最强的国产 AI 视频生成平台。', icon: '📱', url: 'https://app.klingai.com/cn/', tag: '国内 · 顶级', category: 'video', isNew: true },
    { id: 'mh_1', name: '商汤秒画', description: '商汤科技推出的高效 AI 绘画创作平台。', icon: '⏱️', url: 'https://miaohua.sensetime.com/inspiration?invite_code=9yvxNm7BR', tag: '国内 · 秒画', category: 'drawing' },
    { id: 'ol_1', name: 'Ollama 模型库', description: '本地运行开源大模型的首选工具。', icon: '🦙', url: 'https://ollama.com/library/devstral-2', tag: '国外 · 需梯子', category: 'model', isNew: true },
    { id: 'ps_1', name: 'PSaide 设计助手', description: '专业的 AI 辅助图像处理与设计平台。', icon: '🪄', url: 'https://psaide.com/index.html', tag: '国内 · 设计', category: 'drawing', isNew: true },
    { id: 'vc_1', name: 'Vercel 部署平台', description: '全球领先的前端部署与 AI 应用托管平台。', icon: '▲', url: 'https://vercel.com/home', tag: '国外 · 需梯子', category: 'utility', isNew: true },
    { id: 'lb_1', name: 'Liblib 灵感库', description: '国内领先的 AI 绘画模型与创意社区。', icon: '👺', url: 'https://www.liblib.art/inspiration', tag: '国内 · 灵感', category: 'drawing', isNew: true },
    { id: 'pr_1', name: '私有 AI 引擎', description: '专属私有化部署的高性能 AI 服务节点。', icon: '🔋', url: 'http://129.211.229.35:5050/', tag: '国内 · 专线', category: 'model', isNew: true },
    { id: 'ap_1', name: 'AiPose 姿态生成', description: '精准控制 AI 绘画中的人物骨架与姿态。', icon: '🕴️', url: 'https://aipose.ai/app', tag: '国外 · 需梯子', category: 'utility', isNew: true },
    { id: 'ga_1', name: 'GenApe 绘图助手', description: '全能型 AI 图像创作与增强工具集。', icon: '🦍', url: 'https://app.genape.ai/zh-CN/text-to-image', tag: '国外 · 需梯子', category: 'drawing', isNew: true },
    { id: 'rh_1', name: 'Runninghub', description: '强大的国产AI创作平台，支持多种工作流。', icon: '🏃', url: 'https://www.runninghub.cn/', tag: '国内 · 推荐', category: 'domestic', isNew: true },
    { id: 'oi_1', name: 'OiiOii 创意库', description: '极简风格的国内AI绘画工具。', icon: '🔘', url: 'https://www.oiioii.ai/', tag: '国内 · 极简', category: 'domestic', isNew: true },
    { id: 'itp_1', name: '以图反推工具', description: '深度解析图像视觉语言。', icon: '🖼️', url: 'https://imagetoprompt.org/zh', tag: '国外 · 需梯子', category: 'reverse' },
    { id: 'so_1', name: 'Sora2 官网', description: '下一代AI视频生成。', icon: '🌌', url: 'https://sora.chatgpt.com/', tag: '国外 · 需梯子', category: 'video' },
    { id: 'bd_1', name: '百度AI妙笔', description: '百度出品的创意生产力平台。', icon: '🐾', url: 'https://miaobi.baidu.com/', tag: '国内 · 百度', category: 'domestic' },
    { id: 'ga_av', name: 'Gaga 头像生成', description: '专注于 AI 角色形象与头像生成。', icon: '🎭', url: 'https://gaga.art/zh/app/avatar', tag: '国外 · 需梯子', category: 'international' },
    { id: 'hf_sp', name: 'HuggingFace Spaces', description: '全球最大的 AI 社区演示空间。', icon: '🤗', url: 'https://huggingface.co/spaces', tag: '国外 · 需梯子', category: 'international' },
    { id: 'bb_vpn', name: 'BigBearVPN', description: '高速稳定的网络连接工具。', icon: '🐻', url: 'https://bigbearvpn.sodtool.com/', tag: '工具 · 专线', category: 'utility', isNew: true },
    { id: 'cy_1', name: '创一AI 剧本', description: '专业的国产剧本与内容创作助手。', icon: '📝', url: 'https://www.creatifyone.com/', tag: '国内 · 创作', category: 'domestic' },
    { id: 'ty_1', name: '通义万相', description: '阿里出品，国内 Sora 级视频生成体验。', icon: '🐘', url: 'https://tongyi.aliyun.com/wan', tag: '国内 · 阿里', category: 'domestic' },
    { id: 'jm_1', name: '即梦 AI', description: '字节跳动出品的顶尖 AI 创作。', icon: '🌈', url: 'https://jimeng.jianying.com/ai-tool/asset', tag: '国内 · 字节', category: 'domestic', isNew: true },
    { id: 'ck_1', name: 'Creatok', description: '创新的 AI 设计与创作工作台。', icon: '⚡', url: 'https://www.creatok.ai/app/dashboard', tag: '国外 · 需梯子', category: 'utility', isNew: true },
    { id: 'clip_1', name: 'ClipDrop', description: '强大的 AI 抠图与打光工具，提升画面质感。', icon: '✂️', url: 'https://clipdrop.co/', tag: '国外 · 需梯子', category: 'utility' }
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
    bgClass: 'bg-[#050505]',
    cardClass: 'bg-slate-950/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.6)] relative group/card',
    textClass: 'text-white font-black tracking-tight',
    buttonClass: 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] border-none transition-all duration-500 active:scale-95 btn-dynamic',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse',
    titleEffect: 'drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]',
  },
  [AppTheme.RETRO_DESKTOP]: {
    bgClass: 'bg-[#008080]',
    cardClass: 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 shadow-[4px_4px_0_rgba(0,0,0,0.5)]',
    textClass: 'text-black font-sans',
    buttonClass: 'bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-gray-800 active:border-t-gray-800 active:border-l-gray-800 active:border-b-white active:border-r-white text-black active:bg-[#c0c0c0]',
    accentColor: 'text-white bg-blue-800 px-2',
    titleEffect: '',
  },
  [AppTheme.PINK_PLUSH]: {
    bgClass: 'bg-pink-50',
    cardClass: 'bg-white/70 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.4)] border-4 border-white transition-all',
    textClass: 'text-gray-700',
    buttonClass: 'bg-gradient-to-br from-pink-300 to-rose-400 text-white rounded-3xl hover:scale-105 shadow-xl transition-all',
    accentColor: 'text-rose-400',
    titleEffect: 'drop-shadow-[0_2px_4px_rgba(244,63,94,0.3)]',
  },
  [AppTheme.DOPAMINE]: {
    bgClass: 'bg-yellow-300',
    cardClass: 'bg-white border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] rounded-3xl',
    textClass: 'text-black font-black',
    buttonClass: 'bg-[#a388ee] text-black border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all',
    accentColor: 'text-purple-600',
    titleEffect: 'drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]',
  },
  [AppTheme.NEO_BRUTALISM]: {
    bgClass: 'bg-[#f0f0f0]',
    cardClass: 'bg-[#ff6b6b] border-4 border-black shadow-[15px_15px_0px_rgba(0,0,0,1)] transition-transform',
    textClass: 'text-black font-mono font-bold italic',
    buttonClass: 'bg-white text-black border-4 border-black hover:bg-black hover:text-white transition-all shadow-[5px_5px_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none',
    accentColor: 'bg-black text-white px-4 py-1 skew-x-[-10deg]',
    titleEffect: '',
  },
  [AppTheme.DARK_GRADIENT]: {
    bgClass: 'bg-[#030712]',
    cardClass: 'bg-slate-900/80 border border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.3)] rounded-[2.5rem] backdrop-blur-2xl transition-all',
    textClass: 'text-blue-50',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.6)] hover:from-blue-500 hover:to-indigo-500 border border-white/10 transition-all',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 animate-pulse',
    titleEffect: 'drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]',
  },
  [AppTheme.CARTOON_HORSE_RED]: {
    bgClass: 'bg-[#e60012]',
    cardClass: 'bg-white border-[8px] border-black shadow-[20px_20px_0px_rgba(0,0,0,1)] rounded-[4rem] transition-all',
    textClass: 'text-black font-black italic uppercase',
    buttonClass: 'bg-black text-white border-4 border-white font-black hover:bg-white hover:text-black hover:border-black transition-all rounded-full shadow-2xl active:scale-90',
    accentColor: 'text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]',
    titleEffect: 'skew-x-[-15deg] animate-wiggle',
  },
};

export const STYLE_OPTIONS: StyleOption[] = [
  { id: 'cover_red_1', name: '小红书-多巴胺', category: '爆款封面', description: '高饱和度配色，Y2K酸性风格' },
  { id: 'cover_red_2', name: '小红书-极简白', category: '爆款封面', description: '纯白背景，高级留白' },
  { id: 'horse_1', name: '马年-剪纸红', category: '马年限定', description: '中国传统剪纸，镂空窗花' },
  { id: 'horse_2', name: '马年-鎏金宝马', category: '马年限定', description: '纯金雕塑，富贵逼人' }
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
