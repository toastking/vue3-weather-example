import { createApp } from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import "./assets/scss/app.scss";

Vue.use(Buefy);

createApp(App).mount("#app");
