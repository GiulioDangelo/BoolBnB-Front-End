<script>
	import axios from "axios";
	import {store} from "../store";
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
            .get(this.store.baseUrl + "api/apartments/" + this.$route.params.slug)
            .then((response) => {
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

                    this.map.on('load',() =>{
                        let marker = new tt.Marker().setLngLat(center).addTo(this.map);
                    })
                } else {
                    console.error(
                        "I dati dell'appartamento non contengono latitudine e/o longitudine valide."
                    );
                }
            })
            .catch((error) => {
                console.error(error);
            });
    },
};

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
