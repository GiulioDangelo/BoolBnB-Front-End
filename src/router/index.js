import { createRouter, createWebHistory } from "vue-router";

import AppHome from "../components/AppHome.vue";
import AppAppartmentShow from "../pages/AppAppartmentShow.vue";
import AppAppartmentsIndex from "../pages/AppAppartmentsIndex.vue";
import AppAboutUs from "../pages/AppAboutUs.vue";
import App404 from "../pages/App404.vue";
import AppSearch from "../pages/AppSearch.vue";
import AppMessage from "../pages/AppMessage.vue";
import AppSearch from "../pages/AppSearch.vue";
import AppSponsor from "../pages/AppSponsor.vue";
import AppStatistic from "../pages/AppStatistic.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      name: "home",
      component: AppHome,
    },
    {
      path: "/appartment",
      name: "appartmentshow",
      component: AppAppartmentShow,
    },
    {
      path: "/appartments",
      name: "apparrtments",
      component: AppAppartmentsIndex,
    },
    {
      path: "//:pathMatch(.*)*",
      name: "page404",
      component: App404,
    },
    {
      path: "aboutus",
      name: "aboutus",
      component: AppAboutUs,
    },
    {
      path: "search",
      name: "search",
      component: AppSearch,
    },
    {
      path: "/message",
      name: "message",
      component: AppMessage,
    },
    {
      path: "/sponsor",
      name: "sponsor",
      component: AppSponsor,
    },
    {
      path: "/statistic",
      name: "statistic",
      component: AppStatistic,
    },
  ],
});

export { router };
