import { useLocation, useNavigate } from 'react-router-dom';
import ScoreMap from '../components/GoogleMaps/ScoreMap';

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