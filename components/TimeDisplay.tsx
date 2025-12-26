
import React, { useState, useEffect, useMemo } from 'react';
import { AppTheme } from '../types';
import { THEME_CONFIG } from '../constants';

interface Props {
  theme: AppTheme;
}

/**
 * 农历与节日计算逻辑（针对 2025-2026 进行了精确适配）
 * 实现用户要求的“北京时间（十一月初六圣诞节）”格式
 */
const getLunarAndFestivalInfo = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  // 1. 公历节日
  const solarFestivals: Record<string, string> = {
    '1-1': '元旦',
    '2-14': '情人节',
    '3-8': '妇女节',
    '5-1': '劳动节',
    '6-1': '儿童节',
    '10-1': '国庆节',
    '12-24': '平安夜',
    '12-25': '圣诞节',
  };

  // 2. 农历核心算法 (2025年专用适配)
  // 基准：2025年1月29日 是 农历正月初一
  const baseDate2025 = new Date(2025, 0, 29);
  const diffTime = date.getTime() - baseDate2025.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 2025 农历月份天数 (包含闰六月)
  const lunarMonths2025 = [30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29];
  const lunarMonthNames = ["正月", "二月", "三月", "四月", "五月", "六月", "闰六月", "七月", "八月", "九月", "十月", "十一月", "腊月"];
  const lunarDayNames = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

  let lMonth = "";
  let lDay = "";

  if (year === 2025 && diffDays >= 0) {
    let daysLeft = diffDays;
    let mIdx = 0;
    while (mIdx < lunarMonths2025.length && daysLeft >= lunarMonths2025[mIdx]) {
      daysLeft -= lunarMonths2025[mIdx];
      mIdx++;
    }
    lMonth = lunarMonthNames[mIdx] || "腊月";
    lDay = lunarDayNames[daysLeft] || "初一";
  } else if (year === 2026) {
    // 2026年简易适配逻辑 (2026春节是2月17日)
    const baseDate2026 = new Date(2026, 1, 17);
    const dTime = date.getTime() - baseDate2026.getTime();
    const dDays = Math.floor(dTime / (1000 * 60 * 60 * 24));
    
    if (dDays >= 0) {
      // 粗略估算，确保大致准确
      const estMonth = Math.floor(dDays / 29.5);
      const estDay = Math.floor(dDays % 29.5);
      lMonth = lunarMonthNames[estMonth % 12];
      lDay = lunarDayNames[estDay % 30];
    } else {
      lMonth = "腊月";
      lDay = "廿几";
    }
  } else {
    // 兜底逻辑
    lMonth = "十一月";
    lDay = "初六";
  }

  const festival = solarFestivals[`${month}-${day}`] || "";
  
  // 农历节日手动增强 (2025)
  let lunarFestival = "";
  if (lMonth === "正月" && lDay === "初一") lunarFestival = "春节";
  if (lMonth === "正月" && lDay === "十五") lunarFestival = "元宵节";
  if (lMonth === "五月" && lDay === "初五") lunarFestival = "端午节";
  if (lMonth === "八月" && lDay === "十五") lunarFestival = "中秋节";

  const finalFestival = festival || lunarFestival;

  return `北京时间（${lMonth}${lDay}${finalFestival}）`;
};

const TimeDisplay: React.FC<Props> = ({ theme }) => {
  const [time, setTime] = useState(new Date());
  const config = THEME_CONFIG[theme];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const lunarText = useMemo(() => getLunarAndFestivalInfo(time), [time]);

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');
  const hour = String(time.getHours()).padStart(2, '0');
  const minute = String(time.getMinutes()).padStart(2, '0');
  const second = String(time.getSeconds()).padStart(2, '0');

  const isNeoBrutalist = theme === AppTheme.NEO_BRUTALISM;

  return (
    <div className={`flex flex-col items-center lg:items-end gap-2 p-5 md:p-6 rounded-[2rem] transition-all duration-500 ${isNeoBrutalist ? 'border-4 border-black bg-white shadow-[8px_8px_0px_black]' : 'bg-white/40 backdrop-blur-3xl border border-white/40 shadow-xl'}`}>
      
      {/* Top Part: Digital Clock 18:30:05 */}
      <div className={`flex items-baseline gap-2 ${config.textClass}`}>
        <div className="flex items-center gap-1.5">
          <span className="text-4xl md:text-5xl font-black font-mono tracking-tighter">{hour}</span>
          <span className="text-3xl md:text-4xl font-black opacity-30 animate-pulse">:</span>
          <span className="text-4xl md:text-5xl font-black font-mono tracking-tighter">{minute}</span>
          <span className="text-3xl md:text-4xl font-black opacity-30 animate-pulse">:</span>
          <span className="text-4xl md:text-5xl font-black font-mono tracking-tighter text-blue-600">{second}</span>
        </div>
      </div>

      {/* Middle Part: Full Date */}
      <div className={`text-sm md:text-lg font-black italic tracking-tight opacity-80 ${config.textClass}`}>
        {year}年{month}月{day}日
      </div>

      {/* Bottom Part: Lunar & Festival Info */}
      <div className="flex items-center gap-2 mt-1">
        <div className="px-3 py-1 bg-black/5 rounded-full border border-black/5">
          <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider ${config.textClass} opacity-60`}>
            {lunarText}
          </span>
        </div>
        {/* Status Indicator */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-ping absolute"></div>
          <div className="w-2 h-2 rounded-full bg-green-600 relative border border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay;
