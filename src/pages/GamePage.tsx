import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import StreetView from '../components/GoogleMaps/StreetView';
import GoogleMap from '../components/GoogleMaps/GoogleMap';
import HelpBox from '../components/HelpBox';
import DifficultyForm from '../components/DifficultyForm';

// Constants
const DEFAULT_CENTER: google.maps.LatLngLiteral = { lat: 39.23611853557754, lng: -129.09572849422432 };
const RADIUS_EARTH_MILES = 3963.19;

// Helper functions
const toRad = (value: number): number => value * Math.PI / 180;

// Calculate distance between two points in miles
const calcDist = (point1: google.maps.LatLngLiteral, point2: google.maps.LatLngLiteral): number => {
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  const lat1 = toRad(point1.lat);
  const lat2 = toRad(point2.lat);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIUS_EARTH_MILES * c;
};

// Fetch random coordinates based on region
const getCoordinates = async (region: string): Promise<google.maps.LatLngLiteral> => {
  try {
    const response = await axios.get(`http://localhost:8888/random-location?region=${region}`);
    return { lat: response.data.lat, lng: response.data.lng };
  } catch (error) {
    console.error(error);
    return DEFAULT_CENTER;
  }
};

// Main component
export default function HomePage() {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(DEFAULT_CENTER);
  const [showMap, setShowMap] = useState(false);
  const navigate = useNavigate();

  // Update map visibility based on center state
  useEffect(() => {
    setShowMap(center.lat !== DEFAULT_CENTER.lat || center.lng !== DEFAULT_CENTER.lng);
  }, [center]);

  // Handle difficulty form submission
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const difficulty = event.currentTarget.gameOption?.value!;
    const newCenter = await getCoordinates(difficulty);
    if (difficulty === "SA") {
      promptChallengeConfirmation(() => setCenter(newCenter));
    } else {
      setCenter(newCenter);
    }
  };

  // Prompt user with a challenge confirmation
  const promptChallengeConfirmation = (onConfirm: () => void) => {
    Swal.fire({
      title: "Warning",
      text: 'Do you want to continue? This is the ultimate challenge',
      icon: 'error',
      confirmButtonText: 'Proceed',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  // Handle marker submission and navigate to score page
  const handleMarkerSubmit = (guess: google.maps.LatLngLiteral) => {
    const distance = calcDist(guess, center);
    navigate('/score', { state: { distance: distance.toFixed(2), center, guess } });
  };

  // Render component
  return (
    <>
      <h1>Start Game</h1>
      <h2>How does Geography Guesser work?</h2>
      <HelpBox />
      <DifficultyForm onSubmit={handleFormSubmit} />
      {showMap && (
        <>
          <StreetView center={center} />
          <GoogleMap onMarkerSubmit={handleMarkerSubmit} />
        </>
      )}
    </>
  );
}