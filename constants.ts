
import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const APP_NOTICES = [
  "🌟 [资源补完] 工具箱已扩充至 62+ 精选 AI 节点，全面覆盖电商、视频与设计领域。",
  "🚀 [2026 极简] 视觉系统已全面进化，采用玻璃拟态与弥散光影，消除所有黑边死角。",
  "🎨 [自动识别] 新增 8 款行业顶尖平台：Pippit、蜂鸟、腾讯 AdMuse 等已入驻。",
  "🔥 [马年限定] 艺术字引擎优化完毕，支持 2026 趋势风格智能推荐。"
];

export const CLOTHING_SCENES = [
  { id: 'elevator', name: '金属感电梯', category: '室内' },
  { id: 'gallery', name: '艺术展厅', category: '室内' },
  { id: 'street', name: '外景商业街', category: '室外' }
];

export const PAINTING_TOOLS: PaintingTool[] = [
    // --- 新增 8 款工具 (自动识别名称与说明) ---
    { id: 'pippit_ai', name: 'Pippit AI', description: '专业的电商产品图 AI 生成器，支持一键生成高转化率的商业摄影大片。', icon: '🛍️', url: 'https://www.pippit.ai/', tag: '国外 · 电商', category: 'utility', isNew: true },
    { id: 'photonaiclub', name: 'Photo AI Club', description: '顶尖的 AI 摄影俱乐部，提供极致真实的模特生成与人像摄影工作流。', icon: '📸', url: 'https://www.photonaiclub.com/', tag: '国外 · 摄影', category: 'international', isNew: true },
    { id: 'piccopilot', name: 'Piccopilot', description: '智能电商设计副驾驶，深度集成 AI 抠图、排版与视觉优化功能。', icon: '🛰️', url: 'https://www.piccopilot.com/', tag: '国外 · 设计', category: 'utility', isNew: true },
    { id: 'fengniao_ai', name: '蜂鸟 AI', description: '国产专业电商图像解决方案，赋能品牌方极速产出高质量商拍素材。', icon: '🐝', url: 'https://fengniaoai.com/', tag: '国内 · 推荐', category: 'domestic', isNew: true },
    { id: 'psai_cn', name: 'PS AI 助手', description: '深度适配 Photoshop 的 AI 创意插件系统，助力专业设计师提效降本。', icon: '🪄', url: 'https://psai.cn/', tag: '国内 · 设计', category: 'utility', isNew: true },
    { id: 'poify_ai', name: 'Poify AI', description: '全能型图像创意编辑平台，支持多维度的视觉语言探索与艺术生成。', icon: '🎨', url: 'https://poify.ai/', tag: '国外 · 创意', category: 'drawing', isNew: true },
    { id: 'qianlu_ai', name: '千鹿 AI', description: '国内领先的 AI 视觉艺术社区，支持多种国产大模型在线训练与应用。', icon: '🦌', url: 'https://qianlu.cc/', tag: '国内 · 社区', category: 'domestic', isNew: true },
    { id: 'tencent_admuse', name: '腾讯 AdMuse', description: '腾讯出品，专为广告主打造的专业级创意内容生产与分析平台。', icon: '🏮', url: 'https://admuse.qq.com/', tag: '国内 · 腾讯', category: 'domestic', isNew: true },

    // --- 原有工具合集 (保持不动) ---
    { id: 'heygen_ai', name: 'HeyGen', description: '全球领先的 AI 虚拟人视频生成平台，支持多语言口型同步与数字人克隆。', icon: '👤', url: 'https://app.heygen.com/home', tag: '国外 · 顶级', category: 'video' },
    { id: 'soundview_ai', name: 'SoundView AI', description: '智能视频创作与创意洞察平台，利用 AI 提升短视频生产效率与爆点挖掘。', icon: '🔊', url: 'https://soundviewai.com/', tag: '国内 · 推荐', category: 'video' },
    { id: 'aibrm_com', name: 'AIBRM', description: '专业的 AI 提示词管理与商业写作助手，提供海量经验证的优质 Prompts 库。', icon: '🧠', url: 'https://aibrm.com/', tag: '国际 · 写作', category: 'prompt' },
    { id: 'jurilu_ai', name: '炬力录 JuriLu', description: 'AI 录音转文字与智能内容提取工具，专注于高效会议记录与多媒体内容解析。', icon: '🎙️', url: 'https://ai.jurilu.com/#/home', tag: '国内 · 效率', category: 'utility' },
    { id: 'hailuo_ai', name: '海螺 AI', description: 'MiniMax 出品的通用大模型助手，支持极速视频生成、长文本理解与语音对话。', icon: '🐚', url: 'https://hailuoai.com/', tag: '国内 · 顶级', category: 'video' },
    { id: 'tencent_hunyuan', name: '腾讯混元视频', description: '腾讯自研混元视频大模型，支持高分辨率视频生成与物理级真实动态模拟。', icon: '🐧', url: 'https://video.hunyuan.tencent.com/', tag: '国内 · 腾讯', category: 'video' },
    { id: 'chatglm_ai', name: '智谱清言', description: '智谱 AI 旗下的智能助手，基于 ChatGLM 大模型，提供强大的绘图、搜索与代码能力。', icon: '💬', url: 'https://chatglm.cn/', tag: '国内 · 智谱', category: 'model' },
    { id: 'higgsfield', name: 'Higgsfield', description: '新一代 AI 视频生成引擎，专注于电影级镜头控制与复杂的动作语义解析。', icon: '⚛️', url: 'https://higgsfield.ai/', tag: '国外 · 视频', category: 'video' },
    { id: 'tapnow_ai', name: 'TapNow AI', description: '实时 AI 绘画与创意社交平台，支持多人协作创作与瞬间生成视觉杰作。', icon: '👆', url: 'https://www.tapnow.ai/', tag: '国外 · 社交', category: 'drawing' },
    { id: 'komiko_app', name: 'Komiko', description: '专注于 AI 漫画与连环画创作的智能应用，一键将创意剧本转化为分镜画稿。', icon: '📖', url: 'https://komiko.app/', tag: '国外 · 漫画', category: 'drawing' },
    { id: 'mengdong_ai', name: '梦动 ComfyUI', description: '国产 ComfyUI 云端工作流平台，提供丰富的节点模型配置与高效云渲染。', icon: '🌊', url: 'https://mengdong.cn/document/comfyui', tag: '国内 · 工作流', category: 'drawing' },
    { id: 'fogsight_ai', name: 'Fogsight AI', description: 'AI 视觉洞察与智能监控分析平台，通过计算机视觉技术解析场景动态。', icon: '🌫️', url: 'https://fogsight.ai/', tag: '国外 · 视觉', category: 'utility' },
    { id: 'aic_oceanengine', name: '巨量引擎 AIC', description: '字节跳动出品，专为广告主打造的 AI 智能创作中心，助力极速跑量。', icon: '🌀', url: 'https://aic.oceanengine.com/', tag: '国内 · 字节', category: 'domestic' },
    { id: 'whee_1', name: 'Whee 美图 AI', description: '美图出品的高端 AI 视觉创作平台，支持多种专业模型，国产绘画首选。', icon: '✨', url: 'https://www.whee.com/', tag: '国内 · 推荐', category: 'drawing' },
    { id: 'ins_1', name: 'Insmind AI', description: '多合一智能图像编辑与设计工具，专注于电商产品图与背景合成。', icon: '📸', url: 'https://www.insmind.com/', tag: '国际 · 电商', category: 'utility' },
    { id: 'logo_1', name: '标智客 Logosc', description: '智能 Logo 生成器，通过 AI 一键输出品牌视觉全套方案与矢量素材。', icon: '🎨', url: 'https://www.logosc.cn/', tag: '国内 · 设计', category: 'drawing' },
    { id: 'imia_1', name: '爱描画 Imiaohua', description: '国产 AI 绘画社区，支持多种国产大模型在线创作与作品展示。', icon: '🖌️', url: 'https://imiaohua.com/', tag: '国内 · 社区', category: 'drawing' },
    { id: 'art_1', name: 'ArtistryLab', description: '专业的艺术设计实验台，探索 AI 视觉艺术的边界与前沿质感。', icon: '🧪', url: 'https://artistrylab.net/login', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'krea_1', name: 'Krea AI', description: '目前最强的实时 AI 生成引擎，支持视频实时渲染与画质高清增强。', icon: '⚡', url: 'https://www.krea.ai/app', tag: '国外 · 顶级', category: 'video' },
    { id: 'kira_1', name: 'Kira Art', description: '专注于二次元动漫风格的 AI 创作工作台，支持精细化的风格迁移。', icon: '🌟', url: 'https://app.kira.art/', tag: '国际 · 动漫', category: 'drawing' },
    { id: 'ph_1', name: 'PhotoRoom', description: '世界领先的背景移除与产品图生成工具，一键产出商业摄影级大片。', icon: '🖼️', url: 'https://app.photoroom.com/', tag: '国外 · 电商', category: 'utility' },
    { id: 'tb_agi', name: '淘宝 AGI', description: '阿里出品，专为电商卖家打造的智能创意生产力系统，赋能商业增长。', icon: '🛒', url: 'https://agi.taobao.com/', tag: '国内 · 阿里', category: 'domestic' },
    { id: 'mv_1', name: '免费AI视频', description: '支持 Sora2 级视频生成，极致画质。', icon: '🎬', url: 'https://www.mindvideo.ai/zh/text-to-video/?model=153', tag: '国内 · 免费', category: 'video' },
    { id: 'mv_cs', name: 'MindVideo 创意工作室', description: '专业级视频生成与编辑工作站。', icon: '📽️', url: 'https://www.mindvideo.ai/zh/creative-studio/', tag: '国内 · 推荐', category: 'video' },
    { id: 'hw_1', name: '绘娃 AI', description: '专注于少儿教育与创意设计的绘图工具。', icon: '👧', url: 'https://www.ihuiwa.com/invite?huiwaInviteCode=EMRCAL&catId=1', tag: '国内 · 绘图', category: 'drawing' },
    { id: 'dd_1', name: 'D.Design AI 设计', description: '智能化设计助手，助力品牌与 Logo 创作。', icon: '💎', url: 'https://d.design/ai/generate?from=ab1', tag: '国内 · 设计', category: 'drawing' },
    { id: 'ab_1', name: '阿北 AI 创作', description: '多合一智能创作控制台。', icon: '🕋', url: 'https://abeiai.com/console/', tag: '国内 · 创作', category: 'drawing' },
    { id: 'mj_1', name: 'Midjourney 官网', description: '全球最顶尖的 AI 艺术生成引擎。', icon: '⛵', url: 'https://www.midjourney.com/home', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'sd_1', name: 'Stable Diffusion', description: '开源 AI 绘画领域的基石，支持深度定制。', icon: '🎨', url: 'https://stabledifffusion.com/', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'cv_1', name: 'Civitai 模型站', description: '全球最大的 AI 绘画模型分享社区。', icon: '🕍', url: 'https://civitai.com/', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'ts_1', name: '吐司 TusiArt', description: '国内领先的模型分享与在线生成平台。', icon: '🍞', url: 'https://tusiart.com', tag: '国内 · 模型', category: 'drawing' },
    { id: 'zd_1', name: '早点设计', description: 'AI 驱动的设计素材与灵感库。', icon: '🍳', url: 'https://www.zaodian.com/?utm_source=ai-bot.cn', tag: '国内 · 素材', category: 'drawing' },
    { id: 'kl_app', name: '可灵 Kling AI', description: '目前最强的国产 AI 视频生成平台。', icon: '📱', url: 'https://app.klingai.com/cn/', tag: '国内 · 顶级', category: 'video' },
    { id: 'mh_1', name: '商汤秒画', description: '商汤科技推出的高效 AI 绘画创作平台。', icon: '⏱️', url: 'https://miaohua.sensetime.com/inspiration?invite_code=9yvxNm7BR', tag: '国内 · 秒画', category: 'drawing' },
    { id: 'ol_1', name: 'Ollama 模型库', description: '本地运行开源大模型的首选工具。', icon: '🦙', url: 'https://ollama.com/library/devstral-2', tag: '国外 · 需梯子', category: 'model' },
    { id: 'ps_1', name: 'PSaide 设计助手', description: '专业的 AI 辅助图像处理与设计平台。', icon: '🪄', url: 'https://psaide.com/index.html', tag: '国内 · 设计', category: 'drawing' },
    { id: 'vc_1', name: 'Vercel 部署平台', description: '全球领先的前端部署与 AI 应用托管平台。', icon: '▲', url: 'https://vercel.com/home', tag: '国外 · 需梯子', category: 'utility' },
    { id: 'lb_1', name: 'Liblib 灵感库', description: '国内领先的 AI 绘画模型与创意社区。', icon: '👺', url: 'https://www.liblib.art/inspiration', tag: '国内 · 灵感', category: 'drawing' },
    { id: 'pr_1', name: '私有 AI 引擎', description: '专属私有化部署的高性能 AI 服务节点。', icon: '🔋', url: 'http://129.211.229.35:5050/', tag: '国内 · 专线', category: 'model' },
    { id: 'ap_1', name: 'AiPose 姿态生成', description: '精准控制 AI 绘画中的人物骨架与姿态。', icon: '🕴️', url: 'https://aipose.ai/app', tag: '国外 · 需梯子', category: 'utility' },
    { id: 'ga_1', name: 'GenApe 绘图助手', description: '全能型 AI 图像创作与增强工具集。', icon: '🦍', url: 'https://app.genape.ai/zh-CN/text-to-image', tag: '国外 · 需梯子', category: 'drawing' },
    { id: 'rh_1', name: 'Runninghub', description: '强大的国产AI创作平台，支持多种工作流。', icon: '🏃', url: 'https://www.runninghub.cn/', tag: '国内 · 推荐', category: 'domestic' },
    { id: 'oi_1', name: 'OiiOii 创意库', description: '极简风格的国内AI绘画工具。', icon: '🔘', url: 'https://www.oiioii.ai/', tag: '国内 · 极简', category: 'domestic' },
    { id: 'itp_1', name: '以图反推工具', description: '深度解析图像视觉语言。', icon: '🖼️', url: 'https://imagetoprompt.org/zh', tag: '国外 · 需梯子', category: 'reverse' },
    { id: 'so_1', name: 'Sora2 官网', description: '下一代AI视频生成。', icon: '🌌', url: 'https://sora.chatgpt.com/', tag: '国外 · 需梯子', category: 'video' },
    { id: 'bd_1', name: '百度AI妙笔', description: '百度出品的创意生产力平台。', icon: '🐾', url: 'https://miaobi.baidu.com/', tag: '国内 · 百度', category: 'domestic' },
    { id: 'ga_av', name: 'Gaga 头像生成', description: '专注于 AI 角色形象与头像生成。', icon: '🎭', url: 'https://gaga.art/zh/app/avatar', tag: '国外 · 需梯子', category: 'international' },
    { id: 'hf_sp', name: 'HuggingFace Spaces', description: '全球最大的 AI 社区演示空间。', icon: '🤗', url: 'https://huggingface.co/spaces', tag: '国外 · 需梯子', category: 'international' },
    { id: 'bb_vpn', name: 'BigBearVPN', description: '高速稳定的网络连接工具。', icon: '🐻', url: 'https://bigbearvpn.sodtool.com/', tag: '工具 · 专线', category: 'utility' },
    { id: 'cy_1', name: '创一AI 剧本', description: '专业的国产剧本与内容创作助手。', icon: '📝', url: 'https://www.creatifyone.com/', tag: '国内 · 创作', category: 'domestic' },
    { id: 'ty_1', name: '通义万相', description: '阿里出品，国内 Sora 级视频生成体验。', icon: '🐘', url: 'https://tongyi.aliyun.com/wan', tag: '国内 · 阿里', category: 'domestic' },
    { id: 'jm_1', name: '即梦 AI', description: '字节跳动出品的顶尖 AI 创作。', icon: '🌈', url: 'https://jimeng.jianying.com/ai-tool/asset', tag: '国内 · 字节', category: 'domestic' },
    { id: 'ck_1', name: 'Creatok', description: '创新的 AI 设计与创作工作台。', icon: '⚡', url: 'https://www.creatok.ai/app/dashboard', tag: '国外 · 需梯子', category: 'utility' },
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
    bgClass: 'bg-[#0a0a0c]',
    cardClass: 'bg-[#121216]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.5)] ring-1 ring-white/10 relative',
    textClass: 'text-white font-bold tracking-tight',
    buttonClass: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-[0_4px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.4)] border-none transition-all duration-300 active:scale-95',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400',
    titleEffect: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]',
  },
  [AppTheme.RETRO_DESKTOP]: {
    bgClass: 'bg-slate-100',
    cardClass: 'bg-white border-4 border-black rounded-none shadow-[8px_8px_0px_rgba(0,0,0,1)] ring-0',
    textClass: 'text-black font-mono font-bold',
    buttonClass: 'bg-black text-white rounded-none hover:bg-gray-800 border-none transition-all',
    accentColor: 'text-black underline decoration-blue-500 decoration-4',
    titleEffect: 'uppercase italic',
  },
  [AppTheme.PINK_PLUSH]: {
    bgClass: 'bg-pink-50',
    cardClass: 'bg-white/80 backdrop-blur-md border-4 border-pink-200 rounded-[3rem] shadow-[0_20px_40px_rgba(244,114,182,0.2)] ring-1 ring-white/50',
    textClass: 'text-pink-600 font-bold',
    buttonClass: 'bg-pink-500 text-white rounded-full hover:bg-pink-600 border-none shadow-md transition-all',
    accentColor: 'text-pink-400',
    titleEffect: 'drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]',
  },
  [AppTheme.DOPAMINE]: {
    bgClass: 'bg-yellow-400',
    cardClass: 'bg-white border-8 border-purple-500 rounded-[2.5rem] shadow-2xl transform rotate-1 ring-0',
    textClass: 'text-purple-600 font-black italic',
    buttonClass: 'bg-green-400 text-black rounded-xl hover:bg-green-500 border-4 border-black font-black transition-all',
    accentColor: 'text-blue-500',
    titleEffect: 'tracking-tighter',
  },
  [AppTheme.NEO_BRUTALISM]: {
    bgClass: 'bg-white',
    cardClass: 'bg-yellow-300 border-[6px] border-black rounded-none shadow-[12px_12px_0px_rgba(0,0,0,1)] ring-0',
    textClass: 'text-black font-black uppercase',
    buttonClass: 'bg-blue-500 text-white border-[4px] border-black rounded-none hover:-translate-y-1 hover:translate-x-1 transition-transform',
    accentColor: 'text-black bg-white px-2',
    titleEffect: 'skew-x-[-10deg]',
  },
  [AppTheme.DARK_GRADIENT]: {
    bgClass: 'bg-slate-950',
    cardClass: 'bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl ring-1 ring-white/5',
    textClass: 'text-white font-light tracking-widest',
    buttonClass: 'bg-white text-black rounded-lg hover:bg-gray-200 transition-colors',
    accentColor: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    titleEffect: 'drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]',
  },
  [AppTheme.CARTOON_HORSE_RED]: {
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
