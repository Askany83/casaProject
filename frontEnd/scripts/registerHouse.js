async function submitForm(event) {
  //debugger;
  event.preventDefault();

  // Get references to input fields
  var streetName = document.getElementById("streetName").value;
  var location = document.getElementById("cityName").value;
  var postalCode = document.getElementById("codigoPostal").value;
  var latitude = document.getElementById("latitude").value;
  var longitude = document.getElementById("longitude").value;

          // Check if the streetName is not empty
        if (streetName.trim() === "") {
            alert("Por favor, preencha o Nome da Rua.");
            event.preventDefault(); // Prevent form submission
            return;
        }

        // Check if the cityName contains only letters
        if (location.trim() === "" || !/^[a-zA-Z\s\-]+$/.test(location)) {
            alert("Por favor, insira um nome de cidade válido.");
            event.preventDefault();
            return;
        }

        // Check if the codigoPostal is a valid format (e.g., "1234-567")
        if (postalCode.trim() === "" || !/^\d{4}-\d{3}$/.test(postalCode)) {
            alert("Por favor, insira um Código Postal válido (ex: 1234-567).");
            event.preventDefault();
            return;
        }

        // console.log("latitude", latitude);
        // console.log("longitude", longitude);
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

  // Build data object
  var formData = {
    streetName: streetName,
    location: location,
    postalCode: postalCode,
    latitude: latitude,
    longitude: longitude,
  };
  //console.log(formData);

  try {
    // Send data to the server using the fetch API
    var response = await fetch("http://localhost:3000/house/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    //console.log(response);

    // Parse the response JSON
    var data = await response.json();

    //console.log(data);  

    // console.log("you have created a new house! congrats!");

    alert("A Casa foi adicionada à Base de Dados!");
    window.location.reload();
  } catch (error) {
    // Handle network or server errors
    console.error("Error submitting the form:", error);
  }
}