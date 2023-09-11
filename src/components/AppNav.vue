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
  <nav class="navbar navbar-expand-lg w-100">
    <div class="container">
      <div class="w-100 d-flex justify-content-between px-0">
        <a class="navbar-brand" :href="store.frontendURL">
          <img class="full-logo" src="../assets/img/multicolor-horizontal-logo.png" alt="">
          <img class="icon-logo" src="../assets/img/multicolor-logo.ico" alt="">
        </a>

        <div class="w-100 d-flex justify-content-end align-center gap-4">

          <a class="link-unstyled d-flex align-center" :href="store.frontendURL + 'search'">
            <button class="button text-gradient">
              <span><font-awesome-icon :icon="['fas', 'magnifying-glass']" /> <span class="disapear">Cerca</span></span>
            </button>
          </a>

          <div class="d-flex gap-2">
            <a class="link-unstyled d-flex align-center" :href="store.backendURL + 'login'">
              <button class="button text-gradient">
                <span><font-awesome-icon :icon="['fas', 'user-lock']" /></span> <span class="disapear">Accedi</span>
              </button>
            </a>
            <div class="border border-1 border-dark"></div>

            <a class="link-unstyled d-flex align-center" :href="store.backendURL + 'register'">
              <button class="button text-gradient">
                <span><font-awesome-icon :icon="['fas', 'user-plus']" /></span> <span class="disapear">Registrati</span>
              </button>
            </a>

          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar {
  height: 70px;
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 99;
  background-color: #fdfdfd;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.3);
}

.dropdown-menu {
  border: none;
  border-radius: 6px
}

.full-logo,
.icon-logo {
  height: 30px;
}

.full-logo {
  display: block;
}

.icon-logo {
  display: none;
}

@media screen and (max-width: 575px) {
  .disapear {
    display: none;
  }

  .nav-link {
    background: #424172;
    background: repeating-radial-gradient(circle farthest-corner at top left,
        #424172 0%,
        #ff7210 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .full-logo {
    display: none;
  }

  .icon-logo {
    display: block;
  }
}
</style>
