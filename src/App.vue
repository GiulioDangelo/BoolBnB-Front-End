<script>
import AppNav from "./components/AppNav.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppNav,
    AppFooter,
  },
};
</script>

<template>
  <AppNav />
  <main style="margin-top: 100px; min-height: 63vh;">
    <router-view></router-view>
  </main>
  <AppFooter />
</template>

<style lang="scss">
@use "./assets/styles/general.scss" as *;
</style>
