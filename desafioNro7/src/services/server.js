const express = require('express')
const mainRouter = require('../routes/index')
const { checkErrors } = require('../middlewares/checkErrors')

/*Iniciamos api con express*/
const app = express()
/* permite leer lo que hay en el body segun el formato*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', checkErrors, mainRouter)


// este middleware de errores se encarga de atajar todos los errores que haya en nuestras rutas
// aca metemos la logica para ver que le respondemos al cliente (si un error generico o uno definido)

/* app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
}); */

module.exports = app;