import express from 'express';
import {createUser, findAllUsers, findOneUser, updateUser, deleteUser} from '../controllers/UserController.js';

// define routes for the API
const UserRoutes = express.Router();

//create User
UserRoutes.post('/create', createUser);
//update User
UserRoutes.patch("/:id", updateUser);
//delete User
UserRoutes.delete("/:id", deleteUser);
//read users, get all
UserRoutes.get("/", findAllUsers);
//get one user
UserRoutes.get("/:id", findOneUser);

//last thing here
export default UserRoutes;