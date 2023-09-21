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
  <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug } }" style="text-decoration: none;">
    <div class="card d-flex align-items-center justify-content-center box-shadow">
      <div class="img-container">
        <img :src="getImageUrl(apartment.cover)" :alt="apartment.title" loading="lazy" />
      </div>

      <div class="mg my-2">
        <div class="group text-gradient">
          <h4>{{ apartment.title }}</h4>
        </div>
      </div>

      <div class="info text-center w-100 px-4">
        <h6 class="my-2 ellipsis mw-100">{{ apartment.street }}</h6>
        <p class="my-2 deets"> {{ apartment.size }} m2 </p>
      </div>
      <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug } }" class="styled-btn mt-auto my-2"
        style="text-decoration: none; padding-inline: 2em;">Guarda</router-link>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  transition: all 1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}

.img-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;

  &:hover img {
    transform: scale(1.2);
  }
}

.card {
  border-radius: 8px;
}
</style>
