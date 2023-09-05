<script>
import axios from "axios";
import { store } from "../store";
import ApartmentCard from "../components/ApartmentCard.vue";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";

export default {
    components: {
        ApartmentCard,
    },
    data() {
        return {
            store,
            search: "",
            arrSuggestions: [],
            latitude: null,
            longitude: null,
            distance: 20,
            apartmentDistance: [],
            size: 1,
            rooms: 1,
            beds: 1,
            bathrooms: 1,
            arrApartments: [],
            arrServices: [],
            selectedServices: [1],
            requiredServices: [1],
            urlAllCountries: "https://restcountries.com/v3.1/all",
            arrCountries: [],
            country: "",
            key: "bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R",
        }
    },
    methods: {
        getAllApartments() {
            axios.get(this.store.baseUrl + "api/apartments").then(response => {
                this.arrApartments = response.data.results;
            }).catch(error => {
                console.error('Request failed:', error);
            });;
        },
        getAllServices() {
            axios.get(this.store.baseUrl + "api/services").then(response => {
                this.arrServices = response.data.results;
            }).catch(error => {
                console.error('Request failed:', error);
            });;
        },
        getCountries() {
            axios.get(this.urlAllCountries)
                .then(response => {
                    const country = document.getElementById("country");
                    this.arrCountries = response.data;

                    this.arrCountries.sort((a, b) => {
                        const nameA = a.name.common.toLowerCase();
                        const nameB = b.name.common.toLowerCase();
                        if (nameA < nameB)
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0;
                    });

                    this.arrCountries.forEach(e => {
                        const option = document.createElement("option");
                        option.value = e.cca2;
                        option.text = `${e.name.common}`;
                        country.appendChild(option);
                    });

                    country.addEventListener('change', () => {
                        this.search = "";
                    });
                }).catch(error => {
                    console.error('Request failed:', error);
                });
        },
        clearSuggestions(list) {
            while (list.firstChild) {
                list.removeChild(list.firstChild);
            }
            this.arrSuggestions = [];
        },
        getFilteredApartments() {
            axios.get(this.store.baseUrl + "api/search", {
                params: {
                    latitude: this.latitude,
                    longitude: this.longitude,
                    distance: this.distance,
                    size: this.size,
                    rooms: this.rooms,
                    beds: this.beds,
                    bathrooms: this.bathrooms,
                    services: this.selectedServices,
                },
            }).then(response => {
                this.arrApartments = response.data.results;
            }).catch(error => {
                console.error('Request failed:', error);
            });;
        },
    },
    mounted() {
        this.map = null;

        axios
            .get(this.store.baseUrl + "api/apartments/")
            .then(response => {
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
    computed: {
        searchAutocomplete() {
            const streetList = document.getElementById('suggestions-street');
            const input = document.getElementById('search');

            input.addEventListener("input", () => {
                delete axios.defaults.headers.common['X-Requested-With'];

                if (this.search && this.country) {
                    axios.get("https://api.tomtom.com/search/2/search/" + this.search + '.json', {
                        params: {
                            typeahead: true,
                            countrySet: this.country,
                            language: "it-IT",
                            idxSet: "Str",
                            key: this.key,
                        }
                    }).then(data => {
                        const suggestions = data.data.results;

                        this.clearSuggestions(streetList);

                        streetList.style.display = 'flex';

                        suggestions.forEach(result => {
                            const li = document.createElement('li');
                            li.className = 'list-group-item';
                            li.style = 'cursor: pointer';
                            li.textContent = result.address.freeformAddress;

                            window.addEventListener('click', e => {
                                if (li.contains(e.target)) {
                                    this.search = li.textContent;
                                    this.saveCoordinate;
                                    this.clearSuggestions(streetList);
                                } else {
                                    streetList.style.display = 'none';
                                }
                            });

                            streetList.appendChild(li);
                            this.arrSuggestions.push(li);
                        });
                    }).catch(error => {
                        console.error('Request failed:', error);
                    });
                }
            });
        },
        saveCoordinate() {
            if (this.search.length > 1) {
                axios
                    .get("https://api.tomtom.com/search/2/structuredGeocode.json", {
                        params: {
                            language: "it-IT",
                            limit: 1,
                            countryCode: this.country,
                            streetName: this.search,
                            key: this.key
                        }
                    })
                    .then(response => {
                        const result = response.data.results[0];
                        if (result) {
                            // Scambia latitudine e longitudine
                            this.latitude = result.position.lon;
                            this.longitude = result.position.lat;
                        } else {
                            // Gestisci il caso in cui non ci siano risultati
                            this.latitude = null;
                            this.longitude = null;
                        }

                        // this.latitude = response.data.results[0].position.lat;
                        // this.longitude = response.data.results[0].position.lon;

                        console.log(this.latitude, this.longitude)
                    }).catch(error => {
                        console.error('Request failed:', error);
                    });
            }
        },
    },
    created() {
        this.getCountries();
        this.getAllServices();
        this.getAllApartments();
    }
};
</script>

<template>
    <form @submit.prevent="getFilteredApartments">
        <div class="container d-flex flex-column gap-4">
            <h1>Ricerca Avanzata</h1>

            <div class="row row-cols-1 row-cols-md-2">
                <div class="container">
                    <select id="country" class="form-select" name="country" v-model="country">
                        <option value="">Seleziona Nazione</option>
                    </select>
                    <div class="error"></div>
                </div>

                <div class="container position-relative">
                    <input class="form-control" type="search" id="search" placeholder="Inserisci una città o un indirizzo"
                        aria-label="Search" name="q" autocomplete="off" v-model.trim="search"
                        @input="searchAutocomplete, saveCoordinate" :disabled="!country" />
                    <ul id="suggestions-street" class="list-group list-group-flush position-absolute z-3"
                        style="top: calc(100% - 15px); left: 12px">
                    </ul>
                    <div class="error"></div>
                </div>
            </div>

            <div class="container">
                <input type="range" class="form-range" id="range" min="1" max="100" v-model.number="distance">
                <input type="number" class="" id="form-number" min="1" max="100" step="1" v-model.number="distance">
            </div>

            <div class="container">
                <div class="row row-cols-1 row-cols-md-4">
                    <div class="container">
                        <label lass="form-label" for="size">Metri Quadrati</label>
                        <input class="form-control" id="size" type="number" min="1" v-model.number="size"
                            placeholder="Numero Metri Quadrati">
                    </div>

                    <div class="container">
                        <label lass="form-label" for="rooms">Camere</label>
                        <input class="form-control" id="rooms" type="number" min="1" v-model.number="rooms"
                            placeholder="Numero Letti">
                    </div>

                    <div class="container">
                        <label lass="form-label" for="beds">Letti</label>
                        <input class="form-control" id="beds" type="number" min="1" v-model.number="beds"
                            placeholder="Numero Bagni">
                    </div>

                    <div class="container">
                        <label lass="form-label" for="bathrooms">Bagni</label>
                        <input class="form-control" id="bathrooms" type="number" min="1" v-model.number="bathrooms"
                            placeholder="Numero Letti">
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    <div v-for=" service  in    arrServices   " :key="service.id" class="form-check mb-2">
                        <input type="checkbox" class="form-check-input" :id="service.id" :value="service.id"
                            v-model="selectedServices" :disabled="requiredServices.includes(service.id)">
                        <label :for="service.id" class="form-check-label">{{ service.name }}</label>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="d-flex justify-content-center">
                    <button type="submit" class="styled-btn">Cerca Appartamenti</button>
                </div>
            </div>
        </div>
    </form>

    <div class="container">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="col-4" v-for="apartment in arrApartments" :key="apartment.id">
                <ApartmentCard :apartment="apartment" />
            </div>
        </div>
    </div>

    <div class="container">
        <div id="map" class="map mt-4 mb-1"></div>
    </div>
</template>

<style lang="scss" scoped>
.map {
    height: 400px;
}

.list-group {
    max-height: 200px;
    margin-bottom: 10px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}

.list-group-item:hover {
    text-decoration: underline;
    background-color: #f8f9fa !important;
}
</style>
