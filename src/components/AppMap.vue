<script>
import axios from "axios";
import { store } from "../store";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";

export default {
  data() {
    return {
      apartment: null,
      store,
    };
  },

  mounted() {
    this.map = null;

    axios
      .get(this.store.backendURL + "api/apartments/" + this.$route.params.slug)
      .then(response => {
        this.apartment = response.data.results;

        if (this.apartment.latitude && this.apartment.longitude) {
          const latitude = parseFloat(this.apartment.latitude);
          const longitude = parseFloat(this.apartment.longitude);
          let center = [latitude, longitude];

          this.map = tt.map({
            key: "bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R",
            container: "map",
            center: center,
            zoom: 10,
          });

          this.map.on("load", () => {
            let marker = new tt.Marker().setLngLat(center).addTo(this.map);
          });
        } else {
          console.error(
            "I dati dell'appartamento non contengono latitudine e/o longitudine valide."
          );
        }
      })
      .catch(error => console.error(error));
  },
};
</script>

<template>
  <div class="tomtom">
    <div id="map" class="map"></div>
  </div>
</template>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 100%;
  border-radius: 8px;
}

.tomtom {
  height: 400px;
}

@media screen and (max-width:766px) {
  .map {
    height: 400px;
    width: 100%;
  }
}
</style>
