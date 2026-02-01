'use client';

import { useEffect } from 'react';
import { Map, Marker, NavigationControl } from 'react-map-gl/maplibre';
import { useTheme } from '~/util/context/ThemeContext';

type PostMapContentProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

// Carto basemap styles
// Dark style for light mode (contrast), Light style for dark mode (contrast)
const MAP_STYLES = {
  light: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
};

/**
 * Inner map content component that loads MapLibre GL.
 * This component is lazy-loaded to avoid SSR issues.
 * Uses inverted theme colors: dark map in light mode, light map in dark mode.
 */
const PostMapContent = ({ latitude, longitude, zoom }: PostMapContentProps) => {
  const { theme } = useTheme();

  // Load MapLibre CSS
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

  return (
    <Map
      initialViewState={{
        latitude,
        longitude,
        zoom,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={MAP_STYLES[theme]}
    >
      <NavigationControl position="top-right" />
      <Marker latitude={latitude} longitude={longitude} anchor="bottom">
        <MarkerIcon />
      </Marker>
    </Map>
  );
};

/** Custom marker icon */
const MarkerIcon = () => (
  <svg
    width="32"
    height="40"
    viewBox="0 0 32 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="drop-shadow-lg"
  >
    <path
      d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24c0-8.837-7.163-16-16-16z"
      fill="currentColor"
      className="text-secondary"
    />
    <circle cx="16" cy="16" r="6" fill="currentColor" className="text-primary" />
  </svg>
);

export default PostMapContent;
