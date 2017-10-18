const twitter = require('./twitter.module')

module.exports = (server) => {

    const io = require('socket.io')(server)
    io.on("connection", (client) => {
        console.log("connected")
        client.on("init", (account) => {

            try {
                var twit = twitter.createClient(account)
                
                var stream = twit.stream("user", {})
                stream.on("data", (tweet) => {
                    client.emit("tweet", tweet)
                })
                stream.on('error', function (error) {
                    //throw error;
                    console.log(error)
                });
                client.twit=twit
            } catch (error) {
                console.error(error)
            }

        })
        client.on("tweet",(message)=>{
            if(client.twit){
                client.twit.post('statuses/update', {status: message},  function(error, tweet, response) {
                    if(error) throw error;
                    console.log(tweet);  // Tweet body. 
                    console.log(response);  // Raw response object. 
                });
            }
            console.log(message)
        })
        client.on("search",(term,done)=>{
            if(client.twit){
                client.twit.get('users/search', {q:term},  function(error, tweet, response) {
                    if(error) throw error;
                    done(tweet);  // Tweet body. 
                });
            }
        })
    })
}