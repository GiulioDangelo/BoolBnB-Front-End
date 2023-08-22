<script>
export default {

}
</script>

<template>
  <router-view></router-view>
  <h1>ciao</h1>
  <font-awesome-icon icon="fa-solid fa-user-secret" />
  <font-awesome-icon :icon="['fas', 'user-secret']" />
  <font-awesome-icon :icon="['fas', 'user']" />
  <font-awesome-icon :icon="['fab', 'facebook']" />
  <font-awesome-icon :icon="['fab', 'instagram']" />
  <font-awesome-icon :icon="['far', 'star']" />
</template>

<style lang="scss">
@use './assets/styles/general.scss' as *;
</style>
