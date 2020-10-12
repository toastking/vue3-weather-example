import { Plugin } from "vue";

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

/** Type of the location function */
export type LocationFunction = typeof getLocation;

/** Symbol to access the location function */
export const locationSymbol = Symbol("location");

const LocationPlugin: Plugin = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  install(app, options) {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$location = getLocation;

    app.provide(locationSymbol, getLocation);
  }
};

export default LocationPlugin;
