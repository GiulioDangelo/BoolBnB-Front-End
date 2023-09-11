<script>
import { store } from "../store";
import axios from "axios";
import apartmentList from "../components/ApartmentList.vue";
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { ref } from 'vue'

export default {
  components: {
    apartmentList,
    Carousel,
    Slide,
    Navigation,
  },

  data() {
    return {
      arrApartments: [],
      store,
      currentIndex: 0,
    };
  },

  mounted() {
  axios
    .get(this.store.backendURL + "api/apartments/", {
      params: {
        active_sponsors: true // Aggiungi il parametro per filtrare gli appartamenti con uno sponsor attivo
      }
    })
    .then((response) => (this.arrApartments = response.data.results))
    .catch((error) => console.error(error));
  },

  setup() {
        const myCarousel = ref(null);

        return {
            myCarousel,
        }
    },

  methods: {

  },
};
</script>

<template>
  <div class="container">
    <h1>In evidenza</h1>


    <Carousel :items-to-show="2.5" :wrap-around="true" ref="myCarousel">
      <Slide v-for="apartment in arrApartments" :key="apartment.id">
          <img
                v-if="apartment.active_sponsors.length != 0"
                :src="this.store.backendURL + 'storage/' + apartment.cover"
                alt=""
                class="caurosel-img"
              />
      </Slide>
    </Carousel>

</div> 

  <div class="container">
    <h2 class="mt-5 py-5">I nostri appartmenti</h2>
    <apartmentList />
  </div>

  <div class="container">
    <h2 class="mt-5">Mete piu' richieste</h2>
    <div class="row mb-5">
      <div class="col-6 city-container">
        <img
          src="https://cf.bstatic.com/xdata/images/city/600x600/613105.jpg?k=1e85cf4dec7b0d5a6327be91c38cf9c1711f9da1a31c4cba736f9cb751443ff1&o="
          alt=""
          class="roma"
        />
      </div>
      <div class="col-6 city-container">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/napoli-1653914862.png"
          alt=""
          class="napoli"
        />
      </div>
      <div class="col-4 city-container">
        <img
          src="https://img.gruppomol.it/articoli/image/milano/1200x801_milano-mercato.jpg"
          alt=""
          class="milano"
        />
      </div>
      <div class="col-4 city-container">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/florence-royalty-free-image-1674549002.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
          alt=""
        />
      </div>
      <div class="col-4 city-container">
        <img
          src="https://www.berlino.com/wp-content/uploads/sites/13/berlino-panorama.jpg"
          alt=""
          class="berlino"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.carousel-inner {
  display: flex;
  height: 300px;
  border-radius: 30px;
}

.container-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: 80px;
  color: white;

  .btn {
    margin: auto;
  }
}

.caurosel-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

h5 {
  text-shadow: 0 2px 0 black;
}

.city-container {
  margin-top: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.roma {
  border-top-left-radius: 20px;
}

.napoli {
  border-top-right-radius: 20px;
}

.milano {
  border-bottom-left-radius: 20px;
}

.berlino {
  border-bottom-right-radius: 20px;
}
</style>
