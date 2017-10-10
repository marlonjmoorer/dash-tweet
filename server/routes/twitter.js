var express=require("express")
var router=express.Router()
var passport = require('passport');



routes.use(passport.initialize());
routes.use(passport.session());

routes.get('/login', passport.authenticate('twitter'));
routes.get('/success', passport.authenticate('twitter', {failureRedirect: '/'}), (req, res) => {
    res.redirect("/")
});
module.exports=router;