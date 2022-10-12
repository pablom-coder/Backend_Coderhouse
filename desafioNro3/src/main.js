const express = require('express');
const app = express();

const PORT = 8080;

const nombreArchivo = 'productos.json';

const fs = require("fs")

const path = require('path');

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async getAll(){
        try{
            await this.validateExisteFile()
            const data = await fs.promises.readFile(this.nombreArchivo, "utf-8")
            return JSON.parse(data);
        }catch(error){
            console.log("Problemas con el listado de productos",error)
        }
    }

    async validateExisteFile () {
       
            const exists = await fs.promises.stat(this.nombreArchivo)        
            !exists ? await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(['Error 404'])): null
    }  
    
    async guardarProductos (productos){
        try{        
        //await validateExisteFile();
        const data = JSON.stringify(productos, null, '\t')
        await fs.promises.writeFile(this.nombreArchivo, data)
        }catch(error){
            console.log("error00000")
        }
    };
   
    async getById (idBuscado){
        try{
           // const productos = await obtenerProductos();
            const productos = await this.getAll();
            const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado );
        
            if(indice < 0) {
                throw new Error('El producto no existe');
            }
        
            return productos[indice];
        }catch(error){
            console.log("Problema con el producto solicitado")
        }
    }
    
    async save(data) {
        
        if(!data.title || !data.price || typeof data.title !== 'string' || typeof data.price !== 'number') throw new Error('Datos invalidos');
    
            //const productos = await obtenerProductos();
        try{
            const productos = await this.getAll();
            let id = 1;
    
            if(productos.length){	//Si tengo elementos en mi array
                id = productos[productos.length -1].id + 1;
            }
        
            const nuevoProducto = {
                title: data.title,
                price: data.price,
                id: id,
            };
        
            productos.push(nuevoProducto);
            await this.guardarProductos(productos);
        }catch(error){
            console.log("Problemas al guardar el producto")
        }        
    }
    
    async deleteAll(){
        try{
            await this.guardarProductos([]);
        }catch(error){
            console.log("problemas para eliminar todos los productos")
        }
        
    }
    
    async deleteById(idBuscado){
        try{
            console.log("idbuscado",idBuscado)//
            const productos = await this.getAll();
        
            const indice = productos.findIndex((unProducto) => unProducto.id === idBuscado );
            console.log(indice)//
            if(indice < 0) {
                return;
            }
        
            productos.splice(indice, 1);
        
            await this.guardarProductos(productos);
        }catch(error)
        {
            console.log("Error")
        }
    }

}
const archivo = new Contenedor(nombreArchivo);

const server = app.listen(PORT, () =>
  console.log(`Server Up en puerto ${PORT}`)
);

server.on('error', (err) => {
  console.log('ERROR en el SERVER', err);
});


app.get('/',(req,res)=>{
    res.json('Bienvenidos')
});

app.get('/productos', async (req, res) => {
    try {   
            let productos = await archivo.getAll(); 
            
            if(productos.length == 0)
            {
                res.json({respuesta:"No hay productos",});
            } else {
                    res.json({
                        respuesta : productos,                        
                    });
            }
        }catch (error){
            console.log("problemas..",error);
        }
});

app.get('/productoRandom', async (req, res) => {
    try{
            let productos = await archivo.getAll(); 
            if(productos.length == 0)
            {
                res.json({
                    respuesta:productos[Math.floor(Math.random() * products.length)],
                })
            }else{
                    res.json({respuesta:"No hay productos"})
            }
        }catch(error){
            console.log("Problemas...")
        }
});

