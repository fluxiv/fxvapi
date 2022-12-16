import {user} from './routes/user_router'
import {feed} from './routes/feed_router'

import express from 'express'
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });
import { Request, Response } from 'express';

const app = express();

const cors = require('cors')
const mysql = require('mysql2')
app.use(cors())
app.use(express.json())


var sql = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true
})

sql.connect((err:any)=>{
    if(!err){
        console.log('API FXV CONNECTED');
        console.log(`Run FXV api on http://localhost:${process.env.PORT}`)
    }
    else{
        console.log(err);
        console.log('Connect to you database')
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Rodando na porta ${process.env.PORT}`)
})

app.get('/',(req:Request,res:Response) => {
    res.send('eu rodo')
})
const defaultImage = "uploads/default/avatar-image.jpg"
app.get('/getImage', function(req:Request, res:Response){
    let image: any = req.query.photo
    res.sendFile(image, {root:'.'}, function(err: any){
        if(err) {
            res.sendFile(defaultImage, {root:'.'})
        }
    }) ;
}); 
app.use('/user',user)
app.use('/feed',feed)