const app= require('./server');
var port = process.env.PORT||4000
const server=app.listen(port,()=>{
    console.log(`ready : ${port}`)
    require('./server/modules/io.module')(server)
})