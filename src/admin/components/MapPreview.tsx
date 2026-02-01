'use client';

import { useFormFields } from '@payloadcms/ui';
import Map, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

/**
 * Map preview component for Payload admin.
 * Shows a live preview of the location being edited.
 */
const MapPreview = () => {
  const { value: latitude } = useFormFields(([fields]) => fields.latitude);
  const { value: longitude } = useFormFields(([fields]) => fields.longitude);
  const { value: zoom } = useFormFields(([fields]) => fields.zoom);

  const lat = typeof latitude === 'number' ? latitude : 0;
  const lng = typeof longitude === 'number' ? longitude : 0;
  const z = typeof zoom === 'number' ? zoom : 12;

  const hasValidCoords = lat !== 0 || lng !== 0;

  if (!hasValidCoords) {
    return (
      <div className="map-preview-placeholder" style={{
        width: '100%',
        height: '200px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        color: '#666',
        fontSize: '14px',
      }}>
        Enter coordinates to see map preview
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '200px', borderRadius: '4px', overflow: 'hidden' }}>
      <Map
        key={`${lat}-${lng}-${z}`}
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: z,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        interactive={false}
      >
        <Marker latitude={lat} longitude={lng} anchor="bottom">
          <svg width="24" height="30" viewBox="0 0 32 40" fill="none">
            <path
              d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24c0-8.837-7.163-16-16-16z"
              fill="#1a1a1a"
            />
            <circle cx="16" cy="16" r="6" fill="#fffbee" />
          </svg>
        </Marker>
      </Map>
    </div>
  );
};

export default MapPreview;
