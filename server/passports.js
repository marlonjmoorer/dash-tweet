var passport = require('passport');
const {User}= require('./db');
const {Strategy}= require('./modules/twitter.module');

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(user=>{
        done(null, user);
    })
   
});

passport.use(Strategy)

module.exports={
    passport,
    twitterHandler: passport.authenticate('twitter')
}