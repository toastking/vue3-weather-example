/**
 * Get the users current location using the HTML5 GeoLocation API.
 *  We wrap it in a promise to use with async/await.
 */
function getLocation() {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position); // Resolve with location. location can now be accessed in the .then method.
      },
      err => reject(err) // Reject with err. err can now be accessed in the .catch method.
    );
  });
}

/** Returns the current weather forcast using the NOAA api  */
export default async function getWeather() {
  // Get the current location, then get the NOAA region
  const position = (await getLocation()) as Position;
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
