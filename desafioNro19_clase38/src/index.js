import Server from './services/server.js';
import Config from './config/index.js';
import { initMongoDB } from './db/mongoDB/database.js';
import {logger} from './helpers/logs.js'


Server.listen(Config.PUERTO, async () => {

    await initMongoDB();
    logger.info('Conectado a la DB!');
    logger.info('Server escuchando en el puerto', Config.PUERTO);
}); 