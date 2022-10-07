// import modules
const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors  = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();
//app
const app = express();
app.use(express.json());
app.use(bodyParser.json());





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
const testRoutes = require("./routes/signup");
app.use("/", testRoutes);


//port
const port = process.env.PORT || 8080; // process.env.PORT

// listener
const server = app.listen(port, ()=>
    console.log(`System is running on port ${port}`)
);

