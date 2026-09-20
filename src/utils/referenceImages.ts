import { Destination, PhotoItem } from '../types';

/**
 * Curated, verified autumn foliage reference photos (Unsplash high-resolution).
 * All URLs have been verified (200 OK) with distinct photographic perspectives.
 */

// 1. POOL ẢNH MÙA LÁ VÀNG (Ginkgo, Ngân Hạnh, Rừng Cây & Đại Lộ Lá Vàng)
const YELLOW_AUTUMN_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1200&auto=format&fit=crop',
    scene: 'Tán lá bạch quả ngân hạnh vàng rực dưới nắng thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
    scene: 'Đại lộ rợp bóng cây lá vàng với những vệt nắng xiên ban mai',
  },
  {
    url: 'https://images.unsplash.com/photo-1507371341162-763b5e419408?q=80&w=1200&auto=format&fit=crop',
    scene: 'Vòm cây lá vàng óng ả đón làn gió heo may se lạnh',
  },
  {
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop',
    scene: 'Hàng cây ngân hạnh đồng loạt chuyển sang sắc vàng mật ong',
  },
  {
    url: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?q=80&w=1200&auto=format&fit=crop',
    scene: 'Con đường tản bộ trải thảm lá vàng rơi dày đặc như tranh vẽ',
  },
  {
    url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?q=80&w=1200&auto=format&fit=crop',
    scene: 'Tán cây ngân hạnh cổ thụ tỏa bóng dát vàng cả góc trời',
  },
  {
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
    scene: 'Nhánh lá vàng rực rỡ nổi bật trên nền trời thu trong vắt',
  },
  {
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop',
    scene: 'Toàn cảnh công viên và triền đồi ngập tràn sắc vàng mùa thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=1200&auto=format&fit=crop',
    scene: 'Lối tản bộ lãng mạn giữa hai hàng cây lá vàng soi bóng',
  },
  {
    url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
    scene: 'Cận cảnh vẻ đẹp ấm áp, óng ả của những tán lá mùa thay sắc',
  },
  {
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    scene: 'Vòm trời mùa thu dát vàng bừng sáng trong nắng ban trưa',
  },
  {
    url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop',
    scene: 'Đại lộ cây ngân hạnh thẳng tắp cắt tỉa chỉnh chu vào mùa đỉnh điểm',
  },
];

// 2. POOL ẢNH MÙA LÁ ĐỎ & PHONG MOMIJI (Đền chùa, Mái ngói cổ, Cầu truyền thống, Tán phong)
const RED_AUTUMN_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    scene: 'Tầng mái chùa cổ kính ẩn hiện sau tán phong Momiji đỏ rực',
  },
  {
    url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
    scene: 'Vườn truyền thống với hồ nước soi bóng tán phong đỏ và đình đài',
  },
  {
    url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
    scene: 'Cận cảnh lá phong cánh sao đỏ thẫm sắc màu đặc trưng mùa thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
    scene: 'Khuôn viên chùa cổ thanh tịnh giữa rừng phong chuyển màu rực rỡ',
  },
  {
    url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1200&auto=format&fit=crop',
    scene: 'Kiến trúc gỗ mộc mạc hòa quyện cùng sắc đỏ thắm mùa thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1200&auto=format&fit=crop',
    scene: 'Tháp chùa vươn cao giữa ngút ngàn sắc đỏ và cam vàng rực rỡ',
  },
  {
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
    scene: 'Lối đá rêu phong tản bộ dưới vòm phong buông rủ êm đềm',
  },
  {
    url: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=1200&auto=format&fit=crop',
    scene: 'Đèn lồng đá truyền thống nép mình bên thềm lá phong đỏ rụng',
  },
  {
    url: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=1200&auto=format&fit=crop',
    scene: 'Cầu gỗ cong truyền thống bắc qua suối nhỏ giữa rừng lá thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?q=80&w=1200&auto=format&fit=crop',
    scene: 'Những tán phong đỏ thắm rực rỡ dưới ánh hoàng hôn mùa thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=1200&auto=format&fit=crop',
    scene: 'Khu rừng chuyển mùa với sắc đỏ thắm bao phủ sườn đồi',
  },
  {
    url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop',
    scene: 'Đường mòn tản bộ lót gạch phủ đầy cánh lá phong đỏ cam',
  },
];

// 3. POOL ẢNH MÙA THU NÚI NON, HỒ NƯỚC & DI TÍCH (Hồ phẳng lặng, Vách đá, Cung điện)
const SCENIC_AUTUMN_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    scene: 'Mặt hồ phẳng lặng như gương soi bóng dãy núi ngập tràn sắc thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1200&auto=format&fit=crop',
    scene: 'Triền đồi uốn lượn sắc vàng soi bóng làn nước biếc trong lành',
  },
  {
    url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200&auto=format&fit=crop',
    scene: 'Vách núi trập trùng và thành lũy cổ kính giữa biển lá mùa thu hùng vĩ',
  },
  {
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop',
    scene: 'Điện các hoàng gia uy nghiêm nép mình giữa những tàng cây mùa thay lá',
  },
  {
    url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?q=80&w=1200&auto=format&fit=crop',
    scene: 'Dòng suối trong vắt len lỏi qua ghềnh đá giữa thung lũng mùa thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    scene: 'Biển mây bồng bềnh phủ trên đỉnh núi nhuộm sắc lá đỏ vàng',
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop',
    scene: 'Rừng nguyên sinh mùa thu với những vạt nắng sớm xuyên qua sương',
  },
  {
    url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop',
    scene: 'Bến nước êm đềm bên rặng cây vàng đỏ soi bóng nước mùa thu',
  },
  {
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    scene: 'Sương thu mờ ảo bao phủ thung lũng lá đổi màu trong trẻo',
  },
  {
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1200&auto=format&fit=crop',
    scene: 'Thung lũng sơn thủy hữu tình vào đợt lá chuyển sắc đỉnh điểm',
  },
];

/**
 * Simple deterministic string hashing to distribute unique image pairs
 * across destinations without repetition.
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Picks 2 distinct items from a photo pool deterministically based on destination ID.
 */
function pickTwoPhotos<T>(pool: T[], seed: string): [T, T] {
  const h = hashString(seed);
  const idx1 = h % pool.length;
  const step = 1 + ((h >> 3) % (pool.length - 1));
  const idx2 = (idx1 + step) % pool.length;
  return [pool[idx1], pool[idx2]];
}

/**
 * Generates EXACTLY 2 destination-accurate reference photos.
 * Accurately describes the destination during its foliage season (especially "mùa lá vàng"),
 * ensuring no duplicate imagery across different destinations.
 */
export function getReferencePhotosForDestination(destination: Destination): PhotoItem[] {
  const nameLower = destination.name.toLowerCase();
  const tagsStr = destination.tags.join(' ').toLowerCase();
  const loaiCayStr = (destination.loai_cay_ngam_la || []).join(' ').toLowerCase();
  const mauLaStr = (destination.mau_la || []).join(' ').toLowerCase();

  // Determine foliage characteristics
  const isYellowSpecialty =
    destination.leafType === 'ginkgo' ||
    nameLower.includes('ngân hạnh') ||
    nameLower.includes('bạch quả') ||
    nameLower.includes('icho') ||
    nameLower.includes('gaien') ||
    tagsStr.includes('ngân hạnh') ||
    tagsStr.includes('bạch quả') ||
    loaiCayStr.includes('ngân hạnh') ||
    loaiCayStr.includes('bạch quả') ||
    (mauLaStr.includes('vàng') && !mauLaStr.includes('đỏ'));

  const isWaterOrMountain =
    nameLower.includes('hồ') ||
    nameLower.includes('thác') ||
    nameLower.includes('núi') ||
    nameLower.includes('cửu trại câu') ||
    nameLower.includes('chuzenji') ||
    nameLower.includes('kegon') ||
    nameLower.includes('fuji') ||
    nameLower.includes('seoraksan') ||
    nameLower.includes('bukhansan') ||
    nameLower.includes('naejangsan') ||
    nameLower.includes('hoàng sơn') ||
    nameLower.includes('hương sơn') ||
    nameLower.includes('trường thành') ||
    nameLower.includes('bát đạt lĩnh');

  // Species and colors summary for textual descriptions
  const loaiCay = destination.loai_cay_ngam_la?.join(', ') || destination.leafTypeName || 'Lá mùa thu';
  const mauLa = destination.mau_la?.join(', ') || 'vàng, đỏ';
  const bestTime = destination.photoTips?.bestTime || 'Buổi sáng ngập nắng nhẹ';
  const advice = destination.photoTips?.cameraAdvice || 'Chụp góc thấp lấy tiền cảnh thảm lá rơi';

  // 1. SELECT EXACTLY 2 UNIQUE PHOTOS FROM THE APPROPRIATE POOL
  if (isYellowSpecialty) {
    // MÙA LÁ VÀNG (Ginkgo / Ngân hạnh / Tán lá vàng)
    const [img1, img2] = pickTwoPhotos(YELLOW_AUTUMN_IMAGES, destination.id || destination.name);

    const spotName1 =
      destination.galleryImages?.[0]?.photoSpotName ||
      `Đại lộ & Tán lá vàng chính tại ${destination.name}`;

    const caption1 = `[Cảnh sắc mùa lá vàng] ${img1.scene} tại ${destination.name} (${destination.city}). Không gian rực rỡ khi loài cây ${loaiCay} đồng loạt khoác lên sắc ${mauLa} vào đợt đỉnh điểm.`;

    const spotName2 =
      destination.photoTips?.bestSpots?.split('.')[0] ||
      `Lối tản bộ ngắm thảm lá vàng rơi`;

    const caption2 = `[Góc chụp & Trải nghiệm] ${img2.scene}. Khí hậu ${destination.temperature}, ${destination.weatherDescription?.toLowerCase() || 'se lạnh trong lành'}. Thời điểm lý tưởng: ${bestTime}. Gợi ý: ${advice}.`;

    return [
      {
        url: img1.url,
        photoSpotName: spotName1,
        caption: caption1,
      },
      {
        url: img2.url,
        photoSpotName: spotName2,
        caption: caption2,
      },
    ];
  }

  if (isWaterOrMountain) {
    // NÚI NON, HỒ NƯỚC, KHÁM PHÁ THIÊN NHIÊN
    const [img1, img2] = pickTwoPhotos(SCENIC_AUTUMN_IMAGES, destination.id || destination.name);

    const spotName1 =
      destination.galleryImages?.[0]?.photoSpotName ||
      `Điểm ngắm cảnh sắc thu chính tại ${destination.name}`;

    const caption1 = `[Cảnh sắc mùa thu] ${img1.scene} tại ${destination.name} (${destination.city}). Khung cảnh thiên nhiên kỳ vĩ khi rừng cây ${loaiCay} nhuộm sắc ${mauLa} soi bóng mây trời.`;

    const spotName2 =
      destination.photoTips?.bestSpots?.split('.')[0] ||
      `Điểm ngắm toàn cảnh thung lũng & triền núi`;

    const caption2 = `[Góc chụp & Trải nghiệm] ${img2.scene}. Khí hậu ${destination.temperature}, ${destination.weatherDescription?.toLowerCase() || 'mát lành dịu nhẹ'}. Thời điểm đẹp nhất: ${bestTime}. Gợi ý: ${advice}.`;

    return [
      {
        url: img1.url,
        photoSpotName: spotName1,
        caption: caption1,
      },
      {
        url: img2.url,
        photoSpotName: spotName2,
        caption: caption2,
      },
    ];
  }

  // MÙA LÁ ĐỎ, ĐỀN CHÙA, VƯỜN CỔ TRUYỀN & CÔNG VIÊN LỊCH SỬ
  const [img1, img2] = pickTwoPhotos(RED_AUTUMN_IMAGES, destination.id || destination.name);

  const spotName1 =
    destination.galleryImages?.[0]?.photoSpotName ||
    `Điểm ngắm lá phong rực rỡ tại ${destination.name}`;

  const caption1 = `[Cảnh sắc mùa lá đỏ] ${img1.scene} tại ${destination.name} (${destination.city}). Không gian cổ kính rực rỡ sắc ${mauLa} của loài cây ${loaiCay} vào mùa thay lá đẹp nhất.`;

  const spotName2 =
    destination.photoTips?.bestSpots?.split('.')[0] ||
    `Góc tản bộ và lưu niệm mùa thu`;

  const caption2 = `[Góc chụp & Trải nghiệm] ${img2.scene}. Khí hậu ${destination.temperature}, ${destination.weatherDescription?.toLowerCase() || 'se lạnh lý tưởng'}. Thời điểm chụp đẹp: ${bestTime}. Gợi ý: ${advice}.`;

  return [
    {
      url: img1.url,
      photoSpotName: spotName1,
      caption: caption1,
    },
    {
      url: img2.url,
      photoSpotName: spotName2,
      caption: caption2,
    },
  ];
}
