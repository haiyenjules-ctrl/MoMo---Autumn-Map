import React from 'react';
import { CountryCode, LeafFilterType } from '../types';
import { COUNTRIES } from '../data/destinations';

interface CountryFilterProps {
  selectedCountry: CountryCode;
  onSelectCountry: (country: CountryCode) => void;
  selectedLeaf: LeafFilterType;
  onSelectLeaf: (leaf: LeafFilterType) => void;
  countryCounts: Record<CountryCode, number>;
  leafCounts: Record<LeafFilterType, number>;
}

interface LeafFilterItem {
  id: LeafFilterType;
  label: string;
  icon: string;
  activeClass: string;
  defaultClass: string;
  badgeActiveClass: string;
  badgeDefaultClass: string;
}

const LEAF_OPTIONS: LeafFilterItem[] = [
  {
    id: 'all',
    label: 'Tất cả loài cây',
    icon: '🌲',
    activeClass: 'bg-stone-900 text-white shadow-sm ring-1 ring-stone-900',
    defaultClass: 'bg-white/90 text-stone-700 hover:bg-stone-100 border border-stone-200/80',
    badgeActiveClass: 'bg-white/20 text-white',
    badgeDefaultClass: 'bg-stone-100 text-stone-500',
  },
  {
    id: 'phong',
    label: 'Phong (Momiji)',
    icon: '🍁',
    activeClass: 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-600',
    defaultClass: 'bg-rose-50/80 text-rose-800 hover:bg-rose-100/90 border border-rose-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-rose-100/80 text-rose-700',
  },
  {
    id: 'bach-qua',
    label: 'Bạch quả (Ngân hạnh)',
    icon: '🟡',
    activeClass: 'bg-amber-500 text-stone-950 font-bold shadow-sm ring-1 ring-amber-500',
    defaultClass: 'bg-amber-50/80 text-amber-900 hover:bg-amber-100/90 border border-amber-200/70',
    badgeActiveClass: 'bg-stone-950/20 text-stone-950',
    badgeDefaultClass: 'bg-amber-100/80 text-amber-800',
  },
  {
    id: 'bach-duong',
    label: 'Bạch dương / Cây dương',
    icon: '🌳',
    activeClass: 'bg-yellow-600 text-white shadow-sm ring-1 ring-yellow-600',
    defaultClass: 'bg-yellow-50/80 text-yellow-900 hover:bg-yellow-100/90 border border-yellow-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-yellow-100/80 text-yellow-800',
  },
  {
    id: 'soi',
    label: 'Cây Sồi',
    icon: '🍂',
    activeClass: 'bg-amber-800 text-white shadow-sm ring-1 ring-amber-800',
    defaultClass: 'bg-amber-50/80 text-amber-900 hover:bg-amber-100/90 border border-amber-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-amber-100/80 text-amber-800',
  },
  {
    id: 'thong-rung-la',
    label: 'Thông rụng lá',
    icon: '🌲',
    activeClass: 'bg-emerald-700 text-white shadow-sm ring-1 ring-emerald-700',
    defaultClass: 'bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100/90 border border-emerald-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-emerald-100/80 text-emerald-800',
  },
  {
    id: 'de-gai',
    label: 'Dẻ gai',
    icon: '🌰',
    activeClass: 'bg-orange-700 text-white shadow-sm ring-1 ring-orange-700',
    defaultClass: 'bg-orange-50/80 text-orange-950 hover:bg-orange-100/90 border border-orange-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-orange-100/80 text-orange-800',
  },
  {
    id: 'thuy-sam',
    label: 'Thủy sam / Si sam',
    icon: '🪵',
    activeClass: 'bg-stone-700 text-white shadow-sm ring-1 ring-stone-700',
    defaultClass: 'bg-stone-100 text-stone-800 hover:bg-stone-200/90 border border-stone-300/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-stone-200 text-stone-700',
  },
  {
    id: 'co-lau',
    label: 'Cỏ lau / Cỏ hồng',
    icon: '🌾',
    activeClass: 'bg-pink-600 text-white shadow-sm ring-1 ring-pink-600',
    defaultClass: 'bg-pink-50/80 text-pink-800 hover:bg-pink-100/90 border border-pink-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-pink-100/80 text-pink-700',
  },
  {
    id: 'la-rong',
    label: 'Rừng lá rộng',
    icon: '🌿',
    activeClass: 'bg-teal-700 text-white shadow-sm ring-1 ring-teal-700',
    defaultClass: 'bg-teal-50/80 text-teal-900 hover:bg-teal-100/90 border border-teal-200/70',
    badgeActiveClass: 'bg-white/25 text-white',
    badgeDefaultClass: 'bg-teal-100/80 text-teal-800',
  },
];

export const CountryFilter: React.FC<CountryFilterProps> = ({
  selectedCountry,
  onSelectCountry,
  selectedLeaf,
  onSelectLeaf,
  countryCounts,
  leafCounts,
}) => {
  return (
    <div className="space-y-2">
      {/* Primary: Country Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        {COUNTRIES.map((c) => {
          const isSelected = selectedCountry === c.code;
          const count = countryCounts[c.code] ?? 0;

          return (
            <button
              key={c.code}
              id={`filter-country-${c.code}`}
              onClick={() => onSelectCountry(c.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-white shadow-md shadow-stone-900/20 ring-2 ring-stone-900/30'
                  : 'bg-white/90 backdrop-blur-xs text-stone-700 hover:bg-stone-100/90 border border-stone-200/80 shadow-xs'
              }`}
            >
              <span className="text-sm leading-none">{c.flag}</span>
              <span>{c.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary: Tree Species Filter mapped from loai_cay_ngam_la */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 text-xs">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider pl-1 shrink-0">
          Loài cây:
        </span>
        {LEAF_OPTIONS.map((l) => {
          const isSelected = selectedLeaf === l.id;
          const count = leafCounts[l.id] ?? 0;
          const isZero = count === 0;

          return (
            <button
              key={l.id}
              id={`filter-leaf-${l.id}`}
              onClick={() => onSelectLeaf(l.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium whitespace-nowrap transition-all shrink-0 active:scale-95 cursor-pointer ${
                isSelected ? l.activeClass : l.defaultClass
              } ${isZero && !isSelected ? 'opacity-40 grayscale-30' : ''}`}
            >
              <span className="text-xs leading-none">{l.icon}</span>
              <span className="text-[11px]">{l.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold transition-colors ${
                  isSelected ? l.badgeActiveClass : l.badgeDefaultClass
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
