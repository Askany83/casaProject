
//map initialized in Portugal
const map = L.map('map').setView([40.515367, -8.501954], 13.5);

// Esri World Street Map layer
const Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);

document.getElementById("map").style.display = "none";
document.getElementById("getHousesButtonMap").style.display = "none";

async function fetchAndShowHousesOnMap(map) {
try {
    const url = `http://localhost:3000/house`;
    const res = await fetch(url);
    if (!res.ok) {
    throw new Error(`Connection problem`);
    }
    this.houses = await res.json();

    // Check on console what was created
    console.log("Houses array:", Array.from(this.houses));

    this.houses.forEach((house) => {
    const { latitude, longitude, photo } = house;

    // Create a marker for each house and add it to the map
    const marker = L.marker([house.latitude, house.longitude]).addTo(map);

    // Create a popup with the house information
    let popupContent = `<p>Latitude: ${latitude}</p>`;
    popupContent += `<p>Longitude: ${longitude}</p>`;

    // Check if the house has a photo
    if (photo && photo.data) {
        // Convert the photo data to base64
        const base64Image = this.arrayBufferToBase64(photo.data);

        // Add an image tag to the popup content with dynamic MIME type
        popupContent += `<img src="${house.photo && house.photo.data ? `data:${house.photoContentType};base64,${arrayBufferToBase64(house.photo.data)}` : ''}" alt="House Photo" width="100" style="display: block; margin: 0 auto;"/>`;
    }
    else { popupContent += `<p>Sem foto</p>`; }

    // Bind the popup to the marker
    marker.bindPopup(popupContent);
    });

} catch (error) {
    console.error("Error: ", error);
}};

// Function to generate heatmap
function generateHeatmap() {
    // Fetch houses and create heatmap as before
    fetchAndShowHousesOnMap(map);

    // Create an array of heatmap data points with weights based on the number of houses
    const heatmapData = this.houses.map(house => [house.latitude, house.longitude, 1]);

    // Add the heatmap layer to the map
    const heatLayer = L.heatLayer(heatmapData).addTo(map);
};

// Function to convert array buffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
};


