const express=require("express");
const cors=require("cors")
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
const documentApi=require('./api/documentAPI')


dotenv.config();
const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/v2/client/document",documentApi);





app.listen(process.env.PORT,()=>{
    console.log("server started at port : " +process.env.PORT) 
})
