import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { PhotoItem } from '../types';

interface ImageViewerModalProps {
  photos: PhotoItem[];
  initialIndex: number;
  destinationName: string;
  onClose: () => void;
}

export function ImageViewerModal({
  photos,
  initialIndex,
  destinationName,
  onClose,
}: ImageViewerModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div
      id="image-viewer-lightbox"
      className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-between p-4 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top bar */}
      <div className="w-full max-w-4xl flex items-center justify-between text-white/90 z-10 pt-2">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-rose-400" />
          <span className="font-semibold text-sm">{destinationName}</span>
          <span className="text-white/40 text-xs">
            ({currentIndex + 1} / {photos.length})
          </span>
        </div>

        <button
          id="lightbox-close-btn"
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          aria-label="Đóng ảnh"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-4xl flex-1 flex items-center justify-center my-auto py-2">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.caption || destinationName}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300 select-none"
        />

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
            aria-label="Ảnh tiếp theo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Thumbnails */}
      <div className="w-full max-w-2xl text-center z-10 pb-2 space-y-2">
        {currentPhoto.photoSpotName && (
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/30 text-rose-200 text-xs font-semibold border border-rose-400/40">
            📍 {currentPhoto.photoSpotName}
          </span>
        )}
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
          {currentPhoto.caption}
        </p>

        {/* Thumbnail Strip */}
        {photos.length > 1 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            {photos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-12 h-9 rounded-md overflow-hidden transition-all shrink-0 ${
                  idx === currentIndex
                    ? 'ring-2 ring-rose-400 scale-105 opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img src={p.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
