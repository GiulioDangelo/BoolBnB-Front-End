<script>
export default {};
</script>
<template>
  <footer class="footer" style="background-color: #434172">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4 mb-4">
          <h5>Links Utili</h5>
          <ul class="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">Servizi</a></li>
            <li><a href="#">Prodotti</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div class="col-md-4 mb-4">
          <h5>Social Media</h5>
          <ul class="list-inline">
            <li class="list-inline-item">
              <font-awesome-icon :icon="['fab', 'facebook']" />
            </li>
            <li class="list-inline-item">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </li>
            <li class="list-inline-item">
              <font-awesome-icon icon="fa-brands fa-square-twitter" class="icon_social twitter" />
            </li>
            <li class="list-inline-item">
              <font-awesome-icon icon="fa-brands fa-square-youtube" class="icon_social youtube" />
            </li>
            <li class="list-inline-item">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Contattaci</h5>
          <address>
            <p><i class="fas fa-map-marker-alt"></i> Indirizzo della sede</p>
            <p><i class="fas fa-phone"></i> Numero di telefono</p>
            <p><i class="fas fa-envelope"></i> Email</p>
          </address>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: #f66f17;
}

a {
  text-decoration: none;
  color: #f66f17;
}
</style>
