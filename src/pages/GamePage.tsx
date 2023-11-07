import StreetView from '../components/GoogleMaps/StreetView'
import GoogleMap from '../components/GoogleMaps/GoogleMap'
import { useState } from 'react'

/* 
Scoring Ideas:
    1. classic geoguessr, max 5k points/rd
    2. x time to make as many guesses as possible, each guess must be in y range of center
*/


export default function HomePage() {
    const center = { lat: 44.56466353432313, lng: -123.28022377801592 };
    const [showMap, setShowMap] = useState(false);

    const handleClick = () => {
        setShowMap(true);
    };

    const handleMarkerSubmit = (coords: google.maps.LatLngLiteral) => {
        console.log(`coords: ${coords.lat}, ${coords.lng}`)
        // console.log(`Center: ${center.toJSON()}`)
    }

    return (
        <>
            <h2>game page test</h2>
            <button onClick={handleClick}>Show Map</button>
            {showMap && (
                <>
                <StreetView center={center}/>
                <GoogleMap onMarkerSubmit={handleMarkerSubmit}/>
                </>
            )}
        </>
    )
}