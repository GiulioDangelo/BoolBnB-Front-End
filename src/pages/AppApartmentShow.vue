<script>
import axios from "axios";
import { store } from "../store";

export default {
  data() {
    return {
      apartment: null,
      store,
    };
  },
  created() {
    axios
      .get(this.store.baseUrl + "api/apartments/" + this.$route.params.slug)
      .then((response) => (this.apartment = response.data.results));
  },
};
</script>

<template>
  <template v-if="apartment">
    <h1>{{ apartment.title }}</h1>
    <h5>{{ apartment.street }}</h5>
    <img :src="this.store.baseUrl + 'storage/' + apartment.cover" alt="" />
    <p>{{ apartment.description }}</p>
    <div v-for="service in apartment.services" :key="service.id" class="container">
        <ul class="list-unstyled">
          <li>
            <font-awesome-icon :icon="['fas', 'square-check']" />
              {{service.name}}
          </li>
        </ul>
    </div>

    <div v-for="image in apartment.images" :key="image.id">
      <img :src="this.store.baseUrl + 'storage/' + image.img_url" alt="" />
    </div>


  </template>
</template>

<style></style>
