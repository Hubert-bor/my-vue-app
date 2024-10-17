import { createApp } from 'vue'
import App from './App.vue'
import store from './stores'
// import './style.css'
import { Quasar } from 'quasar'

import "quasar/src/css/index.sass";
import "@quasar/extras/roboto-font/roboto-font.css";
import '@quasar/extras/material-icons/material-icons.css'

import 'u-basscss/css/flexbox.css';
import 'u-basscss/css/layout.css';
import 'u-basscss/css/margin.css';
import 'u-basscss/css/padding.css';
import 'u-basscss/css/position.css';
import 'u-basscss/css/typography.css';

import "./styles/quasar-overrides.scss";
import "./styles/tailwind.css";

import router from './router'


const app = createApp(App)

app.use(Quasar)
app.use(store)
app.use(router)

app.mount('#app')
