import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

interface StreetViewProps {
  center: google.maps.LatLngLiteral
}

function StreetView({center}: StreetViewProps) {
    const ref = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      if (ref.current) {
        new window.google.maps.StreetViewPanorama(ref.current, {
          position: center,
          zoom: 0,
          addressControl: false,
          showRoadLabels: false
        });
      }
    });
  
    return <div ref={ref} id="street-viewer" />;
  }

export default function MapWrapper({center}: StreetViewProps) {
    const apiKey = process.env.REACT_APP_GOOGLE_KEY;
    if (!apiKey) {
        throw new Error("Google Maps API key is not defined");
    }

    return (
      <Wrapper apiKey={apiKey} render={render}>
        <StreetView center={center} />
      </Wrapper>
    );
  }