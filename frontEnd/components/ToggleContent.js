import { createApp } from "https://unpkg.com/petite-vue?module";


/* create App - petite-vue  ********************************************************************************************/
const app = createApp({
  show: "",
  houses: [],
  map: null,
  showVElseContent: true,
  

  /*mount diferent methods  ********************************************************************************************/
  async mounted() {
    await this.getAllHouses();
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
    console.log(this.houses);

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

  /* submit form   ********************************************************************************************/
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
    console.log('photo recieved');
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
    document.getElementById("getHousesButtonMap").style.display = "block";
  },
  hideMap(){
    document.getElementById("map").style.display = "none";
    document.getElementById("getHousesButtonMap").style.display = "none";
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

  confirmEdit(event) {
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
      //Use nextTick to set this.show to "housesButton" after the DOM has been updated
      await this.$nextTick();
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

      if (testCase === "mapa") {
        // Call hideMap when "Mapa" button is clicked again
        this.hideMap();
      }
    } else {
      this.show = testCase;
      if (testCase === "housesButton") {
        this.getAllHouses();
        this.hideMap();
      } else if (testCase === "mapa") {
        // Call showMap function when "Mapa" button is clicked
        this.showMap();
      } else if (testCase === "formButton") {
        this.hideMap();
      } else {
        this.hideMap();
      }
    }
    if (testCase === "houseButton" || "mapa" || "formButton") {
      this.hideContentAssociatedWithVElse();
    }
  },

  hideContentAssociatedWithVElse() {
    this.showVElseContent = false;
  }
});
app.mount("#app");