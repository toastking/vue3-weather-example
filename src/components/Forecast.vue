<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import fetchWeather from "../fetch_weather";

export default defineComponent({
  setup() {
    const forecast = fetchWeather();
    return {};
  }
});
</script>
