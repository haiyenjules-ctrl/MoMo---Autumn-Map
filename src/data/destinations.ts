import { Destination, FoliageStatusConfig, CountryInfo } from '../types';
import { OFFICIAL_DESTINATIONS as CHINA_DESTINATIONS } from './officialChina';
import { OFFICIAL_CHINA_EXPANDED_DESTINATIONS } from './officialChinaExpanded';
import { OFFICIAL_JAPAN_DESTINATIONS_PART1 } from './officialJapanPart1';
import { OFFICIAL_JAPAN_DESTINATIONS_PART2 } from './officialJapanPart2';
import { OFFICIAL_JAPAN_DESTINATIONS_PART3 } from './officialJapanPart3';
import { OFFICIAL_JAPAN_DESTINATIONS_PART4 } from './officialJapanPart4';
import { OFFICIAL_KOREA_DESTINATIONS } from './officialKorea';
import { OFFICIAL_KOREA_EXPANDED_PART1 } from './officialKoreaExpandedPart1';
import { OFFICIAL_KOREA_EXPANDED_PART2 } from './officialKoreaExpandedPart2';

export const FOLIAGE_STATUSES: Record<string, FoliageStatusConfig> = {
  early: {
    id: 'early',
    label: 'Bắt đầu vào mùa',
    emoji: '🍃',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badgeText: 'text-emerald-700',
    badgeBorder: 'border-emerald-300',
    pinColor: '#10B981',
    description: 'Cây lá bắt đầu chuyển sắc từ xanh sang vàng nhạt, lượng khách còn thưa thoáng.',
  },
  coming_soon: {
    id: 'coming_soon',
    label: 'Sắp đẹp',
    emoji: '🟡',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    badgeText: 'text-amber-700',
    badgeBorder: 'border-amber-300',
    pinColor: '#F59E0B',
    description: 'Khoảng 40–60% lá đã đổi màu rực rỡ, thích hợp để chuẩn bị hành lý bay ngay.',
  },
  peak: {
    id: 'peak',
    label: 'Đang đẹp nhất',
    emoji: '🍁',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    badgeText: 'text-rose-700',
    badgeBorder: 'border-rose-400',
    pinColor: '#E11D48',
    description: 'Đỉnh điểm rực rỡ nhất! Toàn bộ tán phong đỏ và ngân hạnh vàng óng khoe sắc.',
  },
  late: {
    id: 'late',
    label: 'Cuối mùa',
    emoji: '🍂',
    badgeBg: 'bg-amber-950/10 text-amber-900 border-amber-300',
    badgeText: 'text-amber-900',
    badgeBorder: 'border-amber-400',
    pinColor: '#B45309',
    description: 'Thảm lá rụng trải vàng mặt đất như tranh vẽ, không khí se lạnh rõ rệt.',
  },
};

export const COUNTRIES: CountryInfo[] = [
  {
    code: 'all',
    name: 'Tất cả',
    flag: '🌏',
    center: [34.5, 126.0],
    zoom: 5,
    tagline: 'Khám phá hơn 90 địa điểm ngắm mùa thu tuyệt nhất Đông Á',
  },
  {
    code: 'japan',
    name: 'Nhật Bản',
    flag: '🇯🇵',
    center: [35.4, 137.5],
    zoom: 6,
    tagline: 'Sắc lá đỏ Momiji cổ kính xứ Phù Tang',
  },
  {
    code: 'korea',
    name: 'Hàn Quốc',
    flag: '🇰🇷',
    center: [36.5, 128.0],
    zoom: 7,
    tagline: 'Mùa thu lãng mạn với con đường ngân hạnh vàng rực',
  },
  {
    code: 'china',
    name: 'Trung Quốc',
    flag: '🇨🇳',
    center: [34.0, 106.0],
    zoom: 4,
    tagline: 'Hùng vĩ di sản và những thung lũng cổ tích rực sắc thu',
  },
];

/**
 * MASTER DESTINATION LIST
 * Combining all official autumn foliage destinations for Japan, China, and Korea.
 */
export const DESTINATIONS: Destination[] = [
  // 🇯🇵 Japan Official Foliage Destinations (Parts 1, 2, 3, 4)
  ...OFFICIAL_JAPAN_DESTINATIONS_PART1,
  ...OFFICIAL_JAPAN_DESTINATIONS_PART2,
  ...OFFICIAL_JAPAN_DESTINATIONS_PART3,
  ...OFFICIAL_JAPAN_DESTINATIONS_PART4,

  // 🇨🇳 China Official Foliage Destinations (Parts 1 & 2 - 55 destinations)
  ...CHINA_DESTINATIONS,
  ...OFFICIAL_CHINA_EXPANDED_DESTINATIONS,

  // 🇰🇷 Korea Official Foliage Destinations (Original + 34 Expanded Destinations #33 -> #66)
  ...OFFICIAL_KOREA_DESTINATIONS,
  ...OFFICIAL_KOREA_EXPANDED_PART1,
  ...OFFICIAL_KOREA_EXPANDED_PART2,
];
