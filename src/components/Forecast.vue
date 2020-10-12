<template>
  <div class="forecast">
    <daily-weather v-for="forecast of forecasts" :key="forecast.name" :forecast="forecast" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import fetchWeather, { Forecast } from "../fetch_weather";
import DailyWeather from "./DailyWeather.vue";
import { LocationFunction, locationSymbol } from "../location-plugin/location-plugin";

export default defineComponent({
  setup() {
    // Create the forecasts reactive object
    const forecasts = ref<Array<Forecast>>([]);

    // Register a function to be called in the onMounted lifecycle
    onMounted(async () => {
      const getLocation: LocationFunction | undefined = inject(locationSymbol);
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
