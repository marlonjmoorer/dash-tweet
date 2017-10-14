var express = require("express")
const {User}= require('../db');
const {twitterHandler} = require('../passports');

var router = express.Router()
const {createClient} = require('../modules/twitter.module');

router.get('/login', twitterHandler,(req, res) => {
    console.log("")
});
router.get('/success', twitterHandler, (req, res) => {
    //res.redirect("http://localhost:8080/#/success")
    res.render("success")
    //res.sendFile("/Users/marlonmoorer/Workspace/JS/dash-tweet/client/sucess.html")
});

router.get('/accounts', (req,res)=>{
    var id=req.user._id
    User.findOne(id).then(user=>{
        res.json(user.accounts)
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