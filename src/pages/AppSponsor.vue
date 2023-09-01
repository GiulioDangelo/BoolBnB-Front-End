<template>
  <div class="container d-flex">
    <div class="card col-4">
      <div class="card-body">
        <h5 class="card-title">titolo:{{ title }}</h5>
        <p class="card-text">descrizione:{{ description }}</p>
        <p class="card-text">Prezzo: {{ price }}</p>
        <p class="card-text">Durata: {{ duration }}</p>
      </div>
    </div>
    <div class="card col-4">
      <div class="card-body">
        <h5 class="card-title">titolo:{{ title }}</h5>
        <p class="card-text">descrizione:{{ description }}</p>
        <p class="card-text">Prezzo: {{ price }}</p>
        <p class="card-text">Durata: {{ duration }}</p>
      </div>
    </div>
    <div class="card col-4">
      <div class="card-body">
        <h5 class="card-title">titolo:{{ title }}</h5>
        <p class="card-text">descrizione:{{ description }}</p>
        <p class="card-text">Prezzo: {{ price }}</p>
        <p class="card-text">Durata: {{ duration }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    price: String,
    duration: String,
    imageSrc: String,
  },
};
</script>

<style scoped>
.card {
  margin-top: 10rem;
  margin-bottom: 10rem;
}
</style>
