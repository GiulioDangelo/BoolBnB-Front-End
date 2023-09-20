<script>
import axios from "axios";
import { store } from "../store";
import ApartmentCard from "../components/ApartmentCard.vue";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps";
import Loader from "./Loader.vue";

export default {
  components: {
    ApartmentCard,
    Loader,
  },
  data() {
    return {
      store,
      address: "",
      arrSuggestions: [],
      latitude: null,
      longitude: null,
      distance: 20,
      apartmentDistance: [],
      size: 1,
      rooms: 1,
      beds: 1,
      bathrooms: 1,
      arrApartments: [],
      arrServices: [],
      selectedServices: [1, 8],
      requiredServices: [1, 8],
      urlAllCountries: "https://restcountries.com/v3.1/all",
      arrCountries: [],
      country: "",
      key: "bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R",
      loading: false,
    };
  },
  methods: {
    getAllApartments() {
      (this.loading = true),
        axios
          .get(this.store.backendURL + "api/apartments")
          .then((response) => {
            this.arrApartments = response.data.results;
          })
          .catch((error) => {
            console.error("Request failed:", error);
          })
          .finally(() => (this.loading = false));
    },
    getAllServices() {
      (this.loading = true),
        axios
          .get(this.store.backendURL + "api/services")
          .then((response) => {
            this.arrServices = response.data.results;
          })
          .catch((error) => {
            console.error("Request failed:", error);
          })
          .finally(() => (this.loading = false));
    },
    getCountries() {
      (this.loading = true),
        axios
          .get(this.urlAllCountries)
          .then((response) => {
            const country = document.getElementById("country");
            this.arrCountries = response.data;

            this.arrCountries.sort((a, b) => {
              const nameA = a.name.common.toLowerCase();
              const nameB = b.name.common.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });

            this.arrCountries.forEach((e) => {
              const option = document.createElement("option");
              option.value = e.cca2;
              option.text = `${e.name.common}`;
              country.appendChild(option);
            });

            country.addEventListener("change", () => {
              this.address = "";
              this.latitude = null;
              this.longitude = null;

              if (this.country === "") {
                this.setSuccess(this.$refs.address);
              } else {
                this.setError(this.$refs.address, "Campo richiesto");
              }
            });
          })
          .catch((error) => {
            console.error("Request failed:", error);
          })
          .finally(() => (this.loading = false));
    },
    clearSuggestions(list) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      this.arrSuggestions = [];
    },
    getFilteredApartments(event) {
      this.loading = true;
      if (!this.validateForm()) {
        event.preventDefault();
      } else {
        axios
          .get(this.store.backendURL + "api/search", {
            params: {
              latitude: this.latitude,
              longitude: this.longitude,
              distance: this.distance,
              size: this.size,
              rooms: this.rooms,
              beds: this.beds,
              bathrooms: this.bathrooms,
              services: this.selectedServices,
            },
          })
          .then((response) => {
            this.arrApartments = response.data.results;
          })
          .catch((error) => {
            console.error("Request failed:", error);
          })
          .finally(() => (this.loading = false));
      }
    },
    fetchData() {
      this.map = null;
      this.loading = true;
      axios
        .get(this.store.backendURL + "api/apartments/")
        .then((response) => {
          // this.apartment = response.data.results;
          this.arrApartments = response.data.results;

          if (this.arrApartments && this.arrApartments.length > 0) {
            this.map = tt.map({
              key: "bpAesa0y51fDXlgxGcnRbLEN2X5ghu3R",
              container: "map",
              center: [12.51133, 41.535158],
              zoom: 3,
            });

            this.arrApartments.forEach((apartment) => {
              if (apartment.latitude && apartment.longitude) {
                this.map.on("load", () => {
                  let latitude = parseFloat(apartment.latitude);
                  let longitude = parseFloat(apartment.longitude);
                  let center = [latitude, longitude];
                  let marker = new tt.Marker()
                    .setLngLat(center)
                    .addTo(this.map);
                });
              }
            });
          } else {
            console.error(
              "I dati dell'appartamento non contengono latitudine e/o longitudine valide."
            );
          }
        })
        .catch((error) => console.error(error))
        .finally(() => (this.loading = false));
    },
    validateForm() {
      let isValid = true;

      const country = this.$refs.country;
      const address = this.$refs.address;
      const distance = this.$refs.distance;

      const size = this.$refs.size;
      const rooms = this.$refs.rooms;
      const beds = this.$refs.beds;
      const bathrooms = this.$refs.bathrooms;

      // Country
      this.setSuccess(country);

      // Address
      if (this.country === "") {
        this.setSuccess(address);
      } else {
        if (this.address.length < 2) {
          this.setError(address, "Minino 2 caratteri");
          isValid = false;
        } else if (this.address.length > 255) {
          this.setError(address, "Massimo 255 caratteri");
          isValid = false;
        } else {
          this.setSuccess(address);
        }
      }

      // Distance
      if (this.distance === "") {
        this.setError(distance, "Numero richiesto");
        isValid = false;
      } else if (this.distance < 1) {
        this.setError(distance, "Minino 1");
        isValid = false;
      } else if (this.distance > 100) {
        this.setError(distance, "Massimo 100");
        isValid = false;
      } else {
        this.setSuccess(distance);
      }

      // Size
      if (this.size === "") {
        this.setError(size, "Numero richiesto");
        isValid = false;
      } else if (this.size < 1) {
        this.setError(size, "Minino 1");
        isValid = false;
      } else if (this.size > 9999) {
        this.setError(size, "Massimo 9999");
        isValid = false;
      } else {
        this.setSuccess(size);
      }

      // Rooms
      if (this.rooms === "") {
        this.setError(rooms, "Numero richiesto");
        isValid = false;
      } else if (this.rooms < 1) {
        this.setError(rooms, "Minino 1");
        isValid = false;
      } else if (this.rooms > 99) {
        this.setError(rooms, "Massimo 99");
        isValid = false;
      } else {
        this.setSuccess(rooms);
      }

      // Beds
      if (this.beds === "") {
        this.setError(beds, "Numero richiesto");
        isValid = false;
      } else if (this.beds < 1) {
        this.setError(beds, "Minino 1");
        isValid = false;
      } else if (this.beds > 99) {
        this.setError(beds, "Massimo 99");
        isValid = false;
      } else {
        this.setSuccess(beds);
      }

      // Bathrooms
      if (this.bathrooms === "") {
        this.setError(bathrooms, "Numero richiesto");
        isValid = false;
      } else if (this.bathrooms < 1) {
        this.setError(bathrooms, "Minino 1");
        isValid = false;
      } else if (this.bathrooms > 99) {
        this.setError(bathrooms, "Massimo 99");
        isValid = false;
      } else {
        this.setSuccess(bathrooms);
      }

      return isValid;
    },
    validate(event) {
      const element = event.target;

      switch (element.id) {
        case "country":
          this.setSuccess(element);
          break;

        case "address":
          if (this.address.length < 2) {
            this.setError(element, "Minino 2 caratteri");
          } else if (this.address.length > 255) {
            this.setError(element, "Massimo 255 caratteri");
          } else {
            this.setSuccess(element);
          }
          break;

        case "distance":
          if (this.distance === "") {
            this.setError(element, "Numero richiesto");
          } else if (this.distance < 1) {
            this.setError(element, "Minino 1");
          } else if (this.distance > 100) {
            this.setError(element, "Massimo 100");
          } else {
            this.setSuccess(element);
          }
          break;

        case "size":
          if (this.size === "") {
            this.setError(element, "Numero richiesto");
          } else if (this.size < 1) {
            this.setError(element, "Minino 1");
          } else if (this.size > 9999) {
            this.setError(element, "Massimo 9999");
          } else {
            this.setSuccess(element);
          }
          break;

        case "rooms":
          if (this.rooms === "") {
            this.setError(element, "Numero richiesto");
          } else if (this.rooms < 1) {
            this.setError(element, "Minino 1");
          } else if (this.rooms > 99) {
            this.setError(element, "Massimo 99");
          } else {
            this.setSuccess(element);
          }
          break;

        case "beds":
          if (this.beds === "") {
            this.setError(element, "Numero richiesto");
          } else if (this.beds < 1) {
            this.setError(element, "Minino 1");
          } else if (this.beds > 99) {
            this.setError(element, "Massimo 99");
          } else {
            this.setSuccess(element);
          }
          break;

        case "bathrooms":
          if (this.bathrooms === "") {
            this.setError(element, "Numero richiesto");
          } else if (this.bathrooms < 1) {
            this.setError(element, "Minino 1");
          } else if (this.bathrooms > 99) {
            this.setError(element, "Massimo 99");
          } else {
            this.setSuccess(element);
          }
          break;
      }
    },
    setError(element, message) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = message;
      inputControl.classList.add("error");
      inputControl.classList.remove("success");
    },
    setSuccess(element) {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector(".error");

      errorDisplay.innerText = "";
      inputControl.classList.add("success");
      inputControl.classList.remove("error");
    },
    preventFormSubmitOnEnter(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    },
  },

  mounted() {
    this.fetchData();
  },
  computed: {
    addressAutocomplete() {
      const streetList = document.getElementById("suggestions-street");
      const input = document.getElementById("address");

      input.addEventListener("input", () => {
        delete axios.defaults.headers.common["X-Requested-With"];

        if (this.address && this.country) {
          (this.loading = true),
            axios
              .get(
                "https://api.tomtom.com/search/2/search/" +
                  this.address +
                  ".json",
                {
                  params: {
                    typeahead: true,
                    countrySet: this.country,
                    language: "it-IT",
                    idxSet: "Str",
                    key: this.key,
                  },
                }
              )
              .then((data) => {
                const suggestions = data.data.results;

                this.clearSuggestions(streetList);

                streetList.style.display = "flex";

                suggestions.forEach((result) => {
                  const li = document.createElement("li");
                  li.className = "list-group-item";
                  li.style = "cursor: pointer";
                  li.textContent = result.address.freeformAddress;

                  window.addEventListener("click", (e) => {
                    if (li.contains(e.target)) {
                      this.address = li.textContent;
                      this.saveCoordinate;
                      this.clearSuggestions(streetList);
                    } else {
                      streetList.style.display = "none";
                    }
                  });

                  streetList.appendChild(li);
                  this.arrSuggestions.push(li);
                });
              })
              .catch((error) => {
                console.error("Request failed:", error);
              })
              .finally(() => (this.loading = false));
        }
      });
    },
    saveCoordinate() {
      if (this.address.length > 1) {
        (this.loading = true),
          axios
            .get("https://api.tomtom.com/search/2/structuredGeocode.json", {
              params: {
                language: "it-IT",
                limit: 1,
                countryCode: this.country,
                streetName: this.address,
                key: this.key,
              },
            })
            .then((response) => {
              const result = response.data.results[0];
              if (result) {
                // Scambia latitudine e longitudine
                this.latitude = result.position.lon;
                this.longitude = result.position.lat;
              } else {
                // Gestisci il caso in cui non ci siano risultati
                this.latitude = null;
                this.longitude = null;
              }

              // this.latitude = response.data.results[0].position.lat;
              // this.longitude = response.data.results[0].position.lon;

              // console.log(this.latitude, this.longitude)
            })
            .catch((error) => console.error("Request failed:", error))
            .finally(() => (this.loading = false));
      }
    },
  },
  created() {
    this.getCountries();
    this.getAllServices();
    this.getAllApartments();
  },
};
</script>

<template>
  <Loader v-if="loading" />
  <div class="d-flex flex-column gap-5">
    <div class="container">
      <div class="card mt-0 box-shadow">
        <div class="card-body d-flex flex-column gap-3 py-3">
          <form @submit.prevent="getFilteredApartments">
            <div class="container d-flex flex-column gap-4">
              <h1 class="text-gradient">Ricerca Avanzata</h1>

              <div class="row row-cols-1 row-cols-md-2">
                <!-- Country -->
                <div class="input_container">
                  <select
                    id="country"
                    class="form-select"
                    name="country"
                    ref="country"
                    v-model="country"
                    @input="validate"
                  >
                    <option value="">Seleziona Nazione</option>
                  </select>
                  <div class="error"></div>
                </div>

                <!-- Address -->
                <div class="input_container">
                  <input
                    class="form-control"
                    type="text"
                    id="address"
                    placeholder="Inserisci una città o un indirizzo"
                    aria-label="address"
                    name="q"
                    autocomplete="off"
                    ref="address"
                    v-model.trim="address"
                    @input="
                      validate($event) + addressAutocomplete + saveCoordinate
                    "
                    :disabled="!country"
                    @keydown.enter.prevent="preventFormSubmitOnEnter"
                  />
                  <ul
                    id="suggestions-street"
                    class="list-group list-group-flush position-absolute z-3"
                    style="top: calc(100% - 15px); left: 12px"
                  ></ul>
                  <div class="error"></div>
                </div>
              </div>

              <!-- Distance -->
              <div class="input_container_split">
                <input
                  type="range"
                  class="form-range"
                  id="distance"
                  ref="distance"
                  v-model.number="distance"
                />
                <input
                  type="number"
                  class="form-control align-self-end"
                  id="distance"
                  min="1"
                  max="100"
                  ref="distance"
                  step="1"
                  v-model.number="distance"
                  @input="validate"
                  @keydown.enter.prevent="preventFormSubmitOnEnter"
                />
                <div class="error"></div>
              </div>

              <div class="row row-cols-1 row-cols-md-4">
                <!-- Size -->
                <div class="input_container_split">
                  <label lass="form-label" for="size">Dimesioni</label>
                  <input
                    class="form-control"
                    id="size"
                    type="number"
                    placeholder="Numero in metri quadrati"
                    ref="size"
                    v-model.number="size"
                    @input="validate"
                    @keydown.enter.prevent="preventFormSubmitOnEnter"
                  />
                  <div class="error"></div>
                </div>

                <!-- Rooms -->
                <div class="input_container_split">
                  <label lass="form-label" for="rooms">Camere</label>
                  <input
                    class="form-control"
                    id="rooms"
                    type="number"
                    placeholder="Numero Camere"
                    ref="rooms"
                    v-model.number="rooms"
                    @input="validate"
                    @keydown.enter.prevent="preventFormSubmitOnEnter"
                  />
                  <div class="error"></div>
                </div>

                <!-- Beds -->
                <div class="input_container_split">
                  <label lass="form-label" for="beds">Letti</label>
                  <input
                    class="form-control"
                    id="beds"
                    type="number"
                    placeholder="Numero Letti"
                    ref="beds"
                    v-model.number="beds"
                    @input="validate"
                    @keydown.enter.prevent="preventFormSubmitOnEnter"
                  />
                  <div class="error"></div>
                </div>

                <!-- Bathrooms -->
                <div class="input_container_split">
                  <label lass="form-label" for="bathrooms">Bagni</label>
                  <input
                    class="form-control"
                    id="bathrooms"
                    type="number"
                    placeholder="Numero Bagni"
                    ref="bathrooms"
                    v-model.number="bathrooms"
                    @input="validate"
                    @keydown.enter.prevent="preventFormSubmitOnEnter"
                  />
                  <div class="error"></div>
                </div>
              </div>

              <!-- Services -->
              <div class="container">
                <div
                  class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
                >
                  <div
                    v-for="service in arrServices"
                    :key="service.id"
                    class="form-check mb-2"
                  >
                    <input
                      type="checkbox"
                      class="form-check-input"
                      :id="service.id"
                      :value="service.id"
                      v-model="selectedServices"
                      :disabled="requiredServices.includes(service.id)"
                    />
                    <label :for="service.id" class="form-check-label">{{
                      service.name
                    }}</label>
                  </div>
                </div>
              </div>

              <div class="container">
                <div class="d-flex justify-content-center">
                  <button type="submit" class="styled-btn">
                    Cerca Appartamenti
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="container">
      <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center align-items-center g-4"
      >
        <div v-if="arrApartments === undefined" class="col-12 text-center">
          <div class="card box-shadow">
            <h2 class="text-gradient m-0">Nessuno risultato trovato</h2>
          </div>
        </div>
        <div v-else v-for="apartment in arrApartments" :key="apartment.id">
          <ApartmentCard :apartment="apartment" />
        </div>
      </div>
    </div>

    <div class="container card-maps">
      <div class="card box-shadow overflow-hidden">
        <div id="map" class="map"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-maps {
  margin-bottom: 50px;
}
.map {
  height: 400px;
}

.list-group {
  max-height: 200px;
  margin-bottom: 10px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}

.list-group-item:hover {
  text-decoration: underline;
  background-color: #f8f9fa !important;
}
</style>
