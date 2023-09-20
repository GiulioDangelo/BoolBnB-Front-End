<script>
import { store } from "../store";
import axios from "axios";
import ApartmentList from "../components/ApartmentList.vue"
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { ref } from 'vue'
import Loader from "./Loader.vue";
export default {
  components: {
    ApartmentList,
    Carousel,
    Slide,
    Loader,
  },

  data() {
    return {
      arrApartments: [],
      sponsoredApartments: [],
      store,
      currentIndex: 0,
      loading: false,
    };
  },


  methods: {
    fetchData() {
      this.loading = true;

      axios
        .get(this.store.backendURL + "api/apartments/")
        .then((response) => {
          this.arrApartments = response.data.results;
          this.sponsoredApartments = this.arrApartments.filter(apartment => apartment.active_sponsors.length !== 0);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          this.loading = false;
        })
    },
  },

  mounted() {
    this.fetchData();
  },

  setup() {
    const myCarousel = ref(null);

    return {
      myCarousel,
      breakpoints: {
        100: {
          itemsToShow: 1,
        },
        500: {
          itemsToShow: 2,
        },
        768: {
          itemsToShow: 2.5,
        },
        1400: {
          itemsToShow: 3,
        },
      },
    }
  },
};
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <router-view>
      <div class="container">
        <h1 class="text-gradient">In evidenza</h1>

        <div class="carousel-btn d-flex justify-content-end">
          <a @click=myCarousel.prev class="prev mx-2 fs-3"><font-awesome-icon :icon="['fas', 'arrow-left']" /></a>
          <a @click=myCarousel.next class="next mx-2 fs-3"><font-awesome-icon :icon="['fas', 'arrow-right']" /></a>
        </div>

        <Carousel :wrap-around="true" :autoplay=3000 ref="myCarousel" :breakpoints="breakpoints"
          :pauseAutoplayOnHover="true">
          <Slide v-for="apartment in sponsoredApartments" :key="apartment.id">
            <div class="caurosel-items">
              <img :src="this.store.backendURL + 'storage/' + apartment.cover" alt="" class="caurosel-img" />
              <h4 class="p-2 text-gradient">{{ apartment.title }}</h4>
              <router-link :to="{ name: 'apartments.show', params: { slug: apartment.slug } }"
                class="styled-btn mt-auto my-2" style="text-decoration: none; padding-inline: 2em;">Guarda</router-link>
            </div>
          </Slide>
        </Carousel>

      </div>

      <div class="container">
        <h2 class="mt-5 py-5 text-gradient">I nostri appartmenti</h2>
        <ApartmentList />
      </div>

      <div class="container">
        <h2 class="mt-5 text-gradient">Mete più richieste</h2>
        <div class="row mb-5">
          <div class="col-6 city-container">
            <img src="../assets/img/cities/roma.jpg" alt="roma" class="roma" />
          </div>
          <div class="col-6 city-container">
            <img src="../assets/img/cities/napoli.jpg" alt="napoli" class="napoli" />
          </div>
          <div class="col-4 city-container">
            <img src="../assets/img/cities/milano.jpg" alt="milano" class="milano" />
          </div>
          <div class="col-4 city-container">
            <img src="../assets/img/cities/firenze.jpg" alt="firenze" class="firenze" />
          </div>
          <div class="col-4 city-container">
            <img src="../assets/img/cities/berlino.jpg" alt="berlino" class="berlino" />
          </div>
        </div>
      </div>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.caurosel-items {
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
