const server = require("./services/server");
const initWsServer = require("./services/socket");

const port= 8080


const init = async () =>{
    try{
        initWsServer(server)
server.listen(port, () =>{
    console.log(`Puerto levantado en : ${port}`);
})
    }catch (err){
        console.log(err)
    }
}
init()
