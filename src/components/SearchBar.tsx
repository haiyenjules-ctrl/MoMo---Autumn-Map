import { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin, Sparkles } from 'lucide-react';
import { Destination } from '../types';
import { getDestinationMeta } from '../utils/autumnMeta';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
}

const POPULAR_SEARCH_TAGS = [
  'Kyoto',
  'Đảo Nami',
  'Hoàng Sơn',
  'Đạo Thành Á Đinh',
  'Cửu Trại Câu',
  'Ngân hạnh',
  'Trương Gia Giới',
  'Seoraksan',
];

export function SearchBar({
  searchQuery,
  onSearchChange,
  destinations,
  onSelectDestination,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter matched suggestions
  const trimmed = searchQuery.trim().toLowerCase();
  const suggestions = trimmed
    ? destinations
        .filter((d) => {
          return (
            d.name.toLowerCase().includes(trimmed) ||
            (d.vietnameseName && d.vietnameseName.toLowerCase().includes(trimmed)) ||
            d.city.toLowerCase().includes(trimmed) ||
            d.country.toLowerCase().includes(trimmed) ||
            d.tags.some((t) => t.toLowerCase().includes(trimmed))
          );
        })
        .slice(0, 5)
    : [];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Search Input Box */}
      <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl border border-stone-200/90 shadow-sm transition-all focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-200/50">
        <div className="pl-3.5 pr-1 text-stone-400">
          <Search className="w-4 h-4 text-stone-400" />
        </div>
        <input
          id="destination-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Tìm địa danh, thành phố (Kyoto, Nami, Bắc Kinh...)"
          className="w-full py-2.5 pr-9 text-xs text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
        />
        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={() => {
              onSearchChange('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Auto-suggest dropdown */}
      {isOpen && searchQuery.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white/98 backdrop-blur-lg rounded-xl border border-stone-200 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {suggestions.length > 0 ? (
            <div className="divide-y divide-stone-100">
              <div className="px-3 py-1.5 bg-stone-50 text-[11px] font-semibold text-stone-500 flex items-center justify-between">
                <span>Gợi ý điểm đến</span>
                <span className="text-[10px] text-stone-400">{suggestions.length} kết quả</span>
              </div>
              {suggestions.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    onSelectDestination(dest);
                    setIsOpen(false);
                    onSearchChange(dest.name);
                  }}
                  className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-rose-50/70 text-left transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-50 to-rose-50 border border-stone-200 group-hover:border-rose-300 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    {getDestinationMeta(dest).illustrationIcon || dest.countryFlag}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-stone-900 truncate">
                        {dest.name}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        {dest.countryFlag} {dest.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                      <span className="text-rose-700 font-medium">{getDestinationMeta(dest).leafTypeName}</span>
                      <span className="text-stone-300">•</span>
                      <span>{dest.foliagePeakStart} – {dest.foliagePeakEnd}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-xs text-stone-500 text-center">
              Không tìm thấy địa điểm phù hợp với "<span className="font-medium text-stone-800">{searchQuery}</span>"
            </div>
          )}
        </div>
      )}

      {/* Popular quick tags when search is empty */}
      {!searchQuery && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1.5 px-0.5 text-[11px]">
          <span className="text-stone-400 shrink-0 text-[10px] font-medium flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Hot:
          </span>
          {POPULAR_SEARCH_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                onSearchChange(tag);
              }}
              className="px-2 py-0.5 rounded-md bg-white/70 hover:bg-white text-stone-600 border border-stone-200/60 whitespace-nowrap shrink-0 transition-colors active:scale-95"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
