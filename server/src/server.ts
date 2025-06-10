import { Request,response,Response } from "express";
import DBConnect from "./config/db";
import dotenv from 'dotenv'
import app from "./app";
dotenv.config()
const PORT = process.env.PORT!
DBConnect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server connected on    -:- http://localhost:${PORT}`);
        
    })
})
.catch((error)=>{
    console.log("Server Connection error",error);
    
})
