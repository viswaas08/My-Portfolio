import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'card' | 'profile' | 'text';
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 3,
  type = 'card'
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="glass-card rounded-2xl p-6 relative overflow-hidden space-y-4 border border-white/5"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          {type === 'card' && (
            <>
              <div className="flex items-center justify-between">
                <div className="h-6 w-1/2 bg-white/10 rounded-lg" />
                <div className="h-5 w-16 bg-cyan-500/20 rounded-full" />
              </div>
              <div className="h-4 w-full bg-white/10 rounded-md" />
              <div className="h-4 w-3/4 bg-white/10 rounded-md" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-white/5 rounded-full" />
                <div className="h-6 w-16 bg-white/5 rounded-full" />
                <div className="h-6 w-16 bg-white/5 rounded-full" />
              </div>
            </>
          )}

          {type === 'profile' && (
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/10" />
              <div className="space-y-2 flex-1">
                <div className="h-5 w-1/3 bg-white/10 rounded" />
                <div className="h-4 w-1/2 bg-white/5 rounded" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
