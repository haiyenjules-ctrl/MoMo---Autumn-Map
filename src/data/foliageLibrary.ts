// MOMO AUTUMN FOLIAGE LIBRARY — MVP
// Source of truth matching the official specification

export type TreeTypeId =
  | 'JAPANESE_MAPLE'
  | 'MAPLE'
  | 'GINKGO'
  | 'BEECH'
  | 'OAK'
  | 'LARCH'
  | 'BIRCH'
  | 'METASEQUOIA'
  | 'EUPHRATES_POPLAR'
  | 'MIXED_DECIDUOUS_FOREST'
  | 'ZELKOVA'
  | 'SMOKE_TREE'
  | 'PLANE_TREE';

export type LeafColor = 'đỏ' | 'cam' | 'vàng' | 'nâu';

export interface TreeTypeDefinition {
  id: TreeTypeId;
  nameVi: string;
  colors: LeafColor[];
  icon: string;
}

export const TREE_TYPES_LIBRARY: Record<TreeTypeId, TreeTypeDefinition> = {
  JAPANESE_MAPLE: {
    id: 'JAPANESE_MAPLE',
    nameVi: 'Phong Nhật Bản',
    colors: ['đỏ', 'cam'],
    icon: '🍁',
  },
  MAPLE: {
    id: 'MAPLE',
    nameVi: 'Phong',
    colors: ['đỏ', 'cam'],
    icon: '🍁',
  },
  GINKGO: {
    id: 'GINKGO',
    nameVi: 'Bạch quả',
    colors: ['vàng'],
    icon: '🟡',
  },
  BEECH: {
    id: 'BEECH',
    nameVi: 'Dẻ gai',
    colors: ['vàng', 'cam', 'đỏ'],
    icon: '🍂',
  },
  OAK: {
    id: 'OAK',
    nameVi: 'Sồi',
    colors: ['cam', 'nâu', 'đỏ'],
    icon: '🌰',
  },
  LARCH: {
    id: 'LARCH',
    nameVi: 'Thông rụng lá',
    colors: ['vàng', 'cam'],
    icon: '🌲',
  },
  BIRCH: {
    id: 'BIRCH',
    nameVi: 'Bạch dương',
    colors: ['vàng'],
    icon: '🌾',
  },
  METASEQUOIA: {
    id: 'METASEQUOIA',
    nameVi: 'Si sam / Metasequoia',
    colors: ['cam', 'nâu'],
    icon: '🌲',
  },
  EUPHRATES_POPLAR: {
    id: 'EUPHRATES_POPLAR',
    nameVi: 'Dương Euphrates',
    colors: ['vàng', 'cam'],
    icon: '🍂',
  },
  MIXED_DECIDUOUS_FOREST: {
    id: 'MIXED_DECIDUOUS_FOREST',
    nameVi: 'Rừng lá rộng hỗn hợp',
    colors: ['đỏ', 'vàng', 'cam'],
    icon: '🍁',
  },
  ZELKOVA: {
    id: 'ZELKOVA',
    nameVi: 'Cây du zelkova',
    colors: ['vàng'],
    icon: '🌿',
  },
  SMOKE_TREE: {
    id: 'SMOKE_TREE',
    nameVi: 'Cây khói',
    colors: ['cam', 'đỏ'],
    icon: '🔥',
  },
  PLANE_TREE: {
    id: 'PLANE_TREE',
    nameVi: 'Cây tiêu huyền',
    colors: ['vàng', 'đỏ'],
    icon: '🍃',
  },
};
