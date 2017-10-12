var express=require("express")
var app= express()
var path=require("path")
var port = process.env.PORT||4000
var parser= require("body-parser")
var session = require('express-session')

app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}))

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

var cors = require('cors')
app.use(cors())
//app.use(express.static(path.join(__dirname,"..",'client')));




app.get("/",(req,res)=>{
    res.send("good")
})
app.use("/twitter",require('./routes/twitter'));

const server=app.listen(port,()=>{
    console.log("ready")
    require('./modules/io.module')(server)
})



