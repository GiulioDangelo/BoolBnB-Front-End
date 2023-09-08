import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import ApartmentList from './components/ApartmentList.vue'
import AppApartmentShow from "./pages/AppApartmentShow.vue";
import AppAboutUs from "./pages/AppAboutUs.vue";
import AppSearch from "./pages/AppSearch.vue";
import AppCity from "./pages/AppCity.vue"
import App404 from "./pages/App404.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppHome
    },
    {
      path: "/apartments/:slug",
      name: "apartments.show",
      component: AppApartmentShow,
    },
    {
      path: "/aboutus",
      name: "aboutus",
      component: AppAboutUs,
    },
    {
      path: "/apartments",
      name: "apartments",
      component: ApartmentList,
    },
    {
      path: "/search",
      name: "search",
      component: AppSearch,
    },
    {
      path: "/city",
      name: "city",
      component: AppCity,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: App404,
    },
  ],
});

export { router };
