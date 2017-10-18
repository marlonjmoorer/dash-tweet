var express = require("express")
const { User,getUserById,disconnectAccount } = require('../models/user.model');
const {twitterHandler} = require('../passports');
var jwt = require('jsonwebtoken');
var router = express.Router()
const {createClient} = require('../modules/twitter.module');
const { secret } = require('../config');

router.get('/login', twitterHandler);
router.get('/success', twitterHandler, (req, res) => {
    if(req.user){
        var token= jwt.sign({id:req.user._id},secret)
        res.render("success",{token})
    }
});
router.get('/login', twitterHandler);
router.get('/accounts', (req, res) => {
    var {token }=req.query
    
    var userId=null
    if (req.user) {
        userId = req.user._id
    } else if(token) {
        try {
           userId = jwt.verify(token,secret).id
        } catch(err) {
            res.status(500).end()
        }
    }
    if (!userId){return res.status(500).end()}
    getUserById(userId).then(user => {
            res.json(user.accounts)
    })
});

router.post('/timeline', (req, res) => {
    if (req.body) {
        var client = createClient(req.body.account)
        client.get('statuses/home_timeline',function (error, tweets, response) {
            if (!error) {
             //   console.log(tweets);
                res.json(tweets)
            }
        });

    }
})
router.post("/disconnect",(req,res)=>{
    var {profileId}= req.body
    disconnectAccount(profileId)
    .then(()=>res.json({success:true}))
    .catch(()=>res.status(500).send())
})
router.post('/logout', (req, res) => {


});
module.exports = router;