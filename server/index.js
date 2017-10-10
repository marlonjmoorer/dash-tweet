var express=require("express")
var app= express()
var path=require("path")
var port = process.env.PORT||4000
var parser= require("body-parser")


var config=require("./config")

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("good")
})
app.use("/twitter",require('./routes/twitter'));
app.listen(port,()=>{
    console.log("ready")
})

