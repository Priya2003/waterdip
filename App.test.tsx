// // __tests__/App.test.tsx
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders date picker', () => {
//   render(<App />);
//   const datePickerElement = screen.getByPlaceholderText(/YYYY-MM-DD to YYYY-MM-DD/i);
//   expect(datePickerElement).toBeInTheDocument();
// });

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders date picker', () => {
  render(<App />);
  
  // Check for the input fields using their type or label
  const startDateElement = screen.getByLabelText(/Start Date:/i);
  const endDateElement = screen.getByLabelText(/End Date:/i);
  
  expect(startDateElement).toBeInTheDocument();
  expect(endDateElement).toBeInTheDocument();
});
