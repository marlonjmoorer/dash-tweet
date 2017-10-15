var express = require("express")
const {User} = require('../db');
const {twitterHandler} = require('../passports');

var router = express.Router()
const {createClient} = require('../modules/twitter.module');

router.get('/login', twitterHandler, (req, res) => {
    console.log("")
});
router.get('/success', twitterHandler, (req, res) => {
    res.render("success")
});

router.get('/accounts', (req, res) => {
    if (req.user) {
        var id = req.user._id
        User
            .findOne(id)
            .lean()
            .then(user => {
                res.json(user.accounts)
            })
    } else {
        res
            .status(500)
            .end()
    }
});
router.post('/timeline', (req, res) => {
    if (req.body) {
        var client = createClient(req.body.account)
        client.get('statuses/home_timeline',function (error, tweets, response) {
            if (!error) {
                console.log(tweets);
                res.json(tweets)
            }
        });

    }
})
router.post('/stream', (req, res) => {

    var client = createClient(req.body.account)
    var stream = client.stream("user", {})

    stream.on("data", (tweet) => {
        console.log()
    })
});
module.exports = router;