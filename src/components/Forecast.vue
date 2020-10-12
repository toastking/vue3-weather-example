<template>
  <div class="forecast">
    <daily-weather v-for="forecast of forecasts" :key="forecast.name" :forecast="forecast" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from "vue";
import { Client } from "@googlemaps/google-maps-services-js";
import fetchWeather, { Forecast } from "../fetch_weather";
import DailyWeather from "./DailyWeather.vue";
import { LocationFunction, locationSymbol } from "../location-plugin/location-plugin";

export default defineComponent({
  setup() {
    /** Weather forecasts for the week */
    const forecasts = ref<Array<Forecast>>([]);
    /** Function to get the geolocation */
    const getLocation: LocationFunction | undefined = inject(locationSymbol);

    // Register a function to be called in the onMounted lifecycle
    onMounted(async () => {
      if (getLocation) {
        const location = await getLocation();
        forecasts.value = await fetchWeather(location);
      }
    });

    return { forecasts };
  },
  components: { DailyWeather }
});
</script>

<style scoped>
.forecast {
  display: flex;
  flex-direction: row;
}
</style>
