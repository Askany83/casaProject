import mongoose from "mongoose";

var schema = new mongoose.Schema({
  streetName: {
    type: String,
    required: true,
    default: '',
  },
  location: {
    type: String,
    required: true,
    default: '',
  },
  postalCode: {
    type: String,
    required: true,
    default: '',
  },
  latitude: {
    type: String,
    required: true,
    default: '',
  },
  longitude: {
    type: String,
    required: true,
    default: '',
  },
  photo: {
    type: Buffer, // Using Buffer to store binary data
  },
  photoContentType: {
    type: String, // Store content type, e.g., 'image/jpeg'
  },
});

var House = new mongoose.model('House', schema);
export default House;
