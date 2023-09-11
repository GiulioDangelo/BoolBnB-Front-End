<script>
import axios from "axios";
import { store } from "../store";
import AppMap from "../components/AppMap.vue";
import Loader from "./Loader.vue";

export default {
  components: {
    AppMap,
	Loader,
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
	  loading: false,
    };
  },

  methods: {
    // validate & send form
    sendMessage(event) {
      if (!this.validateForm()) {
        event.preventDefault();
      } else {
        // Verifica se è già in corso un invio
        if (this.isSending) {
          return;
        }

        this.isSending = true;

        let data = {
          email_sender: this.email_sender,
          text_message: this.text_message,
          apartment_id: this.apartment_id,
        };

        axios
          .post(this.store.backendURL + "api/messages/store", data)
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
      }
    },

    // Reload the page
    reloadPage() {
      window.location.reload();
    },

    // clear form data after submit
    resetForm() {
      this.email_sender = "";
      this.text_message = "";
      this.apartment_id = "";
    },

    // Validate all form when click
    validateForm() {
      let isValid = true;

      const email = this.$refs.email;
      const message = this.$refs.message;

      if (this.email_sender.trim() === "") {
        this.setError(email, "Email richiesta");
        isValid = false;
      } else if (this.email_sender.trim().length < 5) {
        this.setError(email, "Minino 5 caratteri");
        isValid = false;
      } else if (this.email_sender.trim().length > 255) {
        this.setError(email, "Massimo 255 caratteri");
        isValid = false;
      } else if (!this.validateEmail(this.email_sender.trim())) {
        this.setError(email, "Email non valida");
        isValid = false;
      } else {
        this.setSuccess(email);
      }

      if (this.text_message.trim() === "") {
        this.setError(message, "Messaggio richiesto");
        isValid = false;
      } else if (this.text_message.trim().length < 5) {
        this.setError(message, `Minimo 5 caratteri`);
        isValid = false;
      } else {
        this.setSuccess(message);
      }

      return isValid;
    },

    // Validate form on input
    validate(event) {
      const element = event.target;

      switch (element.type) {
        case "email":
          if (this.email_sender.trim() === "") {
            this.setError(element, "Email richiesta");
          } else if (this.email_sender.trim().length < 5) {
            this.setError(element, "Minino 5 caratteri");
          } else if (this.email_sender.trim().length > 255) {
            this.setError(element, "Massimo 255 caratteri");
          } else if (!this.validateEmail(this.email_sender.trim())) {
            this.setError(element, "Email non valida");
          } else {
            this.setSuccess(element);
          }
          break;

        case "textarea":
          if (this.text_message.trim() === "") {
            this.setError(element, "Messaggio richiesto");
          } else if (this.text_message.trim().length < 5) {
            this.setError(element, `Minimo 5 caratteri`);
          } else {
            this.setSuccess(element);
          }
          break;
      }
    },

    // Validate email
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },

    // Set error style
    setError(element, message) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = message;
      inputControl.classList.add("error");
      inputControl.classList.remove("success");
    },

    // Set success style
    setSuccess(element) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = "";
      inputControl.classList.add("success");
      inputControl.classList.remove("error");
    },

    // Prevent submit when click enter
    preventFormSubmitOnEnter(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
  },

  created() {
	this.loading = true;
    axios
      .get(this.store.backendURL + "api/apartments/" + this.$route.params.slug)
      .then((response) => {
        this.apartment = response.data.results;
        this.apartment_id = this.apartment.id;
		this.loading = false;
      })
      .catch((error) => console.log(error));
  },
};
</script>

<template>
	<Loader v-if="loading" />
  <div class="container">
    <template v-if="apartment">
      <h1 class="text-gradient" style="margin-top: -2em; font-size: 40px;">{{ apartment.title }}</h1>
      <h5>
        <font-awesome-icon :icon="['fas', 'map-location-dot']" class="icon" />
        {{ apartment.street }}
      </h5>

      <div class="container container-img px-0">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
          <div class="img-apartment">
            <div class="overflow-hidden">
              <img :src="this.store.backendURL + 'storage/' + apartment.cover" :alt="apartment.title + 'copertina'"
                class="cover" />
            </div>
          </div>

          <div class="img-apartment" v-for="image, i in apartment.images" :key="image.id"
            :alt="apartment.title + 'immagine' + i">
            <div class="overflow-hidden">
              <img :src="this.store.backendURL + 'storage/' + image.img_url" alt="" />
            </div>
          </div>
        </div>
      </div>

      <h4>Descrizione</h4>
      <p>{{ apartment.description }}</p>
      <div class="row d-flex justify-content-between line info-container">
        <div class="content-left col">
          <h3>Informazioni appartamento:</h3>
          <h4>Dimensioni: {{ apartment.size }} m<sup>2</sup></h4>
          <h4>Camere: {{ apartment.rooms }}</h4>
          <h4>Letti: {{ apartment.beds }}</h4>
          <h4 class="line me-2">Bagni: {{ apartment.bathrooms }}</h4>
          <h4>Cosa troverai</h4>
          <ul class="list-unstyled">
            <li v-for="service in apartment.services" :key="service.id">
              <font-awesome-icon class="me-2" :icon="service.icon" />
              {{ service.name }}
            </li>
          </ul>
        </div>
        <div class="content-right col">
          <h4 class="mb-4">Dove ti troverai</h4>
          <AppMap />
          <h5 class="mt-1">{{ apartment.street }}</h5>
        </div>
      </div>
    </template>

    <button type="button" class="styled-btn mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal"
      data-bs-whatever="@fat">
      Contatta per Info
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 v-if="!showSuccess" class="modal-title fs-5" id="exampleModalLabel">
              Nuovo Messaggio
            </h1>
            <h1 v-if="showSuccess" class="m-0">Messaggio Inviato</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="!showSuccess" class="modal-body">
            <form @submit.prevent="sendMessage()">
              <div class="input_container">
                <label class="input_label text-gradient" for="email_sender">Email</label>
                <font-awesome-icon :icon="['fas', 'envelope']" class="icon" />
                <input type="email" class="input_field" id="email_sender" v-model="email_sender" ref="email"
                  @input="validate" @keydown.enter.prevent="preventFormSubmitOnEnter" autocomplete="email" />
                <div class="error"></div>
              </div>
              <div class="input_container">
                <label for="text_message" class="input_label text-gradient">Descrizione</label>
                <textarea class="form-control" id="text_message" rows="3" v-model="text_message" ref="message"
                  @input="validate" @keydown.enter.prevent="preventFormSubmitOnEnter" for="text_message"></textarea>
                <div class="error"></div>
              </div>
              <input type="hidden" name="apartment_id" for="apartment_id" v-model="apartment_id" />
            </form>
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Chiudi
            </button>
            <button v-if="!showSuccess" type="submit" class="styled-btn" @click="sendMessage">
              Invia
            </button>
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

.container-img {
  border-radius: 11px;
  overflow: hidden;
  margin-bottom: 1.3rem;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    object-position: center;
    transition: 1s all cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}

.img-apartment {
  cursor: pointer;

  &:hover img {
    transform: scale(1.2);
  }
}

.content-left {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
}

button {
  margin-bottom: 1rem;
}

@media screen and (max-width: 767px) {
  .info-container {
    display: flex !important;
    flex-direction: column;
  }
}
</style>
