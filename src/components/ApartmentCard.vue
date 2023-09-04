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
  <div class="card d-flex align-items-center justify-content-center mt-5">
    <div class="img-container">
      <img :src="getImageUrl(apartment.cover)" alt=""/> 
    </div>
    <div class="mg mt-3">
      <div class="group">
        <span>{{ apartment.title }}</span>
      </div>
    </div>

    <div class="info d-flex flex-column align-items-center text-center">
      <h5 class="card-title my-3">{{ apartment.street }}</h5>
      <span class="deets"> {{ apartment.size }} m2 </span>
    </div>

    <router-link
      :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
      class="btn btn-primary mt-auto mb-3"
      >View more</router-link
    >
  </div>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.card{
  height: 450px;
}

.img-container{
  width: 100%;
}
</style>
