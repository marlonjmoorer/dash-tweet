const { twitterAuth, connString } = require('./config');

const db = require('monk')(connString)

module.exports={
    users:db.get("twitter_users")
}