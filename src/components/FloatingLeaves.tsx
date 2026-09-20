import React, { useMemo } from 'react';

interface FloatingLeavesProps {
  enabled: boolean;
}

const LEAF_TYPES = ['🍁', '🍂', '🟡', '🍃'];

export const FloatingLeaves: React.FC<FloatingLeavesProps> = ({ enabled }) => {
  const leaves = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      char: LEAF_TYPES[i % LEAF_TYPES.length],
      left: `${(i * 7.2 + Math.random() * 4) % 100}%`,
      animationDuration: `${12 + (i % 6) * 3}s`,
      animationDelay: `${(i % 5) * 2.2}s`,
      size: `${16 + (i % 4) * 6}px`,
      opacity: 0.65 + (i % 3) * 0.12,
    }));
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute text-center animate-leaf-fall drop-shadow-sm will-change-transform"
          style={{
            left: leaf.left,
            fontSize: leaf.size,
            opacity: leaf.opacity,
            animationDuration: leaf.animationDuration,
            animationDelay: leaf.animationDelay,
            top: '-40px',
          }}
        >
          {leaf.char}
        </div>
      ))}
    </div>
  );
};
