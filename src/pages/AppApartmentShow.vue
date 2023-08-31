<script>
import axios from "axios";
import { store } from "../store";
import App404 from "./App404.vue";

export default {
  components: {
    App404,
  },
  data() {
    return {
      apartment: null,
      store,
      is404: false,
    };
  },
  created() {
    axios
      .get(
        this.store.baseUrl + "api/apartments/" + this.$route.params.apartment
      )
      .then((response) => {
        if (response.data.success) {
          this.apartment = response.data.results;
        } else {
          this.is404 = true;
        }
      });
  },
};
</script>

<template>
  <App404 v-if="is404" />
  <template v-if="apartment">
    <div id="container">
      <div class="product-details">
        <h1 class="text-center">
          {{ apartment.title }}
        </h1>
        <p class="information text-center px-5 mt-4">
          {{ apartment.description }}
        </p>
      </div>
    </div>
  </template>
</template>

<style></style>
