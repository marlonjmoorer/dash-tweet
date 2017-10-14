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
    rolling: true,
    store: new MongoStore({ url: connString })
}


if(process.env.NODE_ENV=='production'){
    sess.cookie.secure = true
    app.use (function (req, res, next) {
      var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
      if (schema === 'https') {
        next();
      } else {
        res.redirect('https://' + req.headers.host + req.url);
      }
    });
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath,'index.html'));
    });
}else{
  app.use(require('cors')())  
}
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(parser.json())
app.use(parser.urlencoded({extended:true}))
app.use(session(sess))
app.use([[passport.initialize(),passport.session()]])
app.use("/api/twitter",require('./routes/twitter'));
/* app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath,'index.html'));
});
 */


module.exports=app;



