<script>
import axios from "axios";
import { store } from "../store";

export default {
    data() {
        return {
            store,
            arrApartments: [],
        }
    },

    mounted() {
        axios.get(this.store.backendURL + "api/apartments").then(response => {
            this.arrApartments = response.data.results.filter(apartment => apartment.street.toLowerCase().includes("roma"));
        }).catch(error => {
            console.error('Request failed:', error);
        });;
    },
}
</script>

<template>
    <div v-for="apartment in arrApartments">
        <div>{{ apartment.name }}</div>
    </div>
</template>

<style scoped lang="scss"></style>