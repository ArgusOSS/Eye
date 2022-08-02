import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';


it('renders without crashing', () => {
    render(<App />);
  });

  it('renders eye message', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });