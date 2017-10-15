var express = require("express")
const {User} = require('../db');
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
    User
        .findById(userId)
        .lean()
        .then(user => {
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
    User.findOne({accounts: { $elemMatch: { "profile.id": profileId } }}).then(user=>{
        if(user){
            user.accounts=user.accounts.filter(a=>a.profile.id!=profileId);
            user.save((err)=>{
                if(err) throw err
                res.json({success:true})
            })
        }else{
           res.end()
        }
    })
})
router.post('/logout', (req, res) => {


});
module.exports = router;