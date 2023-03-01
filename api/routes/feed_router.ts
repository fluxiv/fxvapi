import e, { Router, Request, Response, application } from 'express';
import * as dotenv from "dotenv";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { feedModels } from '../models/feed_models';
import { nanoid } from 'nanoid';

const mysql = require('mysql2')
dotenv.config({ path: __dirname+'/./../.env' })
const jwt = require('jsonwebtoken')
const RateLimit = require('express-rate-limit');

var sqlconn = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true
})

var rateLimiter = RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  });

var profilePath: any[] = [];
var feedId = nanoid();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const myPath = path.join(__dirname, `../../uploads/feed/${feedId}`) 
        fs.mkdirSync(myPath, {recursive:true})
        cb(null, myPath)
    },
    filename(req, file, cb) {
        const ext = file.originalname.split(".")[1]
        const date = Date.now()
        let myFileName = `${feedId}-${date}.${ext}`
        profilePath.push(`/uploads/feed/${feedId}/` + myFileName)
        cb(null, myFileName)
    },
})

const upload = multer({storage})


export const feed = Router();


feed.get('/getFeed',rateLimiter, (req:Request, res:Response) => {
    // console.log(req.query)
    let query = `SELECT feed.*, users.name, users.email FROM feed LEFT JOIN users ON feed.userId = users.id`
    sqlconn.query(query, 
        (err: any, rows:any) => {
        if(!err) {
            res.status(200).json({msg: "Ok!", data:rows})
        }
        else
            res.status(400).json({msg: "Error!", error:err})
    })
})

feed.get('/getFeedById',rateLimiter, (req:Request, res:Response) => {
    //console.log(req.query)
    let query = `SELECT feed.*, users.name, users.email FROM feed LEFT JOIN users ON feed.userId = users.id where feed.feedId = ?`
    sqlconn.query(query,[
        req.query.id
    ], (err: any, rows:any) => {
        if(!err) {
            if(rows.length == 0) {
                res.status(404).json({msg: "Error, not found!"})
            }
            else{
            res.status(200).json({msg: "Ok!", data:rows})
            }
        }
        else
            res.status(400).json({msg: "Error!", error:err})
    })
})

feed.post("/postFeed",rateLimiter, authenticateToken, upload.any(), (req:Request, res:Response) => {
    let query = 'insert into feed (`feedId`, `title`, `text`, `like`, `deslike`, `userId`, `imgs`) values (?, ?, ?, ?, ?, ?, ?) '
    //console.log(req.body)
    //console.log(req.files)
    var data = new feedModels(feedId,
        req.body.Title,
        req.body.Text,
        "[]",
        "[]",
        JSON.stringify(profilePath),
        req.body.UserId,
        undefined,
        undefined,
        undefined,
        undefined)
    sqlconn.query(query, [
        data.feedId,
        data.title,
        data.text,
        data.like,
        data.deslike,
        data.userId,
        data.imgs
    ],(err: any, rows: any) => {
        if(err) {
            res.status(400).json({
                msg: "Error!",
                error:err
            })
        } else {
            res.status(201).json({
                msg: "Ok!"
            })
        }
    })
})


function authenticateToken(req:Request, res:Response, next:any) {
    const token = req.headers['x-authorization'];

    if(token == null) {
        return res.status(401).json({msg: "No token provided."});
    }

    jwt.verify(token, process.env.TOKEN as string, (err: any, user: any) => {
        // console.log(err);
        if(err) 
            return res.status(403).json({msg: "Failed to authenticate token."});
            
            next();
        
    })

    
}