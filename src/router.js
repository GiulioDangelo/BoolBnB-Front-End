import { createRouter, createWebHistory } from "vue-router";

import AppApartmentShow from "./pages/AppApartmentShow.vue";
import AppApartmentsIndex from "./pages/AppApartmentsIndex.vue";
import AppAboutUs from "./pages/AppAboutUs.vue";
import App404 from "./pages/App404.vue";
import AppSearch from "./pages/AppSearch.vue";
import AppMessage from "./pages/AppMessage.vue";
import AppSponsor from "./pages/AppSponsor.vue";
import AppStatistic from "./pages/AppStatistic.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/apartments",
      name: "apartments.index",
      component: AppApartmentsIndex,
    },
    {
      path: "/apartments/:apartment",
      name: "apartments.show",
      component: AppApartmentShow,
    },
    {
      path: "/aboutus",
      name: "aboutus",
      component: AppAboutUs,
    },
    {
      path: "/search",
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
    {
      path: "/:pathMatch(.*)*",
      name: "page404",
      component: App404,
    },
  ],
});

export { router };
