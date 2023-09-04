
<template>
  <div class="container">
    <h1>Invia un messaggio</h1>
    <form @submit.prevent="sendMessage">
      <div class="mb-3">

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
        <label  class="form-label">Descrizione</label>
        <textarea
          class="form-control"
          id="descrizione"
          
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Invia</button>
    </form>
  </div>
</template>

