import StreetView from '../components/GoogleMaps/StreetView'
import GoogleMap from '../components/GoogleMaps/GoogleMap'
import HelpBox from '../components/HelpBox'
import DifficultyForm from '../components/DifficultyForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

/* 
Scoring Ideas:
    1. classic geoguessr, max 5k points/rd
    2. x time to make as many guesses as possible, each guess must be in y range of center
*/

// calculates distance between points in miles
function calcDist(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral) 
    {
      let R = 3963.19; // mi
      let dLat = toRad(point2.lat-point1.lat);
      let dLon = toRad(point2.lng-point1.lng);
      let lat1 = toRad(point1.lat);
      let lat2 = toRad(point2.lat);

      let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      let d = R * c;
      return d;
    }

// Converts numeric degrees to radians
function toRad(Value: number) 
{
    return Value * Math.PI / 180;
}

export default function HomePage() {
    // let center = { lat: 44.56466353432313, lng: -123.28022377801592 };
    let center = { lat: 39.23611853557754, lng: -129.09572849422432}
    const [showMap, setShowMap] = useState(false);
    const navigate = useNavigate();
    
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formElements = form.elements as HTMLFormControlsCollection & { gameOption?: HTMLInputElement }
        const difficulty = (formElements.gameOption?.value);
        // center = API(difficulty) // set center here to random coordinate from API
        center = { lat: 39.23611853557754, lng: -129.09572849422432}
        if (difficulty === "Impossible") {
            // Send notification if user selects impossible
            Swal.fire({
                title: "Warning",
                text: 'Do you want to continue? This is the ultimate challenge',
                icon: 'error',
                confirmButtonText: 'Proceed',
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowMap(true);
                }
            });
        } else {
            setShowMap(true);
        }
    };

    // lat1 center lat2 coords
    const handleMarkerSubmit = (guess: google.maps.LatLngLiteral) => {
        console.log(`coords submitted: ${guess.lat}, ${guess.lng}`)
        const distance = calcDist(guess, center);
        navigate('/score', { state: { distance: distance.toFixed(2) } }); 
    }

    // Add form to own component and hide when submitted
    return (
        <>
            <h1>Start Game</h1>
            <h2>How does Geography Guesser work?</h2>
            <HelpBox />
            <DifficultyForm onSubmit={handleFormSubmit}/>
            {/* if showMap is set, show the map */}
            {showMap && (
                <>
                <StreetView center={center}/>
                <GoogleMap onMarkerSubmit={handleMarkerSubmit}/>
                </>
            )}
        </>
    )
}