import express from 'express';
// import myName from './models/Name.js';
//import exportList from './scripts/fetchUsers.js';
import  bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {dbConfig} from './config/database.config.js';
import UserRoutes from './routes/UserRoutes.js';
import HouseRoutes from './routes/HouseRoutes.js';
import cors from 'cors';



//route for express - will serve front and backend
import path from 'path';
import { fileURLToPath } from 'url';

//mongoose config
mongoose.Promise =global.Promise;

async function connectToDataBase (){
  try {
    await mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
    });
    console.log("success connecting to database");
  } catch (error) {
    console.log("coudn't connect to database", error);
    process.exit();
  }
};
connectToDataBase ();

const app = express();
const port = 3000;

//middleware user

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Apply cors middleware only to the '/user' route
app.use("/user", cors(), UserRoutes);
//app.use("/user", UserRoutes);

//middleware house

app.use("/house", cors(), HouseRoutes);

// Use cors middleware
app.use(cors());



//serve static fyles
//route for express - will serve front and backend
const __dirname = fileURLToPath(new URL (".", import.meta.url));
app.use(express.static(path.join(__dirname, "../frontEnd")));

// app.get('/', (req, res) => {
//   res.send("hey hey");
// });

//route for express - will serve front and backend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/index.html"));
});



app.get("/getmyname", (req, res) => {
  console.log(myName);
  res.json(myName);
});

//number of users - route
app.get("/mytask", async (req, res)=>{
  debugger;
  
  let myVar = await exportList();

  res.json(myVar);

});



app.listen(port, () => {
  console.log("servidor a rodar na porta 3000");
  console.log("loaded again");
});

