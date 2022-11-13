 Documentación para consultar los endpoint. 

-----  /api/products  ------

GET: '/' - Se visualizan todos los productos
GET: '/:id?' - Buscar producto por su ID
PUT: '/:id' - Actualiza producto por ID(Habilitado administrador)
POST: '/' - Ingresa productos al archivo products.JSON (Habilitado administrador)
DELETE: '/:id' - Borra producto por ID (Habilitado administrador)

----  /api/cart  -----

GET: '/:id/products' - Visualiza todos los productos guardados en el carrito.
POST: '/' - Crea el carrito y devuelve su ID.
POST: '/:id/products' - Para incorporar productos al carrito por su id de producto
//le paso solo el id en el body (id del producto cargado en products.json)
DELETE: '/:id' - Elimina carrtito.
DELETE: '/:id/products/:id_prod' - Borra producto del carrito por su ID de carrito y de producto.

