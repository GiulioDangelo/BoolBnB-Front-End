<script>
import axios from "axios";
import { store } from "../store";
import tt from '@tomtom-international/web-sdk-maps';
import "@tomtom-international/web-sdk-maps";

export default {
    data() {
        return {
            apartment: null,
            store,
        }
    },

    mounted() {
    axios
      .get(this.store.baseUrl + "api/apartments/" + this.$route.params.slug)
      .then((response) => {
        this.apartment = response.data.results;
        console.log(response);


        if (this.apartment.latitude && this.apartment.longitude) {
          this.map = tt.map({
            key: "bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R",
            container: "map",
            center: [this.apartment.longitude, this.apartment.latitude],
            zoom: 15,
          });
        } else {
          console.error("I dati dell'appartamento non contengono latitudine e/o longitudine validi.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    },
}
</script>

<template>
	<div class="tomtom">
		<h3 class="mb-4">Map:</h3>
		<div id="map" class="map"></div>
	</div>
</template>

<style lang="scss" scoped>
	.map {
		height: 400px;
	}
</style>
