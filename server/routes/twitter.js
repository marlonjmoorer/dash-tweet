var express = require("express")

const {users}= require('../db');

var router = express.Router()
var passport = require('passport');
const {Strategy,createClient} = require('../modules/twitter.module');

router.use(passport.initialize());
router.use(passport.session());
passport.use(Strategy)
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    done(null, null);
});
router.get('/login', passport.authenticate('twitter'));
router.get('/success', passport.authenticate('twitter', {failureRedirect: '/'}), (req, res) => {
    res.redirect("http://localhost:8080")
});
router.get('/accounts', (req,res)=>{
    users.find({}).then(accounts=>{
        res.json(accounts)
    })
});
router.post('/stream', (req,res)=>{

    var client = createClient(req.body.account)
    var stream= client.stream("user",{})

    stream.on("data",(tweet)=>{
        console.log()
    })
    
});
module.exports = router;