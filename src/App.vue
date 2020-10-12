<template>
  <page-header />
  <forecast />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Forecast from "./components/Forecast.vue";
import PageHeader from "./components/PagerHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    Forecast,
    PageHeader
  },
  setup() {
    return {};
  }
});
</script>

<style></style>
