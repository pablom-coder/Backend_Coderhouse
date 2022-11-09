const fs = require('fs');
const path = require('path')
const filePath = path.resolve(__dirname, "../cart.json");
const moment = require("moment");

const { ProductsController } = require('./product')

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async validateExistFile() {
        try {
            await fs.promises.stat(`${this.archivo}`)
        } catch (err) {
            await fs.promises.writeFile(`${this.archivo}`, JSON.stringify([]));
        }
    }

    async readFileFn() {
        await this.validateExistFile();
        const contenido = await fs.promises.readFile(`${this.archivo}`, 'utf-8');
        return JSON.parse(contenido);
    }

    async writeProducts(productos) {
        await this.validateExistFile();
        const data = JSON.stringify(productos, null, 4)
        await fs.promises.writeFile(this.archivo, data)
    }

    async exists(id) {
        const data = await this.getAllProdInCart()
        const indice = data.findIndex(product => product.id == id)
        return indice >= 0;
    }


    //getAllProdInCart(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAllProdInCart() {
        try {
            const data = await this.readFileFn();
            return data

        } catch(error) {
            throw ('Error al obtener todos los datos del carrito', error);
        }
    }

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async saveCart(element) {
        try {
            const data = await this.getAllProdInCart();
            let id = 1;

            if (data.length) {
                //Si tengo elementos en mi array
                id = data[data.length - 1].id + 1;
            }

            const cart = {
                id: id,
                timestamp: moment().format("DD-MM-YYYY HH:MM:SS"),
                products: [element]
            };

            data.push(cart);

            await this.writeProducts(data)
            console.log(`Nuevo carrito guardado, N° ID: ${cart.id}`);

            return cart.id;

        } catch (err) {
            throw new Error("No se pudo guardar el carrito", err)
        }

    }

    async addProdInCart(cartId, prodId) {
        try {
            const carts = await this.getAllProdInCart();
            const index = carts.findIndex((cart) => cart.id === cartId);
            carts[index].products.push(prodId);
            await this.writeProducts(carts);

            return 'Producto agregado!';
        } catch (err) {
            throw new Error("No se pudo agregar el producto al carrito", err)
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getCartById(id) {
        const data = await this.readFileFn()
        const idProducto = data.find((producto) => producto.id === id);

        if (!idProducto) throw new Error("El carrito buscado no existe!");

        return idProducto;

    }


    // deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(id) {
        const data = await this.readFileFn()

        const cartId = data.findIndex((producto) => producto.id === id);

        if (cartId < 0) {
            throw ('El carrito no existe');
        }

        data.splice(cartId, 1);

        await this.writeProducts(data)

    }

    async deleteAll() {
        await this.writeProducts([])
    }

    async deleteProduct(cartId, prodId) {
        try {

            const cartSelected = await this.getAllProdInCart();
            const index = cartSelected.findIndex((cart) => cart.id === cartId);

            console.log(cartSelected);
            console.log(cartId)

            const productToDelete = cartSelected[index].products.findIndex(
                (product) => product.id === prodId
              );
              console.log(productToDelete,'hola')
            
            if(productToDelete < 0){
                throw  ('El producto no existe en el carrito');
            }

            cartSelected[index].products.splice(productToDelete, 1);
            await this.writeProducts(cartSelected);
            return 'Producto eliminado!';           

        } catch (error) {
            return console.log(error);
        }
    }
}



const instanciaCartApi = new Contenedor(filePath)

module.exports = {
    CartController: instanciaCartApi
} 