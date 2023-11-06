import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

interface GoogleMapProps {
  onMarkerSubmit: (coords: google.maps.LatLngLiteral) => void;
}

export default function GoogleMap({ onMarkerSubmit }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const center = {
    lat: 0, 
    lng: 0
  };

  useEffect(() => {
    if (mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 1,
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

          //
          setMarkerPlaced(true);
        }
      });
    }
  });

  const apiKey = process.env.REACT_APP_GOOGLE_KEY || ""
  return (
    <>
      <Wrapper apiKey={apiKey} render={status => {
        if (status === Status.LOADING) return <div>Loading...</div>;
        if (status === Status.FAILURE) return <div>Error loading map</div>;
        return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
      }} />
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