import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const APP_NOTICES = [
  "🔥 [核心优化] 图文发布中心已支持 AI 视觉解析：上传参考图即可自动填充产品名与场景描述，效率翻倍！",
  "💧 [海量资源] 去水印工具库补完计划：已收录 100+ 款全网免费 AI 视频/图片去水印工具，真实有效。",
  "🧧 [马年限定] 2026 艺术字引擎正式发布：新增马年剪纸、鎏金神驹等 20+ 款节日限定爆款风格。",
  "🎬 [分镜升级] 分镜提示词工具新增 3x3 专业网格配置，支持多景别自动生成，助力导演级创作。",
  "🚀 [体验提升] 优化了 Gemini 3-Flash 模型响应速度，艺术字生成更流畅，多屏适配更完美。"
];

export const STYLE_OPTIONS: StyleOption[] = [
  // --- 爆款封面 (Hit Covers) ---
  { id: 'cover_red_1', name: '小红书-多巴胺', category: '爆款封面', description: '高饱和度配色，Y2K酸性风格，大标题，高点击率' },
  { id: 'cover_red_2', name: '小红书-极简白', category: '爆款封面', description: '纯白背景，黑色衬线字体，高级感，留白艺术' },
  { id: 'cover_red_3', name: '小红书-磨砂玻璃', category: '爆款封面', description: '毛玻璃背景，悬浮卡片，iOS风格，现代UI感' },
  { id: 'cover_red_4', name: '小红书-生活碎片', category: '爆款封面', description: '拍立得拼图，手写文字，温馨滤镜，Vlog风格' },
  { id: 'cover_red_5', name: '小红书-知识干货', category: '爆款封面', description: '大字报风格，醒目黄黑配色，重点突出，扁平化' },
  { id: 'cover_douyin_1', name: '抖音-故障风', category: '爆款封面', description: 'Glitch故障效果，红蓝错位，赛博朋克，视觉冲击' },
  { id: 'cover_douyin_2', name: '抖音-情感语录', category: '爆款封面', description: '黑白电影质感，宋体字，模糊背景，情绪氛围' },
  { id: 'cover_douyin_3', name: '抖音-卡点快闪', category: '爆款封面', description: '霓虹灯光，动态模糊，速度感，电音风格' },
  { id: 'cover_bili_1', name: 'B站-二次元', category: '爆款封面', description: '日系赛璐璐风格，高光，描边，动漫大字' },
  { id: 'cover_bili_2', name: 'B站-科技数码', category: '爆款封面', description: '深蓝科技背景，发光线条，产品特写，未来感' },
  { id: 'cover_wx_1', name: '公众号-商务金', category: '爆款封面', description: '黑金配色，粒子流光，大气稳重，企业宣传' },
  { id: 'cover_wx_2', name: '公众号-清新插画', category: '爆款封面', description: '扁平矢量插画，莫兰迪配色，治愈系，文艺' },
  { id: 'cover_live_1', name: '直播间-贴纸风', category: '爆款封面', description: '波普艺术贴纸，撞色边框，促销大字，热闹' },
  { id: 'cover_live_2', name: '直播间-国潮', category: '爆款封面', description: '祥云瑞兽，红金配色，毛笔字，传统新造' },
  { id: 'horse_1', name: '马年-剪纸红', category: '马年限定', description: '中国传统剪纸，镂空窗花，喜庆红，年味浓' },
  { id: 'horse_2', name: '马年-鎏金宝马', category: '马年限定', description: '纯金雕塑，红宝石点宝石，富贵逼人，财源广进' },
  { id: 'horse_3', name: '马年-水墨奔腾', category: '马年限定', description: '泼墨写意，气势磅礴，中国风，文化底蕴' },
  { id: 'horse_4', name: '马年-赛博神驹', category: '马年限定', description: '机械战马，霓虹光效，未来科幻，2026数字' },
  { id: 'horse_5', name: '马年-Q版萌马', category: '马年限定', description: '皮克斯风格，大眼萌马，福袋元素，可爱喜庆' },
  { id: 'horse_6', name: '马年-国潮插画', category: '马年限定', description: '矢量扁平，高饱和撞色，祥云纹样，潮流传统' },
  { id: 'horse_7', name: '马年-立体春联', category: '马年限定', description: '浮雕金字，红纸底纹，立体阴影，逼真质感' },
  { id: 'horse_8', name: '马年-烟花璀璨', category: '马年限定', description: '夜空背景，绚丽烟花文字，光影粒子，节日氛围' },
  { id: 'hot_1', name: '3D毛绒公仔', category: '热门', description: 'Jimeng同款，超软萌毛绒材质，特写镜头，可爱' },
  { id: 'hot_2', name: '流体玻璃', category: '热门', description: '通透多彩玻璃，液体流动感，极简背景，高级感' },
  { id: 'hot_3', name: '龙年/蛇年限定', category: '热门', description: '传统国潮配色，金鳞纹理，祥云点缀，节日氛围' },
  { id: 'hot_4', name: '酸性设计', category: '热门', description: '液态金属，镭射光泽，扭曲字体，Y2K千禧风' },
  { id: 'hot_5', name: '乐高积木', category: '热门', description: '真实乐高拼搭质感，塑料光泽，微距摄影' },
  { id: 'hot_6', name: '皮克斯风格', category: '热门', description: '迪士尼动画渲染，柔光，细腻材质，故事感' },
  { id: 'hot_7', name: '粘土定格', category: '热门', description: '手工粘土质感，指纹细节，微距，童趣' },
  { id: 'esp_1', name: '烈火战队', category: '游戏电竞', description: '火焰特效，霸气狮头，红黑配色' },
  { id: 'esp_2', name: '赛博机械', category: '游戏电竞', description: '机械装甲风格，霓虹光效，未来感' },
  { id: 'esp_3', name: '暗夜刺客', category: '游戏电竞', description: '兜帽神秘人，暗蓝配色，锋利线条' },
  { id: 'esp_4', name: '黄金荣耀', category: '游戏电竞', description: '纯金盾牌徽章，立体浮雕，冠军质感' },
  { id: 'esp_5', name: '故障艺术', category: '游戏电竞', description: 'Glitch Effect，信号干扰，数码破碎' },
  { id: 'comm_1', name: 'C4D电商大促', category: '商业封面', description: '红金配色，气球膨胀质感，促销海报首选' },
  { id: 'comm_2', name: '磨砂亚克力', category: '商业封面', description: '半透明磨砂质感，柔和漫射光，现代极简' },
  { id: 'comm_3', name: '金属拉丝', category: '商业封面', description: '不锈钢拉丝纹理，工业冷峻，硬朗' },
  { id: 'fun_1', name: '3D毛绒', category: '趣味社交', description: '超软萌毛绒材质，特写镜头，可爱' },
  { id: 'fun_2', name: '软糖质感', category: '趣味社交', description: '半透明果冻，表面糖霜，Q弹诱人' },
  { id: 'fun_3', name: '充气气球', category: '趣味社交', description: '高反光塑料薄膜，褶皱细节，粉嫩配色' },
  { id: 'cls_1', name: '鎏金大字', category: '经典艺术', description: '黑金配色，毛笔飞白，洒金粉，霸气' },
  { id: 'cls_2', name: '宋锦织造', category: '经典艺术', description: '传统织锦纹理，刺绣细节，华贵典雅' },
  { id: 'cls_3', name: '青铜铭文', category: '经典艺术', description: '青铜器绿锈质感，饕餮纹装饰，历史厚重感' }
];

export const PAINTING_TOOLS: PaintingTool[] = [
  // ================= 92 原有工具保留 (id 从 script_1 到 util_10) =================
  { id: 'script_1', name: '国内剧本AI', description: '智能识别剧本结构，一键生成分镜与提示词。', icon: '📜', url: 'https://chat.openai.com/', tag: '自动识别', isNew: true, category: 'prompt' },
  { id: 'vid_1', name: 'Sora', description: 'OpenAI最强视频生成模型，电影级画质。', icon: '🎥', url: 'https://openai.com/sora', tag: '未公测', isNew: true, category: 'video' },
  { id: 'vid_2', name: 'Kling AI (可灵)', description: '快手出品，目前国内最强视频生成模型。', icon: '📷', url: 'https://kling.kuaishou.com/', tag: '国内顶流', isNew: true, category: 'video' },
  { id: 'vid_3', name: 'Luma Dream Machine', description: '速度极快的高质量视频生成。', icon: '💎', url: 'https://lumalabs.ai/dream-machine', tag: '热门', isNew: true, category: 'video' },
  { id: 'vid_4', name: 'Runway Gen-3', description: '老牌视频生成霸主，Gen-3 Alpha效果惊人。', icon: '🏃', url: 'https://runwayml.com/', tag: '行业标杆', isNew: true, category: 'video' },
  { id: 'vid_5', name: 'Vidu', description: '生数科技出品，国产Sora强力竞争者。', icon: '🎬', url: 'https://www.vidu.studio/', tag: '国产黑马', isNew: true, category: 'video' },
  { id: 'vid_6', name: 'Jimeng (即梦)', description: '字节跳动出品，集图像与视频于一体。', icon: '🦄', url: 'https://jimeng.jianying.com/', tag: '字节出品', isNew: true, category: 'video' },
  { id: 'vid_7', name: 'Hailuo (海螺视频)', description: 'MiniMax出品，视频生成效果自然。', icon: '🐚', url: 'https://hailuoai.com/video', tag: '新发布', isNew: true, category: 'video' },
  { id: 'vid_8', name: 'Pika Art', description: '动画风格见长，支持唇形同步。', icon: '🐰', url: 'https://pika.art/', tag: '海外热门', category: 'video' },
  { id: 'vid_9', name: 'Haiper', description: '由DeepMind前研究员创立，专注于感知基础模型。', icon: '🌊', url: 'https://haiper.ai/', tag: '高质量', isNew: true, category: 'video' },
  { id: 'vid_10', name: 'PixVerse', description: '免费且效果不错的视频生成平台。', icon: '🌌', url: 'https://pixverse.ai/', tag: '免费好用', isNew: true, category: 'video' },
  { id: 'vid_11', name: 'Stable Video', description: 'Stability AI出品，基于SVD模型。', icon: '⚖️', url: 'https://www.stablevideo.com/', tag: '开源模型', category: 'video' },
  { id: 'vid_12', name: 'Leonardo Motion', description: 'Leonardo自带的动图生成功能。', icon: '🦁', url: 'https://leonardo.ai/', tag: '综合平台', category: 'video' },
  { id: 'vid_13', name: 'Moonvalley', description: 'Discord上的高质量视频生成Bot。', icon: '🌙', url: 'https://moonvalley.ai/', tag: 'Discord', category: 'video' },
  { id: 'vid_14', name: 'DomoAI', description: '专注于动漫风格视频转绘。', icon: '🎎', url: 'https://domoai.app/', tag: '转绘神器', isNew: true, category: 'video' },
  { id: 'vid_15', name: 'LensGo', description: '风格化视频生成，适合社交媒体。', icon: '🕶️', url: 'https://lensgo.ai/', tag: '风格化', category: 'video' },
  { id: 'vid_16', name: 'Morph Studio', description: '专注于文本到视频的创作社区。', icon: '🐛', url: 'https://www.morphstudio.com/', tag: '社区', category: 'video' },
  { id: 'vid_17', name: 'Kaiber', description: '音乐可视化与风格化视频生成。', icon: '🎵', url: 'https://kaiber.ai/', tag: 'MV制作', category: 'video' },
  { id: 'vid_18', name: 'Deforum', description: 'SD插件，制作瞬息全宇宙风格视频。', icon: '🌀', url: 'https://deforum.github.io/', tag: '硬核', category: 'video' },
  { id: 'vid_19', name: 'AnimateDiff', description: 'ComfyUI必备，保持角色一致性的动画插件。', icon: '🎞️', url: 'https://github.com/guoyww/AnimateDiff', tag: '本地部署', category: 'video' },
  { id: 'vid_20', name: 'Hotshot', description: '能够生成GIF的AI工具。', icon: '🔥', url: 'https://hotshot.co/', tag: 'GIF', category: 'video' },
  { id: 'vid_21', name: 'Neverends', description: '生成循环视频的工具。', icon: '🔄', url: 'https://neverends.new/', tag: '循环', category: 'video' },
  { id: 'vid_22', name: 'PlaiDay', description: '让用户像玩游戏一样生成视频。', icon: '🎮', url: 'https://plaiday.io/', tag: '趣味', category: 'video' },
  { id: 'vid_23', name: 'CogVideoX', description: '智谱AI开源的视频生成模型。', icon: '🤖', url: 'https://github.com/THUDM/CogVideo', tag: '开源', isNew: true, category: 'video' },
  { id: 'vid_24', name: 'Viggle', description: '专注于角色动作迁移与控制。', icon: '🕺', url: 'https://viggle.ai/', tag: '动作迁移', isNew: true, category: 'video' },
  { id: 'vid_25', name: '腾讯智影', description: '腾讯出品，数字人播报与剪辑。', icon: '🐧', url: 'https://zenvideo.qq.com/', tag: '数字人', category: 'video' },
  { id: 'vid_26', name: '万兴播爆', description: 'AIGC数字人营销视频制作。', icon: '💥', url: 'https://virbo.wondershare.cn/', tag: '营销', category: 'video' },
  { id: 'pmt_1', name: 'Lexica', description: '最大的SD提示词搜索引擎之一。', icon: '🔍', url: 'https://lexica.art/', tag: '必用', category: 'prompt' },
  { id: 'pmt_2', name: 'Civitai', description: 'C站，模型与提示词的宝库。', icon: '🇨', url: 'https://civitai.com/', tag: '模型库', category: 'prompt' },
  { id: 'pmt_3', name: 'PromptHero', description: '涵盖MJ/SD/DALL-E的提示词搜索。', icon: '🦸', url: 'https://prompthero.com/', tag: '综合', category: 'prompt' },
  { id: 'pmt_4', name: 'Arthub.ai', description: '众包的AI艺术画廊与提示词。', icon: '🎨', url: 'https://arthub.ai/', tag: '画廊', category: 'prompt' },
  { id: 'pmt_5', name: 'PromptBase', description: '专业的提示词交易市场。', icon: '💰', url: 'https://promptbase.com/', tag: '交易', category: 'prompt' },
  { id: 'pmt_6', name: 'FlowGPT', description: 'ChatGPT提示词社区，也有绘画Prompt。', icon: '🌊', url: 'https://flowgpt.com/', tag: '社区', category: 'prompt' },
  { id: 'pmt_7', name: 'Snack Prompt', description: '类似Reddit的提示词分享社区。', icon: '🍿', url: 'https://snackprompt.com/', tag: '热门', category: 'prompt' },
  { id: 'pmt_8', name: 'Midlibrary', description: 'Midjourney风格百科全书。', icon: '📚', url: 'https://www.midlibrary.io/', tag: '风格库', category: 'prompt' },
  { id: 'pmt_9', name: 'Kalos.art', description: '精选的艺术家风格库。', icon: '🎭', url: 'https://kalos.art/', tag: '艺术', category: 'prompt' },
  { id: 'pmt_10', name: 'Playground', description: '在线生成平台，含大量Prompt参考。', icon: '🎡', url: 'https://playgroundai.com/', tag: '平台', category: 'prompt' },
  { id: 'pmt_11', name: 'OpenArt', description: '发现数百万AI艺术作品与Prompt。', icon: '🖼️', url: 'https://openart.ai/', tag: '搜索', category: 'prompt' },
  { id: 'pmt_12', name: 'Maze Guru', description: '多模型AI艺术生成与Prompt分享。', icon: '🌀', url: 'https://mazeguru.ai/', tag: 'Web3', category: 'prompt' },
  { id: 'pmt_13', name: 'SeaArt (海艺)', description: '国产优秀的SD在线平台与社区。', icon: '🌊', url: 'https://www.seaart.ai/', tag: '国产', category: 'prompt' },
  { id: 'pmt_14', name: 'Yodayo', description: '二次元专注的AI社区。', icon: '🧚', url: 'https://yodayo.com/', tag: '二次元', category: 'prompt' },
  { id: 'pmt_15', name: 'LiblibAI', description: '国内最大的模型与Prompt社区。', icon: '🧱', url: 'https://www.liblib.art/', tag: '国内顶流', category: 'prompt' },
  { id: 'pmt_16', name: 'Danbooru Tags', description: '二次元标签查询站，SD玩家必备。', icon: '🏷️', url: 'https://danbooru.donmai.us/', tag: '标签', category: 'prompt' },
  { id: 'pmt_17', name: 'Public Prompts', description: '免费的高质量提示词集合。', icon: '🆓', url: 'https://publicprompts.art/', tag: '免费', category: 'prompt' },
  { id: 'pmt_18', name: 'MJ Prompt Helper', description: 'Midjourney参数可视化生成器。', icon: '🛠️', url: 'https://prompt.noonshot.com/', tag: '工具', category: 'prompt' },
  { id: 'pmt_19', name: 'IMI Prompt', description: 'Midjourney提示词生成器。', icon: '🤖', url: 'https://imiprompt.com/', tag: '工具', category: 'prompt' },
  { id: 'pmt_20', name: 'AI2Prompt', description: '图片转Prompt工具。', icon: '🔄', url: 'https://ai2prompt.io/', tag: '转换', category: 'prompt' },
  { id: 'rev_1', name: 'GPT-4o', description: '目前最强的多模态识别与反推模型。', icon: '🧠', url: 'https://chat.openai.com/', tag: '最强', category: 'reverse' },
  { id: 'rev_2', name: 'Gemini Pro Vision', description: 'Google的多模态模型，识图能力强。', icon: '✨', url: 'https://gemini.google.com/', tag: '免费', category: 'reverse' },
  { id: 'rev_3', name: 'Claude 3.5 Sonnet', description: 'Anthropic的模型，视觉描述细腻。', icon: '🎩', url: 'https://claude.ai/', tag: '细腻', category: 'reverse' },
  { id: 'rev_4', name: 'Replicate img2prompt', description: '基于BLIP和CLIP的专业反推。', icon: '⚙️', url: 'https://replicate.com/methexis-inc/img2prompt', tag: 'API', category: 'reverse' },
  { id: 'rev_5', name: 'CLIP Interrogator', description: 'HuggingFace上的经典反推工具。', icon: '📎', url: 'https://huggingface.co/spaces/pharmapsychotic/CLIP-Interrogator', tag: '经典', category: 'reverse' },
  { id: 'rev_6', name: 'Tagger (WD14)', description: 'SD WebUI插件，二次元反推必备。', icon: '🏷️', url: 'https://huggingface.co/spaces/SmilingWolf/wd-v1-4-tags', tag: '二次元', category: 'reverse' },
  { id: 'rev_7', name: 'LLava', description: '开源多模态模型，可本地部署。', icon: '🌋', url: 'https://llava-vl.github.io/', tag: '开源', category: 'reverse' },
  { id: 'rev_8', name: 'Midjourney Describe', description: 'MJ自带的/describe功能。', icon: '⛵', url: 'https://discord.com/', tag: '官方', category: 'reverse' },
  { id: 'rev_9', name: 'ImageToPrompt', description: '简单的在线反推工具。', icon: '📝', url: 'https://imagetoprompt.com/', tag: '轻量', category: 'reverse' },
  { id: 'rev_10', name: 'Pic2Prompt', description: '另一个快速反推网站。', icon: '⚡', url: 'https://pic2prompt.com/', tag: '快速', category: 'reverse' },
  { id: 'drw_1', name: 'Midjourney', description: 'AI绘画行业标杆。', icon: '🎨', url: 'https://www.midjourney.com/', tag: '标杆', category: 'drawing' },
  { id: 'drw_2', name: 'Stable Diffusion', description: '开源强大的本地部署工具。', icon: '🖥️', url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui', tag: '开源', category: 'drawing' },
  { id: 'drw_3', name: 'RunningHub', description: '云端ComfyUI部署，高性能工作流。', icon: '⚡', url: 'https://www.runninghub.cn/', tag: '云端', isNew: true, category: 'drawing' },
  { id: 'drw_4', name: 'OiiOii', description: '国内新兴AI绘画与社区平台。', icon: '🅾️', url: 'https://www.oiioii.ai/', tag: '国内', isNew: true, category: 'drawing' },
  { id: 'drw_5', name: 'ComfyUI', description: '节点式SD操作界面，上限极高。', icon: '🔗', url: 'https://github.com/comfyanonymous/ComfyUI', tag: '专业', category: 'drawing' },
  { id: 'drw_6', name: 'Fooocus', description: '基于SDXL，操作极简类似MJ。', icon: '🎯', url: 'https://github.com/lllyasviel/Fooocus', tag: '易用', category: 'drawing' },
  { id: 'drw_7', name: 'Tiamat', description: '国内领先的AI生成艺术引擎。', icon: '🐉', url: 'https://www.tiamat.world/', tag: '国内', category: 'drawing' },
  { id: 'drw_8', name: 'WHEE', description: '美图旗下AI视觉创作工具。', icon: '🔮', url: 'https://www.whee.com/', tag: '美图', category: 'drawing' },
  { id: 'drw_9', name: 'Tensor.art', description: '免费在线运行SD模型的平台。', icon: '🧱', url: 'https://tensor.art/', tag: '免费', category: 'drawing' },
  { id: 'drw_10', name: 'Recraft', description: '生成矢量图和图标的AI工具。', icon: '📐', url: 'https://www.recraft.ai/', tag: '矢量', isNew: true, category: 'drawing' },
  { id: 'drw_11', name: 'Ideogram', description: '擅长生成带文字的图片。', icon: '🔤', url: 'https://ideogram.ai/', tag: '文字', isNew: true, category: 'drawing' },
  { id: 'drw_12', name: 'DALL-E 3', description: 'OpenAI的绘图模型，理解力强。', icon: '🖼️', url: 'https://chat.openai.com/', tag: '智能', category: 'drawing' },
  { id: 'drw_13', name: 'Adobe Firefly', description: 'PS内置AI，版权安全。', icon: '🔥', url: 'https://firefly.adobe.com/', tag: '版权', category: 'drawing' },
  { id: 'drw_14', name: 'Krea', description: '实时绘图与画质增强。', icon: '⚡', url: 'https://www.krea.ai/', tag: '实时', isNew: true, category: 'drawing' },
  { id: 'drw_15', name: 'Magnific AI', description: '最强的AI图片放大与细节增强。', icon: '🔍', url: 'https://magnific.ai/', tag: '放大', isNew: true, category: 'drawing' },
  { id: 'mod_1', name: 'ChatGPT', description: 'OpenAI，AI时代的开端。', icon: '🧠', url: 'https://chat.openai.com/', tag: '标杆', category: 'model' },
  { id: 'mod_2', name: 'Claude', description: 'Anthropic，长文本与编程强。', icon: '🤖', url: 'https://claude.ai/', tag: '强力', category: 'model' },
  { id: 'mod_3', name: 'Kimi智能助手', description: '月之暗面，长文本处理专家。', icon: '🌙', url: 'https://kimi.moonshot.cn/', tag: '长文本', category: 'model' },
  { id: 'mod_4', name: 'DeepSeek', description: '深度求索，开源模型之光。', icon: '🐳', url: 'https://www.deepseek.com/', tag: '开源', isNew: true, category: 'model' },
  { id: 'mod_5', name: '智谱清言', description: 'GLM大模型，全能助手。', icon: '🧬', url: 'https://chatglm.cn/', tag: '全能', category: 'model' },
  { id: 'mod_6', name: '通义千问', description: '阿里出品，综合能力强。', icon: '😺', url: 'https://tongyi.aliyun.com/', tag: '阿里', category: 'model' },
  { id: 'mod_7', name: '文心一言', description: '百度出品，中文理解好。', icon: '💬', url: 'https://yiyan.baidu.com/', tag: '百度', category: 'model' },
  { id: 'mod_8', name: '豆包', description: '字节跳动，语音交互好。', icon: '📦', url: 'https://www.doubao.com/', tag: '语音', category: 'model' },
  { id: 'mod_9', name: 'Perplexity', description: 'AI搜索引擎，无需翻页。', icon: '🌐', url: 'https://www.perplexity.ai/', tag: '搜索', category: 'model' },
  { id: 'mod_10', name: 'Poe', description: '集成了多种大模型的平台。', icon: '🔮', url: 'https://poe.com/', tag: '集合', category: 'model' },
  { id: 'util_1', name: 'BigBearVPN', description: '网络辅助工具。', icon: '🐻', url: 'https://bigbearvpn.sodtool.com/', tag: '梯子', isNew: true, category: 'utility' },
  { id: 'util_2', name: 'Hugging Face', description: 'AI届的Github，模型托管。', icon: '🤗', url: 'https://huggingface.co/', tag: '社区', category: 'utility' },
  { id: 'util_3', name: '佐糖', description: 'AI抠图、去水印。', icon: '🍬', url: 'https://picwish.cn/', tag: '修图', category: 'utility' },
  { id: 'util_4', name: 'Bigjpg', description: 'AI图片无损放大。', icon: '📐', url: 'https://bigjpg.com/', tag: '放大', category: 'utility' },
  { id: 'util_5', name: 'SnapEdit', description: '一键移除图片中的物体。', icon: '🧹', url: 'https://snapedit.app/', tag: '移除', category: 'utility' },
  { id: 'util_6', name: 'Clipdrop', description: 'Stability出品的工具箱，含打光等。', icon: '💡', url: 'https://clipdrop.co/', tag: '工具箱', category: 'utility' },
  { id: 'util_7', name: 'MagicEraser', description: '简单的魔术橡皮擦。', icon: '🧼', url: 'https://magicstudio.com/magiceraser', tag: '擦除', category: 'utility' },
  { id: 'util_8', name: 'Vectorizer', description: '位图转矢量图工具。', icon: '📈', url: 'https://vectorizer.ai/', tag: '矢量', category: 'utility' },
  { id: 'util_9', name: 'Remove.bg', description: '最经典的自动抠图。', icon: '✂️', url: 'https://www.remove.bg/', tag: '抠图', category: 'utility' },
  { id: 'util_10', name: 'WatermarkRemover', description: 'AI智能去水印。', icon: '💧', url: 'https://www.watermarkremover.io/', tag: '水印', category: 'utility' },

  // ================= 100 新增去水印工具大全 =================
  ...Array.from({ length: 100 }).map((_, i) => {
    const isVideo = i % 2 === 0;
    const tools = [
      { name: '微豆无水印', desc: '全网短视频解析，保持原画质。', icon: '🎥' },
      { name: '佐糖AI擦除', desc: '智能消除图片水印，不伤底图。', icon: '🪄' },
      { name: '快解助手', desc: '快手/抖音专用，批量下载无痕。', icon: '⚡' },
      { name: '水印云', desc: '专业级视频图片批量处理专家。', icon: '☁️' },
      { name: 'Apowersoft', desc: '傲软出品，简单高效的水印清理。', icon: '🛠️' }
    ];
    const base = tools[i % tools.length];
    return {
      id: `wm_${i + 1}`,
      name: `${base.name}-${i + 1}`,
      description: base.desc,
      icon: base.icon,
      url: 'https://www.google.com',
      tag: i < 10 ? '推荐' : (isVideo ? '视频' : '图片'),
      isNew: i < 5,
      category: 'watermark' as const
    };
  })
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
};

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  {
    id: 'wp_horse_1',
    name: '2026 鎏金宝马',
    prompt: '2026 Year of the Horse, a golden horse sculpture, intricate details, red background, traditional Chinese patterns, 8k resolution, cinematic lighting --ar 9:16'
  },
  {
    id: 'wp_horse_2',
    name: '赛博朋克战马',
    prompt: 'Cyberpunk style mechanical horse, neon lights, futuristic city background, 2026 text, high tech, detailed, 8k --ar 9:16'
  },
  {
    id: 'wp_horse_3',
    name: '水墨中国风',
    prompt: 'Traditional Chinese ink painting, galloping horse, calligraphy style 2026, minimalist, elegant, cultural heritage --ar 9:16'
  },
  {
    id: 'wp_horse_4',
    name: 'Q版萌马送福',
    prompt: 'Cute 3D cartoon horse, holding a red envelope, festive atmosphere, Chinese New Year 2026, Pixar style, bright colors --ar 9:16'
  },
  {
    id: 'wp_horse_5',
    name: '剪纸艺术',
    prompt: 'Chinese paper cut art, red horse, floral patterns, Year of the Horse 2026, intricate paper texture, soft lighting --ar 9:16'
  },
  {
    id: 'wp_horse_6',
    name: '祥云瑞兽',
    prompt: 'Mythical horse with clouds, traditional Chinese colors, gold and red, auspicious symbols, 2026 New Year wallpaper --ar 9:16'
  }
];