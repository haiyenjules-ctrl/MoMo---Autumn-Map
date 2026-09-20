import React, { useState } from 'react';
import { Destination } from '../types';
import { FOLIAGE_STATUSES } from '../data/destinations';
import { getDestinationMeta } from '../utils/autumnMeta';
import {
  Calendar,
  Thermometer,
  Train,
  ChevronRight,
  SlidersHorizontal,
  Star,
} from 'lucide-react';

interface DestinationListViewProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
  onClearFilters: () => void;
}

export const DestinationListView: React.FC<DestinationListViewProps> = ({
  destinations,
  onSelectDestination,
  onClearFilters,
}) => {
  const [sortBy, setSortBy] = useState<'peak' | 'rating' | 'name' | 'country'>('peak');

  const sortedDestinations = [...destinations].sort((a, b) => {
    if (sortBy === 'peak') {
      const order = { peak: 1, coming_soon: 2, early: 3, late: 4 };
      return (order[a.foliageStatus] || 5) - (order[b.foliageStatus] || 5);
    }
    if (sortBy === 'rating') {
      const metaA = getDestinationMeta(a);
      const metaB = getDestinationMeta(b);
      return metaB.rating - metaA.rating;
    }
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'country') {
      return a.country.localeCompare(b.country);
    }
    return 0;
  });

  if (destinations.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-stone-50/60 min-h-[450px]">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-2xl mb-3">
          🍁
        </div>
        <h3 className="font-bold text-stone-800 text-base">
          Không tìm thấy địa điểm phù hợp
        </h3>
        <p className="text-xs text-stone-500 max-w-xs mt-1">
          Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn các bộ lọc sắc lá / gu du lịch.
        </p>
        <button
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 active:scale-95 transition-all shadow-sm"
        >
          Xóa tất cả bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50/60">
      {/* List Header & Sorting */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-4 text-xs">
        <span className="text-stone-600 font-medium">
          Hiển thị <strong className="text-stone-900">{destinations.length}</strong> điểm đến mùa thu
        </span>

        <div className="flex items-center gap-1.5 bg-white border border-stone-200/90 rounded-full px-3 py-1 shadow-2xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[11px] text-stone-500">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-[11px] font-semibold text-stone-800 focus:outline-none cursor-pointer"
          >
            <option value="peak">Đang đẹp nhất trước</option>
            <option value="rating">Đánh giá cao nhất ⭐</option>
            <option value="country">Theo quốc gia</option>
            <option value="name">Tên A-Z</option>
          </select>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedDestinations.map((dest) => {
          const statusConfig = FOLIAGE_STATUSES[dest.foliageStatus] || FOLIAGE_STATUSES.peak;
          const meta = getDestinationMeta(dest);

          return (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-rose-300/80 transition-all duration-300 cursor-pointer flex flex-col active:scale-[0.99]"
            >
              {/* Card Top Header - Clean Aesthetic Typographic & Badge Banner */}
              <div className="p-4 bg-linear-to-br from-amber-50/90 via-rose-50/40 to-stone-50 border-b border-stone-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5 font-medium text-stone-600">
                    <span className="text-base">{dest.countryFlag}</span>
                    <span className="font-bold text-stone-800">{dest.city}</span>
                    <span>•</span>
                    <span className="text-stone-500">{dest.country}</span>
                    {dest.khu_vuc && (
                      <>
                        <span>•</span>
                        <span className="text-amber-800 font-semibold">{dest.khu_vuc}</span>
                      </>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 text-[11px] font-bold border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{meta.rating}</span>
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2 mt-1">
                  <div>
                    <h3 className="font-bold text-base text-stone-900 leading-snug group-hover:text-rose-700 transition-colors">
                      {dest.name}
                    </h3>
                    {dest.vietnameseName && (
                      <p className="text-xs text-rose-800/90 font-medium mt-0.5">
                        {dest.vietnameseName}
                      </p>
                    )}
                  </div>
                  <span className="text-2xl shrink-0 p-1.5 rounded-2xl bg-white shadow-2xs border border-stone-200/60">
                    {meta.illustrationIcon}
                  </span>
                </div>

                {/* Foliage tree tags if available */}
                {dest.loai_cay_ngam_la && dest.loai_cay_ngam_la.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-stone-200/50">
                    {dest.loai_cay_ngam_la.map((cay) => (
                      <span
                        key={cay}
                        className="px-2 py-0.5 rounded-md bg-white text-stone-700 text-[11px] font-medium border border-stone-200/80 shadow-2xs"
                      >
                        🌿 {cay}
                      </span>
                    ))}
                    {dest.mau_la && dest.mau_la.length > 0 && (
                      <div className="flex items-center gap-1">
                        {dest.mau_la.map((mau) => {
                          const isRed = mau === 'đỏ';
                          const isYellow = mau === 'vàng';
                          const isOrange = mau === 'cam';
                          return (
                            <span
                              key={mau}
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${
                                isRed
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : isYellow
                                  ? 'bg-amber-50 text-amber-900 border-amber-200'
                                  : isOrange
                                  ? 'bg-orange-50 text-orange-900 border-orange-200'
                                  : 'bg-stone-100 text-stone-700 border-stone-200'
                              }`}
                            >
                              <span>{isRed ? '🍁' : isYellow ? '🟡' : isOrange ? '🟠' : '🟤'}</span>
                              <span className="capitalize">{mau}</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                {/* Key specs */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-700 bg-rose-50/70 p-2.5 rounded-xl border border-rose-100">
                    <span className="flex items-center gap-1.5 text-rose-900 font-semibold text-xs">
                      <Calendar className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Thời điểm đẹp nhất:</span>
                    </span>
                    <span className="font-bold text-rose-700 text-xs">
                      {dest.foliagePeakStart} – {dest.foliagePeakEnd}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-600 px-1 pt-0.5">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Thermometer className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{dest.temperature}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-stone-600 font-medium">
                      <Train className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{dest.transportation.duration}</span>
                    </span>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                    <span>{dest.vibeBadge || dest.tags[0] || 'Mùa thu'}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 group-hover:text-rose-700 group-hover:translate-x-0.5 transition-all">
                    <span>Xem cẩm nang</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
