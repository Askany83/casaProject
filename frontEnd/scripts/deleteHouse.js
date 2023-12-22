//delete house
async function deleteHouse(houseId) {
  console.log("Deleting house with ID: ", houseId);
  try {
    const url = `http://localhost:3000/house/${houseId}`;
    const res = await fetch(url, { method: "DELETE", headers: {
      "Content-Type": "application/json",
    },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete house with ID ${houseId}`);
    }

    console.log(`House with ID ${houseId} deleted successfully`);

    // Show confirmation message
    alert("Casa apagada com sucesso!");
    //reloading page
    window.location.reload();

    
  } catch (error) {
    console.error("Error: ", error);
  }
};

//function to handle the delete confirmation in modal
function confirmDelete(event) {
  deleteHouse(event.target.getAttribute("data-target"));
  toggleModal(event);
};

function toggleModal(event) {
  event.preventDefault();
  var modalId = event.target.getAttribute("data-target");
  var modal = document.getElementById(modalId);
  modal.toggleAttribute("open");
}
