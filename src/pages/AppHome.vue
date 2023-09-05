<script>
import { store } from "../store";
import axios from "axios";

	export default {
        components: {
        },

		data() {
			return {
				arrApartments: [],
                store,
			};
		},

		mounted() {
			axios
				.get(this.store.baseUrl + "api/apartments/")
				.then((response) => (this.arrApartments = response.data.results))
				.catch((error) => {
					console.error(error);
				});

                
            },
            
        };
</script>

<template>
    <div class="container">
      <h1>In evidenza</h1>
  
      <div id="carouselExampleCaptions" class="carousel slide">
        <!-- Carousel Indicators -->
        <div class="carousel-indicators">
          <button
            v-for="(apartment, index) in arrApartments.slice(0, 3)"
            :key="index"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            :data-bs-slide-to="index"
            :class="{ active: index === 0 }"
            aria-current="index === 0"
          ></button>
        </div>
  
        <!-- Carousel Items -->
        <div class="carousel-inner">
          <div
            v-for="(apartment, index) in arrApartments.slice(0, 3)"
            :key="index"
            :class="['carousel-item', { active: index === 0 }]"
          >
            <img :src="this.store.baseUrl + 'storage/' + arrApartments[index + 1].cover" alt="" class="caurosel-img">
            <div class="carousel-caption d-none d-md-block">
              <h5>{{ arrApartments[index + 1].title }}</h5>
              <router-link :to="{ name: 'apartments.show', params: { slug: arrApartments[index + 1].slug } }" class="btn btn-primary mt-auto my-2">View more</router-link>
            </div>
          </div>
        </div>
  
        <!-- Carousel Controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>


      <h2 class="mt-5">Mete piu' richieste</h2>
      <div class="row mb-5">
        <div class="col-6 city-container"><img src="https://cf.bstatic.com/xdata/images/city/600x600/613105.jpg?k=1e85cf4dec7b0d5a6327be91c38cf9c1711f9da1a31c4cba736f9cb751443ff1&o=" alt="" class="roma"></div>
        <div class="col-6 city-container"><img src="https://hips.hearstapps.com/hmg-prod/images/napoli-1653914862.png" alt="" class="napoli"></div>
        <div class="col-4 city-container"><img src="https://img.gruppomol.it/articoli/image/milano/1200x801_milano-mercato.jpg" alt="" class="milano"></div>
        <div class="col-4 city-container"><img src="https://hips.hearstapps.com/hmg-prod/images/florence-royalty-free-image-1674549002.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*" alt=""></div>
        <div class="col-4 city-container"><img src="https://www.berlino.com/wp-content/uploads/sites/13/berlino-panorama.jpg" alt="" class="berlino"></div>
      </div>
    </div>
  </template>
  

<style lang="scss" scoped>
.carousel-inner{
    border-radius: 30px;
}

.caurosel-img{
    width: 100%;
    height: 600px;
    object-fit: cover;
}

h5{
    text-shadow: 0 2px 0 black;
}

.city-container{
    margin-top: 10px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.roma{
    border-top-left-radius: 20px;
}

.napoli{
    border-top-right-radius: 20px;
}

.milano{
    border-bottom-left-radius: 20px;
}

.berlino{
    border-bottom-right-radius: 20px;
}
</style>
