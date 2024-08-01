import { useState } from "react";
import CityWeather from "../components/city-weather";
import CityWeatherRefactor from "../components/city-weather-refactor";

export default function IndexPage() {
  const [city, setCity] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-50">
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();

          const formdata = new FormData(e.currentTarget);
          setCity(formdata.get("city").toString());
        }}
      >
        <label className="text-xl font-sans" htmlFor="city">
          Weather Search:
        </label>
        <input
          data-testid="weather-input"
          className="ml-2 p-2 border border-gray-300 rounded-md"
          type="text"
          id="city"
          name="city"
          aria-labelledby="city"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          type="submit"
        >
          Submit
        </button>
      </form>

      {city && (
        <div className="mt-4">
          <CityWeather city={city} />
        </div>
      )}
    </div>
  );
}
