import { createApp } from 'vue'
import { router } from "./router";
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far);

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')

import "bootstrap/dist/js/bootstrap.js";