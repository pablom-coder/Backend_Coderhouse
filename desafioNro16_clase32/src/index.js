import mainRouter from './router/index.js';
import cluster from 'cluster';
import express from 'express';
import minimist from 'minimist';
import os from 'os';
import { loggerWarn, loggerError } from './helpers/log4js.js'

import compression from 'compression';


const optionalArgsObject = {
  alias: {
    m: 'modo',
    p: 'port'
  },
  default: {
    port: '8080',
    modo: 'fork'
  }
};
const CPUs = os.cpus().length;
const args = minimist(process.argv.slice(2), optionalArgsObject);
const modo = args.modo

const app = express();

app.use(compression());

if (modo === 'cluster' && cluster.isPrimary) {
  console.log(`cantidad de nucleos= ${CPUs}`);
  console.log(`PID MASTER= ${process.pid}`);
  for (let i = 0; i < CPUs; i++) {
    cluster.fork()
  }
  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} with code ${code}`);
    cluster.fork();
  })
} else {

  app.listen(args.port, () => console.log(`Servidor express escuchando en el puerto ${args.port} - PID WORKER ${process.pid}`));

  app.use('/', mainRouter);

  app.use(function (req, res) {

    res.status(404)
    loggerWarn.warn(`Ruta: ${req.url}`, `Metodo: ${req.method}`);
    loggerError.error(`Ruta: ${req.url}`, `Metodo: ${req.method}`);
    res.json({
      msg: `URL incorrecta`,
    });
  });

};
