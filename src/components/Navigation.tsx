import { Link } from 'react-router-dom';


export default function Navigation() {
    return (
        <div className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/game">New Game</Link>
        </div>
    )
}