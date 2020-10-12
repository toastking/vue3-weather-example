<template>
  <div class="daily-weather">
    <img :src="forecast.icon" height="50" width="50" alt="The icon for the weather forecast" />
    <div class="daily-weather-details">
      <h2>{{ forecast.name }}</h2>
      <p class="temperature">{{ forecast.temperature }} {{ forecast.temperatureUnit }}</p>
      <p class="short-forecast">{{ forecast.shortForecast }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Forecast } from "@/fetch_weather";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    forecast: {
      type: Object as PropType<Forecast>,
      required: true
    }
  }
});
</script>

<style scoped>
.daily-weather {
  flex: 1;
  display: flex;
  flex-direction: row;
  border: solid 0.25em blue;
  border-radius: 2em;
  padding: 2em;
}

.daily-weather-details {
  display: flex;
  flex-direction: column;
  padding: 1em;
}
</style>
