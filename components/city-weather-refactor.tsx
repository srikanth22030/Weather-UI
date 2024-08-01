import React, { useState, useEffect } from 'react';

interface CityWeatherProps {
  city: string;
}

interface WeatherResult {
  weather: { icon: string; description: string }[];
  main: { temp: number };
}

const API_KEY = "afc16ca7e235fb5212f3ba68098b7e45"

const KtoF = (tempKevlin: number) => {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
};

const CityWeatherRefactor: React.FC<CityWeatherProps> = ({ city }) => {
  const [weatherResult, setWeatherResult] = useState<WeatherResult | null>(null);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    )
      .then((r) => r.json())
      .then((result) => setWeatherResult(result));

    if (city) {
      try {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        )
          .then((r) => r.json())
          .then((result) => setWeatherResult(result))
      } catch (error) {
        setWeatherResult(null)
      }
    }
  }, [city]);

  return (
    weatherResult && weatherResult.weather && (
      <div className="bg-white p-6 rounded-lg shadow-md w-64">
        <div className="text-center">
          <div className="text-xl font-semibold uppercase text-gray-500 font-Helvetica">
            {city}
          </div>
          <div className="flex justify-center">
            <img
              src={`http://openweathermap.org/img/w/${weatherResult?.weather[0].icon}.png`}
              alt="weather icon"
            />
          </div>
          <div className="text-lg text-gray-500 capitalize">
            {weatherResult?.weather[0].description}
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Temperature:</span>
            <span className="text-2xl font-bold ml-1">
              {KtoF(weatherResult?.main?.temp).toFixed(0)}°F
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default CityWeatherRefactor;