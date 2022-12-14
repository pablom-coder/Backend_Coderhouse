const createError = require('http-errors')
const fs = require('fs/promises');
const path = require('path');
const res = require('express/lib/response');

const filePath = path.resolve(__dirname, '../../productos.json');

class Producto {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async existe(id) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos);
        const indice = arrayProd.findIndex(prod => prod.id == id);

        return indice >= 0;
    }

    async getAll() {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos)
        return arrayProd
    }

    async getById(id) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos);
        const existe = await this.existe(id)

        if (!existe) throw createError(404, 'producto no encontrado')

        const indice = arrayProd.findIndex(prod => prod.id == id);

        return arrayProd[indice]
    }

    async saveNewProduct(datanueva) {
        const productos = await fs.readFile(filePath, 'utf8');
        const arrayProd = JSON.parse(productos)

        const {
            title,
            price,
            thumbnail
        } = datanueva

        let nuevoId = 1

        if (arrayProd.length) {
            nuevoId = arrayProd[arrayProd.length - 1].id + 1
        }

        const intId = Math.floor(nuevoId)

        const product = {
            title,
            price,
            thumbnail,
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

            const {
                title = arrayProd[indice].title,
                    price = arrayProd[indice].price,
                    thumbnail = arrayProd[indice].thumbnail
            } = datanueva

            const intId = Math.floor(id)

            const nuevoProducto = {
                ...arrayProd[indice],
                ...{
                    title,
                    price,
                    thumbnail,
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


    async deleteById(id) {
        try {
            const productos = await fs.readFile(filePath, 'utf8');
            const arrayProd = JSON.parse(productos)

            const existe = await this.existe(id) //
            console.log(existe) //

            if (!existe) {
                throw "El ID no existe, verifique!!";
            }
            const indice = arrayProd.findIndex(prod => prod.id == id);

            arrayProd.splice(indice, 1);

            const newData = JSON.stringify(arrayProd, null, "\t")
            await fs.writeFile(filePath, newData)

            return `Se elimino el producto con el id: ${id}`

        } catch (error) {
            throw error;
        }
    }
}

const instanciaProductsApi = new Producto(filePath);

module.exports = {
    ProductsController: instanciaProductsApi
}