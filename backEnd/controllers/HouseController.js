import House from '../models/House.js';

// create House ******************************************
export const createHouse = async (req, res) => {
  try {
    if (
      //verificar se os dados requeridos foram submetidos
      !req.body.streetName ||
      !req.body.location ||
      !req.body.postalCode ||
      !req.body.latitude ||
      !req.body.longitude
    ){
      return res.status(400).send({
        message: 'Please check if all data for the house was inserted',
      });
    }
    const houseObj = new House ({
      streetName: req.body.streetName,
      location: req.body.location,
      postalCode: req.body.postalCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude
    });
    console.log(houseObj);

    const savedHouse = await houseObj.save();
    //201 - sucesso
    res.status(201).json({
      message: 'House created successfully',
      house: savedHouse,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'some error occured when creating house',
    });
  }
};

//update House ******************************************
export const updateHouse = async (req, res) => {
  
    if(!req.body){
      return res.status(400).send({
        message:'House content cannot be empty'
      });
    }
  try {
    const id = req.params.houseId;
    //findIdAndUpdate return all if null if no document found
    const data = await House.findByIdAndUpdate(id, req.body, {
    //return the modified document rather than the original
    new: true,
    });

    if (!data){
      return res.status(404).send({
        message :`cannot update House with id=${id}. Maybe the House was not found`,
      });
    }
    res.send({ message: `House was update`, data: data });
  } catch (error) {
    //if there is any error, we send it to the client
    res.status(500).send({
      message: `error updating House with id ` + req.params.houseId,
    });
  }
};

//delete House ******************************************
export const deleteHouse = async (req, res) => {

  const id = req.params.houseId;
  try {

    //test
    console.log(`Attempting to delete user with id=${id}`);

    const request = await House.findOneAndDelete({_id: id});
    if(!request){

      //test
      console.log(`House with id=${id} not found`);

      return res.status(404).send({
        message: `Cannot delete House with id=${id}. Maybe user was not found`,
      });
    }

    //test
    console.log(`House with id=${id} successfully deleted`);

    res.send({
      message: "House was deleted!",
    });
  } catch (error) {

    //test
    console.error(`Error deleting House with id=${req.params.houseId}`, error);

    res.status(500).send({
      message: `could not delete House with id=` + req.params.houseId,
    });
  }
};

//find all houses ******************************************
export const findAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    res.status(200).json(houses);
    //console.log(houses);
  } catch (error) {
    res.status(500).json({
      message: error.message || "some error occurred while retrieving Houses",
    });
    }
};

//find one houses ******************************************
export const findOneHouse = async (req, res) => {
  try {
    const oneHouse = await House.findById(req.params.houseId);
    res.status(200).json(oneHouse);
  } catch (error) {
    res.status(500).json({
      message: error.message || "some error occurred while retrieving users",
    });
  }
};