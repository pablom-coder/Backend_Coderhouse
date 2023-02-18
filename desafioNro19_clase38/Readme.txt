                                                               RUTAS Y CURL

/user/signUp: pasamos por body email, password, telefono, nombre y direccion. Se guarda en mongoDB con password encriptada. Devuelve "SIGNUP OK", envia mail a ADMIN.

curl --location --request POST 'http://localhost:8080/user/signUp' \
 '{
    "username": "npmanrique@gmail.com",
    "password": "1234",
    "name": "Pablo",
    "phoneNumber": "+5493516280928",
    "addres": "xxxxxxx99"
}'


/user/logIn: pasamos por body email y password. Compara password encriptada. Devuelve "Bienvenido (username)".

curl --location --request POST 'http://localhost:8080/user/logIn' \
 '{
    "username": "npmanrique@gmail.com",
    "password": "1234"
}'


/user/home: devuelve cookie y _id (mongo) del usuario logueado.

curl --location --request GET 'http://localhost:8080/user/home' \



/user/logout: Devuelve Hasta luego! cierra sesion.

curl --location --request GET 'http://localhost:8080/user/logout' \


---------------------------------------------------------------------------------------

ROUTER DE PRODUCTOS (/productos)

/productos devuelve lista de productos disponibles.

GET: '/productos' 
curl --location --request GET 'http://localhost:8080/productos' \


/productos/:id devuelve producto especifico por ID

GET: '/productos/:id'


/productos pasamos por body title, price, stock, descripcion y url de imagen. Agrega producto a la lista 

POST: '/productos'
curl --location --request POST 'http://localhost:8080/productos/' \

	{
	"title": "Botines",
	"price": "800",
	"stock": "20",
	"descripcion": "Botines Nike",
	"img": "https:/https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}


/:id modifica datos de producto en lista. Pasamos title price stock y descripcion modificada por body

PUT: '/:id'
curl --location --request PUT 'http://localhost:8080/productos/id' \
--header 'Content-Type: application/json' \
--data-raw '{
	"title": "Vaquero",
	"price": "600",
	"stock": "8",
	"descripcion": "Vaquero Rangler"
}'


/:id elimina producto especifico por ID.

DELETE: '/:id'
curl --location --request DELETE 'http://localhost:8080/productos/id' \


----------------------------------------------------------------------------------------------------------

ROUTER DE CARRITO (/carrito)

'/carrito/' crea un nuevo carrito vacío

POST: '/carrito/'
curl --location --request POST 'http://localhost:8080/carrito/' \


--
'/carrito/:id' elimina carrito por ID

DELETE: '/carrito/:id'
curl --location --request DELETE 'http://localhost:8080/carrito/id' \


'/carrito/:id/productos' muestra lista de productos dentro de carrito 

GET: '/carrito/:id/productos'
curl --location --request GET 'http://localhost:8080/carrito/id' \


--
'/carrito/:id/productos' pasamos por body title, price, id(producto) y cantidad. Por param pasamos id de carrito, agregamos el producto.

POST: '/carrito/:id/productos'
curl --location --request POST 'http://localhost:8080/carrito/id/productos' \



'/carrito/:id/productos/:id_prod' pasamos id de carrito y de producto por param y eliminamos el producto dentro de ese carrito.

DELETE:'/carrito/:id/productos/:id_prod'



'/carrito/:id/buy' pasamos por param id de carrito, envia mail y WSP confirmando pedidos.

GET '/carrito/:id/buy'
curl --location --request POST 'http://localhost:8080/carrito/id/buy'