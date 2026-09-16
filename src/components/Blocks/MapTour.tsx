'use client';

import dynamic from 'next/dynamic';
import { cn } from '~/util/cn';

// Client-only
const MapTourContent = dynamic(() => import('./MapTourContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse bg-grey/30 flex items-center justify-center">
      <span className="font-suisse text-sm text-grey">Loading map…</span>
    </div>
  ),
});

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
 * Extends the existing PostMap pattern: client-only dynamic import with a
 * loading fallback. The map shows numbered markers for each stop; clicking
 * a marker opens a detail card (title, description, optional image).
 */
const MapTour = ({ block, className }: MapTourProps) => {
  const { stops, zoom = 7 } = block;

  if (!stops?.length) return null;

  // Derive center from average of all stop coordinates
  const centerLat = stops.reduce((sum, s) => sum + s.latitude, 0) / stops.length;
  const centerLng = stops.reduce((sum, s) => sum + s.longitude, 0) / stops.length;

  return (
    <figure className={cn('my-8 lg:my-12', className)}>
      <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden bg-grey/20">
        <MapTourContent
          stops={stops}
          centerLat={centerLat}
          centerLng={centerLng}
          zoom={zoom ?? 7}
        />
      </div>
    </figure>
  );
};

export default MapTour;
