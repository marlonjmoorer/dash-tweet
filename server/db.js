const { twitterAuth, connString } = require('./config');
var mongoose = require('mongoose');
mongoose.connect(connString,{ useMongoClient: true });
//const db = require('monk')(connString)

/* module.exports={
    users:db.get("twitter_users"),
    accounts:db.get("accounts"),
    id:db.id
}
 */
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var userSchema = Schema({
    accounts:[]
});

module.exports={
    User:mongoose.model("User",userSchema),
    ObjectId
}

