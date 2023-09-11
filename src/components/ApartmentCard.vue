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
    <div class="mg mt-3">
      <div class="group">
        <span>{{ apartment.title }}</span>
      </div>
    </div>

    <div class="info d-flex flex-column align-items-center text-center">
      <h5 class="card-title my-3">{{ apartment.street }}</h5>
      <span class="deets my-2"> {{ apartment.size }} m2 </span>
    </div>

    <router-link
      :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
      class="btn btn-primary mt-auto my-2"
      >Guarda</router-link
    >
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
