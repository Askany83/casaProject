
import { createApp } from 'https://unpkg.com/petite-vue?module';

const loginApp = ({

  username: '',
  password: '',
  user: null,
  isLoggedin: false,
  isLoading: false,
  show: "",
  houses: [],
  map: null,
  showVElseContent: true,
  currentPage: 1,
  housesPerPage: 3,

  /* pagination - all houses  ********************************************************************************************/
  paginatedHouses() {
    const startIndex = (this.currentPage - 1) * this.housesPerPage;
    const endIndex = startIndex + this.housesPerPage;
    return this.houses.slice(startIndex, endIndex);
  },

  nextPage() {
    if (this.currentPage < Math.ceil(this.houses.length / this.housesPerPage)) {
      this.currentPage++;
    }
  },

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  },

  /* login ********************************************************************************************/
  async login() {
    try {
      this.isLoading = true;
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      // Test for error on http response
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      // Async response from server
      //debugger;
      const data = await response.json();
      console.log(data);

      if (data && data.token) {
        //add to localStorage that user is logged in
        localStorage.setItem('cacheCheckLogin', true);
        //check localStorage
        // console.log('localStorage cacheCheckLogin:', localStorage.getItem('cacheCheckLogin'));

        this.user = {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          image: data.image 
        },
          this.isLoggedin = true;
          //to show the exit button after login
          this.showExitButton();
          //check isLoggedin
          console.log('isLoggedin:', this.isLoggedin);

          // Set the user's state in localStorage
        // localStorage.setItem('userState', JSON.stringify({
        //   isLoggedin: this.isLoggedin,
        //   currentView: 'housesButton',
        // }));
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Failed to Login");
    } finally {
      this.isLoading = false; // Set loading to false when the login process is completed or failed
      // Call initializeApp after login to update isLoggedin state
      // this.initializeApp();
    }
  },

  /* ********************************************************************************************/
  //   initializeApp() {
  //   console.log("Initializing app");
    
  //   // Retrieve isLoggedin state from localStorage
  //   this.isLoggedin = localStorage.getItem('cacheCheckLogin') === 'true';
  //   return this.isLoggedin;
  // },

  /* Function to autofill latitude and longitude ********************************************************************************************/
  autofillLocation() {
  if (navigator.geolocation) {
    // Options for geolocation request 
    const options = {
      enableHighAccuracy: true, // Get the most accurate position available
      timeout: 5000, // Maximum time (in milliseconds) to wait for location data
      maximumAge: 0, // Don't use a cached position
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitudeInput = document.getElementById("latitude");
        const longitudeInput = document.getElementById("longitude");

        // Autofill latitude and longitude inputs
        latitudeInput.value = position.coords.latitude.toFixed(6);
        longitudeInput.value = position.coords.longitude.toFixed(6);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert("Erro ao obter a geolocalização. Por favor, introduza os valores manualmente.");
      },
      options
    );
  } else {
    alert("Geoloclização não é suportada pelo Broswer. Por favor, introduza os valores manualmente.");
  }
},

  /* Get All Houses  ********************************************************************************************/
  async getAllHouses() {
  try {
    const url = `http://localhost:3000/house`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Connection problem`);
    }
    this.houses = await res.json();

  //   this.houses.forEach(house => {
  //     console.log("House data:", house);
  //     if (house.photo && house.photo.data) {
  //       console.log("Photo data:", house.photo.data);
  //     } else {
  //       console.log("No photo data available for this house.");
  //     }
  //   });
  // console.log(this.houses);

  } catch (error) {
    console.error("Error: ", error);
  }
  },

  /* photo data to Base64 when the getAllHouses() is used - serving the frontend rendering the image stored in mongoDB ********************************************************************************************/
  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
  },

  /* Create  house  ********************************************************************************************/
  submitForm(event) {
  // debugger;
  event.preventDefault();

  var streetName = document.getElementById("streetName").value;
  var location = document.getElementById("cityName").value;
  var postalCode = document.getElementById("codigoPostal").value;
  var latitude = document.getElementById("latitude").value;
  var longitude = document.getElementById("longitude").value;
  var photo = document.getElementById("photo").files[0];

  if (streetName.trim() === "") {
    alert("Por favor, preencha o Nome da Rua.");
    return;
  }

  if (location.trim() === "" || !/^[a-zA-Z\s\-]+$/.test(location)) {
    alert("Por favor, insira um nome de cidade válido.");
    return;
  }

  if (postalCode.trim() === "" || !/^\d{4}-\d{3}$/.test(postalCode)) {
    alert("Por favor, insira um Código Postal válido (ex: 1234-567).");
    return;
  }

  if (
    latitude.trim() === "" ||
    longitude.trim() === "" ||
    isNaN(parseFloat(latitude)) ||
    isNaN(parseFloat(longitude)) ||
    parseFloat(latitude) < -90 ||
    parseFloat(latitude) > 90 ||
    parseFloat(longitude) < -180 ||
    parseFloat(longitude) > 180
  ) {
    alert("Por favor, insira valores válidos para Latitude (-90 a 90) e Longitude (-180 a 180).");
    return;
  }

  var formData = new FormData();
  formData.append("streetName", streetName);
  formData.append("location", location);
  formData.append("postalCode", postalCode);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  // Check if a new photo is provided
  if (photo) {
  formData.append("photo", photo);
  // console.log('photo recieved');
  }

  // console.log(formData);

  fetch("http://localhost:3000/house/create", {
    method: "POST",      
    body: formData,
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      alert("A Casa foi adicionada à Base de Dados!");
      this.toggleContent("housesButton");
    })
    .catch((error) => {
      console.error("Error submitting the form:", error);
    });
  },

  /*show and hide - to use with toogle buttons - since map inside here goes bust ********************************************************************************************/
  showMap() {
    document.getElementById("map").style.display = "block";
    document.getElementById("getHeatMap").style.display = "block";
    document.getElementById("mapSwitch").style.display = "flex";
  },
  hideMap(){
    document.getElementById("map").style.display = "none";
    document.getElementById("getHeatMap").style.display = "none";
    document.getElementById("mapSwitch").style.display = "none";
  },
  showExitButton(){
    document.getElementById("exitButton").style.display = "block";
  },
  hideControlePanelInfo(){
    document.getElementById("controlePanelInfo").style.display = "none";
document.getElementById("controlePanelInfoBellowDiv").style.display = "none";
  },
  showControlePanelInfo(){
    document.getElementById("controlePanelInfo").style.display = "block";
document.getElementById("controlePanelInfoBellowDiv").style.display = "block";
  },

  /* delete house and associated modals   ********************************************************************************************/
  async deleteHouse(houseId) {
    try {
      const url = `http://localhost:3000/house/${houseId}`;
      const res = await fetch(url, {
      method: "DELETE",
      headers: {
      "Content-Type": "application/json",
    },
    });
    if (!res.ok) {
      throw new Error(`Failed to delete house with ID ${houseId}`);
    }

    // Remove the deleted house from the houses array
    this.houses = this.houses.filter(house => house._id !== houseId);

    // Show confirmation message
    alert("Casa apagada com sucesso!");
    //Use nextTick to set this.show to "housesButton" after the DOM has been updated
    await this.$nextTick();
    this.show = "housesButton";
    } catch (error) {
      console.error("Error: ", error);
    }
  },

  confirmDelete(event) {
    this.deleteHouse(event.target.getAttribute("data-target"));
    this.toggleModal(event);
  },

  toggleModal(event) {
    event.preventDefault();
    var modalId = event.target.getAttribute("data-target");
    var modal = document.getElementById(modalId);
    modal.toggleAttribute("open");
  },

  /*edit house  and associated modals ********************************************************************************************/
  editModal(event) {
    event.preventDefault();
    var modalId = event.target.getAttribute("data-target");
    //console.log(modalId);
    var modal = document.getElementById(modalId);
    modal.toggleAttribute("open");
  },

  confirmEdit: async function (event) {
    // debugger;
    // Get the original data-target attribute value - that is ("'edit' + house._id")
    let originalDataTarget = event.target.getAttribute("data-target");

    // Replace "edit" with an empty string - and get ("house._id")
    let modifiedDataTarget = originalDataTarget.replace("edit", "");

    // let photoInput = document.getElementById('editPhoto' + modifiedDataTarget);
    // console.log(photoInput);

    // Validate input fields
    let streetName = document.getElementById('editStreetName' + modifiedDataTarget).value;
    let location = document.getElementById('editLocation' + modifiedDataTarget).value;
    let postalCode = document.getElementById('editCodigoPostal' + modifiedDataTarget).value;
    let latitude = document.getElementById('editLatitude' + modifiedDataTarget).value;
    let longitude = document.getElementById('editLongitude' + modifiedDataTarget).value;
    let photo = document.getElementById('editPhoto' + modifiedDataTarget).files[0];

    // Check if the streetName is not empty
    if (streetName.trim() === "") {
      alert("Por favor, preencha o Nome da Rua.");
      event.preventDefault(); // Prevent form submission
      return;
    }

    // Check if the location contains only letters
    if (location.trim() === "" || !/^[a-zA-Z\s\-]+$/.test(location)) {
      alert("Por favor, insira um nome de cidade válido.");
      event.preventDefault();
      return;
    }

    // Check if the postalCode is a valid format (e.g., "1234-567")
    if (postalCode.trim() === "" || !/^\d{4}-\d{3}$/.test(postalCode)) {
      alert("Por favor, insira um Código Postal válido (ex: 1234-567).");
      event.preventDefault();
      return;
    }

    // Check if latitude and longitude are within the specified range
    if (
      latitude.trim() === "" ||
      longitude.trim() === "" ||
      isNaN(parseFloat(latitude)) ||
      isNaN(parseFloat(longitude)) ||
      parseFloat(latitude) < -90 ||
      parseFloat(latitude) > 90 ||
      parseFloat(longitude) < -180 ||
      parseFloat(longitude) > 180
    ){
      alert("Por favor, insira valores válidos para Latitude (-90 a 90) e Longitude (-180 a 180).");
      event.preventDefault();
      return;
    }

    // If all validations pass, proceed with sending data to the server
    var formData = new FormData();
    formData.append("streetName", streetName);
    formData.append("location", location);
    formData.append("postalCode", postalCode);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    // console.log("Before appending photo:", formData);

    if (photo) {
      formData.append("photo", photo);
      console.log("photo recieved");
    }
    // console.log("After appending photo", formData);

    // Ensure the DOM is updated before calling editHouse
    await this.$nextTick();
    // Call the editHouse function with the modified data-target value and house attributes
    this.editHouse(modifiedDataTarget, formData);

    this.editModal(event);
  },

  async editHouse (houseId, formData) {
    // console.log("Editing house with ID: ", houseId);
    // console.log("house data: ", formData);
    try {
      const url = `http://localhost:3000/house/${houseId}`;
      const response = await fetch(url, {
        method: "PATCH",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to update house: ${response.statusText}`);
      }

      const result = await response.json();
      // console.log(result);
      // console.log(`House with ID ${houseId} edited successfully`);

      // Show confirmation message
      alert("Casa editada com sucesso!");
      this.show = "housesButton";
    } catch (error) {
      console.error("Error updating house:", error.message);
    }
  },

  /*toggle content - the buttons fire with a different keyword ********************************************************************************************/
  toggleContent(testCase) {
    if (this.show === testCase) {
      // If the same button is clicked twice, toggle off
      this.show = "";
      this.showControlePanelInfo();

      if (testCase === "mapa") {
        // Call hideMap when "Mapa" button is clicked again
        this.hideMap();
        this.showControlePanelInfo();
      }
    } else {
      this.show = testCase;
      if (testCase === "housesButton") {
        this.getAllHouses();
        this.hideControlePanelInfo();
        this.hideMap();
      } else if (testCase === "mapa") {
        // Call showMap function when "Mapa" button is clicked
        this.showMap();
        this.hideControlePanelInfo();
      } else if (testCase === "formButton") {
        this.hideMap();
        this.hideControlePanelInfo();
      } else {
        this.hideMap();
        this.hideControlePanelInfo();
      }
    }
  },

});
console.log('Before mounting app');
createApp({ loginApp }).mount('#app');
console.log('After mounting app');
// Initialize the user's state when the app is created
// loginApp.initializeApp();

