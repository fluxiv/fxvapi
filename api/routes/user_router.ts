import e, { Router, Request, Response } from 'express'
import {userModels} from '../models/users_models'
import * as dotenv from "dotenv";
import { nanoid } from 'nanoid'
const mysql = require('mysql2')
dotenv.config({ path: __dirname+'/./../.env' });

// require("dotenv").config({
//     allowEmptyValues: true
// })
var sqlconn = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true
})
export const user = Router();
// const { nanoid } = require('nanoid')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)


user.post('/postUser',(req:Request,res:Response) => {
    var params = req.body 
    var hash = bcrypt.hashSync(req.body.password, salt)
    var dados = new userModels(
        nanoid(),
        params.name,
        params.birthday,
        params.email,
        hash,
         0
     )
    let query = `Insert into users (id, email, password, birthday, name, isPremium) values (?,?,?,?,?,?)`
    sqlconn.query(query, [
        dados.id,
        dados.email,
        dados.password,
        dados.birthday,
        dados.name,
        dados.isPremium
    ], (err:any, rows:any) => {
        if (!err) {
            res.status(201).json({
                msg:"ok!",
                id: dados.id
            })
        }
        else {
            res.status(400).json({
                msg: "error!",
                error:err
            })
        }
    })
    // var data = new userModels(
    //     id,
    // )
    //res.send(params)
})

user.post('/loginUser', (req:Request, res:Response) => {
    var params = req.body
    let query = `Select * from users where email = ?`
    sqlconn.query (query, [
        params.email
    ], (err:any, rows:any) => {
        if (!err) {
            if(rows.length == 0) {
                res.status(404).json({
                    msg:"Email not found!"
                })
            }else {
                let dados = rows[0]
                let match = bcrypt.compareSync(params.password, dados.password)
                if(match == true) {
                    delete dados.password
                    const token = generateAccessToken(params);
                    res.status(200).json ({
                        msg:"Ok!",
                        data: dados,
                        token:token
                    })
                } else {
                    res.status(401).json({
                        msg:"Error, password not match!"
                    })
                }
            }
        }
        else {
            res.status(400).json({
                msg: "error!",
                error:err
            })
        }
    })
       
})

user.post("/getUserById", authenticateToken,  (req:Request, res:Response) => {
    let query = `Select * From users where id = ?`
    sqlconn.query(query, [
        req.body.id
    ], (err: any, rows:any) => {
        if(!err) 
            res.status(200).json({msg: "Ok!", data:rows})
        else
            res.status(400).json({msg: "Error!", error:err})
    })
})

function generateAccessToken(param: string) {
    return jwt.sign(param, process.env.TOKEN);
}

function authenticateToken(req:Request, res:Response, next:any) {
    const token = req.headers['x-authorization'];

    if(token == null) {
        return res.status(401).json({msg: "No token provided."});
    }

    jwt.verify(token, process.env.TOKEN as string, (err: any, user: any) => {
        console.log(err);
        if(err) 
            return res.status(403).json({msg: "Failed to authenticate token."});
            
            next();
        
    })

    
}





