<script>
export default {};
</script>

<template>
  <nav class="navbar navbar-expand-lg w-100 bg-white">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="../assets/img/multicolor-horizontal-logo.png" alt="" />
      </a>

      <div class="collapse navbar-collapse bg-white p-2 rounded" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 log-btn">
          <li class="nav-item">
            <a class="nav-link" href="/">In Evidenza</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/search">Cerca Appartamenti</a>
          </li>
        </ul>

        <div class="log-btn">
          <div class="d-flex gap-2">
            <button class="login-link">
              <a href="http://localhost:8000/login">Accedi</a>
            </button>
            <div class="border border-1 border-dark"></div>
            <button class="register-link">
              <a href="http://localhost:8000/register">Registrati</a>
            </button>
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

.auth {
  color: #ff7210;
}

a img {
  width: 120px;
}

.login-link,
.register-link {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
}

.login-link,
.register-link {
  --primary-color: #424172;
  --hovered-color: #ff7210;
  position: relative;
  display: flex;
  font-weight: 600;
  gap: 0.5rem;
  align-items: center;
}

.login-link a,
.register-link a {
  margin: 0;
  position: relative;
  color: var(--primary-color);
}

.login-link a::before,
.register-link a::before {
  position: absolute;
  width: 0%;
  inset: 0;
  color: var(--hovered-color);
  overflow: hidden;
  transition: 0.3s ease-out;
}

.login-link a::before {
  content: "Accedi";
}

.register-link a::before {
  content: "Registrati";
}

.login-link a:hover,
.register-link a:hover {
  text-decoration: none;
}

.login-link:hover::after,
.register-link::after {
  width: 100%;
}

.login-link:hover a::before,
.register-link:hover a::before {
  width: 100%;
}
</style>
