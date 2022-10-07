// import modules
const express  = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors  = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

//app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
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
const testRoutes = require("./routes/test");
app.use("/", testRoutes);

const userRoutes = require("./routes/deleteUser");
app.use("/", userRoutes);


const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const userRoutes = require("./routes/deleteUser");
app.use("/", userRoutes);



//port
const port = process.env.PORT || 8080; // process.env.PORT

// listener
const server = app.listen(port, ()=>
    console.log(`System is running on port ${port}`)
);