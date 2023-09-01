<template>
  <div class="container">
    <h1>Invia un messaggio</h1>
    <form @submit.prevent="inviaMessaggio">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="descrizione" class="form-label">Descrizione</label>
        <textarea
          class="form-control"
          id="descrizione"
          v-model="descrizione"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Invia</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      descrizione: "",
    };
  },
  methods: {
    inviaMessaggio() {
      // Qui puoi implementare la logica per inviare il messaggio, ad esempio tramite una chiamata API
      const messaggio = {
        email: this.email,
        descrizione: this.descrizione,
      };
      console.log(messaggio);

      // Ripulisci i campi del form dopo l'invio
      this.email = "";
      this.descrizione = "";
    },
  },
};
</script>
