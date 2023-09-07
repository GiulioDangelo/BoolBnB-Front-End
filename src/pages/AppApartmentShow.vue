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
      email_sender: "",
      text_message: "",
      apartment_id: "",
      isSending: false, // Aggiunto
      showSuccess: false, // Aggiunto
      showError: false, // Aggiunto
      errors: [], // Aggiunto
    };
  },

  methods: {
    reloadPage() {
      window.location.reload();
    },
    sendMessage() {
      // Verifica se è già in corso un invio
      if (this.isSending) {
        return;
      }

      console.log('ciao');

      this.isSending = true;

      let data = {
        email_sender: this.email_sender,
        text_message: this.text_message,
        apartment_id: this.apartment_id,
      };

      axios
        .post(this.store.baseUrl + "api/messages/store", data)
        .then((response) => {
          this.isSending = false;

          if (response.data.success) {
            this.showSuccess = true;
            this.resetForm();
            this.reloadPage();
          } else {
            this.showError = true;
            this.errors = response.data.errors;
          }
        })
        .catch((error) => {
          this.isSending = false;
          console.error(error);
        });
    },
    
    // Ripulisci i campi del form dopo l'invio
    resetForm() {
      this.email_sender = "";
      this.text_message = "";
      this.apartment_id = "";
    },
  },

  created() {
    axios
      .get(this.store.baseUrl + "api/apartments/" + this.$route.params.slug)
      .then((response) => {
        this.apartment = response.data.results;
        this.apartment_id = this.apartment.id;
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div class="img-apartment">
          <img
          :src="this.store.baseUrl + 'storage/' + apartment.cover"
          alt="{{ apartment.title }}"
          class="cover"
        />
        </div>
        
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
      <div class="container d-flex justify-content-between line">
        <div class="content-left">
          <h3>Informazioni appartamento:</h3>
          <h4>Dimensioni: {{ apartment.size }} m<sup>2</sup></h4>
          <h4>Camere: {{ apartment.rooms }}</h4>
          <h4>Letti: {{ apartment.beds }}</h4>
          <h4 class="line me-2">Bagni: {{ apartment.bathrooms }}</h4>
          <h4>Cosa troverai</h4>
          <ul class="list-unstyled">
            <li v-for="service in apartment.services" :key="service.id">
              <font-awesome-icon :icon="['fas', 'square-check']" />
              {{ service.name }}
            </li>
          </ul>
        </div>
        <div class="content-right">
          <h4 class="mb-4">Dove ti troverai</h4>
          <AppMap />
          <h5 class="mt-1">{{ apartment.street }}</h5>
        </div>
      </div>
    </template>

    <button
      type="button"
      class="styled-btn mt-3"
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
            <form @submit.prevent="sendMessage()">
              <div class="mb-3">
                <label class="col-form-label" for="email_sender">Email</label>
                <input type="text" class="form-control" id="recipient-name"  v-model="email_sender"/>
              </div>
              <div class="mb-3">
                <label for="message-text" class="col-form-label"
                  >Descrizione</label
                >
                <textarea class="form-control" id="message-text" v-model="text_message" for="text_message" required></textarea>
              </div>
              <input type="hidden" name="apartment_id" for="apartment_id" v-model="apartment_id">
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
            <button type="submit" class="styled-btn" @click="sendMessage">Send message</button>
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
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}
.img-apartment{
  overflow: hidden;
  &:hover img{
    transform: scale(1.2);
    
    cursor: grab;
  }
}
.img-apartment:nth-child(1) {
    border-top-left-radius: 20px;
}
.img-apartment:nth-child(3) {
    border-top-right-radius: 20px;
}

.img-apartment:nth-child(4) {
    border-bottom-left-radius: 20px;
}

.img-apartment:nth-child(6) {
    border-bottom-right-radius: 20px;
}

.content-left {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 45%;
}
p,
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
  max-width: 55%;
}
button {
  margin-bottom: 1rem;
}
</style>
