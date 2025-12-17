import React, { useState, useRef, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { readPsd } from 'ag-psd';
import { THEME_CONFIG } from '../constants';
import { AppTheme } from '../types';

interface Props {
  theme: AppTheme;
}

type LayerType = 'text' | 'image';
type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'difference' | 'exclusion';

// --- Types ---

interface FXOptions {
  enableGradient: boolean;
  gradientColors: string[];
  gradientAngle: number;
  gradientType?: 'linear' | 'radial';
  enableShadow: boolean;
  shadowColor: string;
  shadowDistance: number;
  shadowBlur: number;
  shadowAngle: number;
  enableGlow: boolean;
  glowColor: string;
  glowBlur: number;
  enableBevel: boolean; 
  enableStroke: boolean;
  strokeColor: string;
  strokeWidth: number;
}

interface CanvasElement {
  id: string;
  type: LayerType;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  blendMode: BlendMode;
  isLocked: boolean;
  isVisible: boolean;
  // Text Specific
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  letterSpacing?: number;
  lineHeight?: number;
  // 3D Transform
  rotateX?: number;
  rotateY?: number;
  is3d?: boolean;
  depth?: number;
  depthColor?: string;
  // FX Container
  fx?: FXOptions;
  // Basic Color
  color?: string;
  // Image Specific
  src?: string;
  width?: number;
  height?: number;
  // Filters
  filterBlur?: number;
  filterBrightness?: number;
  filterContrast?: number;
  filterHue?: number;
  filterSaturate?: number;
}

const DEFAULT_FX: FXOptions = {
  enableGradient: false,
  gradientColors: ['#FFD700', '#FF8C00'],
  gradientAngle: 45,
  gradientType: 'linear',
  enableShadow: true,
  shadowColor: '#000000',
  shadowDistance: 5,
  shadowBlur: 5,
  shadowAngle: 45,
  enableGlow: false,
  glowColor: '#00FFFF',
  glowBlur: 10,
  enableBevel: false,
  enableStroke: false,
  strokeColor: '#000000',
  strokeWidth: 2,
};

const DEFAULT_TEXT: CanvasElement = {
  id: '',
  type: 'text',
  text: 'PixeLlab',
  x: 0, // Center relative
  y: 0, // Center relative
  rotation: 0,
  scale: 1,
  opacity: 1,
  blendMode: 'normal',
  isLocked: false,
  isVisible: true,
  fontSize: 120,
  color: '#FFFFFF',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  letterSpacing: 0,
  lineHeight: 1,
  rotateX: 0,
  rotateY: 0,
  is3d: false,
  depth: 0,
  depthColor: '#333333',
  fx: { ...DEFAULT_FX },
  filterBlur: 0,
  filterBrightness: 100,
  filterContrast: 100,
  filterHue: 0,
  filterSaturate: 100,
};

const PRESETS = [
  { name: '霓虹蓝', style: { color: '#ffffff', fx: { ...DEFAULT_FX, enableGlow: true, glowColor: '#00ffff', glowBlur: 20, enableStroke: true, strokeColor: '#00ffff', strokeWidth: 2 } } },
  { name: '赛博红', style: { color: '#ffffff', fx: { ...DEFAULT_FX, enableGlow: true, glowColor: '#ff0055', glowBlur: 20, enableStroke: true, strokeColor: '#ff0055', strokeWidth: 2 } } },
  { name: '黑金', style: { color: '#ffd700', fx: { ...DEFAULT_FX, enableGradient: true, gradientColors: ['#ffd700', '#b8860b'], enableBevel: true, enableShadow: true, shadowDistance: 4 } } },
  { name: '极简白', style: { color: '#333333', fx: { ...DEFAULT_FX, enableShadow: false, enableStroke: false } } },
  { name: '复古', style: { color: '#ff6f61', fx: { ...DEFAULT_FX, enableStroke: true, strokeColor: '#6b5b95', strokeWidth: 3, enableShadow: true, shadowDistance: 6, shadowColor: '#000' } } },
  { name: '火焰', style: { color: '#ff4500', fx: { ...DEFAULT_FX, enableGlow: true, glowColor: '#ffff00', glowBlur: 15, enableShadow: true, shadowColor: '#8b0000' } } },
  { name: '冰霜', style: { color: '#e0ffff', fx: { ...DEFAULT_FX, enableGlow: true, glowColor: '#00bfff', glowBlur: 10, enableBevel: true } } },
  { name: '森林', style: { color: '#228b22', fx: { ...DEFAULT_FX, enableStroke: true, strokeColor: '#006400', strokeWidth: 2, enableShadow: true, shadowDistance: 3 } } },
];

const Toast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  useEffect(() => { const t = setTimeout(onClose, 2000); return () => clearTimeout(t); }, [onClose]);
  return <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-black/80 text-white px-6 py-2 rounded-full shadow-2xl backdrop-blur-md animate-pop pointer-events-none border border-white/10">✨ {message}</div>;
};

// --- SVG Icons ---
const Icon = {
  AddText: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>,
  AddImage: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Brush: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13.5c2.5 0 4-1.5 4-4a4 4 0 0 0-4-4c-2.5 0-4 1.5-4 4 0 1 .5 2 1.5 2.5"/><path d="M14.5 12l-8.5 8.5a2.1 2.1 0 0 1-3 0 2.1 2.1 0 0 1 0-3L11.5 9"/></svg>,
  Import: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Export: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Layers: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Edit: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  FX: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Lock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Unlock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
};

const PixeLlabEditor: React.FC<Props> = ({ theme }) => {
  // --- State ---
  // Elements are positioned relative to the center of the screen (0,0)
  const [elements, setElements] = useState<CanvasElement[]>([{ ...DEFAULT_TEXT, id: '1', fx: { ...DEFAULT_FX, enableGradient: true } }]);
  const [selectedId, setSelectedId] = useState<string | null>('1');
  const [background, setBackground] = useState<string>('#1a1a1a');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'property' | 'fx' | 'layers' | 'presets'>('property');
  const [activeTool, setActiveTool] = useState<'move' | 'brush'>('move');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Brush State
  const [brushSize, setBrushSize] = useState(10);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [brushOpacity, setBrushOpacity] = useState(1);
  const [brushLibrary, setBrushLibrary] = useState<string[]>([]);
  const [activeBrushImg, setActiveBrushImg] = useState<HTMLImageElement | null>(null);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const psdInputRef = useRef<HTMLInputElement>(null);
  const brushInputRef = useRef<HTMLInputElement>(null);
  
  // Interaction Refs
  const isDrawingRef = useRef(false);
  const pointsRef = useRef<{ x: number, y: number }[]>([]);
  const touchStartDist = useRef<number>(0);
  const startScale = useRef<number>(1);
  const startFontSize = useRef<number>(120);
  const dragStartRef = useRef<{ x: number, y: number } | null>(null);
  const dragElementStartPos = useRef<{ x: number, y: number } | null>(null);

  const showToast = (msg: string) => setToastMsg(msg);
  const selectedElement = elements.find(el => el.id === selectedId);

  // --- Initial Setup ---
  useEffect(() => {
    // No strict bounds setup needed as we are "canvas-less"
  }, []);

  // --- Helpers ---
  const updateSelected = (updates: Partial<CanvasElement>) => {
    if (!selectedId) return;
    setElements(prev => prev.map(el => el.id === selectedId ? { ...el, ...updates } : el));
  };

  const updateSelectedFX = (updates: Partial<FXOptions>) => {
    if (!selectedId) return;
    setElements(prev => prev.map(el => el.id === selectedId ? { ...el, fx: { ...el.fx!, ...updates } } : el));
  };
  
  const updateElementById = (id: string, updates: Partial<CanvasElement>) => {
    setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  // --- Core Handlers ---
  const handleAddText = () => {
    const newId = Date.now().toString();
    // Add text slightly offset from current pan center so it's visible
    const centerX = -pan.x / zoom;
    const centerY = -pan.y / zoom;
    setElements([...elements, { ...DEFAULT_TEXT, id: newId, x: centerX, y: centerY }]);
    setSelectedId(newId);
    setActiveTab('property');
    setActiveTool('move');
    showToast('文本已添加');
  };

  const handleImportImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        const img = new Image();
        img.src = ev.target?.result as string;
        img.onload = () => {
            let w = img.width, h = img.height;
            const max = 600;
            if (w > max || h > max) { const r = w/h; if (r > 1) { w = max; h = max/r; } else { h = max; w = max*r; } }
            const centerX = -pan.x / zoom;
            const centerY = -pan.y / zoom;
            const newId = Date.now().toString();
            setElements([...elements, {
                id: newId, type: 'image', src: img.src, x: centerX, y: centerY, width: w, height: h,
                rotation: 0, scale: 1, opacity: 1, blendMode: 'normal', isLocked: false, isVisible: true,
                filterBlur: 0, filterBrightness: 100, filterContrast: 100, filterHue: 0, filterSaturate: 100
            }]);
            setSelectedId(newId);
            setActiveTab('property');
            setActiveTool('move');
        }
    };
    reader.readAsDataURL(file);
    if(fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSaveImage = async () => {
    if (!containerRef.current) return;
    
    // Temporarily hide UI overlay for capture if needed, or target contentRef
    // Since we are capturing the whole "background", we target containerRef
    
    setSelectedId(null);
    await new Promise(r => setTimeout(r, 100)); 
    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null, // Transparent if not set
        useCORS: true,
        scale: 2, 
        ignoreElements: (element) => {
            // Ignore zoom indicator and grid lines if possible
            return element.classList.contains('exclude-from-export');
        }
      });
      const link = document.createElement('a');
      link.download = `pixellab-export-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      showToast('全屏截图已导出');
    } catch (err) {
      alert('导出失败');
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
        // Zoom
        const zoomSensitivity = 0.002;
        const delta = -e.deltaY * zoomSensitivity;
        setZoom(z => Math.min(Math.max(0.1, z + delta), 5));
    } else {
        // Pan
        setPan(p => ({ x: p.x - e.deltaX, y: p.y - e.deltaY }));
    }
  };

  // --- Gesture Logic (Pinch & Move) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch Start
      const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDist.current = d;
      
      if (selectedId) {
         const el = elements.find(el => el.id === selectedId);
         if (el) {
             startScale.current = el.scale;
             startFontSize.current = el.fontSize || 120;
         }
      }
    } else if (e.touches.length === 1 && activeTool === 'move') {
       // Single touch - handled by mouseDown/touchStart on element for drag
       // or background pan
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
       // Pinch Move
       const d = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchStartDist.current <= 0) return;
      const ratio = d / touchStartDist.current;

      if (selectedId) {
          // FEATURE: Pinch to Resize Font/Scale
          const el = elements.find(el => el.id === selectedId);
          if (el) {
              if (el.type === 'text') {
                  const newSize = Math.max(10, Math.min(2000, startFontSize.current * ratio));
                  updateSelected({ fontSize: newSize });
              } else {
                  const newScale = Math.max(0.1, Math.min(20, startScale.current * ratio));
                  updateSelected({ scale: newScale });
              }
          }
      } else {
          // Zoom View if no element selected
          // setZoom(z => Math.min(Math.max(0.1, z * (d / touchStartDist.current)), 5)); // Simplified
      }
    }
  };

  const handleMouseDownBg = (e: React.MouseEvent | React.TouchEvent) => {
      // Background Pan Logic
      if (activeTool !== 'move') return;
      // Only pan if clicking on background
      if (e.target !== containerRef.current && e.target !== contentRef.current) return;
      
      setSelectedId(null); // Deselect on bg click

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleMouseMoveBg = (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragStartRef.current) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;
      
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      dragStartRef.current = { x: clientX, y: clientY };
  };

  const handleMouseUpBg = () => {
      dragStartRef.current = null;
  };

  // Element Drag Logic
  const handleElementStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
      e.stopPropagation();
      if (activeTool !== 'move') return;
      setSelectedId(id);
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      
      dragStartRef.current = { x: clientX, y: clientY };
      const el = elements.find(item => item.id === id);
      if (el) dragElementStartPos.current = { x: el.x, y: el.y };
  };

  const handleElementMove = (e: React.MouseEvent | React.TouchEvent) => {
      if (!dragStartRef.current || !selectedId || activeTool !== 'move') return;
      e.stopPropagation(); // Prevent bg pan
      
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      
      const dx = (clientX - dragStartRef.current.x) / zoom;
      const dy = (clientY - dragStartRef.current.y) / zoom;
      
      updateSelected({ 
          x: (dragElementStartPos.current?.x || 0) + dx, 
          y: (dragElementStartPos.current?.y || 0) + dy 
      });
      // We don't update dragStartRef here because we are calculating delta from start
  };

  // --- Brush Logic ---
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeTool !== 'brush') return;
    isDrawingRef.current = true;
    const rect = drawingCanvasRef.current!.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    // Map to canvas coords
    const x = (clientX - rect.left);
    const y = (clientY - rect.top);
    
    pointsRef.current = [{x, y}];
    
    const ctx = drawingCanvasRef.current?.getContext('2d');
    if (ctx) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = brushColor;
        ctx.shadowBlur = 0;
        ctx.shadowColor = brushColor;
        ctx.globalAlpha = brushOpacity;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !drawingCanvasRef.current) return;
    e.preventDefault();
    const rect = drawingCanvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const x = (clientX - rect.left);
    const y = (clientY - rect.top);
    
    pointsRef.current.push({x, y});
    
    const ctx = drawingCanvasRef.current.getContext('2d');
    if (!ctx) return;

    if (pointsRef.current.length < 3) return;
    const pts = pointsRef.current;
    const i = pts.length - 1;
    
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(pts[i-1].x, pts[i-1].y);
    const midX = (pts[i].x + pts[i-1].x) / 2;
    const midY = (pts[i].y + pts[i-1].y) / 2;
    ctx.quadraticCurveTo(pts[i-1].x, pts[i-1].y, midX, midY); 
    ctx.lineTo(pts[i].x, pts[i].y); 
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    
    if (drawingCanvasRef.current) {
        const dataUrl = drawingCanvasRef.current.toDataURL();
        const newId = Date.now().toString();
        // Place image at logical center based on current view pan/zoom
        const centerX = -pan.x / zoom;
        const centerY = -pan.y / zoom;
        
        setElements([...elements, {
            id: newId, type: 'image', src: dataUrl,
            x: centerX, y: centerY, width: containerRef.current!.clientWidth / zoom, height: containerRef.current!.clientHeight / zoom,
            rotation: 0, scale: 1, opacity: 1, blendMode: 'normal',
            isLocked: false, isVisible: true, filterBlur: 0, filterBrightness: 100, filterContrast: 100, filterHue: 0, filterSaturate: 100
        }]);
        
        const ctx = drawingCanvasRef.current.getContext('2d');
        ctx?.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
        setActiveTool('move');
        showToast('图层已生成');
    }
  };

  // --- Style Helper ---
  const getStyle = (el: CanvasElement): React.CSSProperties => {
      const fx = el.fx || DEFAULT_FX;
      const base: React.CSSProperties = {
          position: 'absolute', 
          left: '50%', top: '50%', // Center anchor
          marginLeft: el.x, marginTop: el.y, // Offset
          transform: `translate(-50%, -50%) rotate(${el.rotation}deg) scale(${el.scale})`,
          opacity: el.opacity, mixBlendMode: el.blendMode as any,
          zIndex: elements.indexOf(el), cursor: activeTool === 'move' ? 'move' : 'default',
          pointerEvents: el.isLocked ? 'none' : 'auto', userSelect: 'none',
          touchAction: 'none'
      };
      
      if (el.type === 'image') {
          return { ...base, width: el.width, height: el.height, filter: `blur(${el.filterBlur}px) brightness(${el.filterBrightness}%)` };
      }
      
      const textStyle: React.CSSProperties = {
          ...base, fontSize: el.fontSize, fontFamily: el.fontFamily, fontWeight: el.fontWeight, whiteSpace: 'nowrap',
          letterSpacing: el.letterSpacing, lineHeight: el.lineHeight,
      };
      
      if (fx.enableGradient) {
          textStyle.background = `linear-gradient(${fx.gradientAngle}deg, ${fx.gradientColors[0]}, ${fx.gradientColors[1]})`;
          textStyle.WebkitBackgroundClip = 'text'; textStyle.WebkitTextFillColor = 'transparent';
      } else {
          textStyle.color = el.color;
      }
      
      const shadows = [];
      if (fx.enableShadow) shadows.push(`${Math.cos(fx.shadowAngle*Math.PI/180)*fx.shadowDistance}px ${Math.sin(fx.shadowAngle*Math.PI/180)*fx.shadowDistance}px ${fx.shadowBlur}px ${fx.shadowColor}`);
      if (fx.enableGlow) shadows.push(`0 0 ${fx.glowBlur}px ${fx.glowColor}`);
      if (fx.enableBevel) shadows.push(`1px 1px 0 rgba(255,255,255,0.5), -1px -1px 0 rgba(0,0,0,0.5)`);
      if (el.is3d) for(let i=1; i<=el.depth!; i++) shadows.push(`${i}px ${i}px 0 ${el.depthColor}`);
      
      textStyle.textShadow = shadows.join(',');
      if (fx.enableStroke) textStyle.WebkitTextStroke = `${fx.strokeWidth}px ${fx.strokeColor}`;
      return textStyle;
  };

  const VisualLayer: React.FC<{ el: CanvasElement }> = ({ el }) => (
      <div className={`flex items-center gap-2 p-2 rounded cursor-pointer border mb-1 ${selectedId === el.id ? 'bg-blue-600/30 border-blue-500' : 'bg-[#2a2a2a] border-transparent hover:bg-[#333]'}`} onClick={() => setSelectedId(el.id)}>
          <div className="w-10 h-10 bg-black rounded overflow-hidden flex items-center justify-center shrink-0 border border-gray-700">
              {el.type === 'image' ? <img src={el.src} className="w-full h-full object-cover"/> : <span className="text-xs text-white font-serif">Aa</span>}
          </div>
          <div className="flex-1 min-w-0">
             <div className="text-xs text-white truncate font-medium">{el.type === 'text' ? el.text : 'Image Layer'}</div>
             <div className="text-[10px] text-gray-500">{el.type.toUpperCase()}</div>
          </div>
          <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); updateElementById(el.id, { isVisible: !el.isVisible }); }} className="p-1 text-gray-400 hover:text-white">{el.isVisible ? <Icon.Eye /> : <Icon.EyeOff />}</button>
              <button onClick={(e) => { e.stopPropagation(); updateElementById(el.id, { isLocked: !el.isLocked }); }} className="text-gray-400 hover:text-white">{el.isLocked ? <Icon.Lock /> : <Icon.Unlock />}</button>
              <button onClick={(e) => { e.stopPropagation(); setElements(prev => prev.filter(item => item.id !== el.id)); }} className="p-1 text-gray-400 hover:text-red-400"><Icon.Trash /></button>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#121212] text-gray-200 font-sans overflow-hidden select-none relative">
      
      {/* 1. TOP FUNCTION BAR */}
      <div className="h-14 border-b border-[#2a2a2a] flex items-center justify-between px-4 z-30 shrink-0 bg-[#1e1e1e]">
         <div className="flex items-center gap-4">
            <span className="font-black text-xl tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">P</span>
            <div className="h-6 w-px bg-[#333]"></div>
            <button onClick={handleAddText} className="flex items-center gap-2 text-xs font-bold bg-[#333] hover:bg-[#444] px-3 py-1.5 rounded transition-colors"><Icon.AddText /> 文本</button>
            <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-xs font-bold bg-[#333] hover:bg-[#444] px-3 py-1.5 rounded transition-colors"><Icon.AddImage /> 图片</button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImportImage} />
            <button onClick={() => setActiveTool(activeTool === 'brush' ? 'move' : 'brush')} className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded transition-colors ${activeTool === 'brush' ? 'bg-green-600 text-white' : 'bg-[#333] hover:bg-[#444]'}`}><Icon.Brush /> 画笔</button>
         </div>
         <div className="flex items-center gap-3">
             <button onClick={handleSaveImage} className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg transition-transform active:scale-95"><Icon.Export /> 导出</button>
         </div>
      </div>

      {/* 2. CENTER INFINITE WORKSPACE (CANVAS-LESS) */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-space touch-none" 
        style={{ background: background }}
        onMouseDown={handleMouseDownBg}
        onMouseMove={handleMouseMoveBg}
        onMouseUp={handleMouseUpBg}
        onMouseLeave={handleMouseUpBg}
        onTouchStart={(e) => { handleTouchStart(e); if(e.touches.length === 1) handleMouseDownBg(e); }}
        onTouchMove={(e) => { handleTouchMove(e); if(e.touches.length === 1) handleMouseMoveBg(e); }}
        onTouchEnd={handleMouseUpBg}
        onWheel={handleWheel}
      >
         {/* Grid Background Pattern (Subtle) */}
         <div className="absolute inset-0 pointer-events-none opacity-20" style={{ 
             backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', 
             backgroundSize: '20px 20px',
             backgroundPosition: `${pan.x}px ${pan.y}px`
         }}></div>

         {/* Content Wrapper - Centered & Transformable */}
         <div 
            ref={contentRef}
            className="absolute inset-0 pointer-events-none" // Content wrapper passes events through, elements catch them
            style={{ 
               transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
               transformOrigin: 'center center'
            }}
         >
            {/* Elements Layer */}
            {elements.map(el => el.isVisible && (
                <div 
                   key={el.id}
                   style={getStyle(el)}
                   onMouseDown={(e) => handleElementStart(e, el.id)}
                   onTouchStart={(e) => handleElementStart(e, el.id)}
                   onDoubleClick={(e) => { e.stopPropagation(); if(el.type === 'text') { const t = prompt("编辑文字", el.text); if(t) updateSelected({ text: t }); } }}
                   className={`${selectedId === el.id && activeTool === 'move' ? 'ring-1 ring-blue-500 shadow-2xl' : ''}`}
                >
                    {el.type === 'text' ? el.text : <img src={el.src} draggable={false} className="w-full h-full object-contain" />}
                </div>
            ))}
         </div>

         {/* Brush Overlay - Covers full screen */}
         {activeTool === 'brush' && (
            <canvas 
               ref={drawingCanvasRef}
               width={containerRef.current?.clientWidth || 1920} 
               height={containerRef.current?.clientHeight || 1080}
               className="absolute inset-0 z-50 cursor-crosshair touch-none"
               onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
               onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
            />
         )}
         
         <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs pointer-events-none backdrop-blur font-mono exclude-from-export">
             {Math.round(zoom * 100)}%
         </div>
      </div>

      {/* Global Event Listener for Element Drag (to handle fast movement outside element) */}
      <div 
        className={`fixed inset-0 z-[999] cursor-move ${dragStartRef.current && selectedId ? 'block' : 'hidden'}`}
        onMouseMove={handleElementMove}
        onMouseUp={() => { dragStartRef.current = null; }}
        onTouchMove={handleElementMove}
        onTouchEnd={() => { dragStartRef.current = null; }}
      ></div>

      {/* 3. BOTTOM OPERATION PANEL */}
      <div className="h-80 bg-[#1e1e1e] border-t border-[#2a2a2a] flex flex-col z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex border-b border-[#2a2a2a] bg-[#1a1a1a]">
             {[
               { id: 'property', label: '属性', icon: <Icon.Edit /> },
               { id: 'fx', label: '特效', icon: <Icon.FX /> },
               { id: 'layers', label: '图层', icon: <Icon.Layers /> },
               { id: 'presets', label: '预设', icon: <Icon.FX /> }
             ].map(tab => (
               <button 
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id as any)}
                 className={`flex-1 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'bg-[#2a2a2a] text-blue-400 border-t-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
               >
                 {tab.icon} {tab.label}
               </button>
             ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative">
              {/* === Brush Context Override === */}
              {activeTool === 'brush' ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center h-full">
                      <div className="col-span-1 md:col-span-1">
                          <label className="text-xs text-gray-400 block mb-2 font-bold">笔刷大小 ({brushSize})</label>
                          <input type="range" min="1" max="200" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-full h-1 bg-green-600 rounded appearance-none" />
                      </div>
                      <div className="col-span-1 md:col-span-1">
                          <label className="text-xs text-gray-400 block mb-2 font-bold">不透明度</label>
                          <input type="range" min="0" max="1" step="0.1" value={brushOpacity} onChange={(e) => setBrushOpacity(Number(e.target.value))} className="w-full h-1 bg-gray-600 rounded appearance-none" />
                      </div>
                      <div className="col-span-1 md:col-span-1">
                          <label className="text-xs text-gray-400 block mb-2 font-bold">颜色</label>
                          <input type="color" value={brushColor} onChange={(e) => setBrushColor(e.target.value)} className="w-full h-8 rounded border-0" />
                      </div>
                      <div className="col-span-1 md:col-span-1 flex items-end">
                          <div className="text-xs text-green-400 bg-green-900/30 px-3 py-2 rounded border border-green-800 w-full text-center">
                              正在使用画笔模式...
                          </div>
                      </div>
                  </div>
              ) : (
                  <>
                      {/* === Properties Tab === */}
                      {activeTab === 'property' && selectedElement && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                              {selectedElement.type === 'text' && (
                                  <div className="col-span-2">
                                      <label className="text-xs text-gray-400 block mb-1">内容</label>
                                      <input value={selectedElement.text} onChange={(e) => updateSelected({ text: e.target.value })} className="w-full bg-[#111] border border-gray-600 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" />
                                  </div>
                              )}
                              <div>
                                  <label className="text-xs text-gray-400 block mb-1">颜色</label>
                                  <div className="flex gap-2">
                                      <input type="color" value={selectedElement.color} onChange={(e) => updateSelected({ color: e.target.value })} className="h-9 w-12 rounded cursor-pointer border-0" />
                                      <input type="text" value={selectedElement.color} onChange={(e) => updateSelected({ color: e.target.value })} className="flex-1 bg-[#111] border border-gray-600 rounded text-xs text-center uppercase" />
                                  </div>
                              </div>
                              <div className="space-y-3">
                                  <div>
                                      <div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>{selectedElement.type === 'text' ? '字体大小' : '缩放'}</span><span>{selectedElement.type === 'text' ? selectedElement.fontSize : selectedElement.scale.toFixed(1)}</span></div>
                                      {selectedElement.type === 'text' ? 
                                         <input type="range" min="10" max="500" value={selectedElement.fontSize} onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })} className="w-full h-1 bg-blue-600 rounded appearance-none" />
                                         :
                                         <input type="range" min="0.1" max="5" step="0.1" value={selectedElement.scale} onChange={(e) => updateSelected({ scale: Number(e.target.value) })} className="w-full h-1 bg-blue-600 rounded appearance-none" />
                                      }
                                  </div>
                                  <div>
                                      <div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>旋转</span><span>{selectedElement.rotation}°</span></div>
                                      <input type="range" min="-180" max="180" value={selectedElement.rotation} onChange={(e) => updateSelected({ rotation: Number(e.target.value) })} className="w-full h-1 bg-gray-600 rounded appearance-none" />
                                  </div>
                              </div>
                              <div className="col-span-2 md:col-span-1">
                                  <label className="text-xs text-gray-400 block mb-2">画布背景</label>
                                  <div className="flex gap-2">
                                      <button onClick={() => setBackground('transparent')} className="w-8 h-8 rounded border border-gray-600 relative overflow-hidden" title="透明"><div className="absolute inset-0" style={{ backgroundImage: 'conic-gradient(#333 0 25%, #444 0 50%, #333 0 75%, #444 0)', backgroundSize: '8px 8px' }}></div></button>
                                      <button onClick={() => setBackground('#000')} className="w-8 h-8 rounded border border-gray-600 bg-black"></button>
                                      <button onClick={() => setBackground('#fff')} className="w-8 h-8 rounded border border-gray-600 bg-white"></button>
                                      <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="w-8 h-8 rounded border-0" />
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* === FX Tab === */}
                      {activeTab === 'fx' && selectedElement && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-[#252525] p-3 rounded border border-[#333]">
                                  <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-bold text-white">阴影 Shadow</span>
                                      <input type="checkbox" checked={selectedElement.fx?.enableShadow} onChange={(e) => updateSelectedFX({ enableShadow: e.target.checked })} />
                                  </div>
                                  {selectedElement.fx?.enableShadow && (
                                      <div className="space-y-2">
                                          <input type="range" min="0" max="50" value={selectedElement.fx.shadowDistance} onChange={(e) => updateSelectedFX({ shadowDistance: Number(e.target.value) })} className="w-full h-1 bg-gray-600 rounded" />
                                          <input type="color" value={selectedElement.fx.shadowColor} onChange={(e) => updateSelectedFX({ shadowColor: e.target.value })} className="w-full h-6 rounded cursor-pointer" />
                                      </div>
                                  )}
                              </div>
                              <div className="bg-[#252525] p-3 rounded border border-[#333]">
                                  <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-bold text-white">发光 Glow</span>
                                      <input type="checkbox" checked={selectedElement.fx?.enableGlow} onChange={(e) => updateSelectedFX({ enableGlow: e.target.checked })} />
                                  </div>
                                  {selectedElement.fx?.enableGlow && (
                                      <div className="space-y-2">
                                          <input type="range" min="0" max="50" value={selectedElement.fx.glowBlur} onChange={(e) => updateSelectedFX({ glowBlur: Number(e.target.value) })} className="w-full h-1 bg-gray-600 rounded" />
                                          <input type="color" value={selectedElement.fx.glowColor} onChange={(e) => updateSelectedFX({ glowColor: e.target.value })} className="w-full h-6 rounded cursor-pointer" />
                                      </div>
                                  )}
                              </div>
                              <div className="bg-[#252525] p-3 rounded border border-[#333]">
                                  <div className="flex items-center justify-between mb-2">
                                      <span className="text-sm font-bold text-white">3D深度</span>
                                      <input type="checkbox" checked={selectedElement.is3d} onChange={(e) => updateSelected({ is3d: e.target.checked })} />
                                  </div>
                                  {selectedElement.is3d && (
                                      <div className="space-y-2">
                                          <input type="range" min="0" max="50" value={selectedElement.depth} onChange={(e) => updateSelected({ depth: Number(e.target.value) })} className="w-full h-1 bg-gray-600 rounded" />
                                          <input type="color" value={selectedElement.depthColor} onChange={(e) => updateSelected({ depthColor: e.target.value })} className="w-full h-6 rounded cursor-pointer" />
                                      </div>
                                  )}
                              </div>
                          </div>
                      )}

                      {/* === Layers Tab === */}
                      {activeTab === 'layers' && (
                          <div className="grid grid-cols-1 gap-1">
                              {[...elements].reverse().map(el => <VisualLayer key={el.id} el={el} />)}
                              {elements.length === 0 && <div className="text-center text-gray-500 py-4">无图层</div>}
                          </div>
                      )}

                      {/* === Presets Tab === */}
                      {activeTab === 'presets' && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {PRESETS.map((p, i) => (
                                  <button key={i} onClick={() => { if(selectedId) { updateSelected(p.style); showToast(`已应用: ${p.name}`); } }} className="bg-[#252525] hover:bg-[#333] border border-[#333] p-2 rounded flex flex-col items-center gap-2 group">
                                      <div className="text-2xl font-black group-hover:scale-110 transition-transform" style={{ color: p.style.color, textShadow: p.style.fx?.enableGlow ? `0 0 10px ${p.style.fx.glowColor}` : 'none' }}>Aa</div>
                                      <span className="text-[10px] text-gray-400">{p.name}</span>
                                  </button>
                              ))}
                          </div>
                      )}

                      {!selectedElement && activeTab !== 'layers' && activeTab !== 'presets' && (
                          <div className="flex items-center justify-center h-full text-gray-600 text-sm">
                              请在画布中选择一个元素进行编辑
                          </div>
                      )}
                  </>
              )}
          </div>
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </div>
  );
};

export default PixeLlabEditor;