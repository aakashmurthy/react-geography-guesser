import StreetView from '../components/GoogleMaps/StreetView'
import GoogleMap from '../components/GoogleMaps/GoogleMap'
import HelpBox from '../components/HelpBox'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/* 
Scoring Ideas:
    1. classic geoguessr, max 5k points/rd
    2. x time to make as many guesses as possible, each guess must be in y range of center
*/

// calculates distance between points in miles
function calcDist(point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral) 
    {
      var R = 3963.19; // mi
      var dLat = toRad(point2.lat-point1.lat);
      var dLon = toRad(point2.lng-point1.lng);
      var lat1 = toRad(point1.lat);
      var lat2 = toRad(point2.lat);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

// Converts numeric degrees to radians
function toRad(Value: number) 
{
    return Value * Math.PI / 180;
}

export default function HomePage() {
    // const location = useLocation();
    // const difficulty = location.state.difficulty ? location.state.difficulty : "";
    const center = { lat: 44.56466353432313, lng: -123.28022377801592 };
    const [showMap, setShowMap] = useState(false);
    const [radioValue, setRadioValue] = useState('');
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(e.target.value);
    };
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (radioValue === "Impossible") {
            MySwal.fire({
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
            
            <form onSubmit={handleFormSubmit}>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        value="Easy"
                        onChange={handleRadioChange}
                        defaultChecked
                    />
                    Easy
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        value="Medium"
                        onChange={handleRadioChange}
                    />
                    Medium
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        value="Hard"
                        onChange={handleRadioChange}
                    />
                    Hard
                </label>
                <label>
                    <input
                        type="radio"
                        name="gameOption"
                        value="Impossible"
                        onChange={handleRadioChange}
                    />
                    Impossible (Proceed with caution!)
                </label>
                <input type="submit" value="Start Game!"></input>
            </form>
            {showMap && (
                <>
                <StreetView center={center}/>
                <GoogleMap onMarkerSubmit={handleMarkerSubmit}/>
                </>
            )}
        </>
    )
}