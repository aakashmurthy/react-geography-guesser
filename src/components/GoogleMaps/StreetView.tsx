import { useEffect, useRef } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

export default function MyMapComponent({
    center,
  }: {
    center: google.maps.LatLngLiteral;
  }) {
    const ref = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (ref.current) {
        new window.google.maps.StreetViewPanorama(ref.current, {
          position: center,
          pov: {
            heading: 34,
            pitch: 10
          },
          zoom: 0,
          addressControl: false,
          showRoadLabels: false
        });
      }
    }, [center]);
  
    return <div ref={ref} id="map" />;
  }