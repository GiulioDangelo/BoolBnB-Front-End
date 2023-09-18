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
    <p class="socials m-0 d-flex justify-content-center align-items-center gap-2 py-3">
      <!-- Facebook -->
      <a class="text-white rounded-circle" style="background-color: #3b5998;" href="#" role="button"><font-awesome-icon
          :icon="['fab', 'facebook']" /></a>

      <!-- Twitter -->
      <a class="text-white rounded-circle" style="background-color: #55acee;" href="#" role="button"><font-awesome-icon
          :icon="['fab', 'twitter']" /></a>

      <!-- Google -->
      <a class="text-white rounded-circle" style="background-color: #dd4b39;" href="#" role="button"><font-awesome-icon
          :icon="['fab', 'google']" /></a>

      <!-- Instagram -->
      <a class="text-white rounded-circle" style="background-color: #ac2bac;" href="#" role="button"><font-awesome-icon
          :icon="['fab', 'instagram']" /></a>

      <!-- Linkedin -->
      <a class="text-white rounded-circle" style="background-color: #0082ca;" href="#" role="button"><font-awesome-icon
          :icon="['fab', 'linkedin']" /></a>

      <!-- Github -->
      <a class="text-white rounded-circle" style="background-color: #333333;" href="#" role="button"><font-awesome-icon
          :icon="['fab', 'github']" /></a>
    </p>

    <div class="container">
      <div class="footer-text d-flex justify-content-between align-items-center py-3 border-top">

        <!-- Copyrigth -->
        <p class="col-md-4 mb-0 p-2 text-muted">© 2023 Boolean, Classe 96</p>

        <!-- Logo -->
        <a class="logo d-flex justify-content-center" :href="store.frontendURL">
          <img class="full-logo" src="../assets/img/multicolor-horizontal-logo.png" alt="">
          <img class="icon-logo" src="../assets/img/multicolor-logo.ico" alt="">
        </a>

        <!-- Link -->
        <ul class="row row-cols-4 justify-content-between col-md-4 m-0 p-0 list-unstyled">
          <li class="nav-item px-1"><a :href="store.frontendURL" class="px-1 text-black link-unstyled nav-link">Home</a>
          </li>
          <li class="nav-item px-1"><a :href="store.frontendURL + 'search'"
              class="px-1 text-black link-unstyled nav-link">Cerca</a></li>
          <li class="nav-item px-1"><a :href="store.frontendURL + 'aboutus'"
              class="px-1 text-black link-unstyled nav-link">About</a></li>
          <li class="nav-item px-1"><a :href="store.backendURL + 'dashboard'"
              class="px-1 text-black link-unstyled nav-link">Profilo</a></li>
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

.socials {
  a {
    width: 32px;
    aspect-ratio: 1 / 1;

    display: flex;
    justify-content: center;
    align-items: center;

    * {
      width: 16px;
      height: 16px;
    }
  }
}

.full-logo,
.icon-logo {
  height: 40px;
}

@media (max-width: 991px) {

  .full-logo {
    display: none !important;
  }

  .icon-logo {
    display: block !important;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 767px) {

  .logo {
    display: none !important;
  }
}

@media (max-width: 489px) {
  .footer-text {
    flex-direction: column;

  }
}
</style>
