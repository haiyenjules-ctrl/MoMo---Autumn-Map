import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Destination, CountryCode } from '../types';
import { FOLIAGE_STATUSES, COUNTRIES } from '../data/destinations';
import { getDestinationMeta } from '../utils/autumnMeta';
import { Plus, Minus, Compass, Moon, Sun, Sparkles, Camera, ShieldCheck } from 'lucide-react';

interface AutumnMapProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (destination: Destination) => void;
  selectedCountry: CountryCode;
  mapTheme: 'dark' | 'light';
  onToggleMapTheme: () => void;
  pinMode: 'illustrated' | 'photo';
  onTogglePinMode: () => void;
  onOpenSovereigntyInfo: () => void;
}

export const AutumnMap: React.FC<AutumnMapProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  selectedCountry,
  mapTheme,
  onToggleMapTheme,
  pinMode,
  onTogglePinMode,
  onOpenSovereigntyInfo,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const labelLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  // Helper to attach 100% free, public basemap tiles without API keys or watermarks
  const applyTileLayer = (map: L.Map, theme: 'dark' | 'light') => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }
    if (labelLayerRef.current) {
      map.removeLayer(labelLayerRef.current);
      labelLayerRef.current = null;
    }

    if (theme === 'dark') {
      // Esri Canvas Dark Gray Base: sleek dark slate canvas, highlights red/yellow leaves brilliantly
      const baseTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
          maxZoom: 16,
          minZoom: 3,
        }
      ).addTo(map);

      // Overlay country boundaries and city labels
      const labelTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 16,
          minZoom: 3,
          pane: 'overlayPane',
        }
      ).addTo(map);

      tileLayerRef.current = baseTile;
      labelLayerRef.current = labelTile;
    } else {
      // Esri World Street Map: Clean, high-detail daylight cartography
      const baseTile = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom',
          maxZoom: 16,
          minZoom: 3,
        }
      ).addTo(map);

      tileLayerRef.current = baseTile;
    }
  };

  // 1. Initialize Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Default center covering East Asia (Japan, Korea, China)
    const map = L.map(mapContainerRef.current, {
      center: [32.5, 124.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 16,
      zoomControl: false,
      // Restrict view boundaries cleanly to East Asia tourism area
      maxBounds: [
        [15.0, 78.0], // Southwest boundary (encompassing Western China, Xinjiang, Tibet)
        [53.0, 148.0], // Northeast boundary (encompassing Hulunbuir & Hokkaido)
      ],
      maxBoundsViscosity: 0.8,
    });

    mapRef.current = map;

    // Immediately load tiles
    applyTileLayer(map, mapTheme);

    // Ensure Leaflet computes container dimensions
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 2. Manage Tile Layer switch when mapTheme changes
  useEffect(() => {
    if (!mapRef.current) return;
    applyTileLayer(mapRef.current, mapTheme);
    mapRef.current.invalidateSize();
  }, [mapTheme]);

  // 3. Update Markers when destinations, selection, theme, or pinMode changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((m: L.Marker) => m.remove());
    markersRef.current = {};

    destinations.forEach((dest) => {
      const isSelected = selectedDestination?.id === dest.id;
      const statusConfig = FOLIAGE_STATUSES[dest.foliageStatus] || FOLIAGE_STATUSES.peak;
      const isPeak = dest.foliageStatus === 'peak';
      const meta = getDestinationMeta(dest);

      let pinHtml = '';
      let iconSize: [number, number] = [48, 56];
      let iconAnchor: [number, number] = [24, 56];

      if (pinMode === 'illustrated') {
        // Playful illustrated stamp pin
        const glowStyle =
          mapTheme === 'dark'
            ? `box-shadow: 0 0 16px ${meta.glowColor}99, 0 4px 12px rgba(0,0,0,0.6); border-color: ${isSelected ? '#FF2A85' : meta.glowColor};`
            : `box-shadow: 0 4px 14px rgba(0,0,0,0.18); border-color: ${isSelected ? '#D82D8B' : statusConfig.pinColor};`;

        pinHtml = `
          <div class="pin-wrapper ${isSelected ? 'active' : ''}">
            ${isPeak ? `<div class="pin-pulse" style="background: ${meta.glowColor}66;"></div>` : ''}
            <div class="illustrated-pin-bubble" style="${glowStyle}">
              <span style="font-size: 20px; line-height: 1;">${meta.illustrationIcon}</span>
              <div style="display: flex; flex-direction: column;">
                <span style="font-size: 11px; font-weight: 700; color: #1C1917; line-height: 1.15; white-space: nowrap;">${dest.name}</span>
                <span style="font-size: 9px; font-weight: 500; color: #78716C; line-height: 1.1; white-space: nowrap;">${dest.city}</span>
              </div>
              <span style="font-size: 11px;">${statusConfig.emoji}</span>
            </div>
            <div class="pin-pointer" style="border-top-color: #FFFFFF;"></div>
          </div>
        `;
        iconSize = [120, 48];
        iconAnchor = [60, 48];
      } else {
        // High-res photo circle pin with dark glow
        const glowClass =
          mapTheme === 'dark'
            ? meta.leafType === 'ginkgo'
              ? 'glow-pin-ginkgo'
              : meta.leafType === 'silvergrass'
              ? 'glow-pin-pink'
              : meta.leafType === 'orange'
              ? 'glow-pin-orange'
              : meta.leafType === 'mixed'
              ? 'glow-pin-mixed'
              : 'glow-pin-maple'
            : '';

        const activeBorder = isSelected ? '#D82D8B' : statusConfig.pinColor;

        pinHtml = `
          <div class="pin-wrapper ${isSelected ? 'active' : ''} ${glowClass}">
            ${isPeak ? `<div class="pin-pulse" style="background: ${meta.glowColor}66;"></div>` : ''}
            <div class="pin-bubble" style="border-color: ${activeBorder};">
              <div class="pin-icon-thumb">${meta.illustrationIcon || '🍁'}</div>
              <div class="pin-badge">${dest.countryFlag}</div>
            </div>
            <div class="pin-pointer"></div>
            <div class="pin-label">
              <span>${dest.name}</span>
            </div>
          </div>
        `;
        iconSize = [50, 60];
        iconAnchor = [25, 60];
      }

      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: pinHtml,
        iconSize,
        iconAnchor,
      });

      const marker = L.marker([dest.latitude, dest.longitude], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1200 : isPeak ? 600 : 100,
      }).addTo(map);

      marker.on('click', () => {
        onSelectDestination(dest);
        map.flyTo([dest.latitude, dest.longitude], Math.max(map.getZoom(), 8), {
          duration: 0.8,
        });
      });

      markersRef.current[dest.id] = marker;
    });
  }, [destinations, selectedDestination, onSelectDestination, mapTheme, pinMode]);

  // 4. Pan / Zoom when selected country changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const countryInfo = COUNTRIES.find((c) => c.code === selectedCountry);
    if (countryInfo) {
      map.flyTo(countryInfo.center, countryInfo.zoom, {
        duration: 0.9,
      });
    }
  }, [selectedCountry]);

  // 5. Pan to selected destination if selected externally
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedDestination) return;

    map.flyTo([selectedDestination.latitude, selectedDestination.longitude], 9, {
      duration: 0.9,
    });
  }, [selectedDestination]);

  // Zoom controls
  const handleZoomIn = () => {
    mapRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut();
  };

  const handleResetView = () => {
    const countryInfo = COUNTRIES.find((c) => c.code === selectedCountry) || COUNTRIES[0];
    mapRef.current?.flyTo(countryInfo.center, countryInfo.zoom, {
      duration: 0.8,
    });
  };

  return (
    <div
      className={`relative w-full h-full min-h-[420px] select-none ${
        mapTheme === 'dark' ? 'dark-map-container dark-map-tiles bg-[#12100e]' : 'bg-amber-50/40'
      }`}
    >
      {/* Map DOM container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Left: Sovereignty badge & Foliage Glow Indicator */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 max-w-[280px]">
        <button
          id="sovereignty-info-btn"
          onClick={onOpenSovereigntyInfo}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-md text-stone-700 dark:text-stone-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all text-left"
          title="Xem chứng nhận bản đồ mở và cam kết chủ quyền"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-[11px] font-semibold truncate">Bản đồ UNCLOS • Không cần API</span>
        </button>

        {mapTheme === 'dark' && (
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-900/85 backdrop-blur-md border border-stone-800 text-[10px] text-stone-300 shadow-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Vàng: Ngân Hạnh</span>
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Đỏ: Phong Momiji</span>
          </div>
        )}
      </div>

      {/* Top Right: Map Controls (Theme Switcher, Pin Mode Switcher, Zoom, Reset) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 shadow-lg rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-1.5 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200">
        {/* Toggle Dark (Dạ Thu) vs Light (Nắng Thu) */}
        <button
          id="map-toggle-theme-btn"
          onClick={onToggleMapTheme}
          className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
            mapTheme === 'dark'
              ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
              : 'bg-stone-100 text-stone-800 hover:bg-amber-100'
          }`}
          title={mapTheme === 'dark' ? 'Đổi sang bản đồ Nắng Thu sáng' : 'Đổi sang bản đồ Trầm (Dạ Thu rực sáng)'}
          aria-label="Đổi giao diện bản đồ"
        >
          {mapTheme === 'dark' ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-600" />}
        </button>

        {/* Toggle Pin Mode (Illustrated vs Photo) */}
        <button
          id="map-toggle-pin-btn"
          onClick={onTogglePinMode}
          className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
            pinMode === 'illustrated'
              ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30'
              : 'bg-stone-100 text-stone-800 hover:bg-rose-100'
          }`}
          title={pinMode === 'illustrated' ? 'Đổi sang xem ảnh thực tế' : 'Đổi sang xem sticker minh họa sinh động'}
          aria-label="Đổi kiểu ghim bản đồ"
        >
          {pinMode === 'illustrated' ? <Sparkles className="w-4 h-4 text-rose-500" /> : <Camera className="w-4 h-4 text-stone-600" />}
        </button>

        <div className="h-px bg-stone-200 dark:bg-stone-800 mx-1" />

        {/* Zoom In */}
        <button
          id="map-zoom-in-btn"
          onClick={handleZoomIn}
          className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors active:scale-95"
          title="Phóng to"
          aria-label="Phóng to"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out */}
        <button
          id="map-zoom-out-btn"
          onClick={handleZoomOut}
          className="w-8 h-8 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors active:scale-95"
          title="Thu nhỏ"
          aria-label="Thu nhỏ"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="h-px bg-stone-200 dark:bg-stone-800 mx-1" />

        {/* Reset View */}
        <button
          id="map-recenter-btn"
          onClick={handleResetView}
          className="w-8 h-8 flex items-center justify-center text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors active:scale-95"
          title="Tâm bản đồ"
          aria-label="Tâm bản đồ"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-stone-900/30 to-transparent pointer-events-none z-1" />
    </div>
  );
};
