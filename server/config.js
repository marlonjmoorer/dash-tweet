require('dotenv').config()

module.exports={

    twitterAuth:{
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        callbackURL:process.env.CALLBACK||"https://mongo-twitter.herokuapp.com/api/twitter/success"
        //access_token:         '...',
        //access_token_secret:  '...',
    },
    secret:process.env.SECRET,
    connString:process.env.CONNSTRING
}

