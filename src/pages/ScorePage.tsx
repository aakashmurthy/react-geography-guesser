import { useLocation, useNavigate } from 'react-router-dom';
import ScoreMap from '../components/GoogleMaps/ScoreMap';


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


export default function ScoreboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { distance, center, guess } = location.state as { distance: string, center: google.maps.LatLngLiteral, guess: google.maps.LatLngLiteral };

    const restartGame = () => {
        navigate('/game');
    };

    const MapProps = {
        center: center,
        markers: [{ position: center, title: 'Center' }, { position: guess, title: 'Your Guess' }]
    }

    return (
        <>
            <h2>Score Page</h2>
            <p>You scored {distance} mi</p>
            <div style={{ height: '300px', width: '100%' }}>
                <ScoreMap 
                    {...MapProps}
                />
            </div>
            <button onClick={restartGame}>Restart Game</button>
        </>
    );
}