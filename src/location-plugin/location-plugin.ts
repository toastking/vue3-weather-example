import { inject, Plugin } from "vue";

/**
 * Get the users current location using the HTML5 GeoLocation API.
 *  We wrap it in a promise to use with async/await.
 */
function getLocation(): Promise<Position> {
  return new Promise((resolve, reject) => {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position); // Resolve with location. location can now be accessed in the .then method.
      },
      err => reject(err) // Reject with err. err can now be accessed in the .catch method.
    );
  });
}

/** Symbol to access the location function */
const locationSymbol = Symbol("location");

const LocationPlugin: Plugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app, options) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$location = getLocation;

    app.provide(locationSymbol, getLocation);
  }
};

/** Type of the location function */
type LocationFunction = typeof getLocation;

/** Function to use the location function from the API */
export function useLocation() {
  /** Function to get the geolocation */
  const locationFunction: LocationFunction | undefined = inject(locationSymbol);

  if (!locationFunction) {
    throw new Error("Could not get inject LocationPlugin");
  }

  return locationFunction;
}

export default LocationPlugin;
