import { useEffect, useRef } from 'react';

interface ScoreMapProps {
  center: google.maps.LatLngLiteral;
  markers: { position: google.maps.LatLngLiteral; title: string }[];
}

export default function ScoreMap({
  center,
  markers,
}: ScoreMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      // Draw new map centered at center of game
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 4,
      });

      // Print markers from guess and center
      markers.forEach(marker => {
        new window.google.maps.Marker({
          position: marker.position,
          map: map,
          title: marker.title,
        });
      });
    }
  }, [center, markers]);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};