const { twitterAuth, connString } = require('./config');
var mongoose = require('mongoose');
mongoose.connect(connString,{ useMongoClient: true });

var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
var userSchema = Schema({
    accounts:[]
});

module.exports={
  //  User:mongoose.model("User",userSchema),
    ObjectId
}

