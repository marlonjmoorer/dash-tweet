var express=require("express")
var app= express()
var path=require("path")
var port = process.env.PORT||4000
var parser= require("body-parser")
var session = require('express-session')
var publicPath=path.join(__dirname,"..",'client')
app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}))

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))



if(process.env.NODE_ENV=='production'){
    app.use (function (req, res, next) {
      var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
      if (schema === 'https') {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
}else{
  app.use(require('cors')())  
}

app.use(express.static(publicPath));
app.use("/api/twitter",require('./routes/twitter'));
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath,'index.html'));
});




const server=app.listen(port,()=>{
    console.log("ready")
    require('./modules/io.module')(server)
})



