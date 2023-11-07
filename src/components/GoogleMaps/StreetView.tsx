import React, { useEffect, useRef, ReactElement } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return <></>;
};

function StreetView({
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
  
    return <div ref={ref} id="street-viewer" />;
  }

export default function MapWrapper({
  center,
}: {
  center: google.maps.LatLngLiteral;
}) {
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