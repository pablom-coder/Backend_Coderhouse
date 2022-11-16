import server from './services/server.js';
import {initWsServer} from './services/socket';
import {DBase} from '../db.js'

const port= 8080


const init = async () =>{
    try{
        await DBase.init();
        initWsServer(server)
        server.listen(port, () =>{
    console.log(`Puerto levantado en : ${port}`);
})
    }catch (err){
        console.log(err)
    }
}
init()
