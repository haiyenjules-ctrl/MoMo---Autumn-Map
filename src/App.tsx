/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { DESTINATIONS } from './data/destinations';
import { Destination, CountryCode, FoliageStatus, LeafFilterType } from './types';
import { getDestinationMeta, matchesLeafFilter } from './utils/autumnMeta';
import { autumnAudio } from './utils/autumnAudio';
import { MoMoHeader } from './components/MoMoHeader';
import { CountryFilter } from './components/CountryFilter';
import { SearchBar } from './components/SearchBar';
import { AutumnMap } from './components/AutumnMap';
import { DestinationPreviewCard } from './components/DestinationPreviewCard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { DestinationListView } from './components/DestinationListView';
import { SovereigntyInfoModal } from './components/SovereigntyInfoModal';
import { FloatingLeaves } from './components/FloatingLeaves';

export default function App() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('all');
  const [selectedLeaf, setSelectedLeaf] = useState<LeafFilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [detailDestination, setDetailDestination] = useState<Destination | null>(null);

  // Bản đồ mặc định chế độ ban ngày (Nắng Thu sáng) & bật âm thanh khi truy cập
  const [mapTheme, setMapTheme] = useState<'dark' | 'light'>('light');
  const [pinMode, setPinMode] = useState<'illustrated' | 'photo'>('illustrated');
  const [soundPlaying, setSoundPlaying] = useState(true);
  const [leavesEnabled, setLeavesEnabled] = useState(true);
  const [isSovereigntyOpen, setIsSovereigntyOpen] = useState(false);

  // Tự động phát âm thanh du dương mùa thu khi người dùng truy cập
  useEffect(() => {
    // 1. Thử khởi động âm thanh ngay lập tức
    try {
      autumnAudio.start();
      setSoundPlaying(true);
    } catch {
      // Một số trình duyệt chặn autoplay trước khi có tương tác
    }

    // 2. Đảm bảo âm thanh phát mượt mà ngay tại tương tác đầu tiên của người dùng
    const handleFirstUserGesture = () => {
      autumnAudio.ensureStarted();
      setSoundPlaying(true);
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };

    window.addEventListener('pointerdown', handleFirstUserGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { passive: true });
    window.addEventListener('scroll', handleFirstUserGesture, { passive: true });
    window.addEventListener('keydown', handleFirstUserGesture, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('scroll', handleFirstUserGesture);
      window.removeEventListener('keydown', handleFirstUserGesture);
    };
  }, []);

  // Toggle ambient wind & rustling leaves sound
  const handleToggleSound = () => {
    const isNowPlaying = autumnAudio.toggle();
    setSoundPlaying(isNowPlaying);
  };

  // Compute Country and Status counts
  const countryCounts = useMemo(() => {
    const counts: Record<CountryCode, number> = {
      all: DESTINATIONS.length,
      japan: 0,
      korea: 0,
      china: 0,
    };
    DESTINATIONS.forEach((d) => {
      if (counts[d.countryCode] !== undefined) {
        counts[d.countryCode]++;
      }
    });
    return counts;
  }, []);

  // Compute tree species counts for the currently selected country
  const leafCounts = useMemo(() => {
    const list =
      selectedCountry === 'all'
        ? DESTINATIONS
        : DESTINATIONS.filter((d) => d.countryCode === selectedCountry);

    const counts: Record<LeafFilterType, number> = {
      all: list.length,
      phong: 0,
      'bach-qua': 0,
      'bach-duong': 0,
      soi: 0,
      'thong-rung-la': 0,
      'de-gai': 0,
      'thuy-sam': 0,
      'co-lau': 0,
      'la-rong': 0,
    };

    const filters: LeafFilterType[] = [
      'phong',
      'bach-qua',
      'bach-duong',
      'soi',
      'thong-rung-la',
      'de-gai',
      'thuy-sam',
      'co-lau',
      'la-rong',
    ];
    filters.forEach((f) => {
      counts[f] = list.filter((d) => matchesLeafFilter(d, f)).length;
    });

    return counts;
  }, [selectedCountry]);

  const statusCounts = useMemo(() => {
    const counts: Record<FoliageStatus | 'all', number> = {
      all: DESTINATIONS.length,
      peak: 0,
      coming_soon: 0,
      early: 0,
      late: 0,
    };
    DESTINATIONS.forEach((d) => {
      if (counts[d.foliageStatus] !== undefined) {
        counts[d.foliageStatus]++;
      }
    });
    return counts;
  }, []);

  // Filtered Destinations (considering Country, Leaf Color & Search)
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      // Country Filter
      if (selectedCountry !== 'all' && d.countryCode !== selectedCountry) {
        return false;
      }

      // Accurate Leaf Color Filter
      if (!matchesLeafFilter(d, selectedLeaf)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const meta = getDestinationMeta(d);
        const matchesName = d.name.toLowerCase().includes(q);
        const matchesVietnamese = d.vietnameseName
          ? d.vietnameseName.toLowerCase().includes(q)
          : false;
        const matchesCity = d.city.toLowerCase().includes(q);
        const matchesCountry = d.country.toLowerCase().includes(q);
        const matchesTags = d.tags.some((t) => t.toLowerCase().includes(q));
        const matchesLeaf = meta.leafTypeName.toLowerCase().includes(q);
        const matchesKhuVuc = d.khu_vuc ? d.khu_vuc.toLowerCase().includes(q) : false;
        const matchesLoaiCay = d.loai_cay_ngam_la
          ? d.loai_cay_ngam_la.some((l) => l.toLowerCase().includes(q))
          : false;
        const matchesMauLa = d.mau_la
          ? d.mau_la.some((m) => m.toLowerCase().includes(q))
          : false;

        if (
          !matchesName &&
          !matchesVietnamese &&
          !matchesCity &&
          !matchesCountry &&
          !matchesTags &&
          !matchesLeaf &&
          !matchesKhuVuc &&
          !matchesLoaiCay &&
          !matchesMauLa
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCountry, selectedLeaf, searchQuery]);

  // Handle marker/card select
  const handleSelectDestination = (dest: Destination) => {
    autumnAudio.playClickChime();
    setSelectedDestination(dest);
    if (selectedCountry !== 'all' && dest.countryCode !== selectedCountry) {
      setSelectedCountry('all');
    }
  };

  // Open full detail modal
  const handleOpenDetail = (dest: Destination) => {
    setDetailDestination(dest);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCountry('all');
    setSelectedLeaf('all');
    setSearchQuery('');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-stone-100 text-stone-900 overflow-hidden select-none">
      {/* Falling Leaves Animation Layer */}
      <FloatingLeaves enabled={leavesEnabled} />

      {/* 1. MoMo Header */}
      <MoMoHeader
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        totalDestinations={DESTINATIONS.length}
        peakCount={statusCounts.peak}
        soundPlaying={soundPlaying}
        onToggleSound={handleToggleSound}
        leavesEnabled={leavesEnabled}
        onToggleLeaves={() => setLeavesEnabled(!leavesEnabled)}
        mapTheme={mapTheme}
        onToggleMapTheme={() => setMapTheme(mapTheme === 'dark' ? 'light' : 'dark')}
        onOpenSovereignty={() => setIsSovereigntyOpen(true)}
      />

      {/* 2. Top Filter & Search Container */}
      <div className="z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 border-b border-stone-200 shadow-2xs space-y-2">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          destinations={DESTINATIONS}
          onSelectDestination={(dest) => {
            handleSelectDestination(dest);
            if (viewMode === 'list') {
              handleOpenDetail(dest);
            }
          }}
        />

        {/* Country & Leaf Filters */}
        <CountryFilter
          selectedCountry={selectedCountry}
          onSelectCountry={(country) => {
            setSelectedCountry(country);
            setSelectedDestination(null);
          }}
          selectedLeaf={selectedLeaf}
          onSelectLeaf={setSelectedLeaf}
          countryCounts={countryCounts}
          leafCounts={leafCounts}
        />
      </div>

      {/* 3. Main Discovery View (Map or Editorial List) */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {viewMode === 'map' ? (
          <div className="relative w-full h-full">
            {/* Interactive Autumn Map with Subdued Dark & Glowing Leaf Mode */}
            <AutumnMap
              destinations={filteredDestinations}
              selectedDestination={selectedDestination}
              onSelectDestination={handleSelectDestination}
              selectedCountry={selectedCountry}
              mapTheme={mapTheme}
              onToggleMapTheme={() => setMapTheme(mapTheme === 'dark' ? 'light' : 'dark')}
              pinMode={pinMode}
              onTogglePinMode={() => setPinMode(pinMode === 'illustrated' ? 'photo' : 'illustrated')}
              onOpenSovereigntyInfo={() => setIsSovereigntyOpen(true)}
            />

            {/* Bottom Floating Preview Card for selected destination */}
            {selectedDestination && (
              <div className="absolute bottom-4 inset-x-3 sm:inset-x-auto sm:right-4 sm:left-auto z-20 pointer-events-auto">
                <DestinationPreviewCard
                  destination={selectedDestination}
                  onOpenDetail={handleOpenDetail}
                  onClose={() => setSelectedDestination(null)}
                />
              </div>
            )}
          </div>
        ) : (
          <DestinationListView
            destinations={filteredDestinations}
            onSelectDestination={handleOpenDetail}
            onClearFilters={handleClearFilters}
          />
        )}
      </main>

      {/* 4. Full Destination Detail Bottom Sheet Modal */}
      {detailDestination && (
        <DestinationDetailModal
          destination={detailDestination}
          onClose={() => setDetailDestination(null)}
          onSelectOtherDestination={(dest) => setDetailDestination(dest)}
        />
      )}

      {/* 5. Sovereignty & Legal Transparency Modal */}
      <SovereigntyInfoModal
        isOpen={isSovereigntyOpen}
        onClose={() => setIsSovereigntyOpen(false)}
      />
    </div>
  );
}
