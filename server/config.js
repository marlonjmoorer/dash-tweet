require('dotenv').config()

module.exports={

    twitterAuth:{
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        //access_token:         '...',
        //access_token_secret:  '...',
    },
    connString:process.env.CONNSTRING
}

