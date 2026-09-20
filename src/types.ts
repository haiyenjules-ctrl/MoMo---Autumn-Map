export type FoliageStatus = 'early' | 'coming_soon' | 'peak' | 'late';

export type CountryCode = 'all' | 'japan' | 'korea' | 'china';

export type LeafType = 'maple' | 'ginkgo' | 'orange' | 'mixed' | 'silvergrass';

export type TreeSpeciesFilter =
  | 'all'
  | 'phong'
  | 'bach-qua'
  | 'bach-duong'
  | 'soi'
  | 'thong-rung-la'
  | 'de-gai'
  | 'thuy-sam'
  | 'co-lau'
  | 'la-rong';

export type LeafFilterType = TreeSpeciesFilter;

export type VibeCategory = 'all' | 'photo' | 'chill' | 'trekking' | 'night' | 'traditional';

export interface PhotoItem {
  url: string;
  caption: string;
  photoSpotName?: string;
}

export interface Destination {
  id: string;
  name: string;
  vietnameseName?: string;
  localName?: string;
  country: 'Japan' | 'South Korea' | 'China';
  countryCode: 'japan' | 'korea' | 'china';
  countryFlag: string;
  city: string;
  latitude: number;
  longitude: number;
  
  heroImage: string;
  illustrationIcon?: string; // Emoji/illustrated symbol (e.g. '⛩️', '🏯', '🗻', '🚂', '🌊', '🌲')
  leafType?: LeafType; // 'maple' | 'ginkgo' | 'mixed' | 'silvergrass'
  leafTypeName?: string; // e.g. 'Phong đỏ Momiji', 'Ngân hạnh vàng óng'

  // Momo Autumn Foliage Library Official Fields:
  loai_cay_ngam_la?: string[]; // e.g. ['Phong Nhật Bản', 'Bạch quả']
  mau_la?: ('đỏ' | 'cam' | 'vàng' | 'nâu')[]; // ['đỏ', 'cam', 'vàng']
  khu_vuc?: string; // e.g. 'Tokyo', 'Bắc Kinh', 'Kyoto'

  vibe?: VibeCategory[]; // ['photo', 'night']
  vibeBadge?: string; // e.g. 'Sống ảo 100 điểm', 'Thắp đèn ban đêm siêu ảo'
  rating?: number; // e.g. 4.9

  galleryImages: PhotoItem[];

  foliageStart: string;     // e.g. "25/10"
  foliagePeakStart: string; // e.g. "15/11"
  foliagePeakEnd: string;   // e.g. "30/11"
  foliageEnd: string;       // e.g. "10/12"
  foliageStatus: FoliageStatus;
  statusLabelVi: string;

  temperature: string;      // e.g. "8–17°C"
  weatherDescription: string; // e.g. "Nắng hanh vàng, se lạnh, ít mưa"
  weatherIcon?: string;

  transportation: {
    from: string;
    route: string;
    duration: string;
    difficulty: 'Dễ dàng' | 'Trung bình' | 'Thử thách';
    notes?: string;
  };

  outfitTips: {
    summary: string;
    details: string;
    recommendedItems: string[];
    colorPalette?: string[]; // e.g. ['#B45309', '#D97706', '#FEF3C7']
  };

  photoTips: {
    bestTime: string;
    bestSpots: string;
    cameraAdvice: string;
  };

  localTips: {
    crowdLevel: string;
    bestDayToVisit: string;
    openingHours: string;
    insiderAdvice: string;
  };

  tags: string[];
  momoOffers?: {
    flightRoute?: string;
    hotelArea?: string;
    esimPlan?: string;
    qrPartner?: string;
  };
}

export interface FoliageStatusConfig {
  id: FoliageStatus;
  label: string;
  emoji: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  pinColor: string;
  description: string;
}

export interface CountryInfo {
  code: CountryCode;
  name: string;
  flag: string;
  center: [number, number];
  zoom: number;
  tagline: string;
}
