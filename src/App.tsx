import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'

function App() {
  // eslint-disable-next-line 
  const guess: google.maps.LatLngLiteral | null = null;
  const center = { lat: 44.56466353432313, lng: -123.28022377801592 }
  const [showMap, setShowMap] = useState(false);
  
  const handleClick = () => {
    setShowMap(true);
  };

  const handleMarkerSubmit = (coords: google.maps.LatLngLiteral) => {
    console.log(`coords: ${coords.lat}, ${coords.lng}`)
    // console.log(`Center: ${center.toJSON()}`)
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Geography Guesser</h1>
        <p>5 guesses around the world, find out where you are</p>
      </header>
      <Router>
        <Navigation />
        <div className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
          </Routes>
        </div>
      </Router>
      <footer>
        <p>© 2023 Aakash Murthy</p>
      </footer>
    </div>
  );
}

export default App;