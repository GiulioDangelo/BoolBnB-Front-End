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
        ? this.store.backendURL + "storage/" + image
        : this.store.backendURL + "storage/default.jpg";
    },
  },
};
</script>

<template>
  <div class="card d-flex align-items-center justify-content-center mt-5">
    <div class="img-container">
      <img :src="getImageUrl(apartment.cover)" alt="" />
    </div>

    <div class="mg my-2">
      <div class="group">
        <h4>{{ apartment.title }}</h4>
      </div>
    </div>

    <div class="info text-center w-100 px-4">
      <h6 class="my-2 ellipsis mw-100">{{ apartment.street }}</h6>
      <p class="my-2 deets"> {{ apartment.size }} m2 </p>
    </div>

    <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
      class="btn btn-primary mt-auto my-2">Guarda</router-link>
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
}

.img-container {
  width: 100%;
}

.card {
  border-radius: 8px;
}
</style>
