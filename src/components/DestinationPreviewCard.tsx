import { Destination } from '../types';
import { FOLIAGE_STATUSES } from '../data/destinations';
import { getDestinationMeta } from '../utils/autumnMeta';
import { ChevronRight, Thermometer, Calendar, X, Star, Leaf, MapPin } from 'lucide-react';

interface DestinationPreviewCardProps {
  destination: Destination;
  onOpenDetail: (dest: Destination) => void;
  onClose: () => void;
}

export function DestinationPreviewCard({
  destination,
  onOpenDetail,
  onClose,
}: DestinationPreviewCardProps) {
  const statusConfig = FOLIAGE_STATUSES[destination.foliageStatus] || FOLIAGE_STATUSES.peak;
  const meta = getDestinationMeta(destination);

  // Subtitle fallback to keep card height rock-solid and prevent vertical layout jumping
  const subtitle =
    destination.vietnameseName ||
    (destination.localName ? `Tên bản địa: ${destination.localName}` : `Khu vực: ${destination.city}, ${destination.country}`);

  const leafColors = destination.mau_la && destination.mau_la.length > 0
    ? destination.mau_la.join(', ')
    : meta.leafTypeName;

  return (
    <div
      id="destination-preview-card"
      className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-stone-200/90 transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 select-none"
    >
      <div className="flex items-start gap-3.5">
        {/* Destination Emblem Badge */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-linear-to-br from-amber-100/90 via-rose-100/70 to-orange-50 border border-stone-200/80 shadow-2xs flex flex-col items-center justify-center shrink-0">
          <span className="text-2xl sm:text-3xl leading-none">{meta.illustrationIcon}</span>
          <span className="text-[10px] font-bold text-stone-700 mt-1 flex items-center gap-0.5">
            <span>{destination.countryFlag}</span>
            <span className="truncate max-w-[50px]">{destination.city}</span>
          </span>
        </div>

        {/* Content Info */}
        <div className="flex-1 min-w-0 pr-6">
          {/* Row 1: Location breadcrumbs & Star Rating */}
          <div className="flex items-center justify-between gap-1 text-[11px] mb-1">
            <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
              <span className="font-bold text-stone-800 shrink-0">{destination.city}</span>
              <span className="text-stone-300 shrink-0">•</span>
              <span className="text-stone-600 font-medium truncate">{destination.country}</span>
              {destination.khu_vuc && (
                <>
                  <span className="text-stone-300 shrink-0">•</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-900 font-semibold text-[10px] border border-amber-200/70 shrink-0 truncate max-w-[120px]">
                    {destination.khu_vuc}
                  </span>
                </>
              )}
            </div>

            <span className="inline-flex items-center gap-0.5 font-bold text-amber-600 shrink-0 bg-amber-50/90 px-1.5 py-0.5 rounded-md border border-amber-200/60 text-[10px]">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{meta.rating}</span>
            </span>
          </div>

          {/* Row 2: Destination Main Title */}
          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug truncate">
            {destination.name}
          </h3>

          {/* Row 3: Subtitle with fixed minimum height to prevent jumping */}
          <div className="h-4.5 flex items-center mt-0.5">
            <p className="text-[11px] text-rose-700 font-semibold truncate leading-none">
              {subtitle}
            </p>
          </div>

          {/* Row 4: Uniform specs pills */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px]">
            {/* Peak Foliage Date */}
            <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-50/90 border border-rose-200/80 px-2 py-0.5 rounded-lg font-bold shadow-2xs">
              <Calendar className="w-3 h-3 text-rose-600 shrink-0" />
              <span>{destination.foliagePeakStart} – {destination.foliagePeakEnd}</span>
            </span>

            {/* Tree Species (loai_cay_ngam_la) */}
            <span className="inline-flex items-center gap-1 text-amber-900 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-lg font-semibold shadow-2xs">
              <Leaf className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[150px]">
                {destination.loai_cay_ngam_la && destination.loai_cay_ngam_la.length > 0
                  ? destination.loai_cay_ngam_la.join(', ')
                  : leafColors}
              </span>
            </span>

            {/* Temperature */}
            <span className="inline-flex items-center gap-0.5 text-stone-700 bg-stone-100 border border-stone-200/70 px-1.5 py-0.5 rounded-lg font-semibold shadow-2xs">
              <Thermometer className="w-3 h-3 text-amber-600 shrink-0" />
              <span>{destination.temperature}</span>
            </span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          id="preview-card-close-btn"
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors cursor-pointer active:scale-90"
          aria-label="Đóng xem trước"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Row 5: Action bar & Transit info */}
      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-stone-600 truncate flex items-center gap-1 min-w-0 pr-2">
          <span className="text-stone-400 font-medium shrink-0">🚆 Tuyến:</span>
          <span className="font-semibold text-stone-800 shrink-0">{destination.transportation.from}</span>
          <span className="text-stone-300 shrink-0">•</span>
          <span className="truncate text-stone-600">{destination.transportation.duration}</span>
        </div>

        <button
          id="preview-view-detail-btn"
          onClick={() => onOpenDetail(destination)}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-linear-to-r from-[#A50064] to-[#D82D8B] text-white text-xs font-bold hover:brightness-105 active:scale-95 transition-all shadow-sm shadow-rose-950/20 shrink-0 cursor-pointer"
        >
          <span>Khám phá chi tiết</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

