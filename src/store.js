import { reactive } from "vue";

export const store = reactive({
  baseUrl: "http://localhost:8000/",
  apiUrl: "https://api.tomtom.com/search/2/geocode/",
});
