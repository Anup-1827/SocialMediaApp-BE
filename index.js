// Start: Packages
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')
// End: Packages

// Start:--Import Files
const router = require('./routes/index')
// End:--Import Files



const port = 1888;
dotenv.config();



// Start:-- Middleware
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(helmet());
app.use(morgan("common"));
app.use('/v1/api', router)
// End:-- Middleware

//Start: --- Connecting to DB
mongoose.connect(process.env.MONGO_URL, ()=>{

    console.log("Connected to DB");
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    });

});
// End: --- Connnecting to DB


