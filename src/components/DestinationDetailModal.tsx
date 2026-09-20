import { useState } from 'react';
import {
  X,
  Share2,
  Bookmark,
  Calendar,
  Sparkles,
  Train,
  Check,
  ChevronRight,
  Plane,
  QrCode,
  Lightbulb,
  Shirt,
  Camera,
  Star,
  Palette,
  Clock,
  Thermometer,
  MapPin,
  Leaf,
  Navigation,
} from 'lucide-react';
import { Destination } from '../types';
import { FOLIAGE_STATUSES } from '../data/destinations';
import { getDestinationMeta } from '../utils/autumnMeta';
import { MoMoServiceModal, ServiceType } from './MoMoServiceModal';

interface DestinationDetailModalProps {
  destination: Destination;
  onClose: () => void;
  onSelectOtherDestination?: (dest: Destination) => void;
}

export function DestinationDetailModal({
  destination,
  onClose,
}: DestinationDetailModalProps) {
  const [activeMoMoService, setActiveMoMoService] = useState<ServiceType | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const statusConfig = FOLIAGE_STATUSES[destination.foliageStatus] || FOLIAGE_STATUSES.peak;
  const meta = getDestinationMeta(destination);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Mùa thu tại ${destination.name} - MoMo Autumn Map`,
        text: `Khám phá địa điểm ngắm mùa thu tuyệt đẹp: ${destination.name} (${destination.city}, ${destination.country}). Thời điểm lá đẹp nhất: ${destination.foliagePeakStart} - ${destination.foliagePeakEnd}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <>
      <div
        id="destination-detail-sheet"
        className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200"
      >
        <div className="relative w-full max-w-2xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-screen sm:min-h-0 sm:max-h-[92vh] my-auto">
          {/* Fixed Floating Top Controls */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-stone-200/80">
            <button
              id="detail-back-btn"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-all active:scale-95"
              aria-label="Quay lại bản đồ"
            >
              <X className="w-4 h-4" />
              <span>Đóng</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
                  isBookmarked
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
                title={isBookmarked ? 'Đã lưu' : 'Lưu điểm đến'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center transition-all active:scale-95"
                title="Chia sẻ"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto pb-8">
            {/* 1. TYPOGRAPHIC HERO HEADER */}
            <div className="relative px-4 sm:px-6 pt-5 pb-6 bg-linear-to-br from-amber-50/90 via-rose-50/50 to-stone-50 border-b border-stone-200/70 space-y-4">
              {/* Badges row with neat, aligned pills */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Foliage Status Pill */}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs">
                  <span>{statusConfig.emoji}</span>
                  <span>{statusConfig.label}</span>
                </span>

                {/* Leaf Type Pill */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-amber-900 text-xs font-semibold border border-amber-200 shadow-2xs">
                  <span>{meta.illustrationIcon}</span>
                  <span>{meta.leafTypeName}</span>
                </span>

                {/* Best Period Badge */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-stone-800 text-xs font-semibold border border-stone-200 shadow-2xs">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  <span>{destination.foliagePeakStart} – {destination.foliagePeakEnd}</span>
                </span>

                {/* Star Rating */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300/80 shadow-2xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{meta.rating}</span>
                </span>
              </div>

              {/* Destination Title & Hierarchy */}
              <div className="space-y-1.5">
                <div className="flex items-baseline flex-wrap gap-2">
                  <h1 className="font-extrabold text-2xl sm:text-3xl text-stone-900 tracking-tight flex items-center gap-2">
                    <span>{destination.name}</span>
                    <span className="text-2xl">{meta.illustrationIcon}</span>
                  </h1>
                  {destination.localName && (
                    <span className="text-stone-500 font-normal text-base sm:text-lg">
                      ({destination.localName})
                    </span>
                  )}
                </div>

                {destination.vietnameseName && (
                  <p className="text-sm font-semibold text-rose-700">
                    {destination.vietnameseName}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 pt-1">
                  <span className="text-base">{destination.countryFlag}</span>
                  <span className="font-bold text-stone-800">{destination.city}</span>
                  <span className="text-stone-300">•</span>
                  <span className="font-medium text-stone-700">{destination.country}</span>
                  {destination.khu_vuc && (
                    <>
                      <span className="text-stone-300">•</span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-800 font-semibold text-[11px]">
                        {destination.khu_vuc}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Destination summary banner */}
              <div className="p-3 rounded-2xl bg-white/80 border border-stone-200/80 shadow-2xs text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                Điểm ngắm mùa thu tại <strong className="font-semibold text-stone-900">{destination.name}</strong> ({destination.city}, {destination.country}). Không gian quyến rũ bậc nhất với cảnh sắc lá phong, bạch quả rực rỡ và khí hậu mát lành.
              </div>
            </div>

            {/* Content Body */}
            <div className="px-4 sm:px-6 pt-5 space-y-6">
              {/* Căn chỉnh bảng thông số đặc điểm sắc lá & thông tin địa điểm */}
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-amber-600" />
                  <span>Thông số mùa thu &amp; Đặc trưng cảnh quan</span>
                </h2>

                {/* Structured 2-column key info grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Item 1: Khu vực địa lý */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-stone-500 block">Khu vực &amp; Vị trí</span>
                      <span className="text-xs font-bold text-stone-900 block truncate">
                        {destination.khu_vuc ? `${destination.khu_vuc} • ` : ''}{destination.city}, {destination.country}
                      </span>
                    </div>
                  </div>

                  {/* Item 2: Cây ngắm lá */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-stone-500 block">Loài cây ngắm lá</span>
                      <span className="text-xs font-bold text-stone-900 block truncate">
                        {destination.loai_cay_ngam_la && destination.loai_cay_ngam_la.length > 0
                          ? destination.loai_cay_ngam_la.join(', ')
                          : meta.leafTypeName}
                      </span>
                    </div>
                  </div>

                  {/* Item 3: Dải sắc lá */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Palette className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-stone-500 block">Sắc màu chủ đạo</span>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        {destination.mau_la && destination.mau_la.length > 0 ? (
                          destination.mau_la.map((m) => (
                            <span
                              key={m}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                m.toLowerCase().includes('vàng')
                                  ? 'bg-amber-400 text-stone-950'
                                  : m.toLowerCase().includes('đỏ')
                                  ? 'bg-rose-500 text-white'
                                  : m.toLowerCase().includes('cam')
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-stone-700 text-stone-100'
                              }`}
                            >
                              {m}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs font-bold text-stone-800">Vàng, đỏ rực rỡ</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Item 4: Điểm ngắm tiêu biểu */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-medium text-stone-500 block">Vị trí góc ngắm đẹp</span>
                      <span className="text-xs font-bold text-stone-900 block truncate">
                        {destination.photoTips.bestSpots}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hashtags list */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {destination.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-medium border border-stone-200/70"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. CHU KỲ LÁ ĐỔI MÀU & KHÍ HẬU */}
              <section className="space-y-4 pt-1">
                <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chu kỳ lá đổi màu &amp; Khí hậu</span>
                </h2>

                {/* Foliage Timeline */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Timeline mùa lá thu tại {destination.city}</span>
                    </span>
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                      {statusConfig.emoji} {statusConfig.label}
                    </span>
                  </div>

                  {/* Visual Timeline Bar */}
                  <div className="relative pt-4 pb-2">
                    <div className="h-3 w-full bg-stone-200 rounded-full overflow-hidden flex">
                      {/* Early phase */}
                      <div className="w-1/4 bg-emerald-300" title="Bắt đầu vào mùa" />
                      {/* Peak window - Highlighted */}
                      <div
                        className="w-2/4 bg-linear-to-r from-amber-400 via-rose-500 to-rose-600 relative flex items-center justify-center"
                        title="Đang đẹp nhất"
                      >
                        <span className="text-[9px] font-black text-white tracking-widest uppercase">
                          PEAK 🍁
                        </span>
                      </div>
                      {/* Late phase */}
                      <div className="w-1/4 bg-amber-800/80" title="Cuối mùa" />
                    </div>

                    {/* Timeline Milestones */}
                    <div className="flex justify-between items-start text-[11px] mt-2 text-stone-600">
                      <div className="text-left">
                        <span className="block font-bold text-stone-800">{destination.foliageStart}</span>
                        <span className="text-[10px] text-stone-500">🍃 Bắt đầu</span>
                      </div>

                      <div className="text-center px-2 py-0.5 bg-white rounded-lg border border-rose-200 shadow-xs">
                        <span className="block font-bold text-rose-700 text-xs">
                          {destination.foliagePeakStart} – {destination.foliagePeakEnd}
                        </span>
                        <span className="text-[10px] text-rose-600 font-semibold">
                          🍁 ĐẸP NHẤT
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="block font-bold text-stone-800">{destination.foliageEnd}</span>
                        <span className="text-[10px] text-stone-500">🍂 Cuối mùa</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed border-t border-amber-200/60 pt-2 font-normal">
                    {statusConfig.description}
                  </p>
                </div>

                {/* Seasonal Weather Card */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <Thermometer className="w-4 h-4 text-amber-600" />
                      <span>Nhiệt độ &amp; Đặc điểm thời tiết</span>
                    </span>
                    <span className="text-base font-extrabold text-stone-800 bg-white border border-stone-200 px-2.5 py-0.5 rounded-xl shadow-2xs">
                      🌡️ {destination.temperature}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    <strong className="font-semibold text-stone-900">Khí hậu mùa thu: </strong>
                    {destination.weatherDescription}.
                  </p>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200/70 text-xs text-stone-700">
                    <span className="font-semibold text-stone-900">Gợi ý trang phục theo thời tiết: </span>
                    <span>{destination.outfitTips.summary}</span>
                  </div>
                </div>
              </section>

              {/* 3. TRAVEL GUIDE (Cẩm nang du lịch trải nghiệm - Bố cục cân đối, đồng đều) */}
              <section className="space-y-3 pt-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Cẩm nang du lịch trải nghiệm</span>
                  </h2>
                  <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Chi tiết &amp; Thực tế
                  </span>
                </div>

                {/* Modern Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Card 1: Di chuyển thông minh */}
                  <div className="p-4 rounded-2xl bg-linear-to-br from-blue-50/50 via-white to-stone-50 border border-blue-100 shadow-xs hover:border-blue-300 transition-all space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-xs">
                            <Train className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-stone-900">Cách di chuyển</h3>
                            <p className="text-[10px] text-stone-500">Tuyến đường &amp; thời gian</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {destination.transportation.difficulty}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-700 bg-white/80 p-2.5 rounded-xl border border-stone-100">
                        <div className="flex items-start gap-1.5">
                          <span className="text-stone-400 font-medium text-[11px] w-14 shrink-0">Xuất phát:</span>
                          <span className="font-semibold text-stone-800">{destination.transportation.from}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-stone-400 font-medium text-[11px] w-14 shrink-0">Lộ trình:</span>
                          <span className="text-stone-700 font-medium">{destination.transportation.route}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-stone-400 font-medium text-[11px] w-14 shrink-0">Thời gian:</span>
                          <span className="font-bold text-blue-700">{destination.transportation.duration}</span>
                        </div>
                      </div>
                    </div>

                    {destination.transportation.notes && (
                      <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-1.5 mt-2">
                        <span className="shrink-0">💡</span>
                        <span className="font-medium">{destination.transportation.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Card 2: Trang phục & Bảng màu OOTD */}
                  <div className="p-4 rounded-2xl bg-linear-to-br from-rose-50/50 via-white to-amber-50/40 border border-rose-100 shadow-xs hover:border-rose-300 transition-all space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
                            <Shirt className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-stone-900">Trang phục &amp; Phối đồ OOTD</h3>
                            <p className="text-[10px] text-stone-500">Bảng màu tôn da, lên hình nổi bật</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          <span>{meta.autumnOOTD.name}</span>
                        </span>
                      </div>

                      <p className="text-xs text-stone-700 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-stone-100">
                        {destination.outfitTips.details}
                      </p>
                    </div>

                    <div className="space-y-2 mt-2">
                      {/* Swatches */}
                      <div className="p-2 rounded-xl bg-white border border-stone-200/70 flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                          {meta.autumnOOTD.colors.map((c, idx) => (
                            <div key={idx} className="flex items-center gap-1 bg-stone-50 px-1.5 py-0.5 rounded-md border border-stone-200/80">
                              <span
                                className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs shrink-0"
                                style={{ backgroundColor: c.hex }}
                              />
                              <span className="text-[9.5px] text-stone-700 font-semibold whitespace-nowrap">{c.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {destination.outfitTips.recommendedItems.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded-md text-[10px] text-stone-700 font-medium"
                          >
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Mẹo chụp ảnh sống ảo */}
                  <div className="p-4 rounded-2xl bg-linear-to-br from-amber-50/50 via-white to-stone-50 border border-amber-100 shadow-xs hover:border-amber-300 transition-all space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-stone-900">Mẹo chụp ảnh nghệ thuật</h3>
                          <p className="text-[10px] text-stone-500">Khung giờ vàng &amp; vị trí bắt nét</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-700 bg-white/80 p-2.5 rounded-xl border border-stone-100">
                        <p>
                          <strong className="text-stone-900">Giờ chụp đẹp: </strong>
                          <span className="text-amber-700 font-bold">{destination.photoTips.bestTime}</span>
                        </p>
                        <p>
                          <strong className="text-stone-900">Góc bắt nét: </strong>
                          <span className="text-stone-700">{destination.photoTips.bestSpots}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-stone-100/80 border border-stone-200 text-[11px] text-stone-600 flex items-start gap-1.5 mt-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{destination.photoTips.cameraAdvice}</span>
                    </div>
                  </div>

                  {/* Card 4: Mẹo địa phương & Giờ mở cửa */}
                  <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-50/50 via-white to-stone-50 border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                          <Lightbulb className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-stone-900">Bí kíp thực tế từ người bản địa</h3>
                          <p className="text-[10px] text-stone-500">Tránh đông đúc &amp; trải nghiệm trọn vẹn</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-700 bg-white/80 p-2.5 rounded-xl border border-stone-100">
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500">Mật độ khách:</span>
                          <span className="font-semibold text-stone-800">{destination.localTips.crowdLevel}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500">Nên đi ngày:</span>
                          <span className="font-bold text-emerald-700">{destination.localTips.bestDayToVisit}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-stone-500">Giờ mở cửa:</span>
                          <span className="font-medium text-stone-800">{destination.localTips.openingHours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 font-medium mt-2">
                      🌟 {destination.localTips.insiderAdvice}
                    </div>
                  </div>
                </div>
              </section>

              {/* 4. MOMO TRAVEL HUB */}
              <section className="pt-2 pb-2">
                <div className="p-5 sm:p-6 rounded-3xl bg-linear-to-br from-[#A50064] via-[#C81C7D] to-[#E11D48] text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>MoMo Travel Hub</span>
                      </span>
                      <h3 className="font-bold text-lg sm:text-xl text-white mt-1">
                        Đồng hành du lịch cùng MoMo
                      </h3>
                      <p className="text-white/90 text-xs font-light max-w-lg">
                        Mọi tiện ích cần thiết cho hành trình đến {destination.name}, sẵn sàng trên chiếc điện thoại của bạn.
                      </p>
                    </div>
                  </div>

                  {/* 3 Pillar Cards */}
                  <div className="space-y-2.5">
                    {/* Pillar 1: Chuẩn bị Vé Máy Bay, Khách Sạn, Esim */}
                    <div
                      id="momo-hub-pillar-1"
                      className="p-3.5 rounded-2xl bg-white/95 text-stone-900 backdrop-blur-xs shadow-xs hover:bg-white transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Plane className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                              Chuẩn bị Vé Máy Bay, Khách Sạn, Esim du lịch nhanh và thuận tiện tại MoMo
                            </h4>
                            <p className="text-[11px] text-stone-600 font-normal mt-0.5">
                              Tìm kiếm, so sánh và đặt trọn gói dịch vụ chỉ trong vài chạm với giá tốt và xác nhận tức thì.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Action quick links for Pillar 1 */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <button
                          onClick={() => setActiveMoMoService('flight')}
                          className="py-2.5 px-2 rounded-xl bg-stone-50 hover:bg-rose-50 hover:text-rose-700 border border-stone-200/80 text-center transition-all active:scale-95 group cursor-pointer"
                        >
                          <span className="font-bold text-xs sm:text-sm block leading-tight text-stone-800 group-hover:text-rose-700">
                            ✈️ Vé máy bay
                          </span>
                        </button>

                        <button
                          onClick={() => setActiveMoMoService('hotel')}
                          className="py-2.5 px-2 rounded-xl bg-stone-50 hover:bg-amber-50 hover:text-amber-700 border border-stone-200/80 text-center transition-all active:scale-95 group cursor-pointer"
                        >
                          <span className="font-bold text-xs sm:text-sm block leading-tight text-stone-800 group-hover:text-amber-700">
                            🏨 Khách sạn
                          </span>
                        </button>

                        <button
                          onClick={() => setActiveMoMoService('esim')}
                          className="py-2.5 px-2 rounded-xl bg-stone-50 hover:bg-blue-50 hover:text-blue-700 border border-stone-200/80 text-center transition-all active:scale-95 group cursor-pointer"
                        >
                          <span className="font-bold text-xs sm:text-sm block leading-tight text-stone-800 group-hover:text-blue-700">
                            📱 eSIM du lịch
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Pillar 2: Thanh toán nước ngoài */}
                    <button
                      id="momo-hub-pillar-2"
                      onClick={() => setActiveMoMoService('qr')}
                      className="w-full p-3.5 rounded-2xl bg-white/95 text-stone-900 backdrop-blur-xs shadow-xs hover:bg-white text-left transition-all active:scale-98 flex items-center justify-between gap-3 group cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <QrCode className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                              Thanh toán nước ngoài bằng MoMo tỷ giá rẻ, không phụ phí
                            </h4>
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 hidden sm:inline-block">
                              0đ phụ phí
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 font-medium mt-1 leading-relaxed">
                            {destination.countryCode === 'china'
                              ? 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, Wechat'
                              : destination.countryCode === 'japan'
                              ? 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, Paypay'
                              : destination.countryCode === 'korea'
                              ? 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, ZeroPay'
                              : 'Dùng MoMo quét QR thanh toán hoặc đưa mã thanh toán tại các điểm chấp nhận của Alipay, Paypay, ZeroPay'}
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Pillar 3: An tâm di chuyển */}
                    <button
                      id="momo-hub-pillar-3"
                      onClick={() => setActiveMoMoService('transit')}
                      className="w-full p-3.5 rounded-2xl bg-white/95 text-stone-900 backdrop-blur-xs shadow-xs hover:bg-white text-left transition-all active:scale-98 flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                          <Train className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-snug">
                            An tâm di chuyển cùng nhiều tính năng tại MoMo như quét QR gọi món, đặt vé metro, đặt taxi,...
                          </h4>
                          <p className="text-[11px] text-stone-600 font-normal mt-0.5">
                            Thong thả ngắm lá thu với tiện ích tra cứu lộ trình, đặt xe taxi, mua vé tàu điện ngầm và tự tin gọi món tại quán ăn bản địa.
                          </p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* MoMo Service Action Dialog */}
      {activeMoMoService !== null && (
        <MoMoServiceModal
          serviceType={activeMoMoService}
          destination={destination}
          onClose={() => setActiveMoMoService(null)}
        />
      )}
    </>
  );
}

