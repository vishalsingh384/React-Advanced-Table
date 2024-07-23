import express from 'express';
import cors from 'cors';
import { Users } from './Users.js';
const app=express();

app.use(cors());

app.get("/users",(req,res)=>{
    const {q}=req.query;

    const keys=["first_name", "last_name", "email"];

    const filteredData= Users.filter((user)=>keys.some((elem)=>user[elem].toLowerCase().includes(q)));

    res.json(filteredData);
})

app.listen(5001,()=>console.log('server is running'));