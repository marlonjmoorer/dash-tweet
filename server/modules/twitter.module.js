const TwitterStrategy = require("passport-twitter").Strategy
var mongojs = require('mongojs')
const {User}= require('../db');
const {twitterAuth} = require('../config');
var Twitter = require('twitter');

const {appendAccount} = require('../models/user.model');


const createClient = (account) => {
   // var { access_token_key: access_token,access_token_secret}= account
    var params = Object.assign({},account,twitterAuth)
    var client = new Twitter(params);
    return client
}

const saveUser = (request,access_token_key, access_token_secret, profile, cb) => { 
    appendAccount({profile,access_token_key, access_token_secret},request.user).then(user=>{
        return cb(null, user);
    })
}
module.exports={
    Strategy:new TwitterStrategy({
        consumerKey:twitterAuth.consumer_key,
        consumerSecret:twitterAuth.consumer_secret,
        callbackURL: twitterAuth.callbackURL,
        userAuthorizationURL: "https://api.twitter.com/oauth/authenticate?force_login=true",
        passReqToCallback:true
    },saveUser),
    createClient
}