/** Returns the current weather forcast using the NOAA api  */
export default async function getWeather(position: Position) {
  // Get the current location, then get the NOAA region
  const { latitude, longitude } = position.coords;

  const locationResp = await fetch(`https://api.weather.gov/points/${latitude},${longitude}`);
  const location = await locationResp.json();
  const forecastResp = await (await fetch(location.properties.forecast)).json();
  const forecast: Forecast[] = forecastResp.properties.periods;

  return forecast;
}

/** Forecast object returned from the NWS API */
export interface Forecast {
  detailedForecast: string;
  endTime: string;
  icon: string;
  isDaytime: boolean;
  name: string;
  number: number;
  shortForecast: string;
  startTime: string;
  temperature: number;
  temperatureTrend: string;
  temperatureUnit: string;
  windDirection: string;
  windSpeed: string;
}
