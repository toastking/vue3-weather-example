<template>
  <h1>Weather for {{ address }}</h1>
  <p>hello</p>
</template>

<script lang="ts">
import { LocationFunction, locationSymbol } from "@/location-plugin/location-plugin";
import { Client } from "@googlemaps/google-maps-services-js";
import Vue, { computed, defineComponent, inject, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    /** Function to get the geolocation */
    const getLocation: LocationFunction | undefined = inject(locationSymbol);
    /** The current address based on the user's location */
    const address = ref("");

    onMounted(async () => {
      if (getLocation) {
        const location = await getLocation();

        // Initialize the Google Maps API
        const client = new Client();
        const reverseGeocodeResult = await client.reverseGeocode({
          params: {
            latlng: { lat: location.coords.latitude, lng: location.coords.longitude },
            key: process.env.VUE_APP_GOOGLE_MAPS_KEY
          }
        });

        address.value = reverseGeocodeResult.data.results[0].formatted_address;
      }
    });
    return { address };
  }
});
</script>
