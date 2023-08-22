import { createApp } from 'vue'
import { router } from "./router";
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.css";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

/* add icons to the library */

createApp(App).component ('font-awesome-icon', FontAwesomeIcon).use(router).mount('#app')

import "bootstrap/dist/js/bootstrap.js";