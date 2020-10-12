import { createApp } from "vue";
import App from "./App.vue";
import LocationPlugin from "./location-plugin/location-plugin";

const app = createApp(App);

// Use the location plugin we wrote
app.use(LocationPlugin);

app.mount("#app");
