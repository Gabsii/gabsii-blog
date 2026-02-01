'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { cn } from '~/util/cn';

type PostMapBlock = {
  label: string;
  latitude: number;
  longitude: number;
  zoom?: number | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'location';
};

type PostMapProps = {
  block: PostMapBlock;
  className?: string;
};

// Lazy load the actual map implementation
const MapContent = lazy(() => import('./PostMapContent'));

/**
 * Map block for blog posts using MapLibre GL.
 * Displays a location marker on an OpenStreetMap-based map.
 * Uses free tile provider (Carto) - no API key required.
 */
const PostMap = ({ block, className }: PostMapProps) => {
  const { label, latitude, longitude, zoom = 12 } = block;
  const [isMounted, setIsMounted] = useState(false);

  // Only render map after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <figure className={cn("my-8 lg:my-12", className)}>
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-grey/20">
        {isMounted && (
          <Suspense fallback={<div className="w-full h-full animate-pulse bg-grey/30" />}>
            <MapContent 
              latitude={latitude}
              longitude={longitude}
              zoom={zoom ?? 12}
            />
          </Suspense>
        )}
      </div>
      {label && (
        <figcaption className="mt-3 text-center font-suisse text-sm text-grey">
          {label}
        </figcaption>
      )}
    </figure>
  );
};

export default PostMap;
