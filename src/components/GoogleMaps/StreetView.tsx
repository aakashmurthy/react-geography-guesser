import { useEffect, useRef, useState } from "react";
import MapWrapper from './MapWrapper';


declare global {
  interface Window {
    initMap: () => void;
  }
}

interface StreetViewProps {
  center: google.maps.LatLngLiteral
}

type NearestRoads = {
  snappedPoints: Array<{
    location: {
      latitude: number
      longitude: number
    }
    originalIndex: number
    placeId: string
  }>
}

function findClosestRoad({ center }: StreetViewProps): Promise<NearestRoads> {
  return fetch(`https://roads.googleapis.com/v1/nearestRoads?points=${center.lat},${center.lng}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const nearestRoads: NearestRoads = {
        snappedPoints: data.snappedPoints.map((point: any) => ({
          location: {
            latitude: point.location.latitude,
            longitude: point.location.longitude
          },
          originalIndex: point.originalIndex,
          placeId: point.placeId
        }))
      };
      return nearestRoads;
    });
}

export default function StreetView({center}: StreetViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const panoramaRef = useRef<google.maps.StreetViewPanorama | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = () => setIsScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      window.initMap = () => {};
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
      findClosestRoad({ center })
        .then(nearestRoads => {
          if (nearestRoads.snappedPoints.length > 0 && ref.current) {
            const roundedPoint = nearestRoads.snappedPoints[0].location;
            console.log(roundedPoint);
            const roundedLatLng = new google.maps.LatLng(roundedPoint.latitude, roundedPoint.longitude);
            panoramaRef.current = new google.maps.StreetViewPanorama(ref.current, {
              position: roundedLatLng,
              zoom: 0,
              addressControl: false,
              showRoadLabels: false
            });
          }
        })
        .catch(error => {
          console.error('Failed to find the closest road:', error);
        });
  }, [center, isScriptLoaded]);

  const resetPosition = () => {
    if (panoramaRef.current) {
      panoramaRef.current.setPosition(center);
    }
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