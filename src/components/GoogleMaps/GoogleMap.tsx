import { useEffect, useRef, useState, useCallback } from 'react';
import MapWrapper from './MapWrapper';

interface GoogleMapProps {
  onMarkerSubmit: (coords: google.maps.LatLngLiteral) => void;
}

export default function GoogleMap({ onMarkerSubmit }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [markerPlaced, setMarkerPlaced] = useState(false);

  // Get map options
  const mapOptions = (): google.maps.MapOptions => ({
    center: { lat: 0, lng: 0 },
    zoom: 1,
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false,
  });

  // Place a marker on the map
  const placeMarker = useCallback((coords: google.maps.LatLngLiteral, map: google.maps.Map) => {
    removePreviousMarker();
    const marker = new window.google.maps.Marker({ position: coords, map: map });
    markerRef.current = marker;
    setMarkerPlaced(true);
  }, []);

  // Handle map click event
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent, map: google.maps.Map): void => {
    if (event.latLng) {
      const coords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
      placeMarker(coords, map);
    }
  }, [placeMarker]);


  // Remove the previous marker
  const removePreviousMarker = () => {
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
  };

  // Submit marker position
  const submitMarkerPosition = () => {
    if (markerRef.current) {
      const position = markerRef.current.getPosition()?.toJSON();
      if (position) onMarkerSubmit(position);
    }
  };

  // Load Google Maps API
  useEffect(() => {
    // Initialize the map
    const initializeMap = () => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, mapOptions());
        map.addListener('click', (event: google.maps.MapMouseEvent) => handleMapClick(event, map));
        setMarkerPlaced(false);
      }
    };

    const checkIfMapsLoaded = setInterval(() => {
      if (window.google) {
        console.log('Google Maps API is loaded.');
        clearInterval(checkIfMapsLoaded);
        initializeMap();
      }
    }, 100);
    return () => clearInterval(checkIfMapsLoaded);
  }, [handleMapClick]);

  return (
    <>
      <MapWrapper>
        <div id="map" ref={mapRef} />
      </MapWrapper>
      <button disabled={!markerPlaced} onClick={submitMarkerPosition}>
        Submit
      </button>
    </>
  );
}