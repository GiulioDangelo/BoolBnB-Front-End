import { createRouter, createWebHistory } from "vue-router";

import AppHome from "../components/AppHome.vue";
import AppAppartmentShow from "../components/AppAppartmentShow.vue";
import AppAppartmentsIndex from "../components/AppAppartmentsIndex.vue";
import AppAboutUs from "../components/AppAboutUs.vue";
import App404 from "../components/App404.vue";
import AppSearch from "../components/AppSearch.vue";
import AppMessage from "../components/AppMessage.vue";
import AppSearch from "../AppSearch.vue";
import AppSponsor from "../components/AppSponsor.vue";
import AppStatistic from "../components/AppStatistic.vue";
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
