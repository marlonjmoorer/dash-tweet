var express=require("express")
var app= express()
var path=require("path")
var parser= require("body-parser")
var session = require('express-session')
var publicPath=path.join(__dirname,"..",'client')
const MongoStore = require('connect-mongo')(session);
const {passport} = require('./passports');
const { connString } = require('./config');

let sess={
    secret: 'keyboard cat',
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge: 60000 },
   // rolling: true,
    store: new MongoStore({ url: connString })
}




app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())
app.use("/api/twitter",require('./routes/twitter'));
if(process.env.NODE_ENV=='production'){
  //sess.cookie.secure = true
  require('./prod-setup')(app);
}else{
  require('./dev-setup')(app);
}


app.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath,'index.html'));
});
 


module.exports=app;



