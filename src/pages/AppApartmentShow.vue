<script>
import axios from "axios";
import { store } from "../store";
import AppMap from "../components/AppMap.vue";

export default {
  components: {
    AppMap,
  },

  data() {
    return {
      apartment: null,
      store,
    };
  },

  created() {
    axios
      .get(this.store.baseUrl + "api/apartments/" + this.$route.params.slug)
      .then((response) => (this.apartment = response.data.results));
  },
};
</script>

<template>
  <div class="container">
    <template v-if="apartment">
      <h1>{{ apartment.title }}</h1>
      <h5>
        <font-awesome-icon :icon="['fas', 'map-location-dot']" class="icon" />
        {{ apartment.street }}
      </h5>
      <div class="container-img">
        <img
          :src="this.store.baseUrl + 'storage/' + apartment.cover"
          alt="{{ apartment.title }}"
          class="cover"
        />
        <div
          v-for="image in apartment.images"
          :key="image.id"
          class="img-apartment"
        >
          <img :src="this.store.baseUrl + 'storage/' + image.img_url" alt="" />
        </div>
      </div>
      <h4>Descrizione</h4>
      <p>{{ apartment.description }}</p>
      <div class="container d-flex">
        <div class="content-left">
          <h3>Informazioni appartamento:</h3>
          <h4>Dimensioni: {{ apartment.size }} m<sup>2</sup></h4>
          <h4>Camere: {{ apartment.rooms }}</h4>
          <h4>Letti: {{ apartment.beds }}</h4>
          <h4 class="line">Bagni: {{ apartment.bathrooms }}</h4>
          <h4>Cosa troverai</h4>
          <ul class="list-unstyled">
            <li v-for="service in apartment.services" :key="service.id">
              <font-awesome-icon :icon="['fas', 'square-check']" />
              {{ service.name }}
            </li>
          </ul>
        </div>
        <div class="content-right">
          <AppMap />
          <h5>{{ apartment.street }}</h5>
        </div>
      </div>
    </template>

    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      data-bs-whatever="@fat"
    >
      Contatta per Info
    </button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Nuovo Messaggio
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Email</label>
                <input type="text" class="form-control" id="recipient-name" />
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label"
                  >Descrizione</label
                >
                <textarea class="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Send message</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  font-size: 1.7rem;
  padding-top: 1.5rem;
}
h5 {
  font-size: 1.1rem;
  padding-bottom: 1rem;
  .icon {
    font-size: 0.9rem;
  }
}
.container-img > * {
  width: calc((100% / 3) - 1rem);
}

.container-img {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 1.3rem;
  .cover {
    width: calc((100% / 3) - 1rem);
    border-top-left-radius: 20px;
  }
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
}

.img-apartment:nth-child(3) {
  img {
    border-top-right-radius: 20px;
  }
}

.img-apartment:nth-child(4) {
  img {
    border-bottom-left-radius: 20px;
  }
}

.img-apartment:nth-child(6) {
  img {
    border-bottom-right-radius: 20px;
  }
}

.content-left {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 45%;
}
p,
ul,
.line {
  border-bottom: 1px solid #dddddd;
  padding-bottom: 1rem;
}
.list-unstyled {
  display: flex;
  flex-wrap: wrap;
  li {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    width: 50%;
  }
}
h5 {
  padding-top: 1.5rem;
}
.modal {
  margin-top: 15em;
}
.content-right {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 50%;
  margin: auto;
  margin-top: -0.1rem;
}
button {
  margin-bottom: 1rem;
}
</style>
