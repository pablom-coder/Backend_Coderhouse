ROUTES Y CURL

POST 'http://localhost:8080/api/add' 

--data-raw '{
    "id": "10"
    "name": "remera",
    "price": "200",
    "stock": "40"
}'

Pasamos por body name, price y stock de los productos a agregar. Guarda en base de datos y devuelve datos del producto cargado junto con _id

GET 'http://localhost:8080/api/list' 

Devuelve lista de name y price de todos los productos (no devuelve stock ni _id)