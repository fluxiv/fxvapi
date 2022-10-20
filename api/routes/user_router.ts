import { Router, Request, Response } from 'express'
import {userModels} from '../models/users_models'
const mysql = require('mysql')
require("dotenv").config({
    allowEmptyValues: true
})
var mysqlconnect = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true
})
export const user = Router();
const { nanoid } = require('nanoid')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

user.post('/postUser',(req:Request,res:Response) => {
    var id:string = nanoid()
    var params = req.query.params
    // var data = new userModels(
    //     id,
    // )
    res.send(params)
})