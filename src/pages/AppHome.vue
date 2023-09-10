<script>
import { store } from "../store";
import axios from "axios";

export default {
  components: {},

  data() {
    return {
      arrApartments: [],
      store,
      currentIndex: 0,
    };
  },

  mounted() {
    axios
      .get(this.store.backendURL + "api/apartments/")
      .then(response => this.arrApartments = response.data.results)
      .catch(error => console.error(error));
  },
  methods: {
    handleCarouselNavigation(direction) {
      if (direction === "previous") {
        // Decrementa l'indice corrente delle immagini
        this.currentIndex--;

        // Gestisci il caso in cui l'utente si trovi alla prima immagine
        if (this.currentIndex < 0) {
          this.currentIndex = this.arrApartments.length - 3;
        }
      } else if (direction === "next") {
        // Incrementa l'indice corrente delle immagini
        this.currentIndex++;

        // Gestisci il caso in cui l'utente si trovi all'ultima immagine
        if (this.currentIndex > this.arrApartments.length - 3) {
          this.currentIndex = 0;
        }
      }
    },
  },
};
</script>

<template>
  <!-- <section v-for="(apartment, index) in arrApartments.slice(
            currentIndex,
            currentIndex + 3
          )" :key="index">
          <div v-if="apartment.active_sponsors.length!=0">

            {{ apartment.title }}
          </div>

        </section> -->

  <div class="container">
    <h1>In evidenza</h1>
    <!-- <div v-for="apartment in arrApartments" :key="apartment.id">
    <div v-if="apartment.active_sponsors.length!=0">
          
          </div>
          </div> -->


    <div id="carouselExampleCaptions" class="carousel slide">
      <!-- Carousel Items -->
      <div class="carousel-inner">

        <div v-for="apartment in arrApartments" :key="apartment.id">
          <div v-if="apartment.active_sponsors.length != 0">


            <img :src="this.store.backendURL + 'storage/' + apartment.cover" alt="" class="caurosel-img" />
            <div class="container-btn">
              <h5>{{ apartment.title }}</h5>
              <router-link :to="{
                name: 'apartments.show',
                params: { slug: apartment.slug },
              }" class="btn btn-primary mt-auto my-2">View more</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>


    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev"
      @click="handleCarouselNavigation('previous')">
      <span class="carousel-control-prev-icon prev" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next"
      @click="handleCarouselNavigation('next')">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container">
    <h2 class="mt-5">Mete piu' richieste</h2>
    <div class="row mb-5">
      <div class="col-6 city-container">
        <img
          src="https://cf.bstatic.com/xdata/images/city/600x600/613105.jpg?k=1e85cf4dec7b0d5a6327be91c38cf9c1711f9da1a31c4cba736f9cb751443ff1&o="
          alt="" class="roma" />
      </div>
      <div class="col-6 city-container">
        <img src="https://hips.hearstapps.com/hmg-prod/images/napoli-1653914862.png" alt="" class="napoli" />
      </div>
      <div class="col-4 city-container">
        <img src="https://img.gruppomol.it/articoli/image/milano/1200x801_milano-mercato.jpg" alt="" class="milano" />
      </div>
      <div class="col-4 city-container">
        <img
          src="https://hips.hearstapps.com/hmg-prod/images/florence-royalty-free-image-1674549002.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*"
          alt="" />
      </div>
      <div class="col-4 city-container">
        <img src="https://www.berlino.com/wp-content/uploads/sites/13/berlino-panorama.jpg" alt="" class="berlino" />
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
