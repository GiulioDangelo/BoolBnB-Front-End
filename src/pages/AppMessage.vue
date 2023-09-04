<template>
  <div class="container">
    <h1>Invia un messaggio</h1>
    <form @submit.prevent="sendMessage">
      <div class="mb-3">
        <label for="email_sender" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email_sender"
          required
        />
      </div>
      <div class="mb-3">
        <label for="apartment_id" class="id">ID apartment</label>
        <input
          type="number"
          class="form-control"
          id="id"
          v-model="apartment_id"
          required
        />
      </div>
      <div class="mb-3">
        <label for="text_message" class="form-label">Descrizione</label>
        <textarea
          class="form-control"
          id="descrizione"
          v-model="text_message"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Invia</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
  data() {
    return {
        store,
        email_sender: "",
        text_message: "",
        apartment_id: "",
        
    };
  },
  methods: {
    sendMessage() {
      // Qui puoi implementare la logica per inviare il messaggio, ad esempio tramite una chiamata API
      console.log(data);
      axios
      .post(this.store.baseUrl + "api/messages", {
          email_sender: this.email_sender,
          text_message: this.text_message,
          apartment_id: this.this.apartment_id,
        })
        .then((response) => {
          this.isSending = false;

          if (response.data.success) {
            this.showSuccess = true;
            this.resetForm();
          } else {
            this.showError = true;
            this.errors = response.data.errors;
          }
        });
      },
      // Ripulisci i campi del form dopo l'invio
      resetForm(){
        this.email_sender = "";
        this.text_message = "";
        this.apartment_id = "";

      }
    
  },
};
</script>
