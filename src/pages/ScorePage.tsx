import { useLocation, useNavigate } from 'react-router-dom';

export default function ScoreboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const distance = location.state.distance;

    const restartGame = () => {
        navigate('/game');
    };

    return (
        <>
            <h2>score page</h2>
            <p>lol you scored {distance} mi</p>
            <button onClick={restartGame}>Restart Game</button>
        </>
    )
}