<script>
import { store } from '../store';

export default {
  data() {
    return {
      store,
    }
  }
};
</script>

<template>
  <footer>
    <p class="m-0 d-flex justify-content-center align-items-center gap-1 py-3">
      <!-- Facebook -->
      <a class="btn text-white rounded-circle m-1" style="background-color: #3b5998;" href="#"
        role="button"><font-awesome-icon :icon="['fab', 'facebook']" /></a>

      <!-- Twitter -->
      <a class="btn text-white rounded-circle m-1" style="background-color: #55acee;" href="#"
        role="button"><font-awesome-icon :icon="['fab', 'twitter']" /></a>

      <!-- Google -->
      <a class="btn text-white rounded-circle m-1" style="background-color: #dd4b39;" href="#"
        role="button"><font-awesome-icon :icon="['fab', 'google']" /></a>

      <!-- Instagram -->
      <a class="btn text-white rounded-circle m-1" style="background-color: #ac2bac;" href="#"
        role="button"><font-awesome-icon :icon="['fab', 'instagram']" /></a>

      <!-- Linkedin -->
      <a class="btn text-white rounded-circle m-1" style="background-color: #0082ca;" href="#"
        role="button"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>

      <!-- Github -->
      <a class="btn text-white rounded-circle m-1" style="background-color: #333333;" href="#"
        role="button"><font-awesome-icon :icon="['fab', 'github']" /></a>
    </p>

    <div class="container">
      <div class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
        <p class="col-md-4 mb-0 text-muted">© 2023 Boolean, Classe 96</p>

        <!-- Logo -->
        <a class="d-flex justify-content-center" :href="store.frontendURL">
          <img class="full-logo" src="../assets/img/multicolor-horizontal-logo.png" alt="">
          <img class="icon-logo" src="../assets/img/multicolor-logo.ico" alt="">
        </a>

        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item"><a :href="store.frontendURL" class="px-2 text-black link-unstyled nav-link">Home</a></li>
          <li class="nav-item"><a :href="store.frontendURL + 'search'"
              class="px-2 text-black link-unstyled nav-link">Cerca</a></li>
          <li class="nav-item"><a :href="store.frontendURL + 'aboutus'"
              class="px-2 text-black link-unstyled nav-link">About</a></li>
          <li class="nav-item"><a :href="store.backendURL + 'dashboard'"
              class="px-2 text-black link-unstyled nav-link">Profilo</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background-color: #fdfdfd;
  box-shadow: 0px -2px 10px -2px rgba(0, 0, 0, 0.3);
}

.full-logo {
  height: 30px;
}
</style>
