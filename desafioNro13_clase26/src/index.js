import Server from './services/server.js';
import Config from './config/index.js';
import { initDb } from './db/db.js';


Server.listen(Config.PUERTO, async () => {

    await initDb();
    console.log('Conectado a la DB!');
    console.log('Server escuchando en el puerto', Config.PUERTO);
}); 





/* import Server from './services/server.js';

const PORT = 8080;

Server.listen(PORT, () => {
    console.log('Server escuchando en el puerto', PORT);
}); */