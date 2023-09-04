<script>
import { store } from "../store";

export default {
  data() {
    return {
      store,
    };
  },
  props: {
    apartment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl(image) {
      return image
        ? this.store.baseUrl + "storage/" + image
        : this.store.baseUrl + "storage/default.jpg";
    },
  },
};
</script>

<template>
  <div class="minip mt-5">
    <img :src="getImageUrl(apartment.cover)" alt="" />
    <div class="mg">
      <div class="group">
        <span>{{ apartment.title }}</span>
      </div>
    </div>

    <div class="info border border-dark">
      <h5 class="card-title">{{ apartment.street }}</h5>
      <span class="deets"> {{ apartment.size }} m2 </span>
    </div>

    <router-link
      :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
      class="btn btn-primary mt-auto"
      >View more</router-link
    >
  </div>
</template>

<style scoped lang="scss">
img {
  width: 300px;
  height: 250px;
}
</style>
