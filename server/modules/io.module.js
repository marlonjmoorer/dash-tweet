const twitter = require('./twitter.module')



module.exports=(server)=>{
 
    const io = require('socket.io')(server,{path:"/io"})
    io.on("connection",(client)=>{
        console.log("connected")
        client.on("init",(account)=>{
            var twit = twitter.createClient(account)
            try {
                var stream= twit.stream("user",{})
                stream.on("data",(tweet)=>{
                client.emit("tweet",tweet)
                })
            } catch (error) {
                console.error(error)
            }
            
        })
    })
}