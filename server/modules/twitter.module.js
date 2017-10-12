const TwitterStrategy = require("passport-twitter").Strategy
var mongojs = require('mongojs')
const {users}= require('../db');
const {twitterAuth} = require('../config');
var Twitter = require('twitter');



const createClient = (account) => {
   // var { access_token_key: access_token,access_token_secret}= account
    var params = Object.assign({},account,twitterAuth)
    var client = new Twitter(params);
    return client
}

const saveUser = (access_token_key, access_token_secret, profile, cb) => {
    users.findOne({"profile.id":profile.id}).then(account=>{
        if(!account){
            users.insert({profile,access_token_key, access_token_secret}).then(result=>{
                return cb(null, profile)
            })
        }else{
            return cb(null, profile)
        }
    })
}
module.exports={
    Strategy:new TwitterStrategy({
        consumerKey:twitterAuth.consumer_key,
        consumerSecret:twitterAuth.consumer_secret,
        callbackURL: "http://localhost:4000/twitter/success"
    },saveUser),
    createClient
}