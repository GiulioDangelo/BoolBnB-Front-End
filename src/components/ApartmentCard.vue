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
};
</script>

<template>
  <div class="minip mt-5">
    <div class="mg">
      <div class="clr"></div>
      <div class="group">
        <span>{{ apartment.title }}</span>
      </div>
    </div>
    <img :src="apartment.strDrinkThumb" class="av card-img-top" />

    <div class="info border border-dark">
      <h5 class="card-title">{{ apartment.street }}</h5>
      <span class="deets"> {{ apartment.size }} m2 </span>
    </div>

    <router-link
      :to="{ name: 'apartments.show', params: { apartment: apartment.id } }"
      class="btn plot mt-auto border border-black"
      >View more</router-link
    >
  </div>
</template>

<style></style>
