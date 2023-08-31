<script>
import axios from "axios";
import ApartmentCard from "./ApartmentCard.vue";
import { store } from "../store";

export default {
  data() {
    return {
      store,
      arrApartments: [],
    };
  },
  components: {
    ApartmentCard,
  },
  methods: {
    getApartments() {
      axios.get(this.store.baseUrl + "api/apartments").then((response) => {
        this.arrApartments = response.data.results;
      });
    },
  },
  created() {
    this.getApartments();
  },
};
</script>

<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
    <div class="col" v-for="apartment in arrApartments" :key="apartment.id">
      <ApartmentCard :apartment="apartment" />
    </div>
  </div>
</template>

<style></style>
