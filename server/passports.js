var passport = require('passport');
const { getUserById} = require('./models/user.model');

const {Strategy}= require('./modules/twitter.module');

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    getUserById(id).then(user=>{
        done(null, user);
    })
});

passport.use(Strategy)

module.exports={
    passport,
    twitterHandler: passport.authenticate('twitter')
}