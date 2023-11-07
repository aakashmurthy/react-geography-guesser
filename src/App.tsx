import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ScorePage from './pages/ScorePage'

function App() {
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
            <Route path="/score" element={<ScorePage />} />
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