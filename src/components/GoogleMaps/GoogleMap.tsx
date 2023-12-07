import { useEffect, useRef, useState } from 'react';
import MapWrapper from './MapWrapper';

interface GoogleMapProps {
  onMarkerSubmit: (coords: google.maps.LatLngLiteral) => void;
}

export default function GoogleMap({ onMarkerSubmit }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    const checkIfMapsLoaded = setInterval(() => {
      if (window.google) {
        console.log('Google Maps API is loaded.'); // Log when the API is loaded
        setMapsLoaded(true);
        clearInterval(checkIfMapsLoaded);
      }
    }, 100);
  
    return () => clearInterval(checkIfMapsLoaded);
  }, []);

  // Wait until rendered
  useEffect(() => {
    console.log('mapsLoaded:', mapsLoaded);
    if (mapsLoaded && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 1,
        clickableIcons: false,
        streetViewControl: false,
        mapTypeControl: false,
      });

      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const coords = { lat: e.latLng.lat(), lng: e.latLng.lng()};

          // Remove the previous marker if it exists
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          // Add a marker at the clicked location
          const marker = new window.google.maps.Marker({
            position: coords,
            map: map,
          });
          // Store the reference to the marker
          markerRef.current = marker;

          // Set state to true
          setMarkerPlaced(true);
        }
      });
    }
  }, [mapsLoaded]);

  return (
    <>
      <MapWrapper>
          <div id="map" ref={mapRef} />
      </MapWrapper>
      <button 
        disabled={!markerPlaced} 
        onClick={() => {
          if (markerRef.current) {
            const position = markerRef.current.getPosition()?.toJSON();
            if (position) {
              onMarkerSubmit(position);
            }
          }
        }}
      >
        Submit
      </button>
    </>
  );
}