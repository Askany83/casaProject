
let heatmapDisplayed = false;
let heat; 
/*map initialized in Portugal ********************************************************************************************/
const map = L.map('map').setView([40.513285, -8.497572], 11.58);

/* Esri World Street Map layer ********************************************************************************************/
const Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
}).addTo(map);

/*hide content in other v-elses that are manages by ToggleContent.js - toggleContent(testCase)  ********************************************************************************************/
document.getElementById("map").style.display = "none";
document.getElementById("getHeatMap").style.display = "none";
document.getElementById("mapSwitch").style.display = "none";

/*Get all houses and display them in popups with latitude / longitude / photo ********************************************************************************************/
async function fetchAndShowHousesOnMap(map) {
try {

    // Remove heat layer if displayed
    if (heatmapDisplayed) {
        map.removeLayer(heat);
        heatmapDisplayed = false;
    }


    const url = `http://localhost:3000/house`;
    const res = await fetch(url);
    if (!res.ok) {
    throw new Error(`Connection problem`);
    }
    this.houses = await res.json();

    // Check on console what was created
    console.log("Houses array:", Array.from(this.houses));

    // Remove existing houses markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    document.getElementById("mapImage").src = "./assests/images/switch_on.png"

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

/*photo data to Base64 - map - get all houses and display markers with popups ********************************************************************************************/
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
};

function heatmap() {
    if (heatmapDisplayed) {
        // If heatmap is displayed, remove it
        map.removeLayer(heat);
    } else {
        document.getElementById("mapImage").src = "./assests/images/switch_off.png"
        // If heatmap is not displayed, add it
        const heatArray = this.houses.map((house) => [
            house.latitude,
            house.longitude,
        ]);

        heat = L.heatLayer(heatArray, {
            radius: 30,
            blur: 20,
            max: 0.5,
            minOpacity: 0.6,
            gradient: {
                0.4: "blue",
                0.65: "lime",
                1: "red",
            },
        }).addTo(map);
    }

    // Toggle the heatmapDisplayed variable
    heatmapDisplayed = !heatmapDisplayed;

    // Remove the existing houses markers
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Fetch and show houses on the map, regardless of heatmap state
    if (!heatmapDisplayed) {
        document.getElementById("mapImage").src = "./assests/images/switch_on.png"
        fetchAndShowHousesOnMap(map);
    }
}
