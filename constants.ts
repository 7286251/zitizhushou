import { StyleOption, WallpaperOption, AppTheme, PaintingTool } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  // --- 爆款封面 (Hit Covers - NEW) ---
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
  { id: 'cover_pod_1', name: '播客-复古黑胶', category: '爆款封面', description: '唱片纹理，噪点质感，怀旧字体，Lo-Fi风格' },
  { id: 'cover_pod_2', name: '播客-抽象艺术', category: '爆款封面', description: '抽象几何色块，包豪斯风格，极简设计' },
  { id: 'cover_3d_1', name: '3D-IP盲盒', category: '爆款封面', description: 'OC渲染，盲盒公仔质感，柔光，Q版可爱' },
  { id: 'cover_3d_2', name: '3D-充气文字', category: '爆款封面', description: '气球材质，膨胀感，高反光，糖果色' },
  { id: 'cover_3d_3', name: '3D-液态金属', category: '爆款封面', description: '流动水银，镀铬材质，未来主义，冷酷' },
  { id: 'cover_3d_4', name: '3D-毛绒字体', category: '爆款封面', description: '真实毛发渲染，蓬松感，暖色调，亲和力' },
  
  // --- 2026 马年限定 (Year of Horse Specials) ---
  { id: 'horse_1', name: '马年-剪纸红', category: '马年限定', description: '中国传统剪纸，镂空窗花，喜庆红，年味浓' },
  { id: 'horse_2', name: '马年-鎏金宝马', category: '马年限定', description: '纯金雕塑，红宝石点缀，富贵逼人，财源广进' },
  { id: 'horse_3', name: '马年-水墨奔腾', category: '马年限定', description: '泼墨写意，气势磅礴，中国风，文化底蕴' },
  { id: 'horse_4', name: '马年-赛博神驹', category: '马年限定', description: '机械战马，霓虹光效，未来科幻，2026数字' },
  { id: 'horse_5', name: '马年-Q版萌马', category: '马年限定', description: '皮克斯风格，大眼萌马，福袋元素，可爱喜庆' },
  { id: 'horse_6', name: '马年-国潮插画', category: '马年限定', description: '矢量扁平，高饱和撞色，祥云纹样，潮流传统' },
  { id: 'horse_7', name: '马年-立体春联', category: '马年限定', description: '浮雕金字，红纸底纹，立体阴影，逼真质感' },
  { id: 'horse_8', name: '马年-烟花璀璨', category: '马年限定', description: '夜空背景，绚丽烟花文字，光影粒子，节日氛围' },
  { id: 'horse_9', name: '马年-舞狮马', category: '马年限定', description: '舞狮元素结合马形，毛绒质感，喜庆热闹' },
  { id: 'horse_10', name: '马年-锦鲤运势', category: '马年限定', description: '锦鲤环绕，水波纹，好运符，转运主题' },

  // --- 热门推荐 (Hot - Keep as top level) ---
  { id: 'hot_1', name: '3D毛绒公仔', category: '热门', description: 'Jimeng同款，超软萌毛绒材质，特写镜头，可爱' },
  { id: 'hot_2', name: '流体玻璃', category: '热门', description: '通透多彩玻璃，液体流动感，极简背景，高级感' },
  { id: 'hot_3', name: '龙年/蛇年限定', category: '热门', description: '传统国潮配色，金鳞纹理，祥云点缀，节日氛围' },
  { id: 'hot_4', name: '酸性设计', category: '热门', description: '液态金属，镭射光泽，扭曲字体，Y2K千禧风' },
  { id: 'hot_5', name: '乐高积木', category: '热门', description: '真实乐高拼搭质感，塑料光泽，微距摄影' },
  { id: 'hot_6', name: '皮克斯风格', category: '热门', description: '迪士尼动画渲染，柔光，细腻材质，故事感' },
  { id: 'hot_7', name: '粘土定格', category: '热门', description: '手工粘土质感，指纹细节，微距，童趣' },
  { id: 'hot_8', name: '折纸艺术', category: '热门', description: '多层纸张堆叠，阴影层次，立体感，极简' },
  { id: 'hot_9', name: '蒸汽波', category: '热门', description: '复古雕塑，粉蓝渐变，故障线条，Lo-Fi音乐' },
  { id: 'hot_10', name: '赛博朋克', category: '热门', description: '霓虹夜景，雨水反光，机械义肢，高科技低生活' },

  // --- 游戏电竞 (Esports/Gaming) ---
  { id: 'game_new_1', name: '战队LOGO', category: '游戏电竞', description: '矢量盾牌徽章，猛兽图腾，高对比度，电竞精神' },
  { id: 'game_new_2', name: '游戏封面', category: '游戏电竞', description: '史诗感角色站位，粒子特效，大标题排版，视觉冲击' },
  { id: 'game_new_3', name: '电玩游戏厅', category: '游戏电竞', description: '赛博朋克霓虹，街机屏幕反光，像素颗粒，怀旧氛围' },
  { id: 'game_new_4', name: '语音房头像', category: '游戏电竞', description: '酷炫圆形边框，麦克风元素，动态光圈，社交标识' },
  { id: 'game_new_5', name: '我的世界', category: '游戏电竞', description: '方块像素堆叠，体素风格，草方块材质，3D像素' },
  { id: 'game_new_6', name: 'GTA风格', category: '游戏电竞', description: '美漫硬朗线条，加州落日背景，手绘海报风' },
  { id: 'game_new_7', name: '像素RPG', category: '游戏电竞', description: '8-bit像素风，勇者斗恶龙风格，复古界面' },
  { id: 'esp_1', name: '烈火战队', category: '游戏电竞', description: '火焰特效，霸气狮头，红黑配色' },
  { id: 'esp_2', name: '赛博机械', category: '游戏电竞', description: '机械装甲风格，霓虹光效，未来感' },
  { id: 'esp_3', name: '暗夜刺客', category: '游戏电竞', description: '兜帽神秘人，暗蓝配色，锋利线条' },
  { id: 'esp_4', name: '黄金荣耀', category: '游戏电竞', description: '纯金盾牌徽章，立体浮雕，冠军质感' },
  { id: 'esp_5', name: '故障艺术', category: '游戏电竞', description: 'Glitch Effect，信号干扰，数码破碎' },
  { id: 'esp_6', name: '涂鸦街头', category: '游戏电竞', description: '喷漆涂鸦，鲜艳撞色，嘻哈风格' },
  { id: 'esp_7', name: '绝地求生', category: '游戏电竞', description: '军事风格，迷彩纹理，金属划痕，硬核' },
  { id: 'esp_8', name: '王者荣耀', category: '游戏电竞', description: '国风奇幻，水晶质感，华丽光效，英雄气概' },
  { id: 'esp_9', name: '英雄联盟', category: '游戏电竞', description: '海克斯科技，魔法蓝光，金属镶边，史诗' },
  { id: 'esp_10', name: '瓦罗兰特', category: '游戏电竞', description: '扁平几何，高饱和撞色，利落线条，潮酷' },

  // --- 商业封面 (Commercial/Cover) ---
  { id: 'comm_1', name: 'C4D电商大促', category: '商业封面', description: '红金配色，气球膨胀质感，促销海报首选' },
  { id: 'comm_2', name: '磨砂亚克力', category: '商业封面', description: '半透明磨砂质感，柔和漫射光，现代极简' },
  { id: 'comm_3', name: '金属拉丝', category: '商业封面', description: '不锈钢拉丝纹理，工业冷峻，硬朗' },
  { id: 'comm_4', name: 'OC渲染', category: '商业封面', description: 'Octane渲染器质感，漫射光，高洁净度' },
  { id: 'comm_5', name: '黑胶唱片', category: '商业封面', description: '黑色同心圆纹理，反光，复古音乐' },
  { id: 'comm_6', name: '霓虹灯管', category: '商业封面', description: '发光玻璃管，暗夜赛博朋克背景' },
  { id: 'comm_7', name: '低面多边形', category: '商业封面', description: 'Low Poly风格，棱角分明，极简几何' },
  { id: 'comm_8', name: '极地冰封', category: '商业封面', description: '半透明蓝冰，裂纹细节，寒气缭绕' },
  { id: 'comm_9', name: '丝绸充气', category: '商业封面', description: '丝绸面料的充气效果，柔和光泽，奢华感' },
  { id: 'comm_10', name: '陶瓷釉面', category: '商业封面', description: '光滑白瓷，景德镇青花韵味，高光反射' },
  { id: 'comm_11', name: '全息镭射', category: '商业封面', description: '幻彩镭射纸，彩虹光泽，潮流包装' },
  { id: 'comm_12', name: '奢华黑金', category: '商业封面', description: '哑光黑背景，亮金字体，高级感，VIP' },
  { id: 'comm_13', name: '极简木纹', category: '商业封面', description: '原木质感，自然纹理，日式极简，环保' },
  { id: 'comm_14', name: '大理石纹', category: '商业封面', description: '白色大理石，灰色纹路，冷淡风，高端' },
  { id: 'comm_15', name: '牛皮纸风', category: '商业封面', description: '复古牛皮纸，粗糙质感，手作感，怀旧' },

  // --- 趣味社交 (Fun/Social) ---
  { id: 'fun_1', name: '3D毛绒', category: '趣味社交', description: '超软萌毛绒材质，特写镜头，可爱' },
  { id: 'fun_2', name: '软糖质感', category: '趣味社交', description: '半透明果冻，表面糖霜，Q弹诱人' },
  { id: 'fun_3', name: '充气气球', category: '趣味社交', description: '高反光塑料薄膜，褶皱细节，粉嫩配色' },
  { id: 'fun_4', name: '芝士拉丝', category: '趣味社交', description: '融化的黄金芝士，拉丝效果，诱人' },
  { id: 'fun_5', name: '奶油蛋糕', category: '趣味社交', description: '细腻奶油裱花，水果点缀，甜美' },
  { id: 'fun_6', name: '云朵棉花', category: '趣味社交', description: '洁白柔软云朵，蓝天背景，蓬松轻盈' },
  { id: 'fun_7', name: '粘土风', category: '趣味社交', description: '橡皮泥材质，指纹细节，定格动画风格' },
  { id: 'fun_8', name: '毛线编织', category: '趣味社交', description: '粗毛线针织纹理，温暖居家感' },
  { id: 'fun_9', name: '果冻布丁', category: '趣味社交', description: 'Q弹晃动，半透明，水果夹心' },
  { id: 'fun_10', name: '粉笔涂鸦', category: '趣味社交', description: '黑板背景，粉笔粉尘质感，手写风' },
  { id: 'fun_11', name: '乐高拼搭', category: '趣味社交', description: '积木颗粒，塑料光泽，玩具感' },
  { id: 'fun_12', name: '像素拼豆', category: '趣味社交', description: '融化塑料豆，像素点阵，手工感' },
  { id: 'fun_13', name: '霓虹灯牌', category: '趣味社交', description: '弯曲灯管，发光效果，夜市氛围' },
  { id: 'fun_14', name: '水彩晕染', category: '趣味社交', description: '水彩颜料，纸张纹理，艺术气息' },
  { id: 'fun_15', name: '蜡笔手绘', category: '趣味社交', description: '粗糙蜡笔触感，儿童画风，天真烂漫' },

  // --- 经典艺术 (Classic) ---
  { id: 'cls_1', name: '鎏金大字', category: '经典艺术', description: '黑金配色，毛笔飞白，洒金粉，霸气' },
  { id: 'cls_2', name: '宋锦织造', category: '经典艺术', description: '传统织锦纹理，刺绣细节，华贵典雅' },
  { id: 'cls_3', name: '青铜铭文', category: '经典艺术', description: '青铜器绿锈质感，饕餮纹装饰，历史厚重感' },
  { id: 'cls_4', name: '剪纸艺术', category: '经典艺术', description: '红纸镂空，层叠阴影，非遗文化风格' },
  { id: 'cls_5', name: '水墨烟云', category: '经典艺术', description: '文字化作烟雾缭绕，黑白水墨，意境深远' },
  { id: 'cls_6', name: '敦煌飞天', category: '经典艺术', description: '岩彩配色，飘带缠绕，金箔剥落质感' },
  { id: 'cls_7', name: '珐琅彩', category: '经典艺术', description: '景泰蓝工艺，金属掐丝，鲜艳填色' },
  { id: 'cls_8', name: '故宫红墙', category: '经典艺术', description: '朱红墙面背景，琉璃瓦质感文字，庄重' },
  { id: 'cls_9', name: '火焰文字', category: '经典艺术', description: '燃烧的烈火，火星飞溅，热浪滚滚' },
  { id: 'cls_10', name: '森系植被', category: '经典艺术', description: '文字由藤蔓、苔藓、花朵构成，生机勃勃' },
  { id: 'cls_11', name: '深海液态', category: '经典艺术', description: '悬浮水珠，深蓝海洋背景，气泡上升' },
  { id: 'cls_12', name: '雷电能量', category: '经典艺术', description: '文字由闪电构成，高亮辉光，充满能量' },
  { id: 'cls_13', name: '极光幻境', category: '经典艺术', description: '极光流线，星空背景，梦幻色彩' },
  { id: 'cls_14', name: '蒸汽机械', category: '经典艺术', description: '黄铜齿轮，管道，工业革命风格' },
  { id: 'cls_15', name: '浮世绘', category: '经典艺术', description: '日本版画风格，海浪纹理，古朴色彩' },
];

export const PAINTING_TOOLS: PaintingTool[] = [
  // --- 新增工具 (New Requests) ---
  {
    id: 'tool_run',
    name: 'runninghub',
    description: '云端ComfyUI/Stable Diffusion部署平台，高性能显卡。',
    icon: '⚡',
    url: 'https://www.runninghub.cn/',
    tag: '国内工具',
    isNew: true
  },
  {
    id: 'tool_oii',
    name: 'OiiOii',
    description: '新锐AI绘画工具，风格多样，简单易上手。',
    icon: '🐈',
    url: 'https://www.oiioii.ai/',
    tag: '国内工具',
    isNew: true
  },
  {
    id: 'tool_rev',
    name: '以图反推 (ImageToPrompt)',
    description: '专业的图片转提示词工具，精准还原画面描述。',
    icon: '🔍',
    url: 'https://imagetoprompt.org/zh',
    tag: '国外工具-',
    isNew: true
  },
  {
    id: 'tool_sora',
    name: 'sora2',
    description: 'OpenAI视频生成模型Sora官网，目前仅展示。',
    icon: '🎥',
    url: 'https://sora.chatgpt.com/',
    tag: '国外工具-需要梯子工具',
    isNew: true
  },
  {
    id: 'tool_baidu',
    name: '百度AI (Miaobi)',
    description: '百度官方出品，一格文生图创作平台，中文理解能力强。',
    icon: '🐾',
    url: 'https://miaobi.baidu.com/',
    tag: '国内工具',
    isNew: true
  },
  {
    id: 'tool_gaga',
    name: 'GaGaAI',
    description: '独特的AI头像与风格化生成工具。',
    icon: '👾',
    url: 'https://gaga.art/zh/app/avatar',
    tag: '国外工具-需要梯子工具',
    isNew: true
  },
  {
    id: 'tool_hf',
    name: 'Hugging Face',
    description: '全球最大的AI模型开源社区，海量Demo在线体验。',
    icon: '🤗',
    url: 'https://huggingface.co/spaces',
    tag: '国外工具-需要梯子工具',
    isNew: true
  },
  {
    id: 'tool_vpn',
    name: 'BigBearVPN',
    description: '稳定高速的网络辅助工具，助力访问海外AI资源。',
    icon: '🐻',
    url: 'https://bigbearvpn.sodtool.com/',
    tag: '纯净梯子工具',
    isNew: true
  },
  {
    id: 'tool_creatify',
    name: '创一AI',
    description: '专注于视频剧本生成的AI工具，智能营销助手。',
    icon: '📝',
    url: 'https://www.creatifyone.com/',
    tag: '国内剧本AI',
    isNew: true
  },
  
  // --- 综合/大模型平台 ---
  {
    id: 'tool_1',
    name: '即梦 (Dreamina)',
    description: '字节跳动旗下AI创作平台，文生图、视频生成效果业界领先。',
    icon: '🎨',
    url: 'https://jimeng.jianying.com/',
    tag: '国内工具'
  },
  {
    id: 'tool_2',
    name: '豆包 (Doubao)',
    description: '全能AI助手，内置DALL-E 3级图像生成，简单好用。',
    icon: '🥟',
    url: 'https://www.doubao.com/',
    tag: '国内工具'
  },
  {
    id: 'tool_3',
    name: '通义万相',
    description: '阿里通义实验室出品，擅长中国风、写实风格图像生成。',
    icon: '🖌️',
    url: 'https://tongyi.aliyun.com/wanxiang/',
    tag: '国内工具'
  },
  {
    id: 'tool_4',
    name: 'LiblibAI',
    description: '国内最大的Stable Diffusion模型社区与在线生成平台。',
    icon: '🚀',
    url: 'https://www.liblib.art/',
    tag: '国内工具'
  },
  {
    id: 'tool_5',
    name: '堆友 (Duiyou)',
    description: '阿里出品的设计师AI工具，支持3D素材生成、场景渲染。',
    icon: '🧊',
    url: 'https://d.design/',
    tag: '国内工具'
  },
  {
    id: 'tool_6',
    name: '无界AI',
    description: '专注于二次元与国潮风格的AI绘画平台，社区活跃。',
    icon: '♾️',
    url: 'https://www.wujieai.com/',
    tag: '国内工具'
  },
  
  // --- 视频生成 ---
  {
    id: 'vid_1',
    name: '可灵 AI (Kling)',
    description: '快手出品，国内视频生成SOTA，支持文生视频、图生视频。',
    icon: '🎬',
    url: 'https://kling.kuaishou.com/',
    tag: '国内工具'
  },
  {
    id: 'vid_2',
    name: '海螺 AI',
    description: 'MiniMax出品，视频生成流畅，角色一致性保持较好。',
    icon: '🐚',
    url: 'https://hailuoai.com/',
    tag: '国内工具'
  },
  {
    id: 'vid_3',
    name: 'PixVerse',
    description: '高质量视频生成平台，支持4K分辨率与精细控制。',
    icon: '🎥',
    url: 'https://pixverse.ai/',
    tag: '国内工具'
  },
  {
    id: 'vid_4',
    name: 'Vidu',
    description: '生数科技出品，长视频生成能力强，动态自然。',
    icon: '📹',
    url: 'https://www.vidu.studio/',
    tag: '国内工具'
  },

  // --- 效率/垂直工具 ---
  {
    id: 'eff_1',
    name: 'Kimi 智能助手',
    description: '月之暗面出品，超长上下文，虽主打文本但分析能力极强。',
    icon: '🌙',
    url: 'https://kimi.moonshot.cn/',
    tag: '国内工具'
  },
  {
    id: 'eff_2',
    name: '智谱清言',
    description: '清华系GLM模型，支持CogView绘图，综合能力强。',
    icon: '🧠',
    url: 'https://chatglm.cn/',
    tag: '国内工具'
  },
  {
    id: 'eff_3',
    name: '腾讯混元',
    description: '腾讯全链路AI大模型，支持广告级图像生成。',
    icon: '🐧',
    url: 'https://hunyuan.tencent.com/',
    tag: '国内工具'
  },
  {
    id: 'eff_4',
    name: '稿定设计AI',
    description: '电商设计神器，AI一键海报、抠图、换背景。',
    icon: '📐',
    url: 'https://www.gaoding.com/',
    tag: '国内工具'
  },
  {
    id: 'eff_5',
    name: '美图设计室',
    description: '美图秀秀出品，AI商品图、模特试衣、LOGO设计。',
    icon: '💅',
    url: 'https://design.meitu.com/',
    tag: '国内工具'
  },
  {
    id: 'eff_6',
    name: '天工 AI',
    description: '昆仑万维出品，拥有强大的搜索与多模态能力。',
    icon: '🌌',
    url: 'https://www.tiangong.cn/',
    tag: '国内工具'
  },
  {
    id: 'eff_7',
    name: '讯飞星火',
    description: '科大讯飞出品，语音交互与图像理解能力出色。',
    icon: '🔥',
    url: 'https://xinghuo.xfyun.cn/',
    tag: '国内工具'
  }
];

export const WALLPAPER_PRESETS: WallpaperOption[] = [
  // 马年限定 - 概念
  { 
    id: 'wp_horse_1', 
    name: '2026 天马行空', 
    prompt: '2026马年壁纸，一匹通体洁白、背生双翼的独角兽（天马）在云端飞驰，脚下是绚丽的彩虹，背景是金色的“2026”字样云层，梦幻童话风格，8K分辨率，柔光渲染。' 
  },
  { 
    id: 'wp_horse_2', 
    name: '2026 烈焰赤兔', 
    prompt: '2026马年壁纸，一匹全身燃烧着赤红火焰的战马，肌肉线条刚劲有力，奔跑在黑色的岩石地面上，身后拖出长长的火焰轨迹，形成“2026”的字样，史诗感，电影级特效。' 
  },
  { 
    id: 'wp_horse_3', 
    name: '2026 赛博机械马', 
    prompt: '2026未来风格，由银色液态金属和蓝色霓虹灯管构成的机械马，在赛博朋克城市的街道上狂奔，背景高楼大厦显示着“Happy New Year 2026”的全息广告，科技感，光线追踪。' 
  },
  { 
    id: 'wp_horse_4', 
    name: '2026 水墨奔马', 
    prompt: '中国传统水墨画风格，徐悲鸿风格奔马图，笔触苍劲有力，马鬃飞扬，背景是淡淡的群山和红色的印章“2026”，留白艺术，高雅大气。' 
  },
  { 
    id: 'wp_horse_5', 
    name: '2026 黄金战马', 
    prompt: '一匹纯金打造的雕塑马，镶嵌着红宝石眼睛，站立在红色的丝绸之上，周围堆满了金元宝和铜钱，寓意马到成功、财源广进，3D超写实，贵金属质感。' 
  },
  
  // 更多风格
  {
     id: 'wp_horse_6',
     name: '2026 繁花骏马',
     prompt: '主体是由无数色彩斑斓的鲜花组成的马的剪影，背景是清新的草地和蓝天，阳光透过花瓣洒下斑驳光影，数字“2026”由藤蔓编织而成，森系，清新自然。'
  },
  {
     id: 'wp_horse_7',
     name: '2026 剪纸艺术',
     prompt: '中国非遗剪纸风格，红色的剪纸马，身上有精美的镂空花纹（牡丹、福字），贴在磨砂玻璃窗上，背景是透过玻璃看到的除夕烟花，温馨，年味浓郁。'
  },
  {
     id: 'wp_horse_8',
     name: '2026 星空独角兽',
     prompt: '在浩瀚的宇宙星空中，一匹由星尘和星光汇聚而成的透明马，体内仿佛有银河流动，脚踏星河，远处是用恒星排列成的“2026”，唯美，震撼。'
  },
  {
     id: 'wp_horse_9',
     name: '2026 Q版小木马',
     prompt: '温馨的儿童房背景，一个精致的手工旋转木马音乐盒，木马上坐着可爱的生肖马玩偶，写着“2026”的标签，暖黄色灯光，皮克斯动画风格，充满童趣。'
  },
  {
     id: 'wp_horse_10',
     name: '2026 极简线条',
     prompt: '极简主义设计，仅用几条流畅的金色线条勾勒出马奔跑的动态轮廓和“2026”字样，背景为纯正的中国红，高级感，平面设计，矢量图。'
  },
  {
     id: 'wp_horse_11',
     name: '2026 蒸汽朋克',
     prompt: '蒸汽朋克风格，由黄铜齿轮、蒸汽管道和皮革组成的机械马，喷出白色的蒸汽，背景是维多利亚时代的工业城市，复古色调，机械美学。'
  },
  {
     id: 'wp_horse_12',
     name: '2026 霓虹光影',
     prompt: '黑暗背景中，通过长曝光摄影光绘出的马的形状，线条流光溢彩（粉色、青色），光轨形成“2026”的残影，动态模糊，视觉冲击力。'
  },
  // --- 新增 2026 风格 (New Additions) ---
  {
     id: 'wp_horse_13',
     name: '2026 青花瓷韵',
     prompt: '2026马年壁纸，一只由精美青花瓷构成的马，表面绘制着传统的山水纹样，釉面光滑反光，背景是淡雅的水墨晕染，古典雅致，中国风。'
  },
  {
     id: 'wp_horse_14',
     name: '2026 机甲高达',
     prompt: '2026高达模型风格，红白蓝经典配色的机甲战马，机械细节丰富，装甲分色，站立在格纳库中，背景是巨大的“2026”编号，日系科幻动漫风。'
  },
  {
     id: 'wp_horse_15',
     name: '2026 璀璨水晶',
     prompt: '2026马年壁纸，一只通体透明的钻石水晶马，折射着七彩光芒，背景是深邃的丝绒蓝，散落着细碎的宝石，“2026”由水晶拼接而成，奢华高贵。'
  },
  {
     id: 'wp_horse_16',
     name: '2026 苏绣锦缎',
     prompt: '中国传统苏绣风格，细腻的丝线绣出的骏马图，针脚清晰可见，丝绸光泽感，背景是金色的绸缎，寓意前程似锦，非遗文化。'
  },
  {
     id: 'wp_horse_17',
     name: '2026 乐高积木',
     prompt: '由乐高积木拼搭而成的红色小马，背景是乐高城市，色彩鲜艳，塑料质感逼真，微距摄影，景深效果，充满童趣。'
  },
  {
     id: 'wp_horse_18',
     name: '2026 传统皮影',
     prompt: '中国皮影戏风格，色彩艳丽的透明兽皮雕刻马，关节连接处清晰，幕布后透出暖黄色的灯光，展现民间艺术魅力，2026新年主题。'
  },
  {
     id: 'wp_horse_19',
     name: '2026 梵高星空',
     prompt: '梵高《星月夜》油画风格，旋涡状的笔触构成奔跑的马，蓝黄色调，星空背景，充满后印象派的艺术气息，2026艺术壁纸。'
  },
  {
     id: 'wp_horse_20',
     name: '2026 敦煌神骏',
     prompt: '敦煌壁画风格，九色鹿配色的神马，脚踏祥云，飘带飞舞，岩彩质感，斑驳的墙面纹理，沉稳大气，历史厚重感。'
  },
  {
     id: 'wp_horse_21',
     name: '2026 浮世绘浪',
     prompt: '日本浮世绘风格，葛饰北斋《神奈川冲浪里》，巨大的海浪卷起形成马的形状，背景是富士山和红日，强烈的视觉冲击，2026。'
  },
  {
     id: 'wp_horse_22',
     name: '2026 像素世界',
     prompt: '8-bit像素艺术风格，像素点构成的奔跑小马，复古游戏界面，背景是像素化的蓝天白云和金币，怀旧电子风，2026 START。'
  }
];

export const THEME_CONFIG = {
  [AppTheme.NEW_YEAR_2026]: {
    name: '2026马年限定',
    // brighter, more "wealthy" China Red
    bgClass: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF4D4D] via-[#DC143C] to-[#8B0000]',
    // Gold accented card, festive and premium
    cardClass: 'bg-[#FFF9F0] border-2 border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.4)] shadow-red-900/40 rounded-2xl',
    textClass: 'text-[#8B0000]', // Deep red text
    buttonClass: 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B0000] font-bold border-2 border-[#FFFFE0] hover:from-[#FFA500] hover:to-[#FFD700] shadow-lg transform transition-transform active:scale-95',
    titleEffect: 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[#FFD700]', // Gold text
    accentColor: 'text-[#FFD700]'
  },
  [AppTheme.RETRO_DESKTOP]: {
    name: '复古窗口',
    bgClass: 'bg-[#ffcdd2] bg-opacity-50 relative', 
    cardClass: 'bg-[#e0f7fa] border-4 border-pink-300 shadow-[8px_8px_0px_rgba(255,182,193,1)] rounded-none',
    textClass: 'text-blue-800 font-mono',
    buttonClass: 'bg-white border-2 border-blue-400 shadow-[4px_4px_0px_#2196f3] active:translate-y-1 active:shadow-none hover:bg-blue-50 text-blue-600',
    titleEffect: '',
    accentColor: 'text-pink-500'
  },
  [AppTheme.PINK_PLUSH]: {
    name: '粉色毛绒',
    bgClass: 'bg-pink-200',
    cardClass: 'bg-pink-50 border-4 border-pink-300 rounded-3xl shadow-xl',
    textClass: 'text-pink-600',
    buttonClass: 'bg-pink-400 text-white rounded-full shadow-lg hover:bg-pink-300 transition-all border-4 border-white',
    titleEffect: 'drop-shadow-md',
    accentColor: 'text-pink-400'
  }
};