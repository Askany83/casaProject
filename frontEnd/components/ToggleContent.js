import { createApp } from "https://unpkg.com/petite-vue?module";

const app1 = createApp({
  show:  "",
  houses:[],

  async mounted() {
  // Fetch houses when the app is mounted
    await this.getAllHouses(); 

  // Initialize the map after all resources are loaded
    // window.onload = () => {
    //   this.initMap();
    // };
  },
  
  async getAllHouses() {
    try {
      const url = `http://localhost:3000/house`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Connection problem`);
      }
      this.houses = await res.json();

      //check on console what was created
      console.log("Houses array:", Array.from(this.houses));


    } catch (error) {
      console.error("Error: ", error);
      }
  },

  toggleContent(testCase) {
    this.show = testCase;

    //if clicked 'housesButton' get all 
    if (testCase === 'housesButton') {
      this.getAllHouses();
    }
  },

  // initMap() {
  //   // Map initialized in Portugal
  //   const map = L.map("map").setView([39.399872, -8.224454], 8);

  //   // OpenStreetMap layer
  //   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //     maxZoom: 19,
  //     attribution:
  //       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //   }).addTo(map);
  // },

}).mount("#app");


