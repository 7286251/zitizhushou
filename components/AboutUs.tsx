import React from 'react';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';

interface Props {
  theme: AppTheme;
}

const AboutUs: React.FC<Props> = ({ theme }) => {
  const config = THEME_CONFIG[theme];

  const features = [
    { icon: '✍️', title: '艺术字创作', desc: '内置数百种爆款风格，一键生成高质量MJ/SD提示词。' },
    { icon: '🔍', title: '以图反推', desc: '深度分析图片内容，精准还原画面描述，支持中英双语。' },
    { icon: '🤖', title: '智能体', desc: '专属AI提示词助手，通过对话优化您的创意灵感。' },
    { icon: '🧧', title: '2026新年', desc: '特别定制马年限定壁纸库与节日主题UI，喜迎新春。' },
    { icon: '🛠️', title: '工具合集', desc: '精选国内外优质AI绘画工具与资源，助你事半功倍。' },
  ];

  return (
    <div className={`p-6 md:p-10 ${config.cardClass} h-full overflow-y-auto custom-scrollbar`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block p-4 rounded-full bg-white/50 shadow-sm mb-4">
             <span className="text-5xl animate-bounce-slow inline-block">🎨</span>
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${config.textClass}`}>关于小渝児艺术字生成器</h2>
          <p className="text-gray-500">让AI绘画提示词创作变得简单、有趣、高效。</p>
        </div>

        <div className="space-y-8">
          <section>
            <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${config.textClass} opacity-80`}>项目简介</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              本站致力于为AI绘画爱好者、设计师及自媒体创作者提供最便捷的提示词生成服务。无论您是需要电商大促的3D立体字，还是炫酷的游戏电竞封面，亦或是充满年味的节日海报，这里都能帮您快速找到灵感并生成精准的Prompt。
            </p>
            <p className="text-gray-700 leading-relaxed">
              我们特别推出了“2026马年”限定主题，融合了传统文化与现代科技美学，祝愿每一位使用者在AI创作的道路上马到成功，创意无限！
            </p>
          </section>

          <section>
            <h3 className={`text-xl font-bold mb-4 border-b pb-2 ${config.textClass} opacity-80`}>核心功能</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feat, idx) => (
                <div key={idx} className="bg-white/60 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start space-x-3">
                  <span className="text-2xl">{feat.icon}</span>
                  <div>
                    <h4 className="font-bold text-gray-800">{feat.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/40 rounded-xl p-6 border border-white/50">
            <h3 className={`text-xl font-bold mb-4 ${config.textClass} opacity-80`}>联系作者</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-gray-700">
                <p className="mb-2">如果您有任何建议、合作意向或发现BUG，欢迎联系我：</p>
                <div className="flex items-center gap-2 font-mono font-bold text-lg bg-white/80 px-3 py-1 rounded inline-block shadow-sm">
                   <span className="text-blue-500">QQ:</span> 307779523
                </div>
              </div>
              <div className="text-center">
                 <div className="text-xs text-gray-400 mb-1">Created with ❤️ by 小渝児</div>
                 <div className="text-xs text-gray-400">Version 2026.1.0 (Beta)</div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400">
          © 2024-2026 小渝児艺术字生成器 All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default AboutUs;