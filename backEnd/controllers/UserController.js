import User from '../models/User.js';

export const createUser = async (req, res) => {
  try {
    if (
      //verificar se os dados requeridos foram submetidos
      !req.body.email ||
      !req.body.firstName
    ){
      return res.status(400).send({
        message: 'User email can not be empty',
      });
    }
    const userObj = new User ({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    });

    const savedUser = await userObj.save();
    //201 - sucesso
    res.status(201).json({
      message: 'User created successfully',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured when creating user',
    });
  }
};


//update user
export const updateUser = async (req, res) => {
  
    if(!req.body){
      return res.status(400).send({
        message:'User content cannot be empty'
      });
    }
  try {
    const id = req.params.id;
    //findIdAndUpdate return all if null if no document found
    const data = await User.findByIdAndUpdate(id, req.body, {
    //return the modified document rather than the original
    new: true,
    });

    if (!data){
      return res.status(404).send({
        message :`cannot update User with id=${id}. Maybe the user was not found`,
      });
    }
    res.send({ message: `User was update`, data: data });
  } catch (error) {
    //if there is any error, we send it to the client
    res.status(500).send({
      message: `error updating User with id ` + req.params.id,
    });
  }
};

//delete User
export const deleteUser = async (req, res) => {

  const id = req.params.id;
  try {

    //test
    console.log(`Attempting to delete user with id=${id}`);

    const request = await User.findOneAndDelete(id);
    if(!request){

      //test
      console.log(`User with id=${id} not found`);

      return res.status(404).send({
        message: `Cannot delete User with id=${id}. Maybe user was not found`,
      });
    }

    //test
    console.log(`User with id=${id} successfully deleted`);

    res.send({
      message: "User was deleted!",
    });
  } catch (error) {

    //test
    console.error(`Error deleting user with id=${req.params.id}`, error);

    res.status(500).send({
      message: `could not delete User with id=` + req.params.id,
    });
  }
};




export const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "some error occurred while retrieving users",
    });
    }
};

export const findOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "some error occurred while retrieving users",
    });
  }
};