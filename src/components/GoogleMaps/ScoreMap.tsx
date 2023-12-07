import { useEffect, useRef } from 'react';

interface ScoreMapProps {
  center: google.maps.LatLngLiteral;
  markers: { position: google.maps.LatLngLiteral; title: string }[];
}

const ScoreMap: React.FC<ScoreMapProps> = ({ center, markers }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: 4,
      });

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

export default ScoreMap;