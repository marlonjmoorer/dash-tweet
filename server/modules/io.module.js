const twitter = require('./twitter.module')



module.exports=(server)=>{
 
    const io = require('socket.io')(server,{path:"/io"})
    io.on("connection",(client)=>{
        console.log("connected")
        client.on("init",(account)=>{
            
            try {
                var twit = twitter.createClient(account)
                var stream= twit.stream("user",{})
                stream.on("data",(tweet)=>{
                client.emit("tweet",tweet)
                })
                stream.on('error', function(error) {
                    throw error;
                });
            } catch (error) {
                console.error(error)
            }
            
        })
    })
}