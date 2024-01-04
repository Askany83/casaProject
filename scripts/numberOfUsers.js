
import {userDB} from '../models/userDB.js';
import averageAge from './averageAge.js';


const exportNumber = function numberOfUsers() {
  let numb = userDB.users.length;
  let myObj = {
    "Number of users": numb,
    "Average Age": averageAge(),
  }
  return myObj;
};

export default exportNumber;
