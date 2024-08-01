import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CityWeatherRefactor from './city-weather-refactor';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      weather: [{ icon: '01d', description: 'clear sky' }],
      main: { temp: 300 }
    }),
  })
) as jest.Mock;

const city = 'Chicago';

describe('CityWeatherRefactor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component', async () => {
    render(<CityWeatherRefactor city={city} />);
    
    await waitFor(() => {
      expect(screen.getByText(city)).toBeInTheDocument();
      expect(screen.getByAltText('weather icon')).toBeInTheDocument();
      expect(screen.getByText('clear sky')).toBeInTheDocument();
      expect(screen.getByText(/80°F/)).toBeInTheDocument();
    });
  });

  test('updates when city prop changes', async () => {
    const { rerender } = render(<CityWeatherRefactor city={city} />);

    await waitFor(() => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });

    const newCity = 'Chicago';
    rerender(<CityWeatherRefactor city={newCity} />);

    await waitFor(() => {
      expect(screen.getByText(newCity)).toBeInTheDocument();
    });
  });
});
