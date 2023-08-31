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
  </template>
</template>

<style></style>
