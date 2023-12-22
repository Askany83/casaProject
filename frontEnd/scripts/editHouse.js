function editModal(event) {
  event.preventDefault();
  var modalId = event.target.getAttribute("data-target");
  //console.log(modalId);
  

  var modal = document.getElementById(modalId);
  modal.toggleAttribute("open");
}

async function editHouse (houseId, updatedHouseData) {
  // console.log("Editing house with ID: ", houseId);
  // console.log("house data: ", updatedHouseData);
  try {
        const url = `http://localhost:3000/house/${houseId}`;
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHouseData),
        });

        if (!response.ok) {
          throw new Error(`Failed to update house: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);

        console.log(`House with ID ${houseId} edited successfully`);

        // Show confirmation message
        alert("Casa editada com sucesso!");
        //reloading page
        window.location.reload();
        
      } catch (error) {
        console.error("Error updating house:", error.message);
        
      }
    };

function confirmEdit(event) {
  // Get the original data-target attribute value - that is ("'edit' + house._id")
  let originalDataTarget = event.target.getAttribute("data-target");

  // Replace "edit" with an empty string - and get ("house._id")
  let modifiedDataTarget = originalDataTarget.replace("edit", "");

  // Validate input fields
  let streetName = document.getElementById('editStreetName' + modifiedDataTarget).value;
  let location = document.getElementById('editLocation' + modifiedDataTarget).value;
  let postalCode = document.getElementById('editCodigoPostal' + modifiedDataTarget).value;
  let latitude = document.getElementById('editLatitude' + modifiedDataTarget).value;
  let longitude = document.getElementById('editLongitude' + modifiedDataTarget).value;

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
  let updatedHouseData = {
    streetName: streetName,
    location: location,
    postalCode: postalCode,
    latitude: latitude,
    longitude: longitude,
  };
  console.log(updatedHouseData);

  // Call the editHouse function with the modified data-target value and house attributes
  editHouse(modifiedDataTarget, updatedHouseData);

  editModal(event);
};
