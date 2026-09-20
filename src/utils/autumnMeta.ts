import { Destination, LeafType, LeafFilterType, VibeCategory } from '../types';

export interface DestinationMeta {
  illustrationIcon: string;
  leafType: LeafType;
  leafTypeName: string;
  vibe: VibeCategory[];
  vibeBadge: string;
  rating: number;
  glowColor: string; // Hex color for dark map glow
  autumnOOTD: {
    name: string;
    colors: { hex: string; name: string }[];
    tip: string;
  };
}

export const DESTINATION_META_MAP: Record<string, DestinationMeta> = {
  // JAPAN
  arashiyama: {
    illustrationIcon: '⛩️',
    leafType: 'maple',
    leafTypeName: 'Lá đỏ Momiji',
    vibe: ['photo', 'traditional', 'chill'],
    vibeBadge: 'Sống ảo 100 điểm',
    rating: 4.95,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Tone Be Nâu Kyoto',
      colors: [
        { hex: '#F5EBE0', name: 'Trắng kem' },
        { hex: '#C68B59', name: 'Nâu caramel' },
        { hex: '#8C3D2B', name: 'Đỏ đất' },
      ],
      tip: 'Mặc trench coat be dài hoặc thuê Yukata tone trầm để cực nổi bật giữa nền cầu gỗ và rừng phong rực rỡ.',
    },
  },
  'kiyomizu-dera': {
    illustrationIcon: '🏯',
    leafType: 'maple',
    leafTypeName: 'Lá đỏ Momiji',
    vibe: ['night', 'traditional', 'photo'],
    vibeBadge: 'Light-up đêm cực ảo',
    rating: 4.98,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Kimono & Dạ Cổ Điển',
      colors: [
        { hex: '#FFF8F0', name: 'Trắng ngà' },
        { hex: '#9C27B0', name: 'Tím hoa cà' },
        { hex: '#D81B60', name: 'Đỏ rượu' },
      ],
      tip: 'Trang phục Kimono sẫm màu với thắt lưng obi vàng sáng sẽ tạo hiệu ứng thị giác tuyệt đỉnh khi thắp đèn ban đêm.',
    },
  },
  'meiji-jingu-gaien': {
    illustrationIcon: '🍂',
    leafType: 'ginkgo',
    leafTypeName: 'Ngân hạnh vàng óng',
    vibe: ['photo', 'chill'],
    vibeBadge: 'Đại lộ vàng rực rỡ',
    rating: 4.91,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Tokyo Chic Streetwear',
      colors: [
        { hex: '#1E293B', name: 'Xanh Navy sẫm' },
        { hex: '#D97706', name: 'Vàng mù tạt' },
        { hex: '#FFFFFF', name: 'Trắng tinh' },
      ],
      tip: 'Áo khoác blazer dạ dáng rộng tone đen hoặc navy đối lập hoàn hảo với thảm lá vàng ngân hạnh 300m.',
    },
  },
  'nara-park': {
    illustrationIcon: '🦌',
    leafType: 'mixed',
    leafTypeName: 'Phong đỏ & Ngân hạnh',
    vibe: ['photo', 'chill'],
    vibeBadge: 'Check-in cùng bầy nai',
    rating: 4.93,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Vintage Cottagecore',
      colors: [
        { hex: '#78350F', name: 'Nâu hạt dẻ' },
        { hex: '#FEF3C7', name: 'Vàng kem bơ' },
        { hex: '#047857', name: 'Xanh rừng rậm' },
      ],
      tip: 'Trang phục năng động thoải mái, mang túi đeo chéo để tiện cất bánh quy shika-senbei tương tác cùng bầy nai.',
    },
  },
  'showa-kinen-park': {
    illustrationIcon: '🌲',
    leafType: 'ginkgo',
    leafTypeName: 'Đường hầm Ngân hạnh',
    vibe: ['photo', 'chill'],
    vibeBadge: 'Thảm vàng vô tận',
    rating: 4.88,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Picnic Mùa Thu',
      colors: [
        { hex: '#FDE68A', name: 'Vàng nhạt' },
        { hex: '#E5E7EB', name: 'Xám khói' },
        { hex: '#B45309', name: 'Cam đất' },
      ],
      tip: 'Gợi ý áo len cổ lọ trắng kết hợp khăn quàng caro màu be/cam để có những bức ảnh đạp xe trải thảm vàng.',
    },
  },
  'lake-kawaguchiko': {
    illustrationIcon: '🗻',
    leafType: 'maple',
    leafTypeName: 'Đường hầm phong & Phú Sĩ',
    vibe: ['photo', 'night', 'chill'],
    vibeBadge: 'Khung hình triệu view',
    rating: 4.99,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Warm Alpine Chic',
      colors: [
        { hex: '#DC2626', name: 'Đỏ cherry' },
        { hex: '#FAFAF9', name: 'Trắng tuyết' },
        { hex: '#292524', name: 'Nâu espresso' },
      ],
      tip: 'Gió hồ Kawaguchiko rất lạnh về chiều, áo phao lông vũ siêu nhẹ hoặc áo măng tô lót lông là lựa chọn chuẩn nhất.',
    },
  },
  nikko: {
    illustrationIcon: '⛩️',
    leafType: 'mixed',
    leafTypeName: 'Thác nước & Phong đỏ',
    vibe: ['trekking', 'photo', 'traditional'],
    vibeBadge: 'Đỉnh cao lá đỏ Kanto',
    rating: 4.94,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Outdoor Hiking Vibe',
      colors: [
        { hex: '#9A3412', name: 'Đỏ gạch nung' },
        { hex: '#374151', name: 'Xám than' },
        { hex: '#FBBF24', name: 'Hổ phách' },
      ],
      tip: 'Nhiệt độ vùng hồ Chuzenji thường thấp hơn Tokyo 6-8°C, nên mang áo giữ nhiệt heattech và giày đế bám tốt.',
    },
  },
  'minoh-park': {
    illustrationIcon: '🌊',
    leafType: 'maple',
    leafTypeName: 'Thác nước & Phong chiên',
    vibe: ['trekking', 'chill'],
    vibeBadge: 'Ăn tempura lá phong',
    rating: 4.86,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Active Trekking',
      colors: [
        { hex: '#059669', name: 'Xanh ngọc lục' },
        { hex: '#F3F4F6', name: 'Trắng sữa' },
        { hex: '#EA580C', name: 'Cam cháy' },
      ],
      tip: 'Cung đường đi bộ ven suối 2.8km rợp lá phong, hãy mang giày thể thao êm ái và áo khoác gió mỏng.',
    },
  },
  hakone: {
    illustrationIcon: '♨️',
    leafType: 'mixed',
    leafTypeName: 'Tắm Onsen ngắm phong',
    vibe: ['chill', 'photo'],
    vibeBadge: 'Cáp treo & Tàu cướp biển',
    rating: 4.89,
    glowColor: '#D97706',
    autumnOOTD: {
      name: 'Onsen Resort Chill',
      colors: [
        { hex: '#E0E7FF', name: 'Xanh pastel' },
        { hex: '#4B5563', name: 'Xám chì' },
        { hex: '#B91C1C', name: 'Đỏ mận' },
      ],
      tip: 'Trang phục ấm áp nhiều lớp để dễ cởi khi di chuyển giữa cáp treo vùng cao và suối nước nóng thư giãn.',
    },
  },

  // SOUTH KOREA
  'nami-island': {
    illustrationIcon: '🌲',
    leafType: 'ginkgo',
    leafTypeName: 'Ngân hạnh & Thủy sam',
    vibe: ['photo', 'chill'],
    vibeBadge: 'Bản tình ca mùa đông',
    rating: 4.96,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'K-Drama Romance',
      colors: [
        { hex: '#FDFBF7', name: 'Trắng kem' },
        { hex: '#D4A373', name: 'Nâu trà sữa' },
        { hex: '#E76F51', name: 'Cam san hô' },
      ],
      tip: 'Áo dạ dáng dài K-style phối cùng khăn len to bản quấn cổ đậm chất phim điện ảnh Hàn Quốc.',
    },
  },
  'namsan-seoul-tower': {
    illustrationIcon: '🗼',
    leafType: 'mixed',
    leafTypeName: 'Dốc phong Namsan',
    vibe: ['night', 'photo', 'chill'],
    vibeBadge: 'Ngắm hoàng hôn Seoul',
    rating: 4.89,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Seoul Night Date',
      colors: [
        { hex: '#0F172A', name: 'Đen tuyền' },
        { hex: '#EF4444', name: 'Đỏ thắm' },
        { hex: '#E2E8F0', name: 'Bạc nhạt' },
      ],
      tip: 'Gió trên đỉnh tháp Namsan về đêm rất buốt; đừng quên áo khoác chắn gió và mũ beret xinh xắn.',
    },
  },
  seoraksan: {
    illustrationIcon: '⛰️',
    leafType: 'maple',
    leafTypeName: 'Phong đỏ vách đá Ulsanbawi',
    vibe: ['trekking', 'photo'],
    vibeBadge: 'Săn lá đỏ sớm nhất Hàn Quốc',
    rating: 4.97,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Gorpcore Explorer',
      colors: [
        { hex: '#15803D', name: 'Xanh rêu lính' },
        { hex: '#B45309', name: 'Nâu đất' },
        { hex: '#F97316', name: 'Cam dạ quang' },
      ],
      tip: 'Trang phục trekking chuyên dụng, giày leo núi chống trượt và gậy đi bộ cho cung đường vách đá kỳ vĩ.',
    },
  },
  'seoul-forest': {
    illustrationIcon: '🍂',
    leafType: 'ginkgo',
    leafTypeName: 'Rừng ngân hạnh trung tâm',
    vibe: ['chill', 'photo'],
    vibeBadge: 'Chill cà phê Seongsu',
    rating: 4.9,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Seongsu Hipster Look',
      colors: [
        { hex: '#334155', name: 'Xám than' },
        { hex: '#FACC15', name: 'Vàng chanh' },
        { hex: '#F1F5F9', name: 'Trắng phấn' },
      ],
      tip: 'Tone màu hiện đại trẻ trung, tiện dạo rừng ngân hạnh rồi ghé các quán cà phê thiết kế cực chất ở Seongsu.',
    },
  },
  gyeongbokgung: {
    illustrationIcon: '🏯',
    leafType: 'mixed',
    leafTypeName: 'Cung điện & Ngân hạnh 500 tuổi',
    vibe: ['traditional', 'photo'],
    vibeBadge: 'Thuê Hanbok miễn vé vào cổng',
    rating: 4.98,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Hoàng Cung Hanbok',
      colors: [
        { hex: '#BE123C', name: 'Đỏ thêu kim tuyến' },
        { hex: '#1D4ED8', name: 'Xanh hoàng gia' },
        { hex: '#FDE047', name: 'Vàng hoàng đế' },
      ],
      tip: 'Mặc trang phục Hanbok truyền thống được MIỄN PHÍ 100% vé vào cửa toàn bộ 5 cung điện Seoul!',
    },
  },
  naejangsan: {
    illustrationIcon: '🍁',
    leafType: 'maple',
    leafTypeName: 'Đường hầm phong đỏ rực lửa',
    vibe: ['photo', 'trekking'],
    vibeBadge: 'Vua lá đỏ Hàn Quốc',
    rating: 4.99,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Crimson Forest Mood',
      colors: [
        { hex: '#F3F4F6', name: 'Trắng ngà' },
        { hex: '#475569', name: 'Ghi đá' },
        { hex: '#B91C1C', name: 'Đỏ bordeaux' },
      ],
      tip: 'Vì cả con đường ngập tràn lá phong đỏ thắm, trang phục màu trắng/be kem sẽ giúp bạn nổi bần bật.',
    },
  },
  'olympic-park-seoul': {
    illustrationIcon: '🟡',
    leafType: 'ginkgo',
    leafTypeName: 'Đại lộ Bạch quả & Cỏ hồng',
    vibe: ['photo', 'chill'],
    vibeBadge: 'Cây Cô Đơn & Cỏ hồng',
    rating: 4.89,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Pastel Autumn Picnic',
      colors: [
        { hex: '#FEF08A', name: 'Vàng kem' },
        { hex: '#F472B6', name: 'Hồng phấn' },
        { hex: '#F8FAFC', name: 'Trắng mây' },
      ],
      tip: 'Đồi cỏ thênh thang với hàng bạch quả vàng rực rỡ và góc hoa cỏ hồng Muhly lãng mạn.',
    },
  },

  // CHINA
  'fragrant-hills': {
    illustrationIcon: '🍂',
    leafType: 'maple',
    leafTypeName: 'Lá phong khói Hương Sơn',
    vibe: ['trekking', 'photo'],
    vibeBadge: 'Đệ nhất thu Bắc Kinh',
    rating: 4.93,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Peking Autumn Chic',
      colors: [
        { hex: '#7C2D12', name: 'Nâu đỏ đất sét' },
        { hex: '#FEF3C7', name: 'Vàng lụa' },
        { hex: '#1E293B', name: 'Xanh chàm' },
      ],
      tip: 'Leo đồi Hương Sơn ngắm 10 vạn cây phong khói chuyển sắc đỏ rực nhìn xuống toàn cảnh Bắc Kinh cổ kính.',
    },
  },
  jiuzhaigou: {
    illustrationIcon: '🌊',
    leafType: 'mixed',
    leafTypeName: 'Rừng nguyên sinh ngũ sắc',
    vibe: ['photo', 'trekking'],
    vibeBadge: 'Tiên cảnh trần gian',
    rating: 5.0,
    glowColor: '#06B6D4',
    autumnOOTD: {
      name: 'Highland Tibet Fusion',
      colors: [
        { hex: '#0EA5E9', name: 'Xanh ngọc bích' },
        { hex: '#F97316', name: 'Cam thổ cẩm' },
        { hex: '#F8FAFC', name: 'Trắng tuyết' },
      ],
      tip: 'Độ cao trên 2.500m nắng hanh và lạnh; khăn choàng thổ cẩm khổ lớn vừa giữ ấm vừa làm đạo cụ chụp hình xuất sắc.',
    },
  },
  'west-lake-hangzhou': {
    illustrationIcon: '🍵',
    leafType: 'mixed',
    leafTypeName: 'Hàng liễu & Phong đỏ Tây Hồ',
    vibe: ['chill', 'traditional', 'photo'],
    vibeBadge: 'Thi vị Giang Nam mùa thu',
    rating: 4.89,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Giang Nam Tao Nhã',
      colors: [
        { hex: '#475569', name: 'Xám lụa mực tàu' },
        { hex: '#FDF4FF', name: 'Tím khói' },
        { hex: '#10B981', name: 'Xanh trà Long Tỉnh' },
      ],
      tip: 'Áo Hanfu cách tân hoặc váy lụa mềm mại ngồi thuyền gỗ ngắm trăng thu Tam Đàm Ấn Nguyệt.',
    },
  },
  zhangjiajie: {
    illustrationIcon: '⛰️',
    leafType: 'mixed',
    leafTypeName: 'Trụ đá Avatar & Lá phong',
    vibe: ['trekking', 'photo'],
    vibeBadge: 'Cầu kính & Biển mây kỳ vĩ',
    rating: 4.95,
    glowColor: '#D97706',
    autumnOOTD: {
      name: 'Adventure Outdoor',
      colors: [
        { hex: '#0284C7', name: 'Xanh thiên thanh' },
        { hex: '#374151', name: 'Xám đá núi' },
        { hex: '#F59E0B', name: 'Cam hổ phách' },
      ],
      tip: 'Trang phục gọn gàng chống gió, giày thể thao ôm chân để chinh phục Thiên Môn Sơn và hẻm núi sâu.',
    },
  },
  'summer-palace-beijing': {
    illustrationIcon: '🏯',
    leafType: 'ginkgo',
    leafTypeName: 'Di Hòa Viên & Hồ Côn Minh',
    vibe: ['traditional', 'chill', 'photo'],
    vibeBadge: 'Mùa thu Hoàng gia Trung Hoa',
    rating: 4.92,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Imperial Elegance',
      colors: [
        { hex: '#B91C1C', name: 'Đỏ tường cung đình' },
        { hex: '#EAB308', name: 'Vàng mái ngói' },
        { hex: '#FFFFFF', name: 'Trắng ngọc' },
      ],
      tip: 'Điểm chụp đẹp nhất là Cầu Thập Thất Khổng (17 nhịp) lúc ánh hoàng hôn mùa thu xuyên qua các vòm cầu.',
    },
  },
  'qixia-mountain': {
    illustrationIcon: '⛩️',
    leafType: 'maple',
    leafTypeName: 'Tề Hà Sơn lá phong Nam Kinh',
    vibe: ['traditional', 'photo'],
    vibeBadge: 'Mùa thu cố đô Lục Triều',
    rating: 4.88,
    glowColor: '#E11D48',
    autumnOOTD: {
      name: 'Nanjing Vintage Classic',
      colors: [
        { hex: '#7F1D1D', name: 'Đỏ mận chín' },
        { hex: '#FEF08A', name: 'Vàng kem mỏng' },
        { hex: '#334155', name: 'Xanh than' },
      ],
      tip: 'Tục ngữ có câu: Mùa xuân chơi Ngưu Thủ, mùa thu ngắm Tề Hà. Hơn 40 loại phong đỏ chuyển màu cùng lúc.',
    },
  },
  'gucun-park': {
    illustrationIcon: '🌲',
    leafType: 'ginkgo',
    leafTypeName: 'Bạch quả & Rừng lá rộng',
    vibe: ['chill', 'photo'],
    vibeBadge: 'Trốn khói bụi Thượng Hải',
    rating: 4.84,
    glowColor: '#F59E0B',
    autumnOOTD: {
      name: 'Modern Shanghai Casual',
      colors: [
        { hex: '#F87171', name: 'Đỏ san hô' },
        { hex: '#E2E8F0', name: 'Ghi sáng' },
        { hex: '#0F172A', name: 'Đen nhung' },
      ],
      tip: 'Công viên lớn nhất Thượng Hải với hồ nước chèo thuyền và hàng trăm gốc ngân hạnh vàng ruộm.',
    },
  },
};

// Alias mapping for destinations that match full official dataset IDs
const DEST_ID_ALIASES: Record<string, string> = {
  'arashiyama-kyoto': 'arashiyama',
  'kiyomizudera-temple': 'kiyomizu-dera',
  'fuji-kawaguchiko': 'lake-kawaguchiko',
  'nikko-lake-chuzenji': 'nikko',
  'nami-island-korea': 'nami-island',
  'seoraksan-national-park': 'seoraksan',
  'gyeongbokgung-palace': 'gyeongbokgung',
  'naejangsan-national-park': 'naejangsan',
  'fragrant-hills-park': 'fragrant-hills',
  'zhangjiajie-national-park': 'zhangjiajie',
  'mount-qixia': 'qixia-mountain',
};

// Fallback generator for any destination
export function getDestinationMeta(dest: Destination): DestinationMeta {
  const directMeta = DESTINATION_META_MAP[dest.id];
  if (directMeta) {
    return directMeta;
  }

  const aliasKey = DEST_ID_ALIASES[dest.id];
  if (aliasKey && DESTINATION_META_MAP[aliasKey]) {
    return DESTINATION_META_MAP[aliasKey];
  }

  // 1. Detect if destination is predominantly grass / silvergrass / pink muhly
  const isGrass =
    dest.leafType === 'silvergrass' ||
    dest.loai_cay_ngam_la?.some((l) => l.toLowerCase().includes('cỏ') || l.toLowerCase().includes('lau')) ||
    dest.tags?.some((t) => t.toLowerCase().includes('cỏ') || t.toLowerCase().includes('lau') || t.toLowerCase().includes('muhly')) ||
    dest.name.toLowerCase().includes('cỏ') ||
    dest.name.toLowerCase().includes('lau') ||
    dest.name.toLowerCase().includes('haneul') ||
    dest.name.toLowerCase().includes('muhly');

  const m = dest.mau_la || [];
  const hasYellow =
    m.includes('vàng') ||
    dest.tags?.some((t) => t.toLowerCase().includes('ngân hạnh') || t.toLowerCase().includes('bạch quả') || t.toLowerCase().includes('lá vàng')) ||
    dest.loai_cay_ngam_la?.some((l) => l.toLowerCase().includes('bạch quả') || l.toLowerCase().includes('ngân hạnh') || l.toLowerCase().includes('thông rụng lá'));

  const hasRed =
    m.includes('đỏ') ||
    dest.tags?.some((t) => t.toLowerCase().includes('phong') || t.toLowerCase().includes('momiji') || t.toLowerCase().includes('lá đỏ')) ||
    dest.loai_cay_ngam_la?.some((l) => l.toLowerCase().includes('phong') || l.toLowerCase().includes('momiji') || l.toLowerCase().includes('lá đỏ'));

  const hasOrange =
    m.includes('cam') ||
    dest.loai_cay_ngam_la?.some((l) => l.toLowerCase().includes('thủy sam') || l.toLowerCase().includes('dẻ gai') || l.toLowerCase().includes('sồi'));

  let leafType: LeafType = dest.leafType || 'mixed';
  if (isGrass) {
    leafType = 'silvergrass';
  } else if (hasRed && hasYellow) {
    leafType = 'mixed';
  } else if (hasRed) {
    leafType = 'maple';
  } else if (hasYellow) {
    leafType = 'ginkgo';
  } else if (hasOrange) {
    leafType = 'orange';
  } else {
    leafType = dest.leafType || 'maple';
  }

  const illustrationIcon =
    dest.illustrationIcon ||
    (isGrass
      ? '🌾'
      : leafType === 'ginkgo'
      ? '🟡'
      : leafType === 'orange'
      ? '🟠'
      : dest.tags?.some((t) => t.toLowerCase().includes('chùa') || t.toLowerCase().includes('đền'))
      ? '⛩️'
      : dest.tags?.some((t) => t.toLowerCase().includes('núi') || t.toLowerCase().includes('thung lũng'))
      ? '⛰️'
      : '🍁');

  const leafTypeName =
    dest.leafTypeName ||
    (dest.loai_cay_ngam_la && dest.loai_cay_ngam_la.length > 0
      ? dest.loai_cay_ngam_la.join(', ')
      : isGrass
      ? 'Cỏ hồng & Lau bạc'
      : leafType === 'ginkgo'
      ? 'Ngân hạnh vàng óng'
      : leafType === 'orange'
      ? 'Si sam cam rực rỡ'
      : leafType === 'mixed'
      ? 'Phong đỏ & Ngân hạnh'
      : 'Lá đỏ Momiji');

  const glowColor =
    isGrass
      ? '#EC4899'
      : leafType === 'ginkgo'
      ? '#F59E0B'
      : leafType === 'orange'
      ? '#F97316'
      : leafType === 'mixed'
      ? '#F59E0B'
      : '#E11D48';

  return {
    illustrationIcon,
    leafType,
    leafTypeName,
    vibe: dest.vibe || ['photo', 'chill'],
    vibeBadge: dest.khu_vuc ? `Khu vực ${dest.khu_vuc}` : 'Điểm check-in mùa thu hot',
    rating: dest.rating || 4.9,
    glowColor,
    autumnOOTD: {
      name: dest.outfitTips?.summary || 'Tone Be Nâu Mùa Thu',
      colors: [
        { hex: '#F5EBE0', name: 'Trắng kem' },
        { hex: '#C68B59', name: 'Nâu caramel' },
        { hex: '#B45309', name: 'Cam đất' },
      ],
      tip:
        dest.outfitTips?.details ||
        'Phối trang phục tone ấm be, nâu, cam cháy để tạo độ tương phản nổi bật với thiên nhiên mùa thu.',
    },
  };
}

/**
 * Filter destination accurately by tree species (loai_cay_ngam_la)
 */
export function matchesLeafFilter(dest: Destination, filter: LeafFilterType): boolean {
  if (filter === 'all') return true;

  const species = dest.loai_cay_ngam_la || [];
  const lowerSpecies = species.map((s) => s.toLowerCase());

  switch (filter) {
    case 'phong':
      // Cây Phong, Phong Nhật Bản, Phong lá đỏ
      return lowerSpecies.some((s) => s.includes('phong'));
    case 'bach-qua':
      // Bạch quả, Cây ngân hạnh
      return lowerSpecies.some((s) => s.includes('bạch quả') || s.includes('ngân hạnh'));
    case 'bach-duong':
      // Bạch dương, Dương, Dương Euphrates, Hồ dương, Cây dương
      return lowerSpecies.some((s) => s.includes('bạch dương') || s.includes('dương'));
    case 'soi':
      // Cây Sồi
      return lowerSpecies.some((s) => s.includes('sồi'));
    case 'thong-rung-la':
      // Thông rụng lá (Karamatsu / Larch)
      return lowerSpecies.some((s) => s.includes('thông rụng lá'));
    case 'de-gai':
      // Cây Dẻ gai (Buna / Beech)
      return lowerSpecies.some((s) => s.includes('dẻ gai'));
    case 'thuy-sam':
      // Hồng sam nước / thủy sam, Si sam, Linh sam
      return lowerSpecies.some((s) => s.includes('sam'));
    case 'co-lau':
      // Cỏ lau, Cỏ lau bạc, Cỏ hồng Muhly
      return (
        lowerSpecies.some((s) => s.includes('cỏ') || s.includes('lau')) ||
        dest.tags?.some((t) => t.toLowerCase().includes('cỏ') || t.toLowerCase().includes('lau')) ||
        dest.name.toLowerCase().includes('cỏ') ||
        dest.name.toLowerCase().includes('lau')
      );
    case 'la-rong':
      // Rừng lá rộng, Rừng cây lá rộng hỗn hợp, Cây lá rộng, Rừng cây
      return lowerSpecies.some((s) => s.includes('lá rộng') || s.includes('rừng cây'));
    default:
      return true;
  }
}
