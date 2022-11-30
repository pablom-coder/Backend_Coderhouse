/* const fs = require('fs/promises');
const createError = require('http-errors');
const path = require('path')
const filePath = path.resolve(__dirname, "../products.json");

const res = require('express/lib/response');
const { v4: uuidv4 } = require('uuid'); */

//const moment = require("moment");


import { ProductModel } from '../models/productos.js';

export const getAllProductos = async (req, res) => {
  try {
    const productos = await ProductModel.find();
    res.json({
      data: productos
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      stack: err.stack,
    });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id)
    if(!product)
     return res.status(404).json({
      msg: 'Product not found!'
     });
     res.json({
      data: product
     })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, thumbnail } = req.body;
    const newProduct = await ProductModel.create({
      name, 
      description,
      price,
      stock,
      thumbnail,
    });

    res.json({
      data: newProduct
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, thumbnail } = req.body;
    const productUpdated = await ProductModel.findByIdAndUpdate(
      id,
      {name, description, price, stock, thumbnail},
      {new: true}
    );
    res.json({
      msg: 'product updated',
      data: productUpdated,
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    await ProductModel.findByIdAndUpdate(id);
    res.json({
      msg: 'product deleted successfully'
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};



/* class Contenedor {
	constructor(archivo) {
		this.archivo = archivo;
	}

	async existe(id) {
        try
        {
            const productos = await fs.readFile(filePath, 'utf8');
            const arrayProd = JSON.parse(productos);
            const indice = arrayProd.findIndex(prod => prod.id == id);

            return indice >= 0;
        } catch (error) {
            throw new Error("No se encuentra el producto!", error);
          }
    }

    async getAll() {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos)
        return arrayProd
    }

    async getById(id) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos);
        const existe = await this.existe(id);

        if(!existe) throw createError(404, 'producto no encontrado')

        const indice = arrayProd.findIndex(prod => prod.id == id);

        return arrayProd[indice]
    }

    async saveNewProduct(datanueva) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos)

		if (!datanueva.title || typeof datanueva.title !== 'string' || !datanueva.price) throw new Error('Datos invalidos');

        const {title, price, thumbnail, timestamp, codigo, stock} = datanueva

        let nuevoId = 1

        if(arrayProd.length) {
           nuevoId = arrayProd[arrayProd.length - 1].id + 1
        }

        const intId = Math.floor(nuevoId)
    
        const product = {
            title,
            price,
			thumbnail,
			timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
			codigo: uuidv4(),
			stock,
            id: intId
        }

        arrayProd.push(product);

        const newData = JSON.stringify(arrayProd, null, "\t")

        await fs.writeFile(filePath, newData)
            return product
        }

        async updateById(id, datanueva) {
            try {
                const productos = await fs.readFile(filePath, 'utf8');
                const arrayProd = JSON.parse(productos)
    
                const existe = await this.existe(id)
    
                console.log(existe)
                if (!existe) {
                    throw 'El ID no existe, verifique!!' //('Error,producto no encontrado')
                }
    
                const indice = arrayProd.findIndex(prod => prod.id == id);
				const modificado = moment().format("DD-MM-YYYY HH:MM:SS");
                const {
                    title = arrayProd[indice].title,
                    price = arrayProd[indice].price,
                    thumbnail = arrayProd[indice].thumbnail,
					timestamp = arrayProd[indice].timestamp,
                	codigo = arrayProd[indice].codigo,
                	stock = arrayProd[indice].stock
                } = datanueva
    
                const intId = Math.floor(id)
    
                const nuevoProducto = {
                    ...arrayProd[indice],
                    ...{
                        title,
                        price,
                        thumbnail,
						timestamp:modificado,
                    	codigo,
                    	stock,
                        id: intId,
                    }
                }
    
                arrayProd.splice(indice, 1, nuevoProducto);
    
                const DataActualizada = JSON.stringify(arrayProd, null, "\t")
                await fs.writeFile(filePath, DataActualizada)
    
                return nuevoProducto    
    
            } catch (error) {
                throw (error)
            }
        }

    async deleteById (id){
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos)

        const existe = await this.existe(id)//
        console.log(existe)//
 
        if(!existe){
            return(`El id: ${id} No existe, verifique`) //('Error,producto no encontrado')
        }else{ 
            const indice = arrayProd.findIndex(prod => prod.id == id);
            
            arrayProd.splice(indice, 1);

            const newData = JSON.stringify(arrayProd, null, "\t")
            await fs.writeFile(filePath, newData)

            return `Se elimino el producto con el id: ${id}`
        }
    }
}


const instanciaProductsApi = new Contenedor(filePath)

module.exports = {
	ProductsController: instanciaProductsApi
}  */
