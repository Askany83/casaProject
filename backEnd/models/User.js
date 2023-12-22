//user para api de teste do prof, não mexer depois, usar como exemplo

import mongoose from "mongoose";

var schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    default: '',
  },
  phone: String,
});

var User= new mongoose.model('User', schema);
export default User;