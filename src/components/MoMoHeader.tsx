import React, { useState } from 'react';
import {
  List,
  Map as MapIcon,
  Info,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldCheck,
  Moon,
  Sun,
} from 'lucide-react';

interface MoMoHeaderProps {
  viewMode: 'map' | 'list';
  onToggleViewMode: (mode: 'map' | 'list') => void;
  totalDestinations: number;
  peakCount: number;
  soundPlaying: boolean;
  onToggleSound: () => void;
  leavesEnabled: boolean;
  onToggleLeaves: () => void;
  mapTheme: 'dark' | 'light';
  onToggleMapTheme: () => void;
  onOpenSovereignty: () => void;
}

export const MoMoHeader: React.FC<MoMoHeaderProps> = ({
  viewMode,
  onToggleViewMode,
  totalDestinations,
  peakCount,
  soundPlaying,
  onToggleSound,
  leavesEnabled,
  onToggleLeaves,
  mapTheme,
  onToggleMapTheme,
  onOpenSovereignty,
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <header className="relative z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* MoMo Brand Top Notch */}
      <div className="bg-linear-to-r from-[#A50064] via-[#D82D8B] to-[#EA580C] text-white px-3 sm:px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-medium tracking-wide">
          <span className="bg-white/20 backdrop-blur-xs px-1.5 py-0.5 rounded-sm font-bold text-[10px] tracking-wider uppercase">
            MoMo Travel
          </span>
          <span className="opacity-90 font-medium">Bản đồ săn lá vàng rơi</span>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={onOpenSovereignty}
            className="hidden sm:flex items-center gap-1 bg-emerald-700/80 hover:bg-emerald-700 px-2 py-0.5 rounded-full text-[10.5px] font-medium transition-colors"
            title="Bản đồ chuẩn quốc tế UNCLOS - 100% Không cần API"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-200" />
            <span>Chuẩn UNCLOS • Không cần API</span>
          </button>

          <span className="inline-flex items-center gap-1 bg-amber-400/25 border border-amber-300/40 text-amber-100 px-2 py-0.5 rounded-full text-[11px] font-medium">
            <span>🍁</span>
            <span>{peakCount} nơi rực rỡ nhất</span>
          </span>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="px-3.5 py-2.5 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-lg shrink-0 shadow-xs">
            🍁
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-stone-900 text-base leading-tight truncate">
                MoMo Autumn Map
              </h1>
              <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full shrink-0">
                2026
              </span>
            </div>
            <p className="text-[11px] text-stone-500 truncate">
              Nhật Bản • Hàn Quốc • Trung Quốc
            </p>
          </div>
        </div>

        {/* View mode switcher & Interactive sound & leaves & Info */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Sound Synthesizer toggle */}
          <button
            id="header-sound-btn"
            onClick={onToggleSound}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              soundPlaying
                ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs animate-pulse'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
            title={soundPlaying ? 'Tắt tiếng gió mùa thu' : 'Bật tiếng gió thu nhẹ nhàng, lá xào xạc & chuông gió (Ambient)'}
            aria-label="Tiếng gió thu nhẹ nhàng"
          >
            {soundPlaying ? <Volume2 className="w-4 h-4 text-amber-700" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Floating Leaves toggle */}
          <button
            id="header-leaves-btn"
            onClick={onToggleLeaves}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              leavesEnabled
                ? 'bg-rose-100 text-rose-700 border border-rose-300 shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
            }`}
            title={leavesEnabled ? 'Tắt hiệu ứng lá rơi' : 'Bật hiệu ứng lá phong rơi lãng mạn'}
            aria-label="Lá rơi"
          >
            <Sparkles className="w-4 h-4 text-rose-600" />
          </button>

          {/* Dark / Light map quick toggle in header */}
          <button
            id="header-theme-toggle-btn"
            onClick={onToggleMapTheme}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-amber-100 flex items-center justify-center text-stone-700 transition-colors active:scale-95"
            title={mapTheme === 'dark' ? 'Đổi sang bản đồ ban ngày sáng' : 'Đổi sang bản đồ trầm (Dạ Thu rực sáng)'}
            aria-label="Chế độ bản đồ"
          >
            {mapTheme === 'dark' ? <Moon className="w-4 h-4 text-amber-600" /> : <Sun className="w-4 h-4 text-amber-600" />}
          </button>

          {/* List vs Map Switcher */}
          <button
            id="header-view-toggle-btn"
            onClick={() => onToggleViewMode(viewMode === 'map' ? 'list' : 'map')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors shadow-xs active:scale-95"
            title={viewMode === 'map' ? 'Xem dạng danh sách' : 'Xem trên bản đồ'}
          >
            {viewMode === 'map' ? (
              <>
                <List className="w-3.5 h-3.5 text-rose-600" />
                <span className="hidden xs:inline">Danh sách</span>
                <span>({totalDestinations})</span>
              </>
            ) : (
              <>
                <MapIcon className="w-3.5 h-3.5 text-rose-600" />
                <span>Bản đồ</span>
              </>
            )}
          </button>

          {/* Info toggle */}
          <button
            id="header-info-btn"
            onClick={() => setShowInfo(!showInfo)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
            aria-label="Thông tin bản đồ"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Dropdown Sheet */}
      {showInfo && (
        <div className="bg-amber-50/95 border-t border-amber-200/70 p-3.5 text-xs text-amber-950 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-2">
              <p className="font-bold flex items-center gap-1.5 text-stone-900 text-sm">
                <span>🍂</span>
                <span>Một bản đồ – biết nơi nào đẹp, khi nào đẹp, đi thế nào.</span>
              </p>
              <p className="text-stone-700 leading-relaxed text-xs">
                Khám phá {totalDestinations} địa danh ngắm lá vàng, lá đỏ đẹp nhất tại 4 quốc gia được biên tập kỹ lưỡng theo chu kỳ mùa thu thực tế, kèm thời tiết, cách đi và mẹo chụp ảnh cho bạn trẻ Việt Nam.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <button
                  onClick={() => {
                    setShowInfo(false);
                    onOpenSovereignty();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 hover:bg-emerald-200 font-semibold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Bản đồ chuẩn quốc tế (Không đường lưỡi bò)</span>
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowInfo(false)}
              className="text-stone-400 hover:text-stone-700 p-1 font-bold text-sm"
              aria-label="Đóng"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
