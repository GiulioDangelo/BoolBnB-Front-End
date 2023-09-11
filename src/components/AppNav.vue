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
    <div class="container h-100">
      <div class="w-100 d-flex justify-content-between px-0 h-100">
        <a class="navbar-brand" :href="store.frontendURL">
          <img class="full-logo" src="../assets/img/multicolor-horizontal-logo.png" alt="">
          <img class="icon-logo h-100" src="../assets/img/multicolor-logo.ico" alt="">
        </a>

        <div class="w-100 d-flex justify-content-end align-center gap-4">
          <div class="collapse navbar-collapse bg-white p-2 rounded" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 log-btn gap-3">
              <li class="nav-item">
                <button class="home-link">
                  <a href="/">Home</a>
                </button>
              </li>
              <li class="nav-item">
                <button class="search-link">
                  <a href="/search">Cerca Appartamenti</a>
                </button>
              </li>
              <li class="nav-item">
                <button class="aboutus-link">
                  <a href="/aboutus">About Us</a>
                </button>
              </li>
            </ul>
          </div>

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
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  border-bottom: 1px solid #ff7210;
}

.log-btn a {
  text-decoration: none;
}

.log-btn a:hover {
  color: #424172;
}

.log-btn a:hover,
.exit:hover button {
  cursor: pointer;
  text-decoration: underline;
}

.icon-logo{
  display: none;
}

.auth {
  color: #ff7210;
}

a img {
  width: 120px;
}

.home-link,
.search-link,
.aboutus-link,
.login-link,
.register-link {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
}

.home-link,
.search-link,
.aboutus-link,
.login-link,
.register-link {
  --primary-color: #424172;
  --hovered-color: #FF7210;
  position: relative;
  display: flex;
  font-weight: 600;
  gap: 0.5rem;
  align-items: center;
}

.home-link a,
.search-link a,
.aboutus-link a,
.login-link a,
.register-link a {
  margin: 0;
  position: relative;
  color: var(--primary-color)
}

.home-link a::before,
.search-link a::before,
.aboutus-link a::before,
.login-link a::before,
.register-link a::before {
  position: absolute;
  width: 0%;
  inset: 0;
  color: var(--hovered-color);
  overflow: hidden;
  transition: 0.3s ease-out;
}

.home-link a::before {
  content: "Home";
}

.search-link a::before {
  content: "Cerca\00a0 Appartamenti";
}

.aboutus-link a::before {
  content: "About\00a0 Us";
}

.login-link a::before {
  content: "Accedi";
}

.register-link a::before {
  content: "Registrati";
}

.home-link a:hover,
.search-link a:hover,
.aboutus-link a:hover,
.login-link a:hover,
.register-link a:hover {
  text-decoration: none;
}

.home-link:hover::after,
.search-link:hover::after,
.aboutus-link:hover::after,
.login-link:hover::after,
.register-link::after {
  width: 100%;
}

.home-link:hover a::before,
.search-link:hover a::before,
.aboutus-link:hover a::before,
.login-link:hover a::before,
.register-link:hover a::before {
  width: 100%;
}

@media screen and (max-width: 504px) {
  .icon-logo{
    display: block;
    object-fit: contain;
  }

  .full-logo{
    display: none;
  }

  .container{
    height: 100%;
  }
}
</style>
