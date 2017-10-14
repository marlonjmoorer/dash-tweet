require('dotenv').config()

module.exports={

    twitterAuth:{
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        callbackURL:process.env.CONSUMER_SECRET||"https://mongo-twitter.herokuapp.com/api/twitter/success"
        //access_token:         '...',
        //access_token_secret:  '...',
    },
    connString:process.env.CONNSTRING
}

