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
      sponsoredApartments: [],
      store,
      currentIndex: 0,
    };
  },

  mounted() {
    axios
      .get(this.store.backendURL + "api/apartments/")
      .then((response) => {
        this.arrApartments = response.data.results;

        this.sponsoredApartments = this.arrApartments.filter(apartment => apartment.active_sponsors.length !== 0);

        console.log(this.sponsoredApartments);
      })
      .catch((error) => console.error(error));
  },

  setup() {
        const myCarousel = ref(null);

        return {
            myCarousel,
            breakpoints: {
              1: {
              itemsToShow: 1,
              snapAlign: 'center'
            },
            500: {
              itemsToShow: 2,
              snapAlign: 'center'
            },
            768: {
              itemsToShow: 2.5,
              snapAlign: 'center'
            },
            1400: {
              itemsToShow: 3,
              snapAlign: 'center'
            },
          },
        }
    },
};
</script>

<template>
  <div class="container">
    <h1 class="text-gradient">In evidenza</h1>


    <div class="carousel-btn d-flex justify-content-end">
      <a @click=myCarousel.prev class="prev mx-2 fs-3"><font-awesome-icon :icon="['fas', 'arrow-left']" /></a>
      <a @click=myCarousel.next class="next mx-2 fs-3"><font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
    </div>

    <Carousel :wrap-around="true" autoplay="3000"  ref="myCarousel"  :breakpoints="breakpoints" :pauseAutoplayOnHover="true">
      <Slide v-for="apartment in sponsoredApartments" :key="apartment.id">
        <div class="caurosel-items">
          <img
                :src="this.store.backendURL + 'storage/' + apartment.cover"
                alt=""
                class="caurosel-img"
              />
              <h4 class="p-2 text-gradient">{{ apartment.title }}</h4>
              <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug } }" class="styled-btn mt-auto my-2" style="text-decoration: none; padding-inline: 2em;">View more</router-link>
        </div>
      </Slide>
    </Carousel>

</div> 

  <div class="container">
    <h2 class="mt-5 py-5 text-gradient">I nostri appartmenti</h2>
    <apartmentList/>
  </div>

  <div class="container">
    <h2 class="mt-5 text-gradient">Mete piu' richieste</h2>
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
.caurosel-items{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-inline: 5px;
}

.caurosel-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
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
