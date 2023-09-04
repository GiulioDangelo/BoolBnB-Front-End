<script>
import axios from "axios";
import ApartmentCard from "./ApartmentCard.vue";
import { store } from "../store";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";

export default {
	components: {
		ApartmentCard,
	},

	data() {
		return {
			store,
			arrApartments: [],
		};
	},

	mounted() {
		this.map = null;

		axios
			.get(this.store.baseUrl + "api/apartments/")
			.then((response) => {
				// this.apartment = response.data.results;
				this.arrApartments = response.data.results;

				if (this.arrApartments && this.arrApartments.length > 0) {
					this.map = tt.map({
						key: "bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R",
						container: "map",
						center: [12.5113300, 41.535158],
						zoom: 3,
					});

					this.arrApartments.forEach((apartment) => {
						if (apartment.latitude && apartment.longitude) {
							this.map.on("load", () => {
								let latitude = parseFloat(apartment.latitude);
								let longitude = parseFloat(apartment.longitude);
								let center = [latitude, longitude];
								let marker = new tt.Marker()
									.setLngLat(center)
									.addTo(this.map);
							});
						}
					});
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
	<div class="container">
		<div class="row d-flex justify-content-center align-items-center">
			<div class="col-4" v-for="apartment in arrApartments" :key="apartment.id">
				<ApartmentCard :apartment="apartment" />
			</div>
		</div>

		<div id="map" class="map mt-4 mb-1"></div>
	</div>
</template>

<style lang="scss" scoped>
.map {
	height: 400px;
}
</style>
