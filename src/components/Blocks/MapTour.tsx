'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { cn } from '~/util/cn';

const MapTourContent = lazy(() => import('./MapTourContent'));

export type MapStop = {
  latitude: number;
  longitude: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  id?: string | null;
};

type MapTourBlock = {
  stops: MapStop[];
  zoom?: number | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'map-tour';
};

type MapTourProps = {
  block: MapTourBlock;
  className?: string;
};

/**
 * Interactive map-with-stops block.
 *
 * Extends the existing PostMap pattern: SSR-safe lazy load, isMounted guard,
 * Suspense fallback. The map shows numbered markers for each stop; clicking
 * a marker opens a detail card (title, description, optional image).
 */
const MapTour = ({ block, className }: MapTourProps) => {
  const { stops, zoom = 7 } = block;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!stops?.length) return null;

  // Derive center from average of all stop coordinates
  const centerLat = stops.reduce((sum, s) => sum + s.latitude, 0) / stops.length;
  const centerLng = stops.reduce((sum, s) => sum + s.longitude, 0) / stops.length;

  return (
    <figure className={cn('my-8 lg:my-12', className)}>
      <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden bg-grey/20">
        {isMounted && (
          <Suspense
            fallback={
              <div className="w-full h-full animate-pulse bg-grey/30 flex items-center justify-center">
                <span className="font-suisse text-sm text-grey">Loading map…</span>
              </div>
            }
          >
            <MapTourContent
              stops={stops}
              centerLat={centerLat}
              centerLng={centerLng}
              zoom={zoom ?? 7}
            />
          </Suspense>
        )}
      </div>
    </figure>
  );
};

export default MapTour;
