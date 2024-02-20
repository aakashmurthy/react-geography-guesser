import { useEffect, useRef, useState } from "react";
import MapWrapper from './MapWrapper';

interface StreetViewProps {
  center: google.maps.LatLngLiteral;
}

export default function StreetView({
  center
}:
StreetViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const streetViewPanoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [apiLoaded, setApiLoaded] = useState(false);

  // When any component is updated, load map if google window is set
  useEffect(() => {
    const checkIfMapsLoaded = setInterval(() => {
      if (window.google) {
        console.log('Google Maps API is loaded for StreetView.');
        setMapsLoaded(true);
        clearInterval(checkIfMapsLoaded);
      }
    }, 100);

    return () => clearInterval(checkIfMapsLoaded);
  });

  // Initialize StreetView once the API is loaded
  useEffect(() => {
    if (apiLoaded && ref.current && !streetViewPanoramaRef.current) {
      streetViewPanoramaRef.current = new window.google.maps.StreetViewPanorama(ref.current, {
        position: center,
        zoom: 0,
        addressControl: false,
        showRoadLabels: false
      });
    }
  }, [apiLoaded, center]);

  const resetPosition = () => {
    streetViewPanoramaRef.current?.setPosition(center);
  };

  return (
    <MapWrapper>
      <div ref={ref} id="street-viewer"/>
      <div>
        <button onClick={resetPosition}>Reset StreetView Position</button>
      </div>
      </MapWrapper>
  )
}