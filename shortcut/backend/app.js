// import modules
const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors  = require('cors');
const app = express();
var assert = require('assert');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
app.use(express.json());
const bodyParser = require('body-parser');
require('dotenv').config();
//db

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
.then(()=> console.log("DB CONNECTED")).catch(err=>console.log("DB CONNECTION", err));






  









//middleware
app.use(morgan("dev"));
app.use(cors({origin: true, credentials: true}));






//routes
const testRoutes = require("./routes/test");
const e = require('express');
app.use("/", testRoutes);

const loginRoutes = require("./routes/login");
app.use("/",loginRoutes);


//port
const port = process.env.PORT || 8080; // process.env.PORT

// listener
const server = app.listen(port, ()=>
    console.log(`System is running on port ${port}`)
);