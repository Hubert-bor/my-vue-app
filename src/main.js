import { createApp } from 'vue'
import App from './App.vue'
import store from './stores'
// import './style.css'
import "quasar/src/css/index.sass";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";

import "./styles/quasar-overrides.scss";
import "./styles/tailwind.css";

const app = createApp(App)

app.use(store)

app.mount('#app')
