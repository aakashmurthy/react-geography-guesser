import { useEffect, useRef, useState } from "react";
import MapWrapper from './MapWrapper';

interface StreetViewProps {
  center: google.maps.LatLngLiteral;
}

export default function StreetView({ center }: StreetViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  // Check if the Google Maps API is loaded
  useEffect(() => {
    const checkIfMapsLoaded = setInterval(() => {
      if (window.google) {
        console.log('Google Maps API is loaded for StreetView.');
        setApiLoaded(true);
        clearInterval(checkIfMapsLoaded);
      }
    }, 100);

    return () => clearInterval(checkIfMapsLoaded);
  }, []);

  // Initialize StreetView once the API is loaded
  useEffect(() => {
    if (apiLoaded && ref.current) {
      new window.google.maps.StreetViewPanorama(ref.current, {
        position: center,
        zoom: 0,
        addressControl: false,
        showRoadLabels: false
      });
    }
  }, [apiLoaded, center]);

  return (
    <>
      <MapWrapper>
        <div ref={ref} id="street-viewer"/>
      </MapWrapper>
    </>
  );
}