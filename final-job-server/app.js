const express = require('express');
const morgan = require('morgan');
const cors = require ('cors');


const shopRoutes = require('./routes/shopRt');

const app = express();

//body parser
app.use(express.json());

app.use(morgan("dev"))

//allow cors origin
app.use(cors());

app.use('/upload',express.static('upload'));

app.use("/shop", shopRoutes);

//require('dotenv').config();
//Test .env file, put .env in .gitignore
//console.log(process.env.SECRET_KEY)

app.use((req,res,next)=>{
    const error=new Error();
    error.status=404;
    error.message="Not Found";
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;