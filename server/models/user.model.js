const {twitterAuth, connString} = require('../config');
var mongoose = require('mongoose');
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

mongoose.connect(connString, {useMongoClient: true});

var userSchema = Schema({accounts: []});
const User = mongoose.model("User", userSchema)


exports.appendAccount = (account, user) => {
    var {profile} = account
    if (!user) {
       
        return User.findOne({
            accounts: {
                $elemMatch: {
                    "profile.id": profile.id
                }
            }
        })
            .lean()
            .then(user => {
                if (user) {
                    return Promise.resolve(user)
                } else {
                    var newUser = new User()
                    newUser.accounts = [account]
                    return newUser.save()
                }
            })
    }else{
        if(user.accounts){
            if(!user.accounts.find(acc=>acc.profile.id==profile.id)){
                user.accounts.push(account)
            }
        }else{
           
            user.accounts=[account]
        }
        return user.save();
    }
}
exports.getUserById=(id)=>{
    return User.findById(id)
}
exports.disconnectAccount=(id)=>{
   return User.findOne({accounts: { $elemMatch: { "profile.id": id } }}).then(user=>{
        if(user){
            user.accounts=user.accounts.filter(a=>a.profile.id!=id);
            return user.save()
        }else{
           return Promise.resolve()
        }
    })
}
