const TwitterStrategy = require("passport-twitter").Strategy
const { twitterAuth, connString } = require('./config');
const db = mongojs(connString, [collections])


const createClient = () => {
    var params = {}
    var client = new Twitter(params);
    return client
}

const saveUser = (access_token_key, access_token_secret, profile, cb) => {
    return cb(null, profile)
}
module.exports={
    Strategy:new TwitterStrategy({},saveUser),
    client
}