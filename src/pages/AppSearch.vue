<script>
import { store } from "../store";
import axios from "axios";
import ApartmentCard from "../components/ApartmentCard.vue";

export default {
    components: {
        ApartmentCard,
    },
    data() {
        return {
            store,
            search: "",
            latitude: null,
            longitude: null,
            distance: 20,
            apartmentsDistance: [],
            beds: null,
            rooms: null,
            bathrooms: null,
            arrApartments: [],
            arrServices: [],
            selectedServices: [],
            key: 'bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R',
        }
    },
    methods: {
        getApartments() {
            axios.get(this.store.baseUrl + "api/apartments", {
                params: {
                    beds: this.beds,
                    rooms: this.rooms,
                    bathrooms: this.bathrooms,
                    services: this.selectedServices,
                },
            }).then(response => {
                this.arrApartments = response.data.results;

                if (this.latitude !== null || this.longitude !== null) {

                    const closestApartments = [];

                    this.arrApartments.forEach(apartment => {

                        const R = 6371; // raggio della Terra in km
                        const lat1 = this.latitude; //latitudine ricerca
                        const lon1 = this.longitude; //longitudine ricerca
                        const lat2 = apartment.latitude; //latitudine appartamento
                        const lon2 = apartment.longitude; // longitudine appartamento

                        const dLat = ((lat2 - lat1) * Math.PI) / 180;
                        const dLon = ((lon2 - lon1) * Math.PI) / 180;
                        const a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos((lat1 * Math.PI) / 180) *
                            Math.cos((lat2 * Math.PI) / 180) *
                            Math.sin(dLon / 2) *
                            Math.sin(dLon / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        const distance = R * c; // distanza in km
                        apartment.distance = distance.toFixed(1);

                        if (apartment.distance <= this.distance) {
                            closestApartments.push(apartment);
                        }
                    });

                    this.apartmentsDistance = closestApartments;
                }
            });
        },
        getAllServices() {
            axios.get(this.store.baseUrl + "api/services").then(response => {
                this.arrServices = response.data.results;
            });
        },
    },
    computed: {
        saveCoordinate() {
            axios
                .get(this.store.apiUrl + this.address + '.json', {
                    params: {
                        key: this.key
                    }
                })
                .then(response => {
                    this.latitude = response.data.results[0].position.lat;
                    this.longitude = response.data.results[0].position.lon;
                })
        },

        searchAutocomplete() {
            const streetList = document.getElementById('suggestions-street');
            const input = document.getElementById('search');

            input.addEventListener("input", () => {
                const userInput = document.getElementById('search').value;

                delete axios.defaults.headers.common['X-Requested-With'];

                axios.get(this.store.apiUrl + userInput + '.json', {
                    params: {
                        typeahead: true,
                        countrySet: 'IT',
                        language: "it-IT",
                        idxSet: "Str",
                        key: this.key,
                    }
                }).then(response => {
                    const results = response.data.results;

                    // Svuota il container della lista
                    streetList.innerHTML = '';

                    // Creo i nuovi elementi della lista
                    for (let i = 0; i < results.length; i++) {

                        const resultList = results[i].address.freeformAddress;
                        const li = document.createElement('li');
                        li.innerHTML = resultList;
                        li.classList.add('list-group-item');
                        li.classList.add('list-group-item-action');
                        li.style = 'cursor: pointer';

                        li.addEventListener('click', () => {
                            input.value = resultList;
                            streetList.innerHTML = '';
                        });
                        streetList.appendChild(li);
                    }

                }).catch(error => {
                    console.error('Request failed:', error);
                });
            });
        },
    },
    created() {
        this.getAllServices();
        this.getApartments();
    }
};
</script>

<template>
    <form @submit.prevent="getApartments">
        <div class="container">
            <h1>Ricerca Avanzata</h1>
            <input class="form-control" type="search" id="search" placeholder="Inserisci una città o un indirizzo"
                aria-label="Search" name="q" autocomplete="off" v-model="search" />
            <ul id="suggestions-street" class="list-group list-group-flush position-absolute z-3"
                style="top: calc(100% - 15px); left: 12px">
            </ul>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                <div v-for=" service  in  arrServices " :key="service.id" class="form-check">
                    <input type="checkbox" class="form-check-input" :id="service.id" :value="service.id"
                        v-model="selectedServices">
                    <label :for="service.id" class="form-check-label">{{ service.name }}</label>
                </div>
            </div>
            <button class="btn btn-primary" type="submit">Cerca</button>
        </div>
    </form>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-5">
        <div class="col" v-for="apartment in arrApartments" :key="apartment.id">
            <ApartmentCard :apartment="apartment" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
