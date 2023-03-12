ROUTES Y CURL



-- Muestra todos los productos
GET: 'http://localhost:8080/api/products/' 
query{
 	getAllController{
    id,
    name
    price,
    stock
	} 
}

-- Muestra un producto por id
GET: 'http://localhost:8080/api/products/id' 
query{
 	getById{
    id,
    name
    price,
    stock
	} 
}

-- Agrega producto a la base 

POST: 'http://localhost:8080/api/products/' 
query{
 	saveController{
    id,
    name
    price,
    stock
	} 
}

-- Actuliza producto por id

PUT: 'http://localhost:8080/api/products/id' 
query{
 	updateProductByIdCont{
    id,
    name
    price,
    stock
	} 
}

-- Elimina producto 

DELETE: 'http://localhost:8080/api/products/id' 
query{
 	deleteProductByIdCont{

	} 
}