const TwitterStrategy = require("passport-twitter").Strategy
var mongojs = require('mongojs')
const {User}= require('../db');
const {twitterAuth} = require('../config');
var Twitter = require('twitter');



const createClient = (account) => {
   // var { access_token_key: access_token,access_token_secret}= account
    var params = Object.assign({},account,twitterAuth)
    var client = new Twitter(params);
    return client
}

const saveUser = (request,access_token_key, access_token_secret, profile, cb) => {
    if (!request.user) {
        User.findOne({accounts: { $elemMatch: { "profile.id": profile.id } }}).lean().then(user=>{
            if(user){
                return cb(null, user)
            }else{
                var newUser= new User();
                newUser.accounts=[{profile,access_token_key, access_token_secret}]
                newUser.save((err)=>{
                    return cb(null, newUser);
                })
            }
        })
    }else{
        var {user}= request
        user.accounts.filter(acc=>acc.profile.id!=profile.id)
        user.accounts.push([{profile,access_token_key, access_token_secret}])
        user.save(function(err) {
            if (err)
                throw err;
            return cb(null, user);
        });
    }

    
    
}
module.exports={
    Strategy:new TwitterStrategy({
        consumerKey:twitterAuth.consumer_key,
        consumerSecret:twitterAuth.consumer_secret,
        callbackURL: "http://localhost:4000/api/twitter/success",
        userAuthorizationURL: "https://api.twitter.com/oauth/authenticate?force_login=true",
        passReqToCallback:true
    },saveUser),
    createClient
}