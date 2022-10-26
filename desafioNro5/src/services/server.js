const express = require('express');
const path = require('path');
const mainRouter = require('../routes/index');
const ProductsController = require('../controller/productosApi');

/** INICIALIZACION API con EXPRESS */
const app = express();

app.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
app.set('views', viewsFolderPath);
app.set('view engine', 'pug');


app.get('/', (req, res) => {
    //const productos = ProductsController.getAll();
    res.render('formulario');
});
/* app.get('/eje2', (req, res) => {
  const datos = {
    titulo: 'Pepito',
  };
  res.render('ejemplo2', datos); // Se muestra la plantilla ejemplo2.pug
}); */

app.use(express.json());	//permite json
app.use(express.urlencoded({ extended: true }));  //permite form data

//este middleware de errores se encarga de atajar todos los errores que haya en nuestras rutas
//aca metemos la logica para ver que le respondemos al cliente (si un error generico o uno definido)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
      message,
  })
});

app.use('/api', mainRouter);
module.exports = app;