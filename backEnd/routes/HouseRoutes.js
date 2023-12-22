import express from 'express';

//import house controllers
import { createHouse, deleteHouse, findAllHouses, findOneHouse, updateHouse } from '../controllers/HouseController.js';

//define routes for the API
const HouseRoutes =express.Router();

// create House
HouseRoutes.post('/create', createHouse);
//update House
HouseRoutes.patch("/:houseId", updateHouse);
//delete House
HouseRoutes.delete("/:houseId", deleteHouse);
//read Houses, get all
HouseRoutes.get("/", findAllHouses);
//get one house
HouseRoutes.get("/:houseId", findOneHouse);


//last thing here
export default HouseRoutes;