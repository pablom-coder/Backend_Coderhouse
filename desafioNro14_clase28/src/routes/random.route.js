import { Router } from "express";
const router = Router();

import { fork } from 'child_process';
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const scriptPath = path.resolve(__dirname, '../controllers/random.controller.js');

router.get('/randoms/:cant', (req, res) => {

    const cant = req.params.cant;

    const randomNumb = fork(scriptPath);

    randomNumb.send(cant);
    randomNumb.on('message', (numb) => {
        res.json({
            numb
        });
    });
})

export default router;
