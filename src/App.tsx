import { useState } from 'react';
import logo from './logo.svg';
import MapWrapper from './components/GoogleMaps/StreetView';
import GoogleMap from './components/GoogleMaps/GoogleMap';
import './App.css';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <button onClick={handleClick}>Show Map</button>
      {showMap && (
        <>
          <MapWrapper center={center}/>
          <GoogleMap onMarkerSubmit={handleMarkerSubmit}/>
        </>
      )}
    </div>
  );
}

export default App;