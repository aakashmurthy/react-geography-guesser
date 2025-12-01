import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Geography Guesser header', () => {
  render(<App />);
  const headerElements = screen.getAllByText(/Geography Guesser/i);
  expect(headerElements.length).toBeGreaterThan(0);
});
