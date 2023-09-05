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
  <router-view></router-view>
  <AppFooter />
</template>

<style lang="scss">
@use "./assets/styles/general.scss" as *;
</style>
