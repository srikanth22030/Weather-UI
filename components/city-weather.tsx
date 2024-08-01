import React from "react";

// to get api key: https://openweathermap.org/appid
const API_KEY = "afc16ca7e235fb5212f3ba68098b7e45"// "<insert your api key here>";

interface CityWeatherProps {
  city: string;
}

interface CityWeatherState {
  weatherResult: any;
}

export default class CityWeather extends React.Component<
  CityWeatherProps,
  CityWeatherState
> {
  public constructor(props: CityWeatherProps | Readonly<CityWeatherProps>) {
    super(props);
    this.state = {
      weatherResult: null,
    };
  }

  public componentDidMount() {
    const { city } = this.props;
    if (city) {
      this.fetchData(city)
    }
  }

  componentDidUpdate(prevProps: any) {
    const { city } = this.props;

    if (prevProps?.city && city && prevProps?.city !== city) {
      this.fetchData(city)
    }
  }

  public render() {
    const { city } = this.props;
    const { weatherResult } = this.state;

    return (
      weatherResult && weatherResult.weather && (<div className="bg-white p-6 rounded-lg shadow-md w-64">
        <div className="text-center">
          <div className="text-xl font-semibold uppercase text-gray-500 font-Helvetica">{city}</div>
          <div className="flex justify-center"><img src={`http://openweathermap.org/img/w/${weatherResult?.weather[0]?.icon}.png`} /></div>
          <div className="text-lg text-gray-500 capitalize">{weatherResult?.weather[0]?.description}</div>
          <div className="mt-2">
            <span className="text-sm text-gray-500">Temperature:</span>
            <span className="text-2xl font-bold ml-1">{KtoF(weatherResult?.main?.temp).toFixed(0)}°F</span>
          </div>
        </div>
      </div>)
    );
  }

  private fetchData(city: string) {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
        .then((r) => r.json())
        .then((result) => this.setState({ weatherResult: result }))
    } catch (error) {
      this.setState({ weatherResult: null })
    }
  }
}

function KtoF(tempKevlin: number) {
  return ((tempKevlin - 273.15) * 9) / 5 + 32;
}
