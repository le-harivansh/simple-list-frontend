import axios from 'axios';
import { createApp } from 'vue';

import App from './App.vue';

import './assets/main.css';

axios.defaults.baseURL = "http://localhost:3000";

createApp(App).mount('#app');
