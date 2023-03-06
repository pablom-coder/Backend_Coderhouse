ROUTES Y CURL

'http://localhost:8080/graphql' 

-- Muestra todos los productos

query{
 	getAllController{
    id,
    name
    price,
    stock
	} 
}

-- Agrega producto a la base y devuelve id y nombre

mutation{
  saveController(data:{
    id:"2",
    name:"Remera Adidas",
    price: "88",
    stock: "100"
  }){
    id,
    name
  }
}

-- Elimina producto informando id a eliminar y devuelve id, nombre, y precio.

mutation{
  deleteProductByIdCont(id:"2"){
    id,
    name,
    price
  }
  
}
