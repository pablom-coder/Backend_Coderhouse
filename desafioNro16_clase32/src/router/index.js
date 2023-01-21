import { Router } from 'express';
import minimist from 'minimist';
import os from 'os';
import {logger, loggerWarn, loggerError} from '../helpers/log4js.js'

const optionalArgsObject = {
    default: {
        port: '8080',
    }
};

const args = minimist(process.argv.slice(2), optionalArgsObject);

const router = Router();
const CPUs = os.cpus().length;


router.get('/api/randoms', (req, res) => {

    logger.info(`Ruta: ${req.url}`,`Metodo: ${req.method}`);

    res.json({
        pid: process.pid,
        puerto: args.port,
        msg: `/api/randoms`,
    });
});

router.get('/', (req, res) => {

    logger.info(`Ruta: ${req.url}`,`Metodo: ${req.method}`);
    
    res.json({
        pid: process.pid,
        msg: `Hola desde puerto ${args.port} `,
    });
});

router.get('/info', (req, res) => {

    logger.info(`Ruta: ${req.url}`,`Metodo: ${req.method}`);
    
    res.json({
        NumeroDeCPUs: CPUs,
        SistemaOperativo: process.platform,
        VersionNode: process.version,
        MemoriaTotalReservada: JSON.stringify(process.memoryUsage()),
        ProcessId: process.pid,
        Puerto: args.port,
        CarpetaProyecto: process.cwd()
    })

});


export default router;