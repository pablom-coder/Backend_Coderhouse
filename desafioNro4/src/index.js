const sever = require('./services/server')

const puerto = 8080;
sever.listen(puerto, () => {
	console.log(`Servidor Escuchando en el puerto ${puerto}`);
})