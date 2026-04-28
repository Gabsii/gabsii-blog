'use client';

import { useEffect, useState } from 'react';
import { Map, Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import Image from 'next/image';
import { useTheme } from '~/util/context/ThemeContext';
import type { MapStop } from './MapTour';

const MAP_STYLES = {
  light: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

type MapTourContentProps = {
  stops: MapStop[];
  centerLat: number;
  centerLng: number;
  zoom: number;
};

/**
 * Inner map component (lazy-loaded) for the MapTour block.
 * Renders numbered markers for each stop and a detail popup on click.
 */
const MapTourContent = ({ stops, centerLat, centerLng, zoom }: MapTourContentProps) => {
  const { theme } = useTheme();
  const [activeStop, setActiveStop] = useState<MapStop | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const linkId = 'maplibre-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/maplibre-gl@4.5.0/dist/maplibre-gl.css';
      document.head.appendChild(link);
    }
  }, []);

  const handleMarkerClick = (stop: MapStop, index: number) => {
    if (activeIndex === index) {
      setActiveStop(null);
      setActiveIndex(null);
    } else {
      setActiveStop(stop);
      setActiveIndex(index);
    }
  };

  return (
    <Map
      initialViewState={{ latitude: centerLat, longitude: centerLng, zoom }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={MAP_STYLES[theme]}
    >
      <NavigationControl position="top-right" />

      {stops.map((stop, i) => (
        <Marker
          key={stop.id ?? i}
          latitude={stop.latitude}
          longitude={stop.longitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(stop, i);
          }}
        >
          <NumberedPin index={i} active={activeIndex === i} />
        </Marker>
      ))}

      {activeStop && activeIndex !== null && (
        <Popup
          latitude={activeStop.latitude}
          longitude={activeStop.longitude}
          anchor="top"
          offset={[0, -10] as [number, number]}
          closeButton={false}
          closeOnClick={false}
          onClose={() => {
            setActiveStop(null);
            setActiveIndex(null);
          }}
          maxWidth="280px"
          className="map-tour-popup"
        >
          <StopCard stop={activeStop} index={activeIndex} onClose={() => {
            setActiveStop(null);
            setActiveIndex(null);
          }} />
        </Popup>
      )}
    </Map>
  );
};

const NumberedPin = ({ index, active }: { index: number; active: boolean }) => (
  <button
    type="button"
    className={[
      'flex items-center justify-center w-7 h-7 rounded-full border-2 cursor-pointer',
      'font-suisse text-xs font-semibold transition-all duration-200',
      'shadow-md hover:scale-110',
      active
        ? 'bg-secondary text-primary border-secondary scale-110'
        : 'bg-primary text-secondary border-secondary/70 hover:border-secondary',
    ].join(' ')}
    aria-label={`Stop ${index + 1}`}
  >
    {index + 1}
  </button>
);

const StopCard = ({
  stop,
  index,
  onClose,
}: {
  stop: MapStop;
  index: number;
  onClose: () => void;
}) => (
  <div className="bg-primary text-secondary rounded-sm shadow-lg overflow-hidden min-w-[220px] max-w-[280px]">
    {stop.imageUrl && (
      <div className="relative w-full h-32">
        <Image
          src={stop.imageUrl}
          alt={stop.imageAlt || stop.title}
          fill
          sizes="280px"
          className="object-cover"
        />
      </div>
    )}
    <div className="p-3">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-primary font-suisse text-xs font-semibold shrink-0">
            {index + 1}
          </span>
          <h4 className="font-piazzolla font-semibold text-sm leading-tight">{stop.title}</h4>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-grey hover:text-secondary transition-colors shrink-0 mt-0.5"
          aria-label="Close"
        >
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
            <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {stop.description && (
        <p className="font-suisse text-xs text-grey leading-relaxed mt-1">{stop.description}</p>
      )}
    </div>
  </div>
);

export default MapTourContent;
