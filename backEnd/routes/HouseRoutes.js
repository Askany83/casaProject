import express from 'express';
import multer from 'multer';
import { createHouse, deleteHouse, findAllHouses, findOneHouse, updateHouse } from '../controllers/HouseController.js';

const HouseRoutes = express.Router();

// Configure Multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage to store files as buffers
const upload = multer({ storage: storage });

// create House with file upload
HouseRoutes.post('/create', upload.single('photo'), createHouse);

// update House with file upload
HouseRoutes.patch("/:houseId", upload.single('photo'), updateHouse);

// other routes 
HouseRoutes.delete("/:houseId", deleteHouse);
HouseRoutes.get("/", findAllHouses);
HouseRoutes.get("/:houseId", findOneHouse);

export default HouseRoutes;
