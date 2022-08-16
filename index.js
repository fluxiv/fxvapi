const exp = require('express')
const app = exp()
const cors = require('cors')
const mysql = require('mysql')

app.use(cors())
app.use(exp.json())
require("dotenv").config({
    allowEmptyValues: true
})

var sql = mysql.createConnection({
    host: process.env.HOST,
    user:  process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    multipleStatements: true
})

sql.connect((err)=>{
    if(!err){
        console.log('API FXV CONNECTED');
        console.log(`Run FXV api on http://localhost:${process.env.PORT}`)
    }
    else{
        console.log('SOMETHING WRONG');
        console.log('Connect to you database')
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`Rodando na porta ${process.env.PORT}`)
})

app.get('/',(req,res) => {
    res.send('eu rodo')
})